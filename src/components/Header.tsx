import gslLogo from "@/assets/gsl-logo.svg";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showBackButton = location.pathname === '/demo';

  return (
    <header className="bg-background">
      <div className="container mx-auto px-4 py-1 md:py-6">
        <div className="flex justify-center relative">
          {showBackButton && (
            <button
              onClick={() => navigate('/')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-primary/10 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6 text-primary" />
            </button>
          )}
          <img 
            src={gslLogo} 
            alt="GSL Logo" 
            className="h-24 w-auto"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;