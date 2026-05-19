import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Place } from "@/data/cityPlaces";
import { ArrowLeft, CalendarDays, Sparkles, MapPin } from "lucide-react";

export type DayAssignmentMap = Record<string, number>; // placeName -> day number

interface DayAssignmentProps {
  destination: string;
  selectedPlaces: Place[];
  startDate: string;
  endDate: string;
  onConfirm: (assignments: { day: number; places: string[] }[]) => void;
  onBack: () => void;
  isLoading: boolean;
}

export const DayAssignment = ({
  destination,
  selectedPlaces,
  startDate,
  endDate,
  onConfirm,
  onBack,
  isLoading,
}: DayAssignmentProps) => {
  const totalDays = useMemo(() => {
    const s = new Date(startDate);
    const e = new Date(endDate);
    return Math.max(1, Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1);
  }, [startDate, endDate]);

  const dayNumbers = useMemo(() => Array.from({ length: totalDays }, (_, i) => i + 1), [totalDays]);

  // Auto-distribute initially: round-robin across days
  const [assignments, setAssignments] = useState<DayAssignmentMap>(() => {
    const map: DayAssignmentMap = {};
    selectedPlaces.forEach((p, idx) => {
      map[p.name] = (idx % totalDays) + 1;
    });
    return map;
  });

  const setDay = (placeName: string, day: number) => {
    setAssignments((prev) => ({ ...prev, [placeName]: day }));
  };

  const groupedByDay = useMemo(() => {
    return dayNumbers.map((day) => ({
      day,
      places: selectedPlaces.filter((p) => assignments[p.name] === day).map((p) => p.name),
    }));
  }, [dayNumbers, selectedPlaces, assignments]);

  const handleConfirm = () => {
    onConfirm(groupedByDay);
  };

  return (
    <Card className="p-8 bg-[var(--gradient-card)] shadow-[var(--shadow-lg)] border-2 border-border/50 rounded-2xl animate-fade-in-scale backdrop-blur-sm">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-2 -ml-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to places
        </Button>
        <h2 className="text-3xl font-black text-foreground flex items-center gap-3">
          <CalendarDays className="w-7 h-7 text-primary" />
          Assign Places to Days
        </h2>
        <p className="text-muted-foreground mt-1">
          Pick which day to visit each place in {destination}. We've auto-distributed them — adjust as you like.
        </p>
      </div>

      <div className="space-y-3 mb-6">
        {selectedPlaces.map((place) => (
          <div
            key={place.id}
            className="flex items-center justify-between gap-4 p-4 rounded-xl border-2 border-border/50 bg-card hover:border-primary/30 transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <div className="min-w-0">
                <p className="font-semibold text-foreground truncate">{place.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{place.category}</p>
              </div>
            </div>
            <Select
              value={String(assignments[place.name] ?? 1)}
              onValueChange={(val) => setDay(place.name, Number(val))}
            >
              <SelectTrigger className="w-32 rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dayNumbers.map((d) => (
                  <SelectItem key={d} value={String(d)}>
                    Day {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>

      <div className="mb-8 p-5 rounded-xl bg-primary/5 border-2 border-primary/20">
        <h3 className="font-bold text-foreground mb-3">Preview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {groupedByDay.map(({ day, places }) => (
            <div key={day} className="p-3 rounded-lg bg-card border border-border/50">
              <p className="font-semibold text-primary mb-1">Day {day}</p>
              {places.length === 0 ? (
                <p className="text-xs text-muted-foreground italic">No places assigned</p>
              ) : (
                <div className="flex flex-wrap gap-1">
                  {places.map((p) => (
                    <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Button
        onClick={handleConfirm}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-primary-foreground text-xl font-bold py-7 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] disabled:opacity-50"
      >
        {isLoading ? (
          <div className="flex items-center gap-3 justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-3 border-primary-foreground" />
            <span className="animate-pulse">Generating your itinerary...</span>
          </div>
        ) : (
          <div className="flex items-center gap-3 justify-center">
            <Sparkles className="w-6 h-6" />
            Generate Itinerary
          </div>
        )}
      </Button>
    </Card>
  );
};
