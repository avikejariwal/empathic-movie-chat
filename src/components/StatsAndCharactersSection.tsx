import { Brain, Users, Eye, Headphones, Hand } from "lucide-react"
import nikhilAvatar from "@/assets/nikhil-avatar.jpg"
import rajatAvatar from "@/assets/rajat-avatar.jpg"
import tamannaAvatar from "@/assets/tamanna-avatar.jpg"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

const StatsAndCharactersSection = () => {
  const { ref: statsRef, isIntersecting: statsVisible } = useIntersectionObserver();
  const { ref: charactersRef, isIntersecting: charactersVisible } = useIntersectionObserver();
  
  const stats = [
    { value: "50%", label: "retention vs lectures", icon: Brain },
    { value: "24.7%", label: "engagement increase", icon: Users },
    { value: "400%", label: "improvement through visuals", icon: Eye },
  ]

  const characters = [
    { 
      name: "Nikhil", 
      role: "The Class Clown", 
      avatar: nikhilAvatar,
      description: "Learn empathy through his journey of self-discovery"
    },
    { 
      name: "Rajat", 
      role: "The Target", 
      avatar: rajatAvatar,
      description: "Experience the impact of bullying from his perspective"
    },
    { 
      name: "Tamanna", 
      role: "The Observer", 
      avatar: tamannaAvatar,
      description: "Understand the bystander's role in creating change"
    },
  ]

  const learnerTypes = [
    { type: "Visual", icon: Eye, color: "text-accent" },
    { type: "Auditory", icon: Headphones, color: "text-primary" },
    { type: "Kinesthetic", icon: Hand, color: "text-accent" },
  ]

  return (
    <section className="min-h-screen lg:h-screen bg-background flex items-center justify-center snap-section py-8 lg:py-0">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Stats Section - Top Half */}
          <div className="mb-12">
            <div className="text-center mb-10 animate-fade-in">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                Why <span className="text-gradient">Stories</span> Work
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
                Research-backed learning that resonates with every student
              </p>
            </div>

            <div 
              ref={statsRef}
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 transition-all duration-1000 ${
                statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`text-center p-4 bg-gradient-card rounded-xl border border-border shadow-card hover:shadow-glow transition-all duration-700 hover:scale-105 hover:rotate-1 ${
                    statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <stat.icon className={`w-8 h-8 text-accent mx-auto mb-3 transition-all duration-500 ${
                    statsVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                  }`}
                  style={{ transitionDelay: `${index * 200 + 300}ms` }}
                  />
                  <div className={`text-3xl font-bold text-gradient mb-2 transition-all duration-700 ${
                    statsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                  }`}
                  style={{ transitionDelay: `${index * 200 + 500}ms` }}
                  >
                    {stat.value} ↑
                  </div>
                  <p className="text-sm text-muted-foreground capitalize">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Learner Types */}
            <div className="text-center">
              <div className="flex justify-center gap-6 flex-wrap">
                {learnerTypes.map((learner, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-2 bg-card/50 backdrop-blur-sm rounded-full px-4 py-2 border border-border transition-all duration-700 hover:scale-105 ${
                      statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${index * 200 + 800}ms` }}
                  >
                    <learner.icon className={`w-4 h-4 ${learner.color}`} />
                    <span className="text-sm font-medium">{learner.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Character Selection - Bottom Half */}
          <div>
            <div className="text-center mb-8">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3">
                Choose a Character. <span className="text-gradient">Step Into Their World.</span>
              </h3>
              <p className="text-muted-foreground">
                Each perspective offers unique lessons in empathy and understanding
              </p>
            </div>

            <div 
              ref={charactersRef}
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 transition-all duration-1000 ${
                charactersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              {characters.map((character, index) => (
                <div 
                  key={index}
                  className={`group relative bg-gradient-card rounded-xl p-5 border border-border shadow-card hover:shadow-glow transition-all duration-700 hover:scale-105 hover:rotate-1 cursor-pointer ${
                    charactersVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-3">
                      <img 
                        src={character.avatar} 
                        alt={`${character.name} avatar`}
                        className={`w-full h-full rounded-full object-cover border-2 border-accent shadow-glow transition-all duration-500 ${
                          charactersVisible ? 'scale-100' : 'scale-0'
                        }`}
                        style={{ transitionDelay: `${index * 200 + 300}ms` }}
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-hero opacity-0 group-hover:opacity-20 transition-smooth" />
                    </div>
                    <h4 className="text-lg font-bold mb-1">{character.name}</h4>
                    <p className="text-accent font-medium mb-2 text-sm">{character.role}</p>
                    <p className="text-xs text-muted-foreground">
                      {character.description}
                    </p>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-10 rounded-xl transition-smooth" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsAndCharactersSection