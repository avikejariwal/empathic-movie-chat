import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import nikhilAvatar from "@/assets/nikhil-avatar.png";

interface AgentChatbotProps {
  isTalking?: boolean
}

const AgentChatbot = ({ isTalking = false }: AgentChatbotProps) => {
  return (
    <div className="sticky top-4 z-10 flex justify-center mb-8">
      <div className={`relative transition-all duration-300 ${
        isTalking ? 'animate-communicate' : ''
      }`}>
        {/* Subtle glow ring */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-20 scale-110 ${
          isTalking ? 'opacity-40' : 'animate-pulse'
        }`}></div>
        
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
      </div>
    </div>
  );
};

export default AgentChatbot;