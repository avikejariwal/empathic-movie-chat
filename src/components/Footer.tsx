import { Button } from "@/components/ui/button"
import { Calendar, Download, Mail, Phone } from "lucide-react"

const Footer = () => {
  const partnerLogos = [
    "Partner School 1",
    "Partner School 2", 
    "Partner School 3",
    "Partner School 4"
  ]

  return (
    <footer className="bg-gradient-light border-t border-border flex items-center justify-center py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-montserrat">
            Bring <span className="text-gradient">EmpathAI</span> to Your School
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-opensans">
            Transform how your students learn empathy and social-emotional skills through interactive storytelling and AI-powered conversations.
          </p>
          
          <div className="flex justify-center mb-12">
            <Button variant="hero" size="xl" className="group">
              <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Book a Demo
            </Button>
          </div>

          {/* Contact Options */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
            <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6 border border-border">
               <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
               <h4 className="font-semibold mb-2">Email Us</h4>
               <p className="text-sm text-muted-foreground">hello@getsetlearn.ai</p>
             </div>
             <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6 border border-border">
               <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Call Us</h4>
              <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
            </div>
          </div>

          {/* Partners Section */}
          <div className="border-t border-border pt-8 mb-8">
            <h3 className="text-lg font-semibold text-muted-foreground mb-6">
              Trusted by Educational Institutions
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
              {partnerLogos.map((partner, index) => (
                <div 
                  key={index}
                  className="bg-card/20 backdrop-blur-sm rounded-lg px-6 py-3 border border-border opacity-60 hover:opacity-100 transition-smooth"
                >
                  <span className="text-sm font-medium text-muted-foreground">
                    {partner}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-border pt-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AI</span>
              </div>
              <div>
                <h4 className="font-bold">EmpathAI</h4>
                <p className="text-xs text-muted-foreground">by Get Set Learn</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-smooth">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-smooth">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-smooth">Support</a>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © 2024 Get Set Learn. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer