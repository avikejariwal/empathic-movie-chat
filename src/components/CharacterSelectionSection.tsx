import { Eye, Headphones, Hand } from "lucide-react"
import nikhilAvatar from "@/assets/nikhil-avatar.jpg"
import rajatAvatar from "@/assets/rajat-avatar.jpg"
import tamannaAvatar from "@/assets/tamanna-avatar.jpg"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

const CharacterSelectionSection = () => {
  const { ref: charactersRef, isIntersecting: charactersVisible } = useIntersectionObserver();
  const { ref: learnersRef, isIntersecting: learnersVisible } = useIntersectionObserver();

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
    <section className="h-screen bg-gradient-dark flex items-center justify-center snap-section">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
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

          {/* Character Selection Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Choose a Character. <span className="text-gradient">Step Into Their World.</span>
            </h2>
            <p className="text-muted-foreground text-xl">
              Each perspective offers unique lessons in empathy and understanding
            </p>
          </div>

          {/* Character Cards */}
          <div 
            ref={charactersRef}
            className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 ${
              charactersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            {characters.map((character, index) => (
              <div 
                key={index}
                className={`group relative bg-gradient-card rounded-xl p-6 border border-border shadow-card hover:shadow-glow transition-all duration-700 hover:scale-105 hover:rotate-1 cursor-pointer ${
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

export default CharacterSelectionSection