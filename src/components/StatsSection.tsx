import { Brain, Users, Eye, Headphones, Hand } from "lucide-react"
import nikhilAvatar from "@/assets/nikhil-avatar.jpg"
import rajatAvatar from "@/assets/rajat-avatar.jpg"
import tamannaAvatar from "@/assets/tamanna-avatar.jpg"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

const StatsSection = () => {
  const { ref: statsRef, isIntersecting: statsVisible } = useIntersectionObserver();
  const { ref: charactersRef, isIntersecting: charactersVisible } = useIntersectionObserver();
  const { ref: learnersRef, isIntersecting: learnersVisible } = useIntersectionObserver();
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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why <span className="text-gradient">Stories</span> Work
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Research-backed learning that resonates with every student
            </p>
          </div>

          {/* Stats Grid */}
          <div 
            ref={statsRef}
            className={`grid md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 ${
              statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`text-center p-6 bg-gradient-card rounded-xl border border-border shadow-card hover:shadow-glow transition-all duration-700 hover:scale-105 ${
                  statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <stat.icon className={`w-12 h-12 text-accent mx-auto mb-4 transition-all duration-500 ${
                  statsVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                }`}
                style={{ transitionDelay: `${index * 200 + 300}ms` }}
                />
                <div className={`text-4xl font-bold text-gradient mb-2 transition-all duration-700 ${
                  statsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
                style={{ transitionDelay: `${index * 200 + 500}ms` }}
                >
                  {stat.value} ↑
                </div>
                <p className="text-muted-foreground capitalize">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Learner Types */}
          <div 
            ref={learnersRef}
            className={`text-center mb-16 transition-all duration-1000 ${
              learnersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h3 className="text-2xl font-semibold mb-8">Works across learner types:</h3>
            <div className="flex justify-center gap-8 flex-wrap">
              {learnerTypes.map((learner, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-3 bg-card/50 backdrop-blur-sm rounded-full px-6 py-3 border border-border transition-all duration-700 hover:scale-105 ${
                    learnersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <learner.icon className={`w-5 h-5 ${learner.color}`} />
                  <span className="font-medium">{learner.type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Character Spotlights */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              Choose a Character. <span className="text-gradient">Step Into Their World.</span>
            </h3>
            <p className="text-muted-foreground text-lg">
              Each perspective offers unique lessons in empathy and understanding
            </p>
          </div>

          <div 
            ref={charactersRef}
            className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 ${
              charactersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            {characters.map((character, index) => (
              <div 
                key={index}
                className={`group relative bg-gradient-card rounded-xl p-6 border border-border shadow-card hover:shadow-glow transition-all duration-700 hover:scale-105 cursor-pointer ${
                  charactersVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
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
                  <h4 className="text-xl font-bold mb-1">{character.name}</h4>
                  <p className="text-accent font-medium mb-3">{character.role}</p>
                  <p className="text-sm text-muted-foreground">
                    {character.description}
                  </p>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-10 rounded-xl transition-smooth" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsSection