import { Button } from "@/components/ui/button";
import { Shield, Users, Play, Mic } from "lucide-react";
import nikhilAvatar from "@/assets/nikhil-avatar.jpg";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
const ChatExperienceSection = () => {
  const {
    ref: chatRef,
    isIntersecting: chatVisible
  } = useIntersectionObserver();
  const sampleConversation = [{
    type: "student",
    message: "Nikhil, why do you tease Rajat so much?",
    time: "2:30 PM"
  }, {
    type: "character",
    message: "I thought it was funny… but I didn't realize it hurt him this much.",
    time: "2:31 PM",
    avatar: nikhilAvatar,
    name: "Nikhil"
  }, {
    type: "student",
    message: "How do you feel now that you know?",
    time: "2:31 PM"
  }, {
    type: "character",
    message: "…Maybe I should have thought about his feelings first.",
    time: "2:32 PM",
    avatar: nikhilAvatar,
    name: "Nikhil"
  }];
  return <section className="bg-gradient-dark flex items-center justify-center py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div ref={chatRef} className={`text-center mb-16 transition-all duration-1000 ${chatVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 font-montserrat">
              Talk to the Characters. <span className="text-gradient">Hear Their Voice.</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 font-proxima">
              Students can speak with characters in real voice conversations, expressing feelings and learning from their perspectives. 
              Each conversation is protected by children-specific guardrails designed for ages 11-16 and guided by expert lesson plans.
            </p>
          </div>

          {/* Split Screen Layout */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Movie Scene Preview */}
            <div className={`relative transition-all duration-700 delay-300 ${chatVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              
              <div className="text-center mt-3 sm:mt-4 px-4 sm:px-0">
                <Button variant="glass" size="lg" className="w-full sm:w-auto">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Watch Scene First
                </Button>
              </div>
            </div>

            {/* Chat Interface */}
            <div className={`transition-all duration-700 delay-500 ${chatVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-8 scale-95'}`}>
              <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
                {/* Chat Header */}
                <div className="bg-gradient-card border-b border-border p-4">
                  <div className="flex items-center gap-3">
                    <img src={nikhilAvatar} alt="Nikhil" className="w-10 h-10 rounded-full border border-accent" />
                    <div>
                      <h4 className="font-semibold">Nikhil Kumar</h4>
                      <p className="text-sm text-accent">The Class Clown</p>
                    </div>
                  </div>
                </div>

                 {/* Chat Messages */}
                <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                  {sampleConversation.map((msg, index) => <div key={index} className={`flex ${msg.type === 'student' ? 'justify-end' : 'justify-start'} animate-fade-in`} style={{
                  animationDelay: `${index * 0.5}s`
                }}>
                      <div className={`max-w-xs sm:max-w-sm lg:max-w-md ${msg.type === 'student' ? 'bg-gradient-hero text-white' : 'bg-secondary text-secondary-foreground'} rounded-lg p-2 sm:p-3 shadow-sm`}>
                         {msg.type === 'character' && <div className="flex items-center gap-2 mb-2">
                             <img src={msg.avatar} alt={msg.name} className="w-6 h-6 rounded-full" />
                             <span className="text-xs font-medium text-accent">{msg.name}</span>
                           </div>}
                        <p className="text-sm sm:text-base">{msg.message}</p>
                        <p className={`text-xs mt-1 ${msg.type === 'student' ? 'text-white/70' : 'text-muted-foreground'}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>)}

                </div>

                {/* Chat Input */}
                <div className="border-t border-border p-4 sm:p-6 text-center">
                  <div className="mb-4">
                    <input type="text" placeholder="Type your message here..." className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent" disabled />
                  </div>
                  <Button variant="hero" size="lg" className="w-full max-w-xs mx-auto animate-pulse">
                    <Mic className="w-5 h-5 mr-2" />
                    Hold to Speak
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3 border border-border">
                  <Shield className="w-5 h-5 text-accent mb-2" />
                  <h5 className="font-medium mb-1 text-sm">Child-Safe AI</h5>
                  <p className="text-xs text-muted-foreground">Protected for ages 11-16</p>
                </div>
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3 border border-border">
                  <Mic className="w-5 h-5 text-accent mb-2" />
                  <h5 className="font-medium mb-1 text-sm">Voice Chat</h5>
                  <p className="text-xs text-muted-foreground">Authentic character voices</p>
                </div>
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3 border border-border">
                  <Users className="w-5 h-5 text-accent mb-2" />
                  <h5 className="font-medium mb-1 text-sm">Real Emotions</h5>
                  <p className="text-xs text-muted-foreground">Genuine responses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ChatExperienceSection;