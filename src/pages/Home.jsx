import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LanguageSwitcher from "../components/home/LanguageSwitcher";
import TopBar from "../components/home/TopBar";
import Navbar from "../components/home/Navbar.jsx";
import HeroSection from "../components/home/HeroSection.jsx";
import ServicesGrid from "../components/home/ServicesGrid";
import StatsSection from "../components/home/StatsSection.jsx";
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
      <StatsSection />
      <BeforeAfterSection />
      <DoctorSection />
      <WhyUsSection />
      <PackageServices />
      <DepartmentsSection />
      <div className="bg-[#f7f3ef] w-full overflow-hidden">
        <img
          src="https://media.base44.com/images/public/69d79ff6631966558dbdfca2/f4942647e_image.png"
          alt="Sertifikalar ve Partnerler"
          className="w-full object-cover"
          style={{ mixBlendMode: "multiply", display: "block" }}
        />
      </div>
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}