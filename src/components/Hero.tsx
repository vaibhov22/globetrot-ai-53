import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-travel.jpg";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-accent/70" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Plan Your Dream Trip with AI
        </h1>
        <p className="text-xl md:text-2xl text-white/95 mb-8 max-w-2xl mx-auto drop-shadow animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          Get personalized travel itineraries crafted by AI in seconds. Your perfect adventure awaits.
        </p>
        <Button 
          size="lg" 
          onClick={onGetStarted}
          className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-4 delay-500"
        >
          Start Planning Now
        </Button>
      </div>
    </section>
  );
};
