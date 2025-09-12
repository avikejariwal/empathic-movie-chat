import HeroSection from "@/components/HeroSection"
import StatsSection from "@/components/StatsSection"
import ChatExperienceSection from "@/components/ChatExperienceSection"
import ExpertsSection from "@/components/ExpertsSection"
import LearningJourneySection from "@/components/LearningJourneySection"
import Footer from "@/components/Footer"

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <ChatExperienceSection />
      <ExpertsSection />
      <LearningJourneySection />
      <Footer />
    </div>
  );
};

export default Index;
