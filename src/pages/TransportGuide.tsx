import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Train, Bus, Clock, IndianRupee, ArrowRight, Search, ArrowLeft, RotateCw } from "lucide-react";
import { TRANSPORT_ROUTES, UP_CITIES, TransportRoute } from "@/data/upCities";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

const TransportGuide = () => {
  const navigate = useNavigate();
  const [fromCity, setFromCity] = useState<string>("");
  const [toCity, setToCity] = useState<string>("");
  const [transportType, setTransportType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setIsAuthenticated(!!session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => setIsAuthenticated(!!session));
    return () => subscription.unsubscribe();
  }, []);

  const filteredRoutes = useMemo(() => {
    return TRANSPORT_ROUTES.filter((route) => {
      const matchFrom = !fromCity || route.from === fromCity;
      const matchTo = !toCity || route.to === toCity;
      const matchType = transportType === "all" || route.type === transportType;
      const matchSearch = !searchQuery || 
        route.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (route.trainName && route.trainName.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchFrom && matchTo && matchType && matchSearch;
    });
  }, [fromCity, toCity, transportType, searchQuery]);

  const swapCities = () => {
    setFromCity(toCity);
    setToCity(fromCity);
  };

  const clearFilters = () => {
    setFromCity("");
    setToCity("");
    setTransportType("all");
    setSearchQuery("");
  };

  const trainRoutes = filteredRoutes.filter(r => r.type === "train");
  const busRoutes = filteredRoutes.filter(r => r.type === "bus");

  const RouteCard = ({ route }: { route: TransportRoute }) => (
    <Card className="p-5 border-2 border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 rounded-xl bg-card/80 backdrop-blur-sm group">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className={`p-3 rounded-xl ${route.type === "train" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"} group-hover:scale-110 transition-transform duration-300`}>
            {route.type === "train" ? <Train className="w-6 h-6" /> : <Bus className="w-6 h-6" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-foreground text-lg">{route.from}</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="font-bold text-foreground text-lg">{route.to}</span>
            </div>
            {route.trainName && (
              <p className="text-sm text-muted-foreground mt-1">
                {route.trainName} {route.trainNumber && `(#${route.trainNumber})`}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{route.duration}</span>
          </div>
          <Badge variant="secondary" className="font-medium">{route.frequency}</Badge>
          <div className="flex items-center gap-1 text-sm font-semibold text-primary">
            <IndianRupee className="w-3.5 h-3.5" />
            <span>{route.fare.replace("₹", "")}</span>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        isAuthenticated={isAuthenticated}
        onLoginClick={() => navigate("/")}
        onMyTripsClick={() => navigate("/")}
      />

      <div className="container mx-auto max-w-5xl px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate("/")} className="mb-4 hover:bg-secondary/80">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-3">
            🚂 Uttar Pradesh <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">Transport Guide</span>
          </h1>
          <p className="text-lg text-muted-foreground">Find trains & buses between major cities in Uttar Pradesh</p>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8 border-2 border-border/50 rounded-2xl bg-card/80 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">From</label>
              <Select value={fromCity} onValueChange={setFromCity}>
                <SelectTrigger className="h-11 rounded-xl border-2">
                  <SelectValue placeholder="Select origin" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {UP_CITIES.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Button variant="outline" size="icon" onClick={swapCities} className="rounded-full mt-6">
                <RotateCw className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">To</label>
              <Select value={toCity} onValueChange={setToCity}>
                <SelectTrigger className="h-11 rounded-xl border-2">
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {UP_CITIES.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Type</label>
              <Select value={transportType} onValueChange={setTransportType}>
                <SelectTrigger className="h-11 rounded-xl border-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="train">🚂 Trains</SelectItem>
                  <SelectItem value="bus">🚌 Buses</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by city or train name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 rounded-xl border-2"
              />
            </div>
            <Button variant="outline" onClick={clearFilters} className="h-11 rounded-xl">
              Clear All
            </Button>
          </div>
        </Card>

        {/* Results */}
        <div className="space-y-8">
          {(transportType === "all" || transportType === "train") && trainRoutes.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Train className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Trains</h2>
                <Badge className="bg-primary/10 text-primary border-primary/20">{trainRoutes.length} routes</Badge>
              </div>
              <div className="space-y-3">
                {trainRoutes.map((route, i) => <RouteCard key={`train-${i}`} route={route} />)}
              </div>
            </div>
          )}

          {(transportType === "all" || transportType === "bus") && busRoutes.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Bus className="w-6 h-6 text-accent" />
                <h2 className="text-2xl font-bold text-foreground">Buses</h2>
                <Badge className="bg-accent/10 text-accent border-accent/20">{busRoutes.length} routes</Badge>
              </div>
              <div className="space-y-3">
                {busRoutes.map((route, i) => <RouteCard key={`bus-${i}`} route={route} />)}
              </div>
            </div>
          )}

          {filteredRoutes.length === 0 && (
            <Card className="p-12 text-center border-2 border-dashed border-border rounded-2xl">
              <p className="text-xl text-muted-foreground mb-2">No routes found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your filters or search query</p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Clear Filters
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransportGuide;
