import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type GenerateItineraryRequest = {
  destination?: string;
  startDate?: string;
  endDate?: string;
  budget?: string;
  preferences?: string;
  origin?: string;
  selectedPlaces?: string[];
  remainingPlaces?: string[];
};

type ItineraryDay = {
  day: number;
  title: string;
  activities: string[];
};

type ParsedItinerary = {
  days: ItineraryDay[];
  tips: string[];
  optional_places: string[];
};

class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

const AI_MODEL = "google/gemini-2.5-flash";
const AI_MAX_TOKENS = 2800;

function normalizeStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function isValidDate(value?: string) {
  return Boolean(value && !Number.isNaN(new Date(value).getTime()));
}

function extractJsonCandidate(responseText: string): string {
  const cleaned = responseText
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim();

  const start = cleaned.search(/[\{\[]/);
  if (start === -1) {
    throw new Error("No JSON found in AI response");
  }

  const stack: string[] = [];
  let inString = false;
  let escaped = false;

  for (let i = start; i < cleaned.length; i++) {
    const char = cleaned[i];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }

    if (char === "{" || char === "[") {
      stack.push(char);
      continue;
    }

    const last = stack[stack.length - 1];
    if ((char === "}" && last === "{") || (char === "]" && last === "[")) {
      stack.pop();
      if (stack.length === 0) {
        return cleaned.slice(start, i + 1);
      }
    }
  }

  return cleaned.slice(start);
}

function repairJsonCandidate(candidate: string): string {
  let repaired = candidate
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\\(?!["\\/bfnrt]|u[0-9a-fA-F]{4})/g, "\\\\")
    .replace(/,\s*([}\]])/g, "$1");

  const stack: string[] = [];
  let inString = false;
  let escaped = false;

  for (const char of repaired) {
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }

    if (char === "{" || char === "[") {
      stack.push(char);
      continue;
    }

    const last = stack[stack.length - 1];
    if ((char === "}" && last === "{") || (char === "]" && last === "[")) {
      stack.pop();
    }
  }

  while (repaired.endsWith("\\")) {
    repaired = repaired.slice(0, -1);
  }

  if (inString) {
    repaired += '"';
  }

  while (stack.length > 0) {
    const opener = stack.pop();
    repaired += opener === "{" ? "}" : "]";
  }

  return repaired;
}

