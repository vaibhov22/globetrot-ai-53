import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Calendar, DollarSign, MapPin, Sparkles } from "lucide-react";

interface TripPlannerFormProps {
  onSubmit: (formData: TripFormData) => void;
  isLoading: boolean;
}

export interface TripFormData {
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  preferences: string;
}

export const TripPlannerForm = ({ onSubmit, isLoading }: TripPlannerFormProps) => {
  const [formData, setFormData] = useState<TripFormData>({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    preferences: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="p-10 bg-[var(--gradient-card)] shadow-[var(--shadow-lg)] hover:shadow-[var(--shadow-xl)] transition-all duration-500 border-2 border-border/50 rounded-2xl backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="relative">
          <Sparkles className="w-8 h-8 text-primary animate-pulse-glow" />
          <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full" />
        </div>
        <h2 className="text-4xl font-black text-foreground">Plan Your Trip</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="destination" className="flex items-center gap-2 text-base font-semibold">
            <MapPin className="w-5 h-5 text-primary" />
            Destination
          </Label>
          <Input
            id="destination"
            placeholder="e.g., Paris, France"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            required
            className="h-12 text-base border-2 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 rounded-xl"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="startDate" className="flex items-center gap-2 text-base font-semibold">
              <Calendar className="w-5 h-5 text-primary" />
              Start Date
            </Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
              className="h-12 text-base border-2 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 rounded-xl"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="endDate" className="flex items-center gap-2 text-base font-semibold">
              <Calendar className="w-5 h-5 text-primary" />
              End Date
            </Label>
            <Input
              id="endDate"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              required
              className="h-12 text-base border-2 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="budget" className="flex items-center gap-2 text-base font-semibold">
            <DollarSign className="w-5 h-5 text-primary" />
            Budget (optional)
          </Label>
          <Input
            id="budget"
            placeholder="e.g., $2000"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="h-12 text-base border-2 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 rounded-xl"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="preferences" className="text-base font-semibold">
            Preferences & Interests (optional)
          </Label>
          <Textarea
            id="preferences"
            placeholder="e.g., museums, local food, hiking, beaches, photography, nightlife..."
            value={formData.preferences}
            onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
            className="min-h-[120px] text-base border-2 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 rounded-xl resize-none"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-primary-foreground text-xl font-bold py-7 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
        >
          {isLoading ? (
            <div className="flex items-center gap-3 justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-3 border-primary-foreground" />
              <span className="animate-pulse">Generating your itinerary...</span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 justify-center relative z-10">
                <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                Generate Itinerary
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-glow to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};
