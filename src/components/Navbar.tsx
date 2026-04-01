import { Button } from "@/components/ui/button";
import { Plane, User, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  isAuthenticated: boolean;
  onLoginClick: () => void;
  onMyTripsClick: () => void;
}

export const Navbar = ({ isAuthenticated, onLoginClick, onMyTripsClick }: NavbarProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
  };

  return (
    <nav className="bg-card/70 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <Plane className="w-9 h-9 text-primary group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-all duration-300" />
          </div>
          <span className="text-3xl font-black bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            TripAI
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/transport")}
            className="hover:bg-secondary/80 transition-all duration-300 hover:scale-105 font-medium"
          >
            <Train className="w-4 h-4 mr-2" />
            Transport Guide
          </Button>
          {isAuthenticated ? (
            <>
              <Button 
                variant="ghost" 
                onClick={onMyTripsClick}
                className="hover:bg-secondary/80 transition-all duration-300 hover:scale-105 font-medium"
              >
                <User className="w-4 h-4 mr-2" />
                My Trips
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="hover:bg-secondary/80 transition-all duration-300 hover:scale-105 font-medium"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <Button 
              onClick={onLoginClick} 
              className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-primary-foreground font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};
