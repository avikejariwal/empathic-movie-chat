import { Brain, Users, Eye } from "lucide-react"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

const StatsResearchSection = () => {
  const { ref: statsRef, isIntersecting: statsVisible } = useIntersectionObserver();
  
  const stats = [
    { value: "50%", label: "retention vs lectures", icon: Brain },
    { value: "24.7%", label: "engagement increase", icon: Users },
    { value: "400%", label: "improvement through visuals", icon: Eye },
  ]

  return (
    <section className="h-screen bg-background flex items-center justify-center snap-start">
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
            className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 ${
              statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`text-center p-6 bg-gradient-card rounded-xl border border-border shadow-card hover:shadow-glow transition-all duration-700 hover:scale-105 hover:rotate-1 ${
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
        </div>
      </div>
    </section>
  )
}

export default StatsResearchSection