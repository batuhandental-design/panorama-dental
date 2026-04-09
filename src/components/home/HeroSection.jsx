import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#2c2419] via-[#4a3728] to-[#3d3028] min-h-[80vh] flex items-center justify-center overflow-hidden font-inter">
      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c9a87c]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#c9a87c]/10 rounded-full blur-3xl" />

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-primary text-sm md:text-base uppercase tracking-[0.3em] mb-4 font-medium"
        >
          İstanbul, Türkiye
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold font-playfair leading-tight mb-6"
        >
          Panorama Dental'e{" "}
          <span className="text-primary">Hoşgeldiniz</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Bir hedef. Bir vizyon. Bir klinik… Güzellik dünyasına ilk adımınız olacağız.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#services"
            className="px-8 py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 text-sm uppercase tracking-wider"
          >
            Hizmetlerimiz
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-primary hover:text-primary transition-all text-sm uppercase tracking-wider"
          >
            Ücretsiz Danışmanlık
          </a>
        </motion.div>
      </div>

      {/* Marquee ticker */}
      <div className="absolute bottom-0 left-0 right-0 bg-primary/90 py-3 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="text-white text-sm font-medium mx-8 inline-flex gap-8">
              <span>👋 PANORAMA DENTAL'e Hoşgeldiniz 👋</span>
              <span>📣 Yeni teklifler için bize ulaşın 🎁</span>
              <span>✍️ Şimdi ücretsiz bir danışmanlık talep edin ✍️</span>
              <span>🧖🏻‍♀️ Güzellik dünyasına ilk adımınız olacağız 🧖🏻‍♀️</span>
              <span className="mr-8">👋 PANORAMA DENTAL'e Hoşgeldiniz 👋</span>
              <span>📣 Yeni teklifler için bize ulaşın 🎁</span>
              <span>✍️ Şimdi ücretsiz bir danışmanlık talep edin ✍️</span>
              <span>🧖🏻‍♀️ Güzellik dünyasına ilk adımınız olacağız 🧖🏻‍♀️</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}