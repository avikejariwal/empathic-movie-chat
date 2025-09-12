import HeroSection from "@/components/HeroSection"
import StatsResearchSection from "@/components/StatsResearchSection"
import CharacterSelectionSection from "@/components/CharacterSelectionSection"
import ChatExperienceSection from "@/components/ChatExperienceSection"
import ExpertsSection from "@/components/ExpertsSection"
import LearningProcessSection from "@/components/LearningProcessSection"
import CallToActionSection from "@/components/CallToActionSection"
import Footer from "@/components/Footer"
import ScrollProgressBar from "@/components/ScrollProgressBar"

const Index = () => {
  return (
    <div className="snap-container overflow-y-scroll h-screen">
      <ScrollProgressBar />
      <HeroSection />
      <StatsResearchSection />
      <CharacterSelectionSection />
      <ChatExperienceSection />
      <ExpertsSection />
      <LearningProcessSection />
      <CallToActionSection />
      <Footer />
    </div>
  );
};

export default Index;
