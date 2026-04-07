import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { destination, startDate, endDate, budget, preferences, origin, selectedPlaces, remainingPlaces } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

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
  "tips": ["Tip 1", "Tip 2", "Tip 3"]
}`;

    const budgetLabels: Record<string, string> = {
      "budget": "Budget-friendly (₹1,500–₹3,000 per day)",
      "mid-range": "Mid-range (₹3,000–₹6,000 per day)",
      "premium": "Premium/Luxury (₹6,000+ per day)",
    };
    const budgetText = budget ? budgetLabels[budget] || budget : "";

    const placesText = selectedPlaces && selectedPlaces.length > 0
      ? `Use ONLY these selected places: ${selectedPlaces.join(", ")}.`
      : "";

    const userPrompt = `Plan a ${days}-day trip from ${origin || "origin"} to ${destination} starting ${startDate} to ${endDate}.
${budgetText ? `Budget level: ${budgetText}` : ""}
${placesText}
${preferences ? `Preferences: ${preferences}` : ""}

Generate a practical day-wise itinerary. Include:
- Daily activities with specific recommendations using the selected places
- Travel flow between places
- Best times to visit each attraction
- Local food recommendations (e.g. Prayagraj: Kachori, Jalebi; Varanasi: Paan, Chaat; Agra: Petha, Mughlai; Ayodhya: Sattvik meals)
- Cost estimate per day
- Transportation tips between places

Return ONLY valid JSON with no markdown formatting or code blocks.`;

    console.log("Calling Lovable AI Gateway...");
    
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI response received");
    
    let itinerary = data.choices[0].message.content;
    
    // Clean up markdown code blocks
    itinerary = itinerary.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();

    // Find JSON boundaries
    const jsonStart = itinerary.search(/[\{\[]/);
    const jsonEnd = itinerary.lastIndexOf(jsonStart !== -1 && itinerary[jsonStart] === '[' ? ']' : '}');
    if (jsonStart === -1 || jsonEnd === -1) throw new Error("No JSON found in AI response");
    itinerary = itinerary.substring(jsonStart, jsonEnd + 1);

    // Remove control characters and fix common issues
    itinerary = itinerary
      .replace(/[\x00-\x1F\x7F]/g, " ")  // control chars → space
      .replace(/,\s*}/g, "}")              // trailing commas
      .replace(/,\s*]/g, "]");             // trailing commas

    let parsedItinerary;
    try {
      parsedItinerary = JSON.parse(itinerary);
    } catch {
      // Try repairing unbalanced braces/brackets
      let braces = 0, brackets = 0;
      for (const c of itinerary) {
        if (c === '{') braces++; if (c === '}') braces--;
        if (c === '[') brackets++; if (c === ']') brackets--;
      }
      let repaired = itinerary;
      while (brackets > 0) { repaired += ']'; brackets--; }
      while (braces > 0) { repaired += '}'; braces--; }
      parsedItinerary = JSON.parse(repaired);
    }

    return new Response(JSON.stringify({ itinerary: parsedItinerary }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in generate-itinerary function:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
