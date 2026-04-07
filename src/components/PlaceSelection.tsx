import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CITY_PLACES, Place } from "@/data/cityPlaces";
import { MapPin, Star, Sparkles, ArrowLeft, CheckSquare } from "lucide-react";

interface PlaceSelectionProps {
  destination: string;
  onConfirm: (selectedPlaces: Place[]) => void;
  onBack: () => void;
  isLoading: boolean;
}

const categoryColors: Record<string, string> = {
  historical: "bg-amber-100 text-amber-800 border-amber-300",
  religious: "bg-orange-100 text-orange-800 border-orange-300",
  nature: "bg-emerald-100 text-emerald-800 border-emerald-300",
  cultural: "bg-violet-100 text-violet-800 border-violet-300",
  market: "bg-rose-100 text-rose-800 border-rose-300",
  food: "bg-red-100 text-red-800 border-red-300",
};

export const PlaceSelection = ({ destination, onConfirm, onBack, isLoading }: PlaceSelectionProps) => {
  const cityData = CITY_PLACES.find(
    (c) => c.city.toLowerCase() === destination.toLowerCase()
  );
  const places = cityData?.places ?? [];
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selected.size === places.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(places.map((p) => p.id)));
    }
  };

  const handleConfirm = () => {
    const selectedPlaces = places.filter((p) => selected.has(p.id));
    onConfirm(selectedPlaces);
  };

  return (
    <Card className="p-8 bg-[var(--gradient-card)] shadow-[var(--shadow-lg)] border-2 border-border/50 rounded-2xl animate-fade-in-scale backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <Button variant="ghost" onClick={onBack} className="mb-2 -ml-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to form
          </Button>
          <h2 className="text-3xl font-black text-foreground flex items-center gap-3">
            <MapPin className="w-7 h-7 text-primary" />
            Select Places in {destination}
          </h2>
          <p className="text-muted-foreground mt-1">
            Choose the places you want to visit. AI will build your itinerary around them.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={selectAll} className="rounded-xl">
            <CheckSquare className="w-4 h-4 mr-1" />
            {selected.size === places.length ? "Deselect All" : "Select All"}
          </Button>
          <Badge variant="secondary" className="text-base px-4 py-1">
            {selected.size} / {places.length} selected
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {places.map((place) => {
          const isSelected = selected.has(place.id);
          return (
            <div
              key={place.id}
              onClick={() => toggle(place.id)}
              className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border/50 bg-card hover:border-primary/30"
              }`}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => toggle(place.id)}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-bold text-foreground text-lg">{place.name}</h3>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-semibold">{place.rating}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{place.description}</p>
                  <Badge
                    variant="outline"
                    className={`mt-2 text-xs capitalize ${categoryColors[place.category] || ""}`}
                  >
                    {place.category}
                  </Badge>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {places.length === 0 && (
        <p className="text-center text-muted-foreground py-12 text-lg">
          No curated places available for {destination} yet.
        </p>
      )}

      <Button
        onClick={handleConfirm}
        disabled={selected.size === 0 || isLoading}
        className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-primary-foreground text-xl font-bold py-7 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] disabled:opacity-50 relative overflow-hidden group"
      >
        {isLoading ? (
          <div className="flex items-center gap-3 justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-3 border-primary-foreground" />
            <span className="animate-pulse">Generating your itinerary...</span>
          </div>
        ) : (
          <div className="flex items-center gap-3 justify-center relative z-10">
            <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            Generate Itinerary with {selected.size} Places
          </div>
        )}
      </Button>
    </Card>
  );
};
