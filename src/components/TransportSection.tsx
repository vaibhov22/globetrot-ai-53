import { useState, useEffect } from "react";
import { Train, Bus, Clock, IndianRupee, Calendar, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface TransportRoute {
  from: string;
  to: string;
  trainName?: string;
  trainNumber?: string;
  duration: string;
  frequency: string;
  type: "train" | "bus";
  fare: string;
  date: string | null;
}

interface TransportSectionProps {
  origin: string;
  destination: string;
  startDate: string;
}

export const TransportSection = ({ origin, destination, startDate }: TransportSectionProps) => {
  const [trains, setTrains] = useState<TransportRoute[]>([]);
  const [buses, setBuses] = useState<TransportRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransport = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: fnError } = await supabase.functions.invoke("get-trains", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          body: null,
        });

        // supabase.functions.invoke doesn't support query params for GET well,
        // so we use a direct fetch instead
        const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

        const url = `${supabaseUrl}/functions/v1/get-trains?from=${encodeURIComponent(origin)}&to=${encodeURIComponent(destination)}&date=${encodeURIComponent(startDate)}`;
        
        const res = await fetch(url, {
          headers: {
            "apikey": anonKey,
            "Authorization": `Bearer ${anonKey}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch transport data (${res.status})`);
        }

        const result = await res.json();
        setTrains(result.trains || []);
        setBuses(result.buses || []);
      } catch (err: any) {
        console.error("Transport fetch error:", err);
        setError(err.message || "Failed to load transport information");
      } finally {
        setLoading(false);
      }
    };

    if (origin && destination) {
      fetchTransport();
    }
  }, [origin, destination, startDate]);

  if (loading) {
    return (
      <div className="mt-10 p-8 rounded-2xl border-2 border-border/30 flex items-center justify-center gap-3">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
        <span className="text-muted-foreground text-lg">Loading transport options...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 p-6 rounded-2xl border-2 border-destructive/30 bg-destructive/5 flex items-center gap-3">
        <AlertCircle className="w-6 h-6 text-destructive" />
        <span className="text-destructive text-lg">{error}</span>
      </div>
    );
  }

  if (trains.length === 0 && buses.length === 0) return null;

  return (
    <div className="mt-10 space-y-6">
      <h3 className="text-3xl font-black text-foreground flex items-center gap-3">
        <Train className="w-8 h-8 text-primary" />
        Transport: {origin} ↔ {destination}
      </h3>

      {trains.length > 0 && (
        <div className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border-2 border-primary/20">
          <h4 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            <Train className="w-5 h-5" /> Trains
          </h4>
          <div className="space-y-3">
            {trains.map((route, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 bg-card rounded-xl border border-border/50 hover:shadow-md transition-all">
                <div>
                  <p className="font-bold text-foreground">{route.trainName} <span className="text-muted-foreground text-sm">#{route.trainNumber}</span></p>
                  <p className="text-sm text-muted-foreground">{route.from} → {route.to}</p>
                  {route.date && (
                    <p className="text-xs text-primary font-medium mt-1">
                      <Calendar className="w-3 h-3 inline mr-1" />
                      {new Date(route.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground"><Clock className="w-4 h-4" />{route.duration}</span>
                  <span className="flex items-center gap-1 text-muted-foreground"><IndianRupee className="w-4 h-4" />{route.fare}</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">{route.frequency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {buses.length > 0 && (
        <div className="p-6 bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl border-2 border-accent/20">
          <h4 className="text-xl font-bold text-accent mb-4 flex items-center gap-2">
            <Bus className="w-5 h-5" /> Buses
          </h4>
          <div className="space-y-3">
            {buses.map((route, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 bg-card rounded-xl border border-border/50 hover:shadow-md transition-all">
                <div>
                  <p className="font-bold text-foreground">{route.from} → {route.to}</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground"><Clock className="w-4 h-4" />{route.duration}</span>
                  <span className="flex items-center gap-1 text-muted-foreground"><IndianRupee className="w-4 h-4" />{route.fare}</span>
                  <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full font-medium">{route.frequency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
