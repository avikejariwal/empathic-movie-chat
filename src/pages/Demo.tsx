import Header from "@/components/Header"
import ChatDemo from "@/components/ChatDemo"

const Demo = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col items-center">
        <div className="w-full">
          <Header />
        </div>
        <div className="container mx-auto px-4 py-4 md:py-16">
          <div className="text-center mb-8">
            <h1 className="text-2xl mdtext-4xl font-bold mb-2 md:mb-4 font-montserrat">Start the conversation</h1>
            <p className="text-base md:text-lg text-muted-foreground font-opensans">
              Experience interactive learning through conversation
            </p>
          </div>
          <ChatDemo />
        </div>
      </div>
    </div>
  );
};

export default Demo;