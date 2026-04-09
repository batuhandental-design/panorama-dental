import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#2c2419] via-[#4a3728] to-[#3d3028] min-h-[80vh] flex items-center justify-center overflow-hidden font-inter">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c9a87c]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#c9a87c]/10 rounded-full blur-3xl" />

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[#c9a87c] text-sm md:text-base uppercase tracking-[0.3em] mb-4 font-medium"
        >
          İstanbul, Türkiye — Diş Kliniği
        </motion.p>
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
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Hollywood gülüşü, diş implantları ve kozmetik diş tedavileri ile özgüveninizi yeniden keşfedin.
          Uzman diş hekimlerimiz en son teknoloji ile hizmetinizdedir.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#services"
            className="px-8 py-3.5 bg-[#8B6840] text-white font-semibold rounded-lg hover:bg-[#7a5c38] transition-all shadow-lg shadow-[#8B6840]/25 text-sm uppercase tracking-wider"
          >
            Diş Tedavileri
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-[#c9a87c] hover:text-[#c9a87c] transition-all text-sm uppercase tracking-wider"
          >
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
              <span>📞 7/24 Ücretsiz Danışmanlık Hattı</span>
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