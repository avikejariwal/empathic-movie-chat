import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import nikhilAvatar from "@/assets/nikhil-avatar.png";

interface AgentChatbotProps {
  isTalking?: boolean
}

const AgentChatbot = ({ isTalking = false }: AgentChatbotProps) => {
  return (
    <div className="sticky top-4 z-10 flex justify-center mb-8">
      <div className="relative">
        {/* Animated glow ring - more intense when talking */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-20 scale-110 ${
          isTalking ? 'animate-ping' : 'animate-pulse'
        }`}></div>
        
        {/* Voice wave rings when talking */}
        {isTalking && (
          <>
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping scale-125"></div>
            <div className="absolute inset-0 rounded-full bg-secondary/15 animate-ping scale-150" style={{ animationDelay: '0.2s' }}></div>
            <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping scale-175" style={{ animationDelay: '0.4s' }}></div>
          </>
        )}
        
        {/* Main avatar container with talking animation */}
        <div className={`relative bg-gradient-to-br from-primary to-secondary p-1 rounded-full shadow-glow transition-all duration-150 ${
          isTalking ? 'animate-talking scale-105' : ''
        }`}>
          <div className="bg-background rounded-full p-2">
            <Avatar className={`w-24 h-24 md:w-32 md:h-32 transition-all duration-150 ${
              isTalking ? 'animate-talking-avatar' : ''
            }`}>
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