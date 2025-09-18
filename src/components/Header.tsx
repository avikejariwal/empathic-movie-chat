import gslLogo from "@/assets/gsl-logo.svg";

const Header = () => {
  return (
    <header className="bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center">
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