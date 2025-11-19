import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Save } from "lucide-react";

interface ItineraryDisplayProps {
  itinerary: any;
  destination: string;
  startDate: string;
  endDate: string;
  onSave: () => void;
  isSaving: boolean;
}

export const ItineraryDisplay = ({ 
  itinerary, 
  destination, 
  startDate, 
  endDate, 
  onSave, 
  isSaving 
}: ItineraryDisplayProps) => {
  return (
    <Card className="p-8 bg-gradient-to-br from-card to-secondary/20 shadow-card animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">{destination}</h2>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}</span>
          </div>
        </div>
        <Button 
          onClick={onSave}
          disabled={isSaving}
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save Trip"}
        </Button>
      </div>

      <div className="prose prose-slate max-w-none">
        {itinerary.days && itinerary.days.length > 0 ? (
          <div className="space-y-6">
            {itinerary.days.map((day: any, index: number) => (
              <div key={index} className="border-l-4 border-primary pl-6 py-2 hover:bg-secondary/30 transition-colors duration-300 rounded-r">
                <h3 className="text-xl font-semibold text-primary mb-3">Day {day.day}: {day.title}</h3>
                <ul className="space-y-2">
                  {day.activities.map((activity: string, actIndex: number) => (
                    <li key={actIndex} className="text-foreground">{activity}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-foreground whitespace-pre-wrap">{JSON.stringify(itinerary, null, 2)}</div>
        )}
      </div>

      {itinerary.tips && (
        <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
          <h3 className="text-lg font-semibold text-primary mb-3">Travel Tips</h3>
          <ul className="space-y-2">
            {itinerary.tips.map((tip: string, index: number) => (
              <li key={index} className="text-foreground">{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};
