import { GraduationCap, Brain, Lightbulb } from "lucide-react"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

const ExpertsSection = () => {
  const { ref: expertsRef, isIntersecting: expertsVisible } = useIntersectionObserver();
  const experts = [
    {
      icon: GraduationCap,
      title: "Learning Designers",
      description: "Map competencies to CASEL-5 framework and draft measurable learning outcomes",
      color: "text-primary"
    },
    {
      icon: Brain,
      title: "Clinical Psychologists", 
      description: "Align storylines to psychological frameworks ensuring authentic emotional development",
      color: "text-secondary"
    },
    {
      icon: Lightbulb,
      title: "Expert Screenwriters",
      description: "Create engaging and emotionally resonant content that captures student attention",
      color: "text-primary"
    }
  ]

  return (
    <section className="bg-background flex items-center justify-center py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-montserrat">
              Developed by <span className="text-gradient">Experts</span> for Safe, Structured Learning
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-opensans">
              Our multidisciplinary team ensures every story delivers meaningful learning while maintaining safety and engagement.
            </p>
          </div>

          {/* Expert Cards */}
          <div 
            ref={expertsRef}
            className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 ${
              expertsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            {experts.map((expert, index) => (
              <div 
                key={index}
                className={`group relative bg-gradient-card rounded-xl p-8 border border-border shadow-card hover:shadow-glow transition-all duration-700 hover:scale-105 ${
                  expertsVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 mx-auto bg-card/50 rounded-full flex items-center justify-center border border-border group-hover:shadow-glow transition-smooth">
                      <expert.icon className={`w-8 h-8 ${expert.color}`} />
                    </div>
                    <div className="absolute inset-0 w-16 h-16 mx-auto rounded-full bg-gradient-hero opacity-0 group-hover:opacity-20 transition-smooth" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 group-hover:text-gradient transition-smooth">
                    {expert.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {expert.description}
                  </p>
                </div>

                {/* Background glow effect */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 rounded-xl transition-smooth" />
                
                {/* Border glow effect */}
                <div className="absolute inset-0 rounded-xl border border-transparent bg-gradient-hero opacity-0 group-hover:opacity-30 transition-smooth -z-10 blur-sm" />
              </div>
            ))}
          </div>

          {/* CASEL Framework Badge */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-4 bg-gradient-card rounded-full px-8 py-4 border border-border shadow-card">
              <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center shadow-glow">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold">CASEL-5 Framework Aligned</h4>
                <p className="text-sm text-muted-foreground">
                  Research-based Social Emotional Learning standards
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExpertsSection