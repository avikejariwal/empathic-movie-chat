import { Button } from "@/components/ui/button"
import { Play, Film } from "lucide-react"
import nikhilPoster from "@/assets/nikhil-poster.jpg"

const MovieShowcaseSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
              Experience Now!
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Start with Nikhil, the Class Clown. Lessons on Empathy delivered through a relatable story about bullying.
            </p>
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

export default MovieShowcaseSection