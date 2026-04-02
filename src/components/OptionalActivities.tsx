import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Compass, Gem, Route, Mountain } from "lucide-react";
import { CITY_OPTIONAL_ACTIVITIES } from "@/data/optionalActivities";

interface OptionalActivitiesProps {
  destination: string;
}

const typeConfig = {
  "hidden-gem": { icon: Gem, label: "Hidden Gem", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
  alternative: { icon: Route, label: "Alternative", color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
  adventure: { icon: Mountain, label: "Adventure", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
};

export const OptionalActivities = ({ destination }: OptionalActivitiesProps) => {
  const cityData = CITY_OPTIONAL_ACTIVITIES.find(
    (c) => c.city.toLowerCase() === destination.toLowerCase()
  );

  if (!cityData) return null;

  return (
    <div className="mt-10">
      <Accordion type="single" collapsible>
        <AccordionItem value="optional" className="border-2 border-border/30 rounded-2xl overflow-hidden">
          <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-3">
              <Compass className="w-7 h-7 text-primary" />
              <span className="text-2xl font-black text-foreground">
                Optional Activities & Hidden Gems
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-6 pb-6 pt-2 space-y-3">
              <p className="text-muted-foreground mb-4">
                Extra places and activities not in your main itinerary — explore at your own pace!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cityData.activities.map((activity, i) => {
                  const config = typeConfig[activity.type];
                  const Icon = config.icon;
                  return (
                    <div
                      key={i}
                      className="p-4 rounded-xl border border-border/50 hover:shadow-md transition-all duration-300 hover:border-primary/30 group"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg border ${config.color} shrink-0`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">
                            {activity.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {activity.description}
                          </p>
                          <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium border ${config.color}`}>
                            {config.label}
                          </span>
                        </div>
                      </div>
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