function parseItineraryJson(responseText: string): ParsedItinerary {
  const candidate = extractJsonCandidate(responseText);
  const attempts = [candidate, repairJsonCandidate(candidate)];

  let lastError: unknown = null;

  for (const attempt of attempts) {
    try {
      const parsed = JSON.parse(attempt);
      const daysSource = Array.isArray(parsed?.days) ? parsed.days : [];
      const days = daysSource
        .map((day: any, index: number) => ({
          day: typeof day?.day === "number" ? day.day : index + 1,
          title:
            typeof day?.title === "string" && day.title.trim()
              ? day.title.trim()
              : `Day ${index + 1}`,
          activities: normalizeStringList(day?.activities),
        }))
        .filter((day: ItineraryDay) => day.activities.length > 0);

      if (days.length === 0) {
        throw new Error("No itinerary days found in AI response");
      }

      return {
        days,
        tips: normalizeStringList(parsed?.tips).slice(0, 6),
        optional_places: normalizeStringList(parsed?.optional_places).slice(0, 10),
      };
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Failed to parse AI response");
}

async function callAiGateway(
  apiKey: string,
  systemPrompt: string,
  userPrompt: string,
  temperature: number,
) {
  console.log("Calling Lovable AI Gateway...");

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: AI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature,
      max_tokens: AI_MAX_TOKENS,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("AI Gateway error:", response.status, errorText);

    if (response.status === 429) {
      throw new HttpError("Rate limit exceeded. Please try again later.", 429);
    }

    if (response.status === 402) {
      throw new HttpError("Payment required. Please add credits to your workspace.", 402);
    }

    throw new HttpError(`AI Gateway error: ${response.status}`, 502);
  }

  const data = await response.json();
  const choice = data?.choices?.[0];
  const messageContent = choice?.message?.content;
  const content = typeof messageContent === "string"
    ? messageContent
    : Array.isArray(messageContent)
      ? messageContent
          .map((part: any) => typeof part?.text === "string" ? part.text : "")
          .join("\n")
      : "";

  if (!content.trim()) {
    throw new HttpError("AI returned an empty itinerary response", 502);
  }

  console.log("AI response received", JSON.stringify({
    finish_reason: choice?.finish_reason ?? null,
    content_length: content.length,
  }));

  return {
    content,
    finishReason: typeof choice?.finish_reason === "string" ? choice.finish_reason : "",
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let body: GenerateItineraryRequest;

    try {
      body = await req.json();
    } catch {
      throw new HttpError("Request body must be valid JSON", 400);
    }

    const destination = body.destination?.trim();
    const startDate = body.startDate;
    const endDate = body.endDate;
    const budget = body.budget?.trim();
    const preferences = body.preferences?.trim();
    const origin = body.origin?.trim() || "your city";
    const selectedPlaces = normalizeStringList(body.selectedPlaces);
    const remainingPlaces = normalizeStringList(body.remainingPlaces);

    if (!destination) {
      throw new HttpError("Destination is required", 400);
    }

    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      throw new HttpError("Valid start and end dates are required", 400);
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const start = new Date(startDate!);
    const end = new Date(endDate!);
    const tripDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    if (!Number.isFinite(tripDays) || tripDays <= 0) {
      throw new HttpError("End date must be on or after the start date", 400);
    }

    const systemPrompt = `You are an expert travel planner specializing in Uttar Pradesh, India. Create detailed, personalized travel itineraries that are practical and exciting.
Always return your response as a valid JSON object with this exact structure:
{
  "days": [
    {
      "day": 1,
      "title": "Day title",
      "activities": ["Activity 1", "Activity 2", "Activity 3"]
    }
  ],
  "tips": ["Tip 1", "Tip 2", "Tip 3"],
  "optional_places": ["Place 1 - brief suggestion", "Place 2 - brief suggestion"]
}
Rules:
- Return ONLY JSON with no markdown or code fences.
- Use double-quoted strings only.
- Keep each activity concise and single-line.
- Keep a maximum of 3 activities per day.
- Keep optional_places concise.`;

    const budgetLabels: Record<string, string> = {
      "budget": "Budget-friendly (₹1,500–₹3,000 per day)",
      "mid-range": "Mid-range (₹3,000–₹6,000 per day)",
      "premium": "Premium/Luxury (₹6,000+ per day)",
    };
    const budgetText = budget ? budgetLabels[budget] || budget : "";

    const placesText = selectedPlaces.length > 0
      ? `Use these selected places as the MAIN itinerary: ${selectedPlaces.join(", ")}.`
      : "";

    const remainingText = remainingPlaces.length > 0
      ? `Include these as optional suggestions (not in main itinerary): ${remainingPlaces.join(", ")}.`
      : "";

    const baseUserPrompt = `Plan a ${tripDays}-day trip from ${origin} to ${destination} starting ${startDate} to ${endDate}.
${budgetText ? `Budget level: ${budgetText}` : ""}
${placesText}
${remainingText}
${preferences ? `Preferences: ${preferences}` : ""}

IMPORTANT: The itinerary must START at the destination city (${destination}). Day 1 should begin with: "Take a train/bus from ${origin} and arrive in ${destination}, check in to the hotel" — then start exploring ${destination}. Do NOT include any sightseeing or activities in the origin city (${origin}). The entire itinerary should be about ${destination} only.

Generate a practical day-wise itinerary. Include:
- Daily activities with specific recommendations using the selected places
- Travel flow between places
- Best times to visit each attraction
- Local food recommendations (e.g. Prayagraj: Kachori, Jalebi; Varanasi: Paan, Chaat; Agra: Petha, Mughlai; Ayodhya: Sattvik meals)
- Cost estimate per day
- Transportation tips between places
- An "optional_places" array with a few concise suggestions from the remaining places

Return ONLY valid JSON with no markdown formatting or code blocks.`;

    const firstAttempt = await callAiGateway(LOVABLE_API_KEY, systemPrompt, baseUserPrompt, 0.3);

    let parsedItinerary: ParsedItinerary | null = null;
    let shouldRetry = ["length", "max_tokens", "MAX_TOKENS"].includes(firstAttempt.finishReason);

    try {
      parsedItinerary = parseItineraryJson(firstAttempt.content);
    } catch (error) {
      shouldRetry = true;
      console.error("Initial AI JSON parse failed:", error);
    }

    if (shouldRetry) {
      const retryPrompt = `${baseUserPrompt}

CRITICAL RESPONSE RULES:
- Return ONLY a valid JSON object.
- Keep exactly 3 activities maximum per day.
- Keep each activity under 120 characters.
- Keep tips short.
- Keep optional_places to 6 short items maximum.
- Do not use markdown.
- Do not include quotes inside activity text.`;

      const retryAttempt = await callAiGateway(LOVABLE_API_KEY, systemPrompt, retryPrompt, 0.2);
      parsedItinerary = parseItineraryJson(retryAttempt.content);
    }

    return new Response(JSON.stringify({ itinerary: parsedItinerary }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in generate-itinerary function:", error);

    const status = error instanceof HttpError ? error.status : 500;
    const message = error instanceof Error ? error.message : "Unknown error occurred";

    return new Response(
      JSON.stringify({ error: message }),
      {
        status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
