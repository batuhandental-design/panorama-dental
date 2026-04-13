import { motion } from "framer-motion";
import { Phone } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden font-inter">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
          style={{ minWidth: '100%', minHeight: '100%' }}
        >
          <source src="https://videos.pexels.com/video-files/6763253/6763253-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(44,36,25,0.82) 0%, rgba(44,36,25,0.6) 50%, rgba(74,55,40,0.75) 100%)' }} />
        {/* Bottom vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to top, rgba(44,36,25,0.9), transparent)' }} />
      </div>



      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-[#8B6840]/30 backdrop-blur-sm border border-[#c9a87c]/30 text-[#c9a87c] text-xs font-semibold uppercase tracking-[0.3em] px-5 py-2.5 rounded-full mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a87c] animate-pulse"></span>
          İstanbul, Türkiye — Premium Diş Kliniği
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold font-playfair leading-tight mb-6"
        >
          Hayalinizdeki{" "}
          <span className="text-[#c9a87c]">Gülüşe</span>{" "}
          Kavuşun
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Hollywood gülüşü, diş implantları ve kozmetik diş tedavileri ile özgüveninizi yeniden keşfedin.
          Havalimanı transferinden kliniğe, VIP bir deneyim yaşayın.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#services"
            className="px-8 py-4 bg-[#8B6840] text-white font-semibold rounded-xl hover:bg-[#7a5c38] transition-all shadow-2xl shadow-[#8B6840]/40 text-sm uppercase tracking-wider"
          >
            Diş Tedavileri
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:border-[#c9a87c] hover:text-[#c9a87c] hover:bg-white/5 transition-all text-sm uppercase tracking-wider backdrop-blur-sm"
          >
            <Phone className="w-4 h-4" />
            Ücretsiz Konsültasyon
          </a>
        </motion.div>

      </div>

      {/* Marquee ticker */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#8B6840]/90 py-3 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="text-white text-sm font-medium inline-flex gap-8">
              <span>🦷 Hollywood Gülüşü — Mükemmel Sonuçlar</span>
              <span>✨ Diş İmplantları ile Kalıcı Çözümler</span>
              <span>💎 Zirkonyum Kaplama Uzmanları</span>
              <span>🪥 Diş Beyazlatma Tedavileri</span>
              <span className="mr-8">📞 7/24 Ücretsiz Danışmanlık Hattı</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}