import { Button } from "@/components/ui/button"
import { ArrowLeft, Play } from "lucide-react"
import { Link } from "react-router-dom"

const Demo = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-6">
        <div className="container mx-auto px-4">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Demo Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-foreground font-montserrat">
            Interactive Learning Demo
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-opensans">
            Experience empathy through Nikhil's journey as a class clown learning about the impact of bullying.
          </p>

          <div className="bg-gradient-card rounded-2xl p-8 border border-border shadow-card mb-8">
            <div className="aspect-video bg-muted/20 rounded-lg flex items-center justify-center mb-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Play className="w-10 h-10 text-primary-foreground" />
                </div>
                <p className="text-lg font-medium text-foreground">Demo Content Loading...</p>
                <p className="text-sm text-muted-foreground">Interactive learning experience will begin here</p>
              </div>
            </div>
            
            <Button variant="hero" size="lg">
              <Play className="w-5 h-5 mr-2" />
              Start Interactive Experience
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-card rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold mb-2 font-montserrat">Empathy Building</h3>
              <p className="text-sm text-muted-foreground font-opensans">
                Step into different perspectives to understand the impact of actions
              </p>
            </div>
            
            <div className="bg-gradient-card rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold mb-2 font-montserrat">Interactive Scenarios</h3>
              <p className="text-sm text-muted-foreground font-opensans">
                Make decisions and see their consequences in real-time
              </p>
            </div>
            
            <div className="bg-gradient-card rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold mb-2 font-montserrat">Learning Outcomes</h3>
              <p className="text-sm text-muted-foreground font-opensans">
                Gain insights into bullying prevention and empathy
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Demo