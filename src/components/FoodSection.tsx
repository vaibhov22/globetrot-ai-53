import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, Leaf, Drumstick, MapPin } from "lucide-react";
import { CITY_FOOD_DATA, FoodItem } from "@/data/cityFoodData";

interface FoodSectionProps {
  destination: string;
}

export const FoodSection = ({ destination }: FoodSectionProps) => {
  const [filter, setFilter] = useState<"all" | "veg" | "non-veg">("all");

  const cityData = CITY_FOOD_DATA.find(
    (c) => c.city.toLowerCase() === destination.toLowerCase()
  );

  if (!cityData) return null;

  const filtered =
    filter === "all"
      ? cityData.items
      : cityData.items.filter((i) => i.type === filter);

  return (
    <div className="mt-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-3xl font-black text-foreground flex items-center gap-3">
          <UtensilsCrossed className="w-8 h-8 text-primary" />
          Famous Food in {destination}
        </h3>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className="rounded-full font-semibold"
          >
            All
          </Button>
          <Button
            size="sm"
            variant={filter === "veg" ? "default" : "outline"}
            onClick={() => setFilter("veg")}
            className="rounded-full font-semibold gap-1"
          >
            <Leaf className="w-4 h-4" /> Veg
          </Button>
          <Button
            size="sm"
            variant={filter === "non-veg" ? "default" : "outline"}
            onClick={() => setFilter("non-veg")}
            className="rounded-full font-semibold gap-1"
          >
            <Drumstick className="w-4 h-4" /> Non-Veg
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item, i) => (
          <FoodCard key={i} item={item} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          No {filter} food items found for this city.
        </p>
      )}
    </div>
  );
};

const FoodCard = ({ item }: { item: FoodItem }) => (
  <Card className="p-5 border border-border/50 hover:shadow-md transition-all duration-300 hover:border-primary/30 group">
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 space-y-1.5">
        <div className="flex items-center gap-2">
          <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {item.dish}
          </h4>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              item.type === "veg"
                ? "bg-green-500/10 text-green-600 border border-green-500/20"
                : "bg-red-500/10 text-red-600 border border-red-500/20"
            }`}
          >
            {item.type === "veg" ? "🟢 Veg" : "🔴 Non-Veg"}
          </span>
        </div>
        <p className="text-sm font-semibold text-primary/80">{item.place}</p>
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          {item.address}
        </p>
        {item.description && (
          <p className="text-sm text-muted-foreground/80 italic">
            {item.description}
          </p>
        )}
      </div>
    </div>
  </Card>
);
