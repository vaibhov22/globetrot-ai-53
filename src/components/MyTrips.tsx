import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Calendar, MapPin, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
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
                className="p-8 bg-[var(--gradient-card)] hover:bg-[var(--gradient-card-hover)] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-xl)] transition-all duration-500 hover:scale-[1.03] border-2 border-border/50 rounded-2xl group animate-fade-in-scale cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedTrip(trip)}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(trip.id);
                    }}
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
                      <p className="text-base font-bold text-foreground mb-3 flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <span className="text-primary">📅</span>
                          {trip.itinerary.days.length} day itinerary
                        </span>
                        <ChevronDown className="w-5 h-5 text-primary group-hover:translate-y-1 transition-transform duration-300" />
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!selectedTrip} onOpenChange={() => setSelectedTrip(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background">
          {selectedTrip && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-3xl font-black">
                  <MapPin className="w-8 h-8 text-primary" />
                  {selectedTrip.destination}
                </DialogTitle>
                <div className="flex items-center gap-2 text-muted-foreground text-lg">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(selectedTrip.start_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - {new Date(selectedTrip.end_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                {selectedTrip.budget && (
                  <div className="mt-2 p-3 bg-primary/5 rounded-lg border border-primary/20 inline-block">
                    <p className="text-base text-muted-foreground">
                      Budget: <span className="font-bold text-foreground text-lg">{selectedTrip.budget}</span>
                    </p>
                  </div>
                )}
              </DialogHeader>

              <div className="mt-6">
                {selectedTrip.itinerary?.days && selectedTrip.itinerary.days.length > 0 ? (
                  <div className="space-y-5">
                    {selectedTrip.itinerary.days.map((day: any, index: number) => (
                      <div 
                        key={index} 
                        className="relative pl-8 py-5 pr-6 rounded-xl border-l-[6px] border-primary bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 hover:to-primary/5 transition-all duration-500"
                      >
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full shadow-lg shadow-primary/50" />
                        <h3 className="text-2xl font-bold text-primary mb-4">
                          Day {day.day}: {day.title}
                        </h3>
                        <ul className="space-y-3">
                          {day.activities.map((activity: string, actIndex: number) => (
                            <li key={actIndex} className="text-foreground text-lg leading-relaxed flex items-start gap-3">
                              <span className="text-primary font-bold mt-1">•</span>
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-foreground whitespace-pre-wrap bg-muted/30 p-6 rounded-xl border border-border">
                    {JSON.stringify(selectedTrip.itinerary, null, 2)}
                  </div>
                )}

                {selectedTrip.itinerary?.tips && (
                  <div className="mt-10 p-8 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl border-2 border-accent/30 shadow-lg">
                    <h3 className="text-2xl font-bold text-accent mb-5 flex items-center gap-2">
                      <span className="text-3xl">💡</span>
                      Travel Tips
                    </h3>
                    <ul className="space-y-4">
                      {selectedTrip.itinerary.tips.map((tip: string, index: number) => (
                        <li key={index} className="text-foreground text-lg leading-relaxed flex items-start gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors duration-300">
                          <span className="text-accent font-bold mt-1">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
