import { useState, useEffect, useRef } from "react";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { TripPlannerForm, TripFormData } from "@/components/TripPlannerForm";
import { PlaceSelection } from "@/components/PlaceSelection";
import { ItineraryDisplay } from "@/components/ItineraryDisplay";
import { AuthForm } from "@/components/AuthForm";
import { MyTrips } from "@/components/MyTrips";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Place } from "@/data/cityPlaces";

type View = "home" | "auth" | "mytrips";
type Step = "form" | "places" | "itinerary";

const Index = () => {
  const [view, setView] = useState<View>("home");
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [step, setStep] = useState<Step>("form");
  const [itinerary, setItinerary] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentTripData, setCurrentTripData] = useState<TripFormData | null>(null);
  const [remainingPlaceNames, setRemainingPlaceNames] = useState<string[]>([]);
  const { toast } = useToast();
  const plannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
  };

  const handleGetStarted = () => {
    plannerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFormSubmit = (formData: TripFormData) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to generate itineraries.",
      });
      setView("auth");
      return;
    }
    setCurrentTripData(formData);
    setItinerary(null);
    setStep("places");
    setTimeout(() => plannerRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const handlePlacesConfirm = async (selectedPlaces: Place[]) => {
    if (!currentTripData) return;

    setIsGenerating(true);

    const cityData = (await import("@/data/cityPlaces")).CITY_PLACES.find(
      (c) => c.city.toLowerCase() === currentTripData.destination.toLowerCase()
    );
    const allPlaceNames = cityData?.places.map((p) => p.name) ?? [];
    const selectedNames = selectedPlaces.map((p) => p.name);
    const remainingPlaces = allPlaceNames.filter((n) => !selectedNames.includes(n));

    try {
      const { data, error } = await supabase.functions.invoke("generate-itinerary", {
        body: {
          destination: currentTripData.destination,
          startDate: currentTripData.startDate,
          endDate: currentTripData.endDate,
          budget: currentTripData.budget,
          preferences: currentTripData.preferences,
          origin: currentTripData.origin,
          selectedPlaces: selectedNames,
          remainingPlaces,
        },
      });

      if (error) throw error;

      setItinerary(data.itinerary);
      setRemainingPlaceNames(remainingPlaces);
      setStep("itinerary");
      toast({
        title: "Itinerary generated!",
        description: "Your personalized trip plan is ready.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to generate itinerary",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveTrip = async () => {
    if (!currentTripData || !itinerary) return;

    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("trips").insert({
        user_id: user.id,
        destination: currentTripData.destination,
        start_date: currentTripData.startDate,
        end_date: currentTripData.endDate,
        budget: currentTripData.budget,
        preferences: { text: currentTripData.preferences },
        itinerary: itinerary,
      });

      if (error) throw error;

      toast({
        title: "Trip saved!",
        description: "You can view it in My Trips.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (view === "mytrips") {
    return (
      <>
        <Navbar
          isAuthenticated={isAuthenticated}
          onLoginClick={() => setView("auth")}
          onMyTripsClick={() => setView("mytrips")}
        />
        <MyTrips onBack={() => setView("home")} />
      </>
    );
  }

  if (view === "auth") {
    return (
      <>
        <Navbar
          isAuthenticated={isAuthenticated}
          onLoginClick={() => setView("auth")}
          onMyTripsClick={() => setView("mytrips")}
        />
        <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
          <AuthForm
            mode={authMode}
            onSuccess={() => {
              setView("home");
              checkAuth();
            }}
            onToggleMode={() => setAuthMode(authMode === "login" ? "signup" : "login")}
          />
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        isAuthenticated={isAuthenticated}
        onLoginClick={() => setView("auth")}
        onMyTripsClick={() => setView("mytrips")}
      />
      
      <Hero onGetStarted={() => { setStep("form"); setItinerary(null); setCurrentTripData(null); handleGetStarted(); }} />

      <section className="py-16 px-4" ref={plannerRef}>
        <div className="container mx-auto max-w-4xl space-y-8">
          {step === "form" && (
            <TripPlannerForm
              onSubmit={handleFormSubmit}
              isLoading={false}
            />
          )}

          {step === "places" && currentTripData && (
            <PlaceSelection
              destination={currentTripData.destination}
              onConfirm={handlePlacesConfirm}
              onBack={() => setStep("form")}
              isLoading={isGenerating}
            />
          )}

          {step === "itinerary" && itinerary && currentTripData && (
            <ItineraryDisplay
              itinerary={itinerary}
              origin={currentTripData.origin}
              destination={currentTripData.destination}
              startDate={currentTripData.startDate}
              endDate={currentTripData.endDate}
              budget={currentTripData.budget}
              onSave={handleSaveTrip}
              isSaving={isSaving}
              remainingPlaces={remainingPlaceNames}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
