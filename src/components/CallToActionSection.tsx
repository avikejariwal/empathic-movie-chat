import { Button } from "@/components/ui/button"
import { Calendar, Download } from "lucide-react"

const CallToActionSection = () => {
  return (
    <section className="h-screen bg-gradient-dark flex items-center justify-center snap-section">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-card rounded-xl p-12 border border-border shadow-card">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Learning?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join schools already using EmpathAI to build empathy, emotional intelligence, and social skills through the power of storytelling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" className="group">
                <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Start Free Trial
              </Button>
              <Button variant="glass" size="xl">
                <Download className="w-5 h-5 mr-2" />
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToActionSection