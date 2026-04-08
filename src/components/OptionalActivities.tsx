import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Compass, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { CITY_PLACES } from "@/data/cityPlaces";

interface OptionalActivitiesProps {
  destination: string;
  remainingPlaces?: string[];
  aiOptionalPlaces?: string[];
}

export const OptionalActivities = ({ destination, remainingPlaces, aiOptionalPlaces }: OptionalActivitiesProps) => {
  const [expandedPlace, setExpandedPlace] = useState<string | null>(null);

  const cityData = CITY_PLACES.find(
    (c) => c.city.toLowerCase() === destination.toLowerCase()
  );

  // Merge remaining places + AI suggestions into one unique list
  const allOtherPlaces = new Set<string>();
  remainingPlaces?.forEach((p) => allOtherPlaces.add(p));
  aiOptionalPlaces?.forEach((p) => allOtherPlaces.add(p));

  if (allOtherPlaces.size === 0) return null;

  // Match names to full place data for details
  const placesWithDetails = Array.from(allOtherPlaces).map((name) => {
    const details = cityData?.places.find(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );
    return { name, details };
  });

  return (
    <div className="mt-10">
      <Accordion type="single" collapsible>
        <AccordionItem value="optional" className="border-2 border-border/30 rounded-2xl overflow-hidden">
          <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-3">
              <Compass className="w-7 h-7 text-primary" />
              <span className="text-2xl font-black text-foreground">
                Other Places to Visit
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-6 pb-6 pt-2 space-y-3">
              <p className="text-muted-foreground mb-4">
                More places worth exploring in {destination} — click any to see details!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {placesWithDetails.map(({ name, details }, i) => {
                  const isExpanded = expandedPlace === name;
                  return (
                    <div
                      key={i}
                      onClick={() => setExpandedPlace(isExpanded ? null : name)}
                      className="p-4 rounded-xl border border-border/50 hover:shadow-md transition-all duration-300 hover:border-primary/30 cursor-pointer group"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="p-2 rounded-lg border text-primary bg-primary/10 border-primary/20 shrink-0">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <h4 className="font-bold text-foreground group-hover:text-primary transition-colors truncate">
                            {name}
                          </h4>
                        </div>
                        {details ? (
                          isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                          )
                        ) : null}
                      </div>
                      {isExpanded && details && (
                        <div className="mt-3 pl-11 space-y-2 animate-fade-in">
                          <p className="text-sm text-muted-foreground leading-relaxed">{details.description}</p>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-amber-500 font-semibold">⭐ {details.rating}</span>
                            <span className="capitalize px-2 py-0.5 rounded-full text-xs font-medium border border-border/50 bg-muted/50">
                              {details.category}
                            </span>
                          </div>
                        </div>
                      )}
                      {isExpanded && !details && (
                        <p className="mt-3 pl-11 text-sm text-muted-foreground italic animate-fade-in">
                          {name}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};