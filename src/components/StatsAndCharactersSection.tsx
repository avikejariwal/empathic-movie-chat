import { Brain, Users, Eye, Headphones, Hand } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
const StatsAndCharactersSection = () => {
  const {
    ref: statsRef,
    isIntersecting: statsVisible
  } = useIntersectionObserver();
  const stats = [{
    value: "50%",
    label: "retention vs lectures",
    icon: Brain
  }, {
    value: "24.7%",
    label: "engagement increase",
    icon: Users
  }, {
    value: "400%",
    label: "improvement through visuals",
    icon: Eye
  }];
  const learnerTypes = [{
    type: "Visual",
    icon: Eye,
    color: "text-accent"
  }, {
    type: "Auditory",
    icon: Headphones,
    color: "text-primary"
  }, {
    type: "Kinesthetic",
    icon: Hand,
    color: "text-accent"
  }];
  return <section className="bg-background flex items-center justify-center py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Stats Section - Top Half */}
          <div className="mb-12">
            <div className="text-center mb-10 animate-fade-in">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 font-montserrat">
                Why <span className="text-gradient">Stories</span> Work
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto font-proxima">Studies have shown that use of visuals and stories lead to </p>
            </div>

            <div ref={statsRef} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 transition-all duration-1000 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              {stats.map((stat, index) => <div key={index} className={`text-center p-4 bg-gradient-card rounded-xl border border-border shadow-card hover:shadow-glow transition-all duration-700 hover:scale-105 hover:rotate-1 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
              transitionDelay: `${index * 200}ms`
            }}>
                  <stat.icon className={`w-8 h-8 text-accent mx-auto mb-3 transition-all duration-500 ${statsVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`} style={{
                transitionDelay: `${index * 200 + 300}ms`
              }} />
                  <div className={`text-3xl font-bold text-gradient mb-2 transition-all duration-700 ${statsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} style={{
                transitionDelay: `${index * 200 + 500}ms`
              }}>
                    {stat.value} ↑
                  </div>
                  <p className="text-sm text-muted-foreground capitalize">{stat.label}</p>
                </div>)}
            </div>

            {/* Learner Types */}
            <div className="text-center">
              <div className="flex justify-center gap-6 flex-wrap">
                {learnerTypes.map((learner, index) => <div key={index} className={`flex items-center gap-2 bg-card/50 backdrop-blur-sm rounded-full px-4 py-2 border border-border transition-all duration-700 hover:scale-105 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
                transitionDelay: `${index * 200 + 800}ms`
              }}>
                    <learner.icon className={`w-4 h-4 ${learner.color}`} />
                    <span className="text-sm font-medium">{learner.type}</span>
                  </div>)}
              </div>
              
              {/* Source Footnote */}
              <div className={`mt-6 transition-all duration-700 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
                transitionDelay: '1200ms'
              }}>
                <p className="text-xs text-muted-foreground/70 max-w-2xl mx-auto">
                  Source: Graesser, A. C., Singer, M., Trabasso, T. (1994) | 3M and University of Minnesota | Humanities and Social Sciences Communications
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>;
};
export default StatsAndCharactersSection;