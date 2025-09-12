import HeroSection from "@/components/HeroSection"
import StatsAndCharactersSection from "@/components/StatsAndCharactersSection"
import ChatExperienceSection from "@/components/ChatExperienceSection"
import ExpertsSection from "@/components/ExpertsSection"
import LearningProcessSection from "@/components/LearningProcessSection"
import Footer from "@/components/Footer"
import ScrollProgressBar from "@/components/ScrollProgressBar"

const Index = () => {
  return (
    <div className="snap-container overflow-y-scroll h-screen">
      <ScrollProgressBar />
      <HeroSection />
      <StatsAndCharactersSection />
      <ChatExperienceSection />
      <ExpertsSection />
      <LearningProcessSection />
      <Footer />
    </div>
  );
};

export default Index;
