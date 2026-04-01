import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, DollarSign, MapPin, Sparkles } from "lucide-react";
import { UP_CITIES } from "@/data/upCities";

const tripFormSchema = z.object({
  destination: z
    .string()
    .trim()
    .min(1, "Destination is required")
    .max(200, "Destination must be less than 200 characters"),
  startDate: z
    .string()
    .min(1, "Start date is required")
    .refine((date) => !isNaN(Date.parse(date)), "Invalid start date"),
  endDate: z
    .string()
    .min(1, "End date is required")
    .refine((date) => !isNaN(Date.parse(date)), "Invalid end date"),
  budget: z
    .string()
    .max(100, "Budget must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  preferences: z
    .string()
    .max(1000, "Preferences must be less than 1000 characters")
    .optional()
    .or(z.literal("")),
}).refine(
  (data) => {
    if (data.startDate && data.endDate) {
      return new Date(data.endDate) >= new Date(data.startDate);
    }
    return true;
  },
  {
    message: "End date must be after or equal to start date",
    path: ["endDate"],
  }
);

interface TripPlannerFormProps {
  onSubmit: (formData: TripFormData) => void;
  isLoading: boolean;
}

export type TripFormData = z.infer<typeof tripFormSchema>;

export const TripPlannerForm = ({ onSubmit, isLoading }: TripPlannerFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TripFormData>({
    resolver: zodResolver(tripFormSchema),
    defaultValues: {
      destination: "",
      startDate: "",
      endDate: "",
      budget: "",
      preferences: "",
    },
  });

  const onSubmitForm = (data: TripFormData) => {
    onSubmit(data);
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
      
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="destination" className="flex items-center gap-2 text-base font-semibold">
            <MapPin className="w-5 h-5 text-primary" />
            Destination
          </Label>
          <Controller
            name="destination"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="h-12 text-base border-2 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 rounded-xl">
                  <SelectValue placeholder="Select a city in Uttar Pradesh" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {UP_CITIES.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.destination && (
            <p className="text-sm text-destructive">{errors.destination.message}</p>
          )}
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
              {...register("startDate")}
              className="h-12 text-base border-2 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 rounded-xl"
            />
            {errors.startDate && (
              <p className="text-sm text-destructive">{errors.startDate.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="endDate" className="flex items-center gap-2 text-base font-semibold">
              <Calendar className="w-5 h-5 text-primary" />
              End Date
            </Label>
            <Input
              id="endDate"
              type="date"
              {...register("endDate")}
              className="h-12 text-base border-2 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 rounded-xl"
            />
            {errors.endDate && (
              <p className="text-sm text-destructive">{errors.endDate.message}</p>
            )}
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
            {...register("budget")}
            className="h-12 text-base border-2 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 rounded-xl"
          />
          {errors.budget && (
            <p className="text-sm text-destructive">{errors.budget.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <Label htmlFor="preferences" className="text-base font-semibold">
            Preferences & Interests (optional)
          </Label>
          <Textarea
            id="preferences"
            placeholder="e.g., museums, local food, hiking, beaches, photography, nightlife..."
            {...register("preferences")}
            className="min-h-[120px] text-base border-2 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 rounded-xl resize-none"
          />
          {errors.preferences && (
            <p className="text-sm text-destructive">{errors.preferences.message}</p>
          )}
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
