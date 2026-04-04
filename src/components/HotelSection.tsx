import { Card } from "@/components/ui/card";
import { Hotel as HotelIcon, MapPin, IndianRupee } from "lucide-react";
import { CITY_HOTELS } from "@/data/cityHotels";

interface HotelSectionProps {
  destination: string;
}

export const HotelSection = ({ destination }: HotelSectionProps) => {
  const cityData = CITY_HOTELS.find(
    (c) => c.city.toLowerCase() === destination.toLowerCase()
  );

  if (!cityData) return null;

  return (
    <div className="mt-10 space-y-6">
      <h3 className="text-3xl font-black text-foreground flex items-center gap-3">
        <HotelIcon className="w-8 h-8 text-primary" />
        Hotels in {destination}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cityData.hotels.map((hotel, i) => (
          <Card
            key={i}
            className="p-5 border border-border/50 hover:shadow-md transition-all duration-300 hover:border-primary/30 group"
          >
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                {hotel.name}
              </h4>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                {hotel.area}
              </p>
              <p className="text-base font-semibold text-primary flex items-center gap-1">
                <IndianRupee className="w-4 h-4" />
                {hotel.pricePerNight.toLocaleString("en-IN")}/night
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
