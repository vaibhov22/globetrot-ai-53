import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Calendar, MapPin, Trash2 } from "lucide-react";

interface Trip {
  id: string;
  destination: string;
  start_date: string;
  end_date: string;
  budget: string;
  itinerary: any;
  created_at: string;
}

interface MyTripsProps {
  onBack: () => void;
}

export const MyTrips = ({ onBack }: MyTripsProps) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const { data, error } = await supabase
        .from("trips")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTrips(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("trips").delete().eq("id", id);
      if (error) throw error;
      
      toast({
        title: "Trip deleted",
        description: "Your trip has been removed.",
      });
      fetchTrips();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary mx-auto" />
              <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl animate-pulse" />
            </div>
            <p className="mt-6 text-muted-foreground text-xl font-medium animate-pulse">Loading your trips...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-6">
        <div className="mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent mb-2">My Trips</h1>
            <p className="text-muted-foreground text-lg">Your travel adventures, saved and ready to explore</p>
          </div>
          <Button 
            onClick={onBack} 
            variant="outline"
            className="border-2 hover:bg-secondary/80 font-semibold px-6 py-6 text-base rounded-xl transition-all duration-300 hover:scale-105"
          >
            Back to Home
          </Button>
        </div>

        {trips.length === 0 ? (
          <Card className="p-16 text-center bg-[var(--gradient-card)] shadow-[var(--shadow-lg)] rounded-2xl border-2 border-border/50">
            <div className="mb-6 text-6xl">✈️</div>
            <p className="text-2xl text-muted-foreground font-medium mb-6">
              You haven't planned any trips yet.
            </p>
            <Button 
              onClick={onBack} 
              className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-primary-foreground font-bold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Plan Your First Trip
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map((trip, index) => (
              <Card
                key={trip.id}
                className="p-8 bg-[var(--gradient-card)] hover:bg-[var(--gradient-card-hover)] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-xl)] transition-all duration-500 hover:scale-[1.03] border-2 border-border/50 rounded-2xl group animate-fade-in-scale"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="relative">
                      <MapPin className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <h3 className="text-2xl font-black text-foreground group-hover:text-primary transition-colors duration-300">
                      {trip.destination}
                    </h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(trip.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-300 hover:scale-110"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground mb-5 text-base">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">
                    {new Date(trip.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(trip.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                {trip.budget && (
                  <div className="mb-5 p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-base text-muted-foreground">
                      Budget: <span className="font-bold text-foreground text-lg">{trip.budget}</span>
                    </p>
                  </div>
                )}

                <div className="text-sm text-foreground">
                  {trip.itinerary?.days && (
                    <div className="mt-6 pt-6 border-t-2 border-border/30">
                      <p className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                        <span className="text-primary">📅</span>
                        {trip.itinerary.days.length} day itinerary
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
