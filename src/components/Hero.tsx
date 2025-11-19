import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-travel.jpg";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-fade-in-scale">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 drop-shadow-2xl tracking-tight leading-tight">
            Plan Your Dream Trip
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-glow to-accent mt-2">
              with AI
            </span>
          </h1>
          <p className="text-xl md:text-3xl text-white font-medium mb-10 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
            Get personalized travel itineraries crafted by AI in seconds. Your perfect adventure awaits.
          </p>
          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="bg-accent hover:bg-accent/90 text-accent-foreground text-xl px-12 py-8 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-110 font-bold group relative overflow-hidden"
          >
            <span className="relative z-10">Start Planning Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent-glow to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Button>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
    </section>
  );
};
