import { Button } from "@/components/ui/button"
import { MessageCircle, Shield, Users, Play } from "lucide-react"
import nikhilAvatar from "@/assets/nikhil-avatar.jpg"

const ChatExperienceSection = () => {
  const sampleConversation = [
    {
      type: "student",
      message: "Nikhil, why do you tease Rajat so much?",
      time: "2:30 PM"
    },
    {
      type: "character",
      message: "I thought it was funny… but I didn't realize it hurt him this much.",
      time: "2:31 PM",
      avatar: nikhilAvatar,
      name: "Nikhil"
    },
    {
      type: "student", 
      message: "How do you feel now that you know?",
      time: "2:31 PM"
    },
    {
      type: "character",
      message: "…Maybe I should have thought about his feelings first.",
      time: "2:32 PM",
      avatar: nikhilAvatar,
      name: "Nikhil"
    }
  ]

  return (
    <section className="py-20 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Talk to the Characters. <span className="text-gradient">Live Their Story.</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Students can ask characters questions, express feelings, and learn from their perspectives. 
              Each conversation is guided by expert-designed lesson plans and monitored for safety.
            </p>
          </div>

          {/* Split Screen Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Movie Scene Preview */}
            <div className="relative animate-slide-in">
              <div className="aspect-video bg-gradient-card rounded-xl border border-border overflow-hidden shadow-movie">
                <div className="h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20 flex items-center justify-center relative">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                      <Play className="w-10 h-10 text-accent" />
                    </div>
                    <p className="text-lg font-medium">Scene: Classroom Confrontation</p>
                    <p className="text-sm text-muted-foreground">Watch before chatting</p>
                  </div>
                  
                  {/* Floating avatar */}
                  <div className="absolute bottom-4 right-4">
                    <img 
                      src={nikhilAvatar} 
                      alt="Nikhil"
                      className="w-12 h-12 rounded-full border-2 border-accent shadow-glow animate-float"
                    />
                  </div>
                </div>
              </div>
              <div className="text-center mt-4">
                <Button variant="glass" size="lg">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Scene First
                </Button>
              </div>
            </div>

            {/* Chat Interface */}
            <div className="animate-scale-in">
              <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
                {/* Chat Header */}
                <div className="bg-gradient-card border-b border-border p-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={nikhilAvatar} 
                      alt="Nikhil"
                      className="w-10 h-10 rounded-full border border-accent"
                    />
                    <div>
                      <h4 className="font-semibold">Nikhil Kumar</h4>
                      <p className="text-sm text-accent">The Class Clown</p>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-xs text-muted-foreground">Online</span>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                  {sampleConversation.map((msg, index) => (
                    <div 
                      key={index}
                      className={`flex ${msg.type === 'student' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                      style={{ animationDelay: `${index * 0.5}s` }}
                    >
                      <div className={`max-w-xs lg:max-w-md ${
                        msg.type === 'student' 
                          ? 'bg-gradient-hero text-white' 
                          : 'bg-secondary text-secondary-foreground'
                      } rounded-lg p-3 shadow-sm`}>
                        {msg.type === 'character' && (
                          <div className="flex items-center gap-2 mb-2">
                            <img 
                              src={msg.avatar} 
                              alt={msg.name}
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="text-xs font-medium text-accent">{msg.name}</span>
                          </div>
                        )}
                        <p className="text-sm">{msg.message}</p>
                        <p className={`text-xs mt-1 ${
                          msg.type === 'student' ? 'text-white/70' : 'text-muted-foreground'
                        }`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Typing indicator */}
                  <div className="flex justify-start">
                    <div className="bg-secondary rounded-lg p-3 max-w-xs">
                      <div className="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat Input */}
                <div className="border-t border-border p-4">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Ask Nikhil how he feels..."
                      className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      disabled
                    />
                    <Button variant="netflix" size="sm">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border">
                  <Shield className="w-6 h-6 text-accent mb-2" />
                  <h5 className="font-medium mb-1">Safe Conversations</h5>
                  <p className="text-xs text-muted-foreground">AI monitored & expert guided</p>
                </div>
                <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border">
                  <Users className="w-6 h-6 text-accent mb-2" />
                  <h5 className="font-medium mb-1">Real Emotions</h5>
                  <p className="text-xs text-muted-foreground">Authentic character responses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChatExperienceSection