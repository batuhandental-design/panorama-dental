import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Phone } from "lucide-react";
import Navbar from "../components/home/Navbar";
import TopBar from "../components/home/TopBar";
import Footer from "../components/home/Footer";
import WhatsAppButton from "../components/home/WhatsAppButton";
import { useLanguage } from "@/lib/LanguageContext";
import ShortsSlider from "../components/treatments/ShortsSlider";
import ImplantVideoSlider from "../components/treatments/ImplantVideoSlider";

function TreatmentHeroMedia({ slug, treatment }) {
  const videoSlugs = {
    "dis-implanti": "le2ByOnKauA",      // ALAN D (hero arka plan)
    "zirkonyum-kaplama": "tx1T29Bn50c", // ALAN E (hero arka plan)
    "hollywood-gulusu": "aAF7fwQYHX0",  // ALAN F (hero arka plan)
  };

  if (videoSlugs[slug]) {
    const videoId = videoSlugs[slug];
    return (
      <>
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&rel=0&modestbranding=1&playsinline=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            sandbox="allow-scripts allow-same-origin allow-presentation allow-autoplay"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Video"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "177.78vh",
              height: "100%",
              minWidth: "100%",
              minHeight: "56.25vw",
              border: "none",
              pointerEvents: "none",
            }}
          />
        </div>
        <div className="absolute inset-0 bg-[#2c2419]/55" />
      </>
    );
  }

  return (
    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #2c2419 0%, #4a3728 60%, #3d3028 100%)" }} />
  );
}

const heroImages = {
  "dis-implanti": "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&q=80",
  "hollywood-gulusu": "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80",
  "dis-beyazlatma": "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=1200&q=80",
  "zirkonyum-kaplama": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
  "kemik-grefti": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
  "dis-teli-ortodonti": "https://images.unsplash.com/photo-1583911546473-407bb47c6b79?w=1200&q=80",
};

const detailImages = {
  "dis-implanti": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
  "hollywood-gulusu": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
  "dis-beyazlatma": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
  "zirkonyum-kaplama": "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80",
  "kemik-grefti": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
  "dis-teli-ortodonti": "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&q=80",
};

export default function TreatmentDetail() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const treatment = t.treatments?.[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!treatment) {
    return (
      <div className="min-h-screen bg-[#f7f3ef] flex flex-col">
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100 }}>
          <TopBar />
          <Navbar />
        </div>
        <div className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center">
            <p className="text-6xl mb-4">🦷</p>
            <h2 className="text-2xl font-bold text-[#2d2419] mb-4">{t.notFound}</h2>
            <Link to="/" className="text-[#8B6840] underline">{t.backHome}</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f3ef] font-inter">
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100 }}>
        <TopBar />
        <Navbar />
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ minHeight: 600 }}>
        <TreatmentHeroMedia slug={slug} treatment={treatment} />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#c9a87c] text-sm uppercase tracking-[0.3em] mb-3 font-medium drop-shadow-lg"
          >
            {treatment.subtitle}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white font-playfair mb-4 drop-shadow-lg"
          >
            {treatment.emoji} {treatment.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="pointer-events-auto"
          >
            <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-[#c9a87c] transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" />
              {t.backHome}
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-14 mb-16">
          {/* Description */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2d2419] font-playfair mb-4">{t.treatmentAbout}</h2>
            <p className="text-[#6b5e52] leading-relaxed mb-8 text-[15px]">{treatment.description}</p>
            <h3 className="text-lg font-bold text-[#2d2419] mb-4">{t.treatmentBenefits}</h3>
            <div className="grid grid-cols-2 gap-3">
              {treatment.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#8B6840] flex-shrink-0" />
                  <span className="text-[#4a3728] text-sm">{b}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image / Video */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {slug === "dis-implanti" ? (
              // ALAN G (diş implantı - kaydırmalı video slider)
              <ImplantVideoSlider />
            ) : slug === "zirkonyum-kaplama" ? (
              // ALAN H (zirkonyum detay video - dikey)
              <div className="rounded-2xl overflow-hidden shadow-xl bg-black flex items-center justify-center" style={{ height: 480 }}>
                <iframe
                  src="https://www.youtube.com/embed/d2zBWP36aec?autoplay=1&mute=1&loop=1&playlist=d2zBWP36aec&controls=0&rel=0&modestbranding=1&playsinline=1"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  sandbox="allow-scripts allow-same-origin allow-presentation allow-autoplay"
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{ width: "270px", height: "100%", border: "none" }}
                />
              </div>
            ) : slug === "hollywood-gulusu" ? (
              <ShortsSlider />
            ) : null}

            {/* Sinus Lifting Info - only for bone graft */}
            {slug === "kemik-grefti" && (
              <div className="bg-white border border-[#e0d8d0] rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🦴</span>
                  <h3 className="text-lg font-bold text-[#2d2419] font-playfair">{t.sinusLiftTitle}</h3>
                </div>
                <p className="text-[#6b5e52] leading-relaxed text-[15px]">{t.sinusLiftDesc}</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#2d2419] font-playfair text-center mb-4">
            {t.treatmentProcess}
          </h2>
          {treatment.descriptionExtra && (
            <p className="text-[#6b5e52] leading-relaxed text-[15px] text-center max-w-2xl mx-auto mb-10">{treatment.descriptionExtra}</p>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {treatment.steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white border border-[#e0d8d0] rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 mx-auto bg-[#8B6840] text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                  {s.step}
                </div>
                <h4 className="font-bold text-[#2d2419] mb-2 text-sm">{s.title}</h4>
                <p className="text-[#6b5e52] text-xs leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="rounded-3xl text-center px-8 py-14"
          style={{ background: "linear-gradient(135deg, #2c2419 0%, #4a3728 50%, #3d3028 100%)" }}
        >
          <p className="text-[#c9a87c] text-xs uppercase tracking-[0.25em] mb-3 font-semibold">{t.treatmentCtaBadge}</p>
          <h3 className="text-white text-2xl md:text-3xl font-bold font-playfair mb-3">
            {treatment.title}
          </h3>
          <p className="text-[#b0a090] text-sm mb-8 max-w-lg mx-auto">
            {t.treatmentCtaDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/905551896062"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#20bb5a] transition-all shadow-lg text-sm uppercase tracking-wider"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.849L.057 23.882l6.204-1.448A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.876 9.876 0 01-5.034-1.376l-.361-.214-3.741.873.937-3.63-.235-.374A9.851 9.851 0 012.106 12C2.106 6.525 6.525 2.106 12 2.106c5.476 0 9.894 4.419 9.894 9.894 0 5.476-4.418 9.894-9.894 9.894z"/>
              </svg>
              {t.treatmentCtaBtn1}
            </a>
            <a
              href="tel:+905551896062"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white/20 text-white font-bold rounded-xl hover:border-[#c9a87c] hover:text-[#c9a87c] transition-all text-sm uppercase tracking-wider"
            >
              <Phone className="w-4 h-4" />
              {t.treatmentCtaBtn2}
            </a>
          </div>
        </motion.div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}