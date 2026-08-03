import ContactSection from "../components/landing/ContactSection";
import FAQSection from "../components/landing/FAQSection";
import Footer from "../components/landing/Footer";
import HeroSection from "../components/landing/HeroSection";
import HowItWorks from "../components/landing/HowItWorks";
import LandingNavbar from "../components/landing/LandingNavbar";
import MealPlans from "../components/landing/MealPlans";
import MenuPreview from "../components/landing/MenuPreview";
import ReferFriend from "../components/landing/ReferFriend";
import { useTheme } from "../context/ThemeContext";

const Landing = () => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen font-serif ${
        darkMode ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      <LandingNavbar />
      <HeroSection />
      <HowItWorks />
      <MealPlans />
      <MenuPreview />
      <FAQSection />
      <ReferFriend />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Landing;