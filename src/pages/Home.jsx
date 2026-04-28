import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LanguageSwitcher from "../components/home/LanguageSwitcher";
import TopBar from "../components/home/TopBar";
import Navbar from "../components/home/Navbar.jsx";
import HeroSection from "../components/home/HeroSection.jsx";
import ServicesGrid from "../components/home/ServicesGrid";
import StatsSection from "../components/home/StatsSection.jsx";
import LabVideoSection from "../components/home/LabVideoSection";
import DoctorSection from "../components/home/DoctorSection.jsx";
import WhyUsSection from "../components/home/WhyUsSection.jsx";
import PackageServices from "../components/home/PackageServices.jsx";
import DepartmentsSection from "../components/home/DepartmentsSection.jsx";
import BeforeAfterSection from "../components/home/BeforeAfterSection.jsx";
import ContactSection from "../components/home/ContactSection.jsx";
import Footer from "../components/home/Footer";
import WhatsAppButton from "../components/home/WhatsAppButton";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-[#f7f3ef]">
      <TopBar />
      <Navbar />
      <HeroSection />
      <LanguageSwitcher />
      <ServicesGrid />
      <LabVideoSection />
      <StatsSection />
      <BeforeAfterSection />
      <DoctorSection />
      <WhyUsSection />
      <PackageServices />
      <DepartmentsSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}