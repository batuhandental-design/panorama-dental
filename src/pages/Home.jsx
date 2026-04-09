import TopBar from "../components/home/TopBar";
import Navbar from "../components/home/Navbar";
import HeroSection from "../components/home/HeroSection";
import ServicesSlider from "../components/home/ServicesSlider";
import ServicesGrid from "../components/home/ServicesGrid";
import StatsSection from "../components/home/StatsSection";
import DoctorSection from "../components/home/DoctorSection";
import WhyUsSection from "../components/home/WhyUsSection";
import PackageServices from "../components/home/PackageServices";
import DepartmentsSection from "../components/home/DepartmentsSection";
import ContactSection from "../components/home/ContactSection";
import Footer from "../components/home/Footer";
import WhatsAppButton from "../components/home/WhatsAppButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d1b2a]">
      <TopBar />
      <Navbar />
      <HeroSection />
      <ServicesSlider />
      <ServicesGrid />
      <StatsSection />
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