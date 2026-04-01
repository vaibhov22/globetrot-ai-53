import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Save, Train, Bus, ArrowRight, Clock, IndianRupee } from "lucide-react";
import { TRANSPORT_ROUTES } from "@/data/upCities";

interface ItineraryDisplayProps {
  itinerary: any;
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  onSave: () => void;
  isSaving: boolean;
}

export const ItineraryDisplay = ({ 
  itinerary, 
  origin,
  destination, 
  startDate, 
  endDate, 
  onSave, 
  isSaving 
}: ItineraryDisplayProps) => {
  const routes = TRANSPORT_ROUTES.filter(
    (r) =>
      (r.from.toLowerCase() === origin.toLowerCase() && r.to.toLowerCase() === destination.toLowerCase()) ||
      (r.from.toLowerCase() === destination.toLowerCase() && r.to.toLowerCase() === origin.toLowerCase())
  );

  const trainRoutes = routes.filter((r) => r.type === "train");
  const busRoutes = routes.filter((r) => r.type === "bus");

  return (
    <Card className="p-10 bg-[var(--gradient-card)] shadow-[var(--shadow-xl)] border-2 border-border/50 rounded-2xl animate-fade-in-scale backdrop-blur-sm">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pb-6 border-b-2 border-border/30">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <div className="relative">
              <MapPin className="w-7 h-7 text-primary" />
              <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">{origin}</h2>
            <ArrowRight className="w-7 h-7 text-muted-foreground" />
            <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">{destination}</h2>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-lg ml-10">
            <Calendar className="w-5 h-5" />
            <span className="font-medium">{new Date(startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - {new Date(endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
        <Button 
          onClick={onSave}
          disabled={isSaving}
          className="bg-gradient-to-r from-success to-success/80 hover:from-success/90 hover:to-success text-success-foreground font-bold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
        >
          <Save className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
          {isSaving ? "Saving..." : "Save Trip"}
        </Button>
      </div>

      <div className="prose prose-slate max-w-none">
        {itinerary.days && itinerary.days.length > 0 ? (
          <div className="space-y-5">
            {itinerary.days.map((day: any, index: number) => (
              <div 
                key={index} 
                className="relative pl-8 py-5 pr-6 rounded-xl border-l-[6px] border-primary bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 hover:to-primary/5 transition-all duration-500 hover:shadow-md group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full shadow-lg shadow-primary/50 group-hover:scale-125 transition-transform duration-300" />
                <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-primary-dark transition-colors duration-300">
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
          <div className="text-foreground whitespace-pre-wrap bg-muted/30 p-6 rounded-xl border border-border">{JSON.stringify(itinerary, null, 2)}</div>
        )}
      </div>

      {itinerary.tips && (
        <div className="mt-10 p-8 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl border-2 border-accent/30 shadow-lg">
          <h3 className="text-2xl font-bold text-accent mb-5 flex items-center gap-2">
            <span className="text-3xl">💡</span>
            Travel Tips
          </h3>
          <ul className="space-y-4">
            {itinerary.tips.map((tip: string, index: number) => (
              <li key={index} className="text-foreground text-lg leading-relaxed flex items-start gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors duration-300">
                <span className="text-accent font-bold mt-1">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Transport Routes Section */}
      {routes.length > 0 && (
        <div className="mt-10 space-y-6">
          <h3 className="text-3xl font-black text-foreground flex items-center gap-3">
            <Train className="w-8 h-8 text-primary" />
            Transport: {origin} ↔ {destination}
          </h3>

          {trainRoutes.length > 0 && (
            <div className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border-2 border-primary/20">
              <h4 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <Train className="w-5 h-5" /> Trains
              </h4>
              <div className="space-y-3">
                {trainRoutes.map((route, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 bg-card rounded-xl border border-border/50 hover:shadow-md transition-all">
                    <div>
                      <p className="font-bold text-foreground">{route.trainName} <span className="text-muted-foreground text-sm">#{route.trainNumber}</span></p>
                      <p className="text-sm text-muted-foreground">{route.from} → {route.to}</p>
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

          {busRoutes.length > 0 && (
            <div className="p-6 bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl border-2 border-accent/20">
              <h4 className="text-xl font-bold text-accent mb-4 flex items-center gap-2">
                <Bus className="w-5 h-5" /> Buses
              </h4>
              <div className="space-y-3">
                {busRoutes.map((route, i) => (
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
      )}
    </Card>
  );
};
