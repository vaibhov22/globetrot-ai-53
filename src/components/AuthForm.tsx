import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AuthFormProps {
  mode: "login" | "signup";
  onSuccess: () => void;
  onToggleMode: () => void;
}

export const AuthForm = ({ mode, onSuccess, onToggleMode }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        toast({
          title: "Account created!",
          description: "You can now start planning your trips.",
        });
        onSuccess();
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
        onSuccess();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-10 max-w-lg w-full mx-auto bg-[var(--gradient-card)] shadow-[var(--shadow-xl)] border-2 border-border/50 rounded-2xl animate-fade-in-scale backdrop-blur-sm">
      <h2 className="text-4xl font-black text-center mb-8 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
        {mode === "login" ? "Welcome Back" : "Create Account"}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="email" className="text-base font-semibold">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 text-base border-2 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 rounded-xl"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="password" className="text-base font-semibold">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="h-12 text-base border-2 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 rounded-xl"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-primary-foreground font-bold text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
        >
          {isLoading ? "Loading..." : mode === "login" ? "Log In" : "Sign Up"}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <button
          onClick={onToggleMode}
          className="text-primary hover:text-primary-dark text-base font-semibold transition-all duration-300 hover:scale-105 inline-block"
        >
          {mode === "login" ? "Don't have an account? Sign up" : "Already have an account? Log in"}
        </button>
      </div>
    </Card>
  );
};
