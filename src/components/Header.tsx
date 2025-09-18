import gslLogo from "@/assets/gsl-logo.svg";

const Header = () => {
  return (
    <header className="bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src={gslLogo} 
              alt="GSL Logo" 
              className="h-12 w-auto"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;