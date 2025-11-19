import { Button } from "@/components/ui/button";
import { Plane, User, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface NavbarProps {
  isAuthenticated: boolean;
  onLoginClick: () => void;
  onMyTripsClick: () => void;
}

export const Navbar = ({ isAuthenticated, onLoginClick, onMyTripsClick }: NavbarProps) => {
  const { toast } = useToast();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
  };

  return (
    <nav className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Plane className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold text-foreground">TripAI</span>
        </div>
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Button 
                variant="ghost" 
                onClick={onMyTripsClick}
                className="hover:bg-secondary"
              >
                <User className="w-4 h-4 mr-2" />
                My Trips
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="hover:bg-secondary"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <Button onClick={onLoginClick} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};
