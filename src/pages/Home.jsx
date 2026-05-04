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
import PatientReviews from "../components/home/PatientReviews.jsx";
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
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-[#f7f3ef]">
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100 }}>
        <TopBar />
        <Navbar />
      </div>
      <HeroSection />
      <LanguageSwitcher />
      <ServicesGrid />
      <LabVideoSection />
      <StatsSection />
      <BeforeAfterSection />
      <DoctorSection />
      <PatientReviews />
      <WhyUsSection />
      <PackageServices />
      <DepartmentsSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}