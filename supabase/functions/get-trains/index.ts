import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TransportRoute {
  from: string;
  to: string;
  trainName?: string;
  trainNumber?: string;
  duration: string;
  frequency: string;
  type: "train" | "bus";
  fare: string;
}

const TRANSPORT_ROUTES: TransportRoute[] = [
  // Train Routes
  { from: "Lucknow", to: "Varanasi", trainName: "Lucknow Mail", trainNumber: "14235", duration: "5h 30m", frequency: "Daily", type: "train", fare: "₹250–₹1200" },
  { from: "Lucknow", to: "Agra", trainName: "Lucknow Agra Express", trainNumber: "14853", duration: "5h 45m", frequency: "Daily", type: "train", fare: "₹200–₹1000" },
  { from: "Lucknow", to: "Kanpur Nagar", trainName: "Shatabdi Express", trainNumber: "12003", duration: "1h 15m", frequency: "Daily", type: "train", fare: "₹150–₹800" },
  { from: "Lucknow", to: "Gorakhpur", trainName: "Gorakhdham Express", trainNumber: "12555", duration: "5h 30m", frequency: "Daily", type: "train", fare: "₹250–₹1100" },
  { from: "Lucknow", to: "Allahabad (Prayagraj)", trainName: "Prayagraj Express", trainNumber: "12417", duration: "3h 30m", frequency: "Daily", type: "train", fare: "₹200–₹900" },
  { from: "Lucknow", to: "Prayagraj", trainName: "Prayagraj Express", trainNumber: "12417", duration: "3h 30m", frequency: "Daily", type: "train", fare: "₹200–₹900" },
  { from: "Lucknow", to: "Bareilly", trainName: "Lucknow Bareilly Express", trainNumber: "15909", duration: "4h 30m", frequency: "Daily", type: "train", fare: "₹200–₹850" },
  { from: "Lucknow", to: "Jhansi", trainName: "Pushpak Express", trainNumber: "12533", duration: "5h", frequency: "Daily", type: "train", fare: "₹250–₹1100" },
  { from: "Lucknow", to: "Meerut", trainName: "Lucknow Meerut Express", trainNumber: "14117", duration: "7h", frequency: "Daily", type: "train", fare: "₹300–₹1200" },
  { from: "Agra", to: "Mathura", trainName: "EMU Local", trainNumber: "64181", duration: "1h", frequency: "Multiple daily", type: "train", fare: "₹30–₹150" },
  { from: "Agra", to: "Jhansi", trainName: "Bhopal Shatabdi", trainNumber: "12001", duration: "2h", frequency: "Daily", type: "train", fare: "₹400–₹1200" },
  { from: "Agra", to: "Lucknow", trainName: "Agra Lucknow Express", trainNumber: "14854", duration: "5h 45m", frequency: "Daily", type: "train", fare: "₹200–₹1000" },
  { from: "Agra", to: "Varanasi", trainName: "Marudhar Express", trainNumber: "14863", duration: "10h", frequency: "Daily", type: "train", fare: "₹350–₹1500" },
  { from: "Agra", to: "Prayagraj", trainName: "Chambal Express", trainNumber: "14869", duration: "8h", frequency: "Daily", type: "train", fare: "₹300–₹1200" },
  { from: "Varanasi", to: "Allahabad (Prayagraj)", trainName: "Vande Bharat Express", trainNumber: "22436", duration: "2h", frequency: "Daily", type: "train", fare: "₹400–₹1500" },
  { from: "Varanasi", to: "Prayagraj", trainName: "Vande Bharat Express", trainNumber: "22436", duration: "2h", frequency: "Daily", type: "train", fare: "₹400–₹1500" },
  { from: "Varanasi", to: "Gorakhpur", trainName: "Intercity Express", trainNumber: "15017", duration: "4h 30m", frequency: "Daily", type: "train", fare: "₹200–₹800" },
  { from: "Varanasi", to: "Lucknow", trainName: "Lucknow Mail", trainNumber: "14236", duration: "5h 30m", frequency: "Daily", type: "train", fare: "₹250–₹1200" },
  { from: "Varanasi", to: "Agra", trainName: "Marudhar Express", trainNumber: "14864", duration: "10h", frequency: "Daily", type: "train", fare: "₹350–₹1500" },
  { from: "Varanasi", to: "Jaunpur", trainName: "Passenger", trainNumber: "54252", duration: "1h 30m", frequency: "Multiple daily", type: "train", fare: "₹40–₹200" },
  { from: "Prayagraj", to: "Varanasi", trainName: "Vande Bharat Express", trainNumber: "22435", duration: "2h", frequency: "Daily", type: "train", fare: "₹400–₹1500" },
  { from: "Prayagraj", to: "Lucknow", trainName: "Prayagraj Express", trainNumber: "12418", duration: "3h 30m", frequency: "Daily", type: "train", fare: "₹200–₹900" },
  { from: "Prayagraj", to: "Agra", trainName: "Chambal Express", trainNumber: "14870", duration: "8h", frequency: "Daily", type: "train", fare: "₹300–₹1200" },
  { from: "Prayagraj", to: "Mirzapur", trainName: "Passenger", trainNumber: "54112", duration: "1h 30m", frequency: "Daily", type: "train", fare: "₹40–₹200" },
  { from: "Kanpur Nagar", to: "Allahabad (Prayagraj)", trainName: "Sangam Express", trainNumber: "14863", duration: "4h", frequency: "Daily", type: "train", fare: "₹180–₹800" },
  { from: "Gorakhpur", to: "Ayodhya", trainName: "Saket Express", trainNumber: "14235", duration: "3h", frequency: "Daily", type: "train", fare: "₹150–₹600" },
  { from: "Meerut", to: "Ghaziabad", trainName: "DEMU", trainNumber: "74043", duration: "45m", frequency: "Multiple daily", type: "train", fare: "₹25–₹100" },
  { from: "Agra", to: "Firozabad", trainName: "Passenger", trainNumber: "54461", duration: "1h 15m", frequency: "Daily", type: "train", fare: "₹30–₹150" },
  { from: "Moradabad", to: "Bareilly", trainName: "Intercity", trainNumber: "15011", duration: "1h 30m", frequency: "Daily", type: "train", fare: "₹60–₹300" },
  { from: "Saharanpur", to: "Meerut", trainName: "Janata Express", trainNumber: "19031", duration: "2h 30m", frequency: "Daily", type: "train", fare: "₹100–₹450" },
  { from: "Allahabad (Prayagraj)", to: "Mirzapur", trainName: "Passenger", trainNumber: "54112", duration: "1h 30m", frequency: "Daily", type: "train", fare: "₹40–₹200" },

  // Bus Routes
  { from: "Lucknow", to: "Varanasi", duration: "6h", frequency: "Every 30 min", type: "bus", fare: "₹400–₹900" },
  { from: "Lucknow", to: "Agra", duration: "6h", frequency: "Every hour", type: "bus", fare: "₹350–₹800" },
  { from: "Lucknow", to: "Prayagraj", duration: "4h", frequency: "Every 30 min", type: "bus", fare: "₹300–₹700" },
  { from: "Lucknow", to: "Kanpur Nagar", duration: "1h 30m", frequency: "Every 15 min", type: "bus", fare: "₹150–₹350" },
  { from: "Lucknow", to: "Gorakhpur", duration: "6h", frequency: "Every hour", type: "bus", fare: "₹400–₹850" },
  { from: "Lucknow", to: "Allahabad (Prayagraj)", duration: "4h", frequency: "Every 30 min", type: "bus", fare: "₹300–₹700" },
  { from: "Lucknow", to: "Ayodhya", duration: "3h", frequency: "Every hour", type: "bus", fare: "₹200–₹500" },
  { from: "Agra", to: "Lucknow", duration: "6h", frequency: "Every hour", type: "bus", fare: "₹350–₹800" },
  { from: "Agra", to: "Varanasi", duration: "10h", frequency: "Every 2 hours", type: "bus", fare: "₹500–₹1200" },
  { from: "Agra", to: "Prayagraj", duration: "8h", frequency: "Every 2 hours", type: "bus", fare: "₹400–₹900" },
  { from: "Agra", to: "Mathura", duration: "1h 15m", frequency: "Every 20 min", type: "bus", fare: "₹50–₹150" },
  { from: "Varanasi", to: "Lucknow", duration: "6h", frequency: "Every 30 min", type: "bus", fare: "₹400–₹900" },
  { from: "Varanasi", to: "Agra", duration: "10h", frequency: "Every 2 hours", type: "bus", fare: "₹500–₹1200" },
  { from: "Varanasi", to: "Prayagraj", duration: "3h", frequency: "Every hour", type: "bus", fare: "₹250–₹600" },
  { from: "Varanasi", to: "Allahabad (Prayagraj)", duration: "3h", frequency: "Every hour", type: "bus", fare: "₹250–₹600" },
  { from: "Varanasi", to: "Gorakhpur", duration: "5h 30m", frequency: "Every hour", type: "bus", fare: "₹350–₹750" },
  { from: "Prayagraj", to: "Varanasi", duration: "3h", frequency: "Every hour", type: "bus", fare: "₹250–₹600" },
  { from: "Prayagraj", to: "Lucknow", duration: "4h", frequency: "Every 30 min", type: "bus", fare: "₹300–₹700" },
  { from: "Prayagraj", to: "Agra", duration: "8h", frequency: "Every 2 hours", type: "bus", fare: "₹400–₹900" },
  { from: "Prayagraj", to: "Chitrakoot", duration: "4h", frequency: "Every 2 hours", type: "bus", fare: "₹250–₹550" },
  { from: "Gorakhpur", to: "Ayodhya", duration: "3h 30m", frequency: "Every hour", type: "bus", fare: "₹200–₹500" },
  { from: "Gorakhpur", to: "Kushinagar", duration: "1h 30m", frequency: "Every 30 min", type: "bus", fare: "₹60–₹180" },
  { from: "Gautam Buddha Nagar (Noida)", to: "Agra", duration: "3h 30m", frequency: "Every hour", type: "bus", fare: "₹300–₹700" },
];

function matchCity(routeCity: string, queryCity: string): boolean {
  const a = routeCity.toLowerCase();
  const b = queryCity.toLowerCase();
  if (a === b) return true;
  // Handle Prayagraj / Allahabad aliases
  if ((a.includes("prayagraj") || a.includes("allahabad")) && (b.includes("prayagraj") || b.includes("allahabad"))) return true;
  return false;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const from = url.searchParams.get("from") || "";
    const to = url.searchParams.get("to") || "";
    const date = url.searchParams.get("date") || "";

    if (!from || !to) {
      return new Response(
        JSON.stringify({ error: "Missing 'from' and 'to' query parameters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const routes = TRANSPORT_ROUTES.filter(
      (r) =>
        (matchCity(r.from, from) && matchCity(r.to, to)) ||
        (matchCity(r.from, to) && matchCity(r.to, from))
    );

    const trains = routes.filter((r) => r.type === "train").map((r) => ({
      ...r,
      date: date || null,
    }));

    const buses = routes.filter((r) => r.type === "bus").map((r) => ({
      ...r,
      date: date || null,
    }));

    return new Response(
      JSON.stringify({ trains, buses, from, to, date }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in get-trains function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
