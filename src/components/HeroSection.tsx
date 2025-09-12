import { Button } from "@/components/ui/button"
import { Play, Shield, Bot, Film } from "lucide-react"
import nikhilPoster from "@/assets/nikhil-poster.jpg"

const HeroSection = () => {
  return (
    <section className="h-screen bg-gradient-dark relative overflow-hidden flex items-center justify-center snap-section">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10" />
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-6xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Learn Through&nbsp;
              <span className="text-gradient">Stories</span>
              {" "}&{" "}
              <span className="text-gradient">Conversations</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Start with <strong className="text-foreground">Nikhil, the Class Clown</strong> — the first in our series of interactive learning movies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="hero" size="xl" className="group">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Experience EmpathAI
              </Button>
              <Button variant="glass" size="xl">
                <Film className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Value Props */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm rounded-full px-4 py-2 border border-border">
                <Film className="w-4 h-4 text-accent" />
                <span>Movie-based learning</span>
              </div>
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm rounded-full px-4 py-2 border border-border">
                <Bot className="w-4 h-4 text-accent" />
                <span>AI character conversations</span>
              </div>
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm rounded-full px-4 py-2 border border-border">
                <Shield className="w-4 h-4 text-accent" />
                <span>Safe & expert-guided</span>
              </div>
            </div>
          </div>

          {/* Movie Showcase */}
          <div className="grid md:grid-cols-3 gap-8 items-center">
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