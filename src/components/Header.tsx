import gslLogo from "@/assets/gsl-logo.svg";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src={gslLogo} 
              alt="GSL Logo" 
              className="h-8 w-auto"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;