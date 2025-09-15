import { Button } from "@/components/ui/button"
import { Play, Shield, Bot, Film, MessageCircle } from "lucide-react"
import nikhilPoster from "@/assets/nikhil-poster.jpg"
import nikhilAvatar from "@/assets/nikhil-avatar.jpg"
import { useState, useEffect } from "react"

const HeroSection = () => {
  const [phase, setPhase] = useState<"watch" | "transitioning" | "talk">("watch")
  
  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("transitioning"), 3000)
    const timer2 = setTimeout(() => setPhase("talk"), 3500)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <section className="bg-gradient-dark relative overflow-hidden flex items-center justify-center py-16 lg:py-24">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10" />
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-6xl mx-auto">
          {/* Dynamic Hero Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left: Dynamic Title */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="relative inline-block">
                  {phase === "watch" && (
                    <span className="animate-fade-in">Watch</span>
                  )}
                  {phase === "transitioning" && (
                    <span className="animate-fade-out">Watch</span>
                  )}
                  {phase === "talk" && (
                    <span className="animate-fade-in text-gradient">Talk</span>
                  )}
                </span>
                {" "}and{" "}
                <span className="text-gradient">Learn</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8">
                {phase === "watch" || phase === "transitioning" 
                  ? "Experience empathy through Nikhil's story in our interactive learning movie."
                  : "Then dive deeper with AI-powered conversations that build real understanding."
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button variant="hero" size="xl" className="group">
                  {phase === "talk" ? (
                    <>
                      <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      Start Conversation
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      Watch Movie
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Right: Dynamic Visual Content */}
            <div className="relative h-80">
              {/* Movie Phase */}
              {(phase === "watch" || phase === "transitioning") && (
                <div className={`h-full rounded-lg overflow-hidden shadow-movie ${
                  phase === "transitioning" ? "animate-fade-out" : "animate-fade-in"
                }`}>
                  <img 
                    src={nikhilPoster} 
                    alt="Nikhil movie scene"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-primary ml-1" />
                    </div>
                  </div>
                </div>
              )}

              {/* Conversation Phase */}
              {phase === "talk" && (
                <div className="animate-fade-in h-full">
                  <div className="bg-card/80 backdrop-blur-sm rounded-lg border border-border p-6 shadow-lg h-full flex flex-col justify-center">
                    {/* Nikhil's message */}
                    <div className="flex items-start gap-4 mb-4">
                      <img 
                        src={nikhilAvatar} 
                        alt="Nikhil avatar"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="bg-primary/90 text-primary-foreground rounded-lg p-3 mb-2">
                          <p className="text-sm">
                            "Hey, I've been thinking about what happened in class today... Want to talk about it?"
                          </p>
                        </div>
                        {/* Voice amplitude graph */}
                        <div className="flex items-center gap-1 mb-2">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div
                              key={i}
                              className="w-1 bg-accent/60 rounded-full animate-pulse"
                              style={{
                                height: `${Math.random() * 16 + 4}px`,
                                animationDelay: `${i * 0.1}s`,
                                animationDuration: '1.5s'
                              }}
                            />
                          ))}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Nikhil</span>
                          <span>•</span>
                          <span>Just now</span>
                        </div>
                      </div>
                    </div>

                    {/* User's response */}
                    <div className="flex items-start gap-4 mb-4 justify-end">
                      <div className="flex-1 max-w-xs">
                        <div className="bg-accent/10 rounded-lg p-3 mb-2">
                          <p className="text-sm">
                            "I want to understand better. Can you tell me how it felt when that happened?"
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground justify-end">
                          <span>2 min ago</span>
                          <span>•</span>
                          <span>You</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">You</span>
                      </div>
                    </div>

                    {/* Input area */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/20 rounded-lg p-3">
                      <MessageCircle className="w-4 h-4" />
                      <span>Type your response or use voice chat...</span>
                      <div className="ml-auto flex gap-1">
                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>


          {/* Movie Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center">
            {/* Coming Soon Movie 1 */}
            <div className="movie-card relative group opacity-60 order-2 md:order-1">
              <div className="aspect-video bg-gradient-card rounded-lg border border-border relative overflow-hidden">
                <div className="absolute inset-0 bg-muted/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 mx-auto">
                      <Film className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground font-medium">Coming Soon</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 movie-overlay transition-smooth" />
              </div>
            </div>

            {/* Featured Movie - Nikhil */}
            <div className="movie-card relative group order-1 md:order-2">
              <div className="aspect-video rounded-lg overflow-hidden shadow-movie">
                <img 
                  src={nikhilPoster} 
                  alt="Nikhil, the Class Clown movie poster"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent movie-overlay opacity-0 transition-smooth">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold mb-2">Nikhil, the Class Clown</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Experience empathy through the eyes of a classroom bully learning the impact of his actions.
                    </p>
                    <Button variant="netflix" size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      Start Learning
                    </Button>
                  </div>
                </div>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-lg font-semibold">Available Now</h3>
                <p className="text-accent font-medium">Featured Learning Movie</p>
              </div>
            </div>

            {/* Coming Soon Movie 2 */}
            <div className="movie-card relative group opacity-60 order-3">
              <div className="aspect-video bg-gradient-card rounded-lg border border-border relative overflow-hidden">
                <div className="absolute inset-0 bg-muted/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 mx-auto">
                      <Film className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground font-medium">Coming Soon</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 movie-overlay transition-smooth" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection