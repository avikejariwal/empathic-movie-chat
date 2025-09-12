import { Play, MessageCircle, PenTool, TrendingUp, ChevronRight } from "lucide-react"

const LearningJourneySection = () => {
  const journeySteps = [
    {
      icon: Play,
      title: "Watch the Movie",
      description: "AI-generated, localized short film that sets the emotional context",
      details: "Immersive storytelling with relatable characters in familiar settings",
      color: "text-accent",
      bgColor: "from-orange-500/20 to-red-500/20"
    },
    {
      icon: MessageCircle,
      title: "Engage in Conversations", 
      description: "EmpathAI guided, monitored interactions with story characters",
      details: "Safe, structured dialogue that explores emotions and perspectives",
      color: "text-primary",
      bgColor: "from-red-500/20 to-pink-500/20"
    },
    {
      icon: PenTool,
      title: "Reflect & Assess",
      description: "Personalized exercises that deepen understanding and learning",
      details: "Thoughtful activities aligned with social-emotional learning goals",
      color: "text-accent",
      bgColor: "from-purple-500/20 to-blue-500/20"
    },
    {
      icon: TrendingUp,
      title: "Grow Skills",
      description: "Measured SEL outcomes that track empathy and emotional intelligence",
      details: "Data-driven insights into student emotional development progress",
      color: "text-primary",
      bgColor: "from-blue-500/20 to-green-500/20"
    }
  ]

  return (
    <section className="py-20 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The <span className="text-gradient">Learning Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Each movie becomes a comprehensive SEL experience through our proven four-step process
            </p>
          </div>

          {/* Journey Timeline */}
          <div className="relative">
            {/* Desktop Timeline */}
            <div className="hidden lg:block">
              <div className="flex items-center justify-between mb-8">
                {journeySteps.map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div className="text-center animate-scale-in" style={{ animationDelay: `${index * 0.2}s` }}>
                      <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${step.bgColor} rounded-full flex items-center justify-center border border-border shadow-glow mb-4 hover:scale-110 transition-spring`}>
                        <step.icon className={`w-8 h-8 ${step.color}`} />
                      </div>
                      <div className="text-sm font-medium text-muted-foreground">
                        Step {index + 1}
                      </div>
                    </div>
                    {index < journeySteps.length - 1 && (
                      <div className="flex-1 mx-8">
                        <div className="h-0.5 bg-gradient-to-r from-accent to-primary relative">
                          <ChevronRight className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-4 h-4 text-primary bg-background rounded-full p-0.5" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Journey Cards */}
            <div className="grid lg:grid-cols-4 gap-8">
              {journeySteps.map((step, index) => (
                <div 
                  key={index}
                  className="group relative bg-gradient-card rounded-xl p-6 border border-border shadow-card hover:shadow-glow transition-smooth hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Mobile step icon */}
                  <div className="lg:hidden mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${step.bgColor} rounded-full flex items-center justify-center border border-border shadow-glow`}>
                      <step.icon className={`w-6 h-6 ${step.color}`} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-gradient transition-smooth">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {step.description}
                      </p>
                      <p className="text-xs text-muted-foreground/80">
                        {step.details}
                      </p>
                    </div>

                    {/* Progress indicator */}
                    <div className="pt-4">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <span>Progress</span>
                        <span>{25 * (index + 1)}%</span>
                      </div>
                      <div className="w-full bg-border rounded-full h-1.5">
                        <div 
                          className={`h-1.5 bg-gradient-to-r ${step.bgColor} rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${25 * (index + 1)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Hover effects */}
                  <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-5 rounded-xl transition-smooth" />
                  <div className="absolute -inset-0.5 bg-gradient-hero opacity-0 group-hover:opacity-20 rounded-xl blur transition-smooth -z-10" />
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-16">
              <div className="bg-gradient-card rounded-xl p-8 border border-border shadow-card">
                <h3 className="text-2xl font-bold mb-4">
                  Ready to Transform Learning?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Join schools already using EmpathAI to build empathy, emotional intelligence, and social skills through the power of storytelling.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-gradient-hero text-white px-8 py-3 rounded-lg font-semibold shadow-glow hover:shadow-card hover:scale-105 transition-spring">
                    Start Free Trial
                  </button>
                  <button className="bg-card/50 backdrop-blur-sm text-foreground border border-border px-8 py-3 rounded-lg font-medium hover:bg-card/80 transition-smooth">
                    Schedule Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LearningJourneySection