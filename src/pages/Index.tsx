import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"
import MovieShowcaseSection from "@/components/MovieShowcaseSection"
import StatsAndCharactersSection from "@/components/StatsAndCharactersSection"
import ChatExperienceSection from "@/components/ChatExperienceSection"
import ExpertsSection from "@/components/ExpertsSection"
import LearningProcessSection from "@/components/LearningProcessSection"
import Footer from "@/components/Footer"
import ScrollProgressBar from "@/components/ScrollProgressBar"

const Index = () => {
  return (
    <div className="overflow-y-auto">
      <Header />
      <ScrollProgressBar />
      <HeroSection />
      <MovieShowcaseSection />
      <StatsAndCharactersSection />
      <ChatExperienceSection />
      <ExpertsSection />
      <LearningProcessSection />
      <Footer />
    </div>
  );
};

export default Index;
