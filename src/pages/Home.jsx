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
import BeforeAfterSection from "../components/home/BeforeAfterSection";
import ContactSection from "../components/home/ContactSection";
import Footer from "../components/home/Footer";
import WhatsAppButton from "../components/home/WhatsAppButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f3ef]">
      <TopBar />
      <Navbar />
      <HeroSection />
      <ServicesSlider />
      <ServicesGrid />
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