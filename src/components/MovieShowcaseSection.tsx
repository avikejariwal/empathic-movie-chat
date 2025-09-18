import { Button } from "@/components/ui/button"
import { Play, Film } from "lucide-react"
import nikhilPoster from "@/assets/nikhil-avatar.png"
import nikhilAvatar from "@/assets/nikhil-avatar.png";
import rajatAvatar from "@/assets/rajat-avatar.png";
import tanviAvatar from "@/assets/tanvi-avatar.png";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const MovieShowcaseSection = () => {
  const {
    ref: charactersRef,
    isIntersecting: charactersVisible
  } = useIntersectionObserver();
  
  const characters = [{
    name: "Nikhil",
    role: "The Class Clown",
    avatar: nikhilAvatar,
    description: "Learn empathy through his journey of self-discovery"
  }, {
    name: "Rajat",
    role: "The Target",
    avatar: rajatAvatar,
    description: "Experience the impact of bullying from his perspective"
  }, {
    name: "Tamanna",
    role: "The Observer",
    avatar: tanviAvatar,
    description: "Understand the bystander's role in creating change"
  }];
  
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground font-montserrat">
              Experience Now!
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto font-opensans">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 movie-overlay transition-smooth" />
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent movie-overlay opacity-0 transition-smooth">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4">
                      <h3 className="text-xl font-bold mb-2 text-white">Nikhil, the Class Clown</h3>
                      <p className="text-sm text-white/80 mb-3">
                        Experience empathy through the eyes of a classroom bully learning the impact of his actions.
                      </p>
                      <Button variant="netflix" size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        Start Learning
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-lg font-semibold">Available Now</h3>
                <p className="text-primary font-medium">Featured Learning Movie</p>
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 movie-overlay transition-smooth" />
              </div>
            </div>
          </div>

          {/* Character Selection */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 font-montserrat">
                Learn by stepping into their world
              </h3>
              <p className="text-muted-foreground font-opensans">
                Each perspective offers unique lessons in empathy and understanding
              </p>
            </div>

            <div ref={charactersRef} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 transition-all duration-1000 ${charactersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              {characters.map((character, index) => <div key={index} className={`group relative bg-gradient-card rounded-xl p-5 border border-border shadow-card hover:shadow-glow transition-all duration-700 hover:scale-105 cursor-pointer ${charactersVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`} style={{
              transitionDelay: `${index * 200}ms`
            }}>
                  <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-3">
                      <img src={character.avatar} alt={`${character.name} avatar`} className={`w-full h-full rounded-full object-cover border-2 border-accent shadow-glow transition-all duration-500 ${charactersVisible ? 'scale-100' : 'scale-0'}`} style={{
                    transitionDelay: `${index * 200 + 300}ms`
                  }} />
                      <div className="absolute inset-0 rounded-full bg-gradient-hero opacity-0 group-hover:opacity-20 transition-smooth" />
                    </div>
                    <h4 className="text-lg font-bold mb-1 font-montserrat">{character.name}</h4>
                    <p className="text-primary font-medium mb-2 text-sm font-opensans">{character.role}</p>
                    <p className="text-xs text-muted-foreground font-opensans">
                      {character.description}
                    </p>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-10 rounded-xl transition-smooth" />
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MovieShowcaseSection