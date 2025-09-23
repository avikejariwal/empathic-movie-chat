import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import nikhilAvatar from "@/assets/nikhil-avatar.png";

const AgentChatbot = () => {
  return (
    <div className="sticky top-4 z-10 flex justify-center mb-8">
      <div className="relative">
        {/* Animated glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse opacity-20 scale-110"></div>
        
        {/* Main avatar container */}
        <div className="relative bg-gradient-to-br from-primary to-secondary p-1 rounded-full shadow-glow">
          <div className="bg-background rounded-full p-2">
            <Avatar className="w-24 h-24 md:w-32 md:h-32">
              <AvatarImage 
                src={nikhilAvatar} 
                alt="Nikhil - AI Learning Assistant"
                className="object-cover"
              />
              <AvatarFallback className="bg-primary/10 text-primary text-xl md:text-2xl font-semibold">
                N
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        
        {/* Status indicator */}
        <div className="absolute bottom-2 right-2 w-4 h-4 md:w-5 md:h-5 bg-green-500 rounded-full border-2 border-background animate-pulse"></div>
        
        {/* Agent info */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-sm font-medium text-foreground font-montserrat">Nikhil</p>
          <p className="text-xs text-muted-foreground">AI Assistant</p>
        </div>
      </div>
    </div>
  );
};

export default AgentChatbot;