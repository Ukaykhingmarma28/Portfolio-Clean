
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent-ivory via-theme-white to-accent-cream p-4">
      <Card className="max-w-lg w-full clean-card hover-glow">
        <CardContent className="p-8 text-center space-y-6">
          {/* 404 Number with Animation */}
          <div className="relative">
            <h1 className="text-8xl md:text-9xl font-heading font-bold text-accent-charcoal animate-fade-in">
              404
            </h1>
            <div className="absolute inset-0 text-8xl md:text-9xl font-heading font-bold text-accent-bronze opacity-20 animate-pulse">
              404
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-3 fade-in-up">
            <h2 className="text-2xl md:text-3xl font-heading font-semibold text-accent-charcoal">
              Page Not Found
            </h2>
            <p className="text-theme-gray-600 font-body leading-relaxed">
              Sorry, the page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
            {location.pathname !== "/" && (
              <p className="text-sm text-theme-gray-500 font-mono bg-theme-gray-100 px-3 py-1 rounded-md inline-block">
                {location.pathname}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button asChild className="btn-primary flex-1">
              <Link to="/" className="inline-flex items-center gap-2">
                <Home className="w-4 h-4" />
                Go Home
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => window.history.back()} 
              className="btn-secondary flex-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>

          {/* Additional Help */}
          <div className="pt-4 border-t border-theme-gray-200">
            <p className="text-sm text-theme-gray-500 font-body mb-3">
              Need help finding something?
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent-bronze/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-accent-charcoal/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-accent-cream/20 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>
    </div>
  );
};

export default NotFound;
