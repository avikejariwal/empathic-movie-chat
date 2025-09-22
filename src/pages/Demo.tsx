import Header from "@/components/Header"

const Demo = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col items-center">
        <div className="w-full">
          <Header />
        </div>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 font-montserrat">Demo Page</h1>
            <p className="text-lg text-muted-foreground font-opensans">
              Welcome to the demo experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;