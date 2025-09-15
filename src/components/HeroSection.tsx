import { Button } from "@/components/ui/button"
import { Play, Shield, Bot, Film, MessageCircle } from "lucide-react"
import nikhilPoster from "@/assets/nikhil-poster.jpg"
import nikhilAvatar from "@/assets/nikhil-avatar.jpg"
import { useState, useEffect } from "react"

const HeroSection = () => {
  const [phase, setPhase] = useState<"watch" | "transitioning" | "talk" | "resetting">("watch")
  const [typewriterText, setTypewriterText] = useState("Watch")
  const [showCursor, setShowCursor] = useState(false)
  const [initialBlink, setInitialBlink] = useState(true)
  const [typedLetters, setTypedLetters] = useState(0) // Track which letters of "Talk" have been typed
  const [movieOpacity, setMovieOpacity] = useState(1)
  const [chatOpacity, setChatOpacity] = useState(0)
  const [showChatElements, setShowChatElements] = useState({
    message: false,
    voice: false,
    response: false,
    input: false
  })
  const [showCTA, setShowCTA] = useState(false)
  
  useEffect(() => {
    let animationId: NodeJS.Timeout | null = null
    let cleanupTimers: NodeJS.Timeout[] = []

    const runAnimation = () => {
      // Clear any existing timers
      cleanupTimers.forEach(timer => clearTimeout(timer))
      cleanupTimers = []

      // Reset all states to initial values
      setPhase("watch")
      setTypewriterText("Watch")
      setShowCursor(false)
      setInitialBlink(true)
      setTypedLetters(0)
      setMovieOpacity(1)
      setChatOpacity(0)
      setShowChatElements({
        message: false,
        voice: false,
        response: false,
        input: false
      })
      setShowCTA(false)

      // Stop initial blinking before typewriter starts
      const blinkTimer = setTimeout(() => {
        setInitialBlink(false)
      }, 3500)
      cleanupTimers.push(blinkTimer)
      
      const timer1 = setTimeout(() => {
        setPhase("transitioning")
        setShowCursor(true)
        
        // Start deleting "Watch"
        const deleteText = () => {
          const deleteTimer = setInterval(() => {
            setTypewriterText(prev => {
              if (prev.length > 0) {
                return prev.slice(0, -1)
              } else {
                clearInterval(deleteTimer)
                // Start typing "Talk"
                setTimeout(() => {
                  const typeText = () => {
                    const targetText = "Talk"
                    let currentIndex = 0
                    const typeTimer = setInterval(() => {
                      if (currentIndex < targetText.length) {
                        setTypewriterText(targetText.slice(0, currentIndex + 1))
                        setTypedLetters(currentIndex + 1)
                        
                        // Start movie fade out when typing first letter of "Talk"
                        if (currentIndex === 0) {
                          setMovieOpacity(0)
                        }
                        // Start chat fade in when typing second letter of "Talk"
                        if (currentIndex === 1) {
                          setChatOpacity(1)
                        }
                        
                        currentIndex++
                      } else {
                        clearInterval(typeTimer)
                        setShowCursor(false)
                        setPhase("talk")
                      }
                    }, 150)
                  }
                  typeText()
                }, 200)
                return prev
              }
            })
          }, 100)
        }
        deleteText()
      }, 4000)
      cleanupTimers.push(timer1)
      
      // Staggered chat element animation
      const chatTimer1 = setTimeout(() => {
        setShowChatElements(prev => ({ ...prev, message: true }))
      }, 5200)
      cleanupTimers.push(chatTimer1)
      
      const chatTimer2 = setTimeout(() => {
        setShowChatElements(prev => ({ ...prev, voice: true }))
      }, 5500)
      cleanupTimers.push(chatTimer2)
      
      const chatTimer3 = setTimeout(() => {
        setShowChatElements(prev => ({ ...prev, response: true }))
      }, 6000)
      cleanupTimers.push(chatTimer3)
      
      const chatTimer4 = setTimeout(() => {
        setShowChatElements(prev => ({ ...prev, input: true }))
      }, 6400)
      cleanupTimers.push(chatTimer4)
      
      const ctaTimer = setTimeout(() => {
        setShowCTA(true)
      }, 6800)
      cleanupTimers.push(ctaTimer)

      // Start smooth reset after showing everything for 3 seconds
      const resetTimer = setTimeout(() => {
        setPhase("resetting")
        setShowCTA(false)
        
        // Fade out chat elements in reverse order with better timing
        const hideInput = setTimeout(() => setShowChatElements(prev => ({ ...prev, input: false })), 0)
        const hideResponse = setTimeout(() => setShowChatElements(prev => ({ ...prev, response: false })), 150)
        const hideVoice = setTimeout(() => setShowChatElements(prev => ({ ...prev, voice: false })), 300)
        const hideMessage = setTimeout(() => setShowChatElements(prev => ({ ...prev, message: false })), 450)
        
        cleanupTimers.push(hideInput, hideResponse, hideVoice, hideMessage)
        
        // Start transitioning visuals back with proper coordination
        const visualTransition = setTimeout(() => {
          setChatOpacity(0)
          
          // Wait for chat to fade out before showing movie
          const movieFadeIn = setTimeout(() => {
            setMovieOpacity(1)
          }, 300)
          cleanupTimers.push(movieFadeIn)
          
          // Start text transition with proper delay
          const textTransition = setTimeout(() => {
            setShowCursor(true)
            
            const deleteBackText = () => {
              const deleteTimer = setInterval(() => {
                setTypewriterText(prev => {
                  if (prev.length > 0) {
                    const newText = prev.slice(0, -1)
                    // Reset typed letters count when deleting "Talk"
                    setTypedLetters(Math.max(0, newText.length))
                    return newText
                  } else {
                    clearInterval(deleteTimer)
                    // Start typing "Watch" with delay
                    const typeStartDelay = setTimeout(() => {
                      const typeText = () => {
                        const targetText = "Watch"
                        let currentIndex = 0
                        const typeTimer = setInterval(() => {
                          if (currentIndex < targetText.length) {
                            setTypewriterText(targetText.slice(0, currentIndex + 1))
                            currentIndex++
                          } else {
                            clearInterval(typeTimer)
                            setShowCursor(false)
                            setPhase("watch")
                            setTypedLetters(0)
                            
                            // Schedule next animation cycle
                            animationId = setTimeout(() => {
                              runAnimation()
                            }, 2000)
                          }
                        }, 150)
                      }
                      typeText()
                    }, 300)
                    cleanupTimers.push(typeStartDelay)
                    return prev
                  }
                })
              }, 120)
            }
            deleteBackText()
          }, 600)
          cleanupTimers.push(textTransition)
        }, 700)
        cleanupTimers.push(visualTransition)
      }, 9800)
      cleanupTimers.push(resetTimer)
    }

    runAnimation()

    return () => {
      cleanupTimers.forEach(timer => clearTimeout(timer))
      if (animationId) clearTimeout(animationId)
    }
  }, [])

  return (
    <section className="bg-gradient-dark relative overflow-hidden flex items-center justify-center py-16 lg:py-24">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10" />
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-6xl mx-auto">
          {/* Title and Description - Full Width Row */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white font-montserrat">
              <span className="relative inline-block">
                <span className={`${initialBlink && phase === "watch" ? "animate-pulse" : ""}`}>
                  {(phase === "transitioning" && typewriterText.startsWith("T")) || phase === "talk" ? (
                    // Render each letter of "Talk" with primary color
                    typewriterText.split('').map((letter, index) => (
                      <span key={index} className="text-gradient">
                        {letter}
                      </span>
                    ))
                  ) : (
                    typewriterText
                  )}
                </span>
                {showCursor && (
                  <span className="text-primary animate-pulse ml-1">|</span>
                )}
              </span>
              {" "}and Learn
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto font-opensans">
              Interactive lessons delivered through characters. Personalized to each student.
            </p>
          </div>

          {/* Visual Content - Full Width Row */}
          <div className="flex justify-center px-4 sm:px-0">
            <div className="relative h-80 w-full max-w-2xl">
              {/* Movie Phase */}
              {(phase === "watch" || (phase === "transitioning" && typewriterText.length > 0)) && (
                <div 
                  className="h-full rounded-lg overflow-hidden shadow-movie transition-opacity duration-1000 ease-out"
                  style={{ opacity: movieOpacity }}
                >
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
              {(phase === "transitioning" || phase === "talk" || phase === "resetting") && (
                <div 
                  className="absolute inset-0 h-full transition-opacity duration-500 ease-out"
                  style={{ opacity: chatOpacity }}
                >
                  <div className="sm:bg-card/80 sm:backdrop-blur-sm sm:rounded-lg sm:border sm:border-primary/20 p-1 sm:p-6 sm:shadow-xl sm:shadow-primary/10 h-full flex flex-col justify-center sm:bg-gradient-to-br sm:from-card/90 sm:to-card/70">
                    {/* Nikhil's message */}
                    <div className={`flex items-start gap-2 sm:gap-4 mb-3 sm:mb-4 transition-all duration-500 ${
                      showChatElements.message ? "animate-fade-in" : "opacity-0 translate-y-4"
                    }`}>
                      <img 
                        src={nikhilAvatar} 
                        alt="Nikhil avatar"
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="rounded-lg p-2 sm:p-3 mb-2" style={{backgroundColor: 'hsl(170 100% 25%)', color: 'hsl(240 100% 99%)'}}>
                          {/* Voice amplitude graph inside bubble */}
                          <div className={`flex items-center justify-between gap-px h-3 sm:h-4 mb-2 sm:mb-3 transition-all duration-300 ${
                            showChatElements.voice ? "opacity-100" : "opacity-0"
                          }`}>
                            {Array.from({ length: 60 }).map((_, i) => (
                              <div
                                key={i}
                                className="w-0.5 bg-primary-foreground/40 rounded-full shadow-sm transition-opacity duration-1500"
                                style={{
                                  height: `${Math.random() * 12 + 4}px`,
                                  animationDelay: `${i * 0.03}s`,
                                  animation: `pulse 1.2s ease-in-out infinite ${i * 0.03}s`
                                }}
                              />
                            ))}
                          </div>
                          <p className="text-xs sm:text-sm">
                            "Hey, I've been thinking about what happened in class today... Want to talk about it?"
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Nikhil</span>
                          <span>•</span>
                          <span>Just now</span>
                        </div>
                      </div>
                    </div>

                    {/* User's response */}
                    <div className={`flex items-start gap-2 sm:gap-4 mb-3 sm:mb-4 justify-end transition-all duration-500 ${
                      showChatElements.response ? "animate-fade-in-right" : "opacity-0 translate-x-4"
                    }`}>
                      <div className="flex-1 max-w-xs sm:max-w-sm min-w-0">
                        <div className="bg-secondary/15 border border-secondary/20 rounded-lg p-2 sm:p-3 mb-2">
                          <p className="text-xs sm:text-sm text-foreground">
                            "I want to understand better. Can you tell me how it felt when that happened?"
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground justify-end">
                          <span>2 min ago</span>
                          <span>•</span>
                          <span>You</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/60 border border-secondary/50 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs sm:text-sm font-medium text-white">You</span>
                      </div>
                    </div>

                    {/* Input area */}
                    <div className={`flex items-center gap-2 text-xs sm:text-sm text-muted-foreground bg-muted/20 border border-primary/30 rounded-lg p-2 sm:p-3 transition-all duration-500 ${
                      showChatElements.input ? "animate-fade-in-up" : "opacity-0 translate-y-4"
                    }`}>
                      <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary/70 flex-shrink-0" />
                      <span className="truncate">Type your response or use voice chat...</span>
                      <div className="ml-auto flex gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-sm shadow-primary/30"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-sm shadow-primary/30" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-sm shadow-primary/30" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA Section - Below Visual Content */}
          <div className={`text-center mt-12 transition-all duration-500 ${
            showCTA ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <Button variant="hero" size="xl" className="group">
              <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Start Conversation
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection