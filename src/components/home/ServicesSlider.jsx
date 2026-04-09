import { useState } from "react";
import { ChevronLeft, ChevronRight, Smile, Sparkles, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    icon: Smile,
    title: "Hollywood Gülüşü",
    subtitle: "Hollywood Smile",
    description: "Porselen laminate ve zirkonyum kaplamalar kullanarak diş tasarımı yapıyoruz. Estetik ve doğal görünümlü gülüşünüze kavuşun.",
  },
  {
    icon: Sparkles,
    title: "Diş İmplantı",
    subtitle: "Dental Implant",
    description: "Eksik dişleriniz için en kalıcı ve doğal görünümlü çözüm. All-on-4 ve All-on-6 implant sistemleriyle tam ağız restorasyonu.",
  },
  {
    icon: Star,
    title: "Diş Beyazlatma",
    subtitle: "Teeth Whitening",
    description: "Profesyonel laser diş beyazlatma ile dişlerinizi birkaç ton açın. Hızlı, güvenli ve uzun süreli beyazlık garantisi.",
  },
];

export default function ServicesSlider() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % services.length);
  const prev = () => setCurrent((prev) => (prev - 1 + services.length) % services.length);

  return (
    <section className="py-20 bg-[#ede8e0] font-inter" id="operations">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-br from-[#f7f3ef] to-[#e4dcd2] rounded-2xl p-8 md:p-16 text-center border border-[#d4c9bc]"
            >
              <div className="w-20 h-20 mx-auto bg-[#8B6840]/10 rounded-2xl flex items-center justify-center mb-6">
                {(() => {
                  const Icon = services[current].icon;
                  return <Icon className="w-10 h-10 text-[#8B6840]" />;
                })()}
              </div>
              <p className="text-[#8B6840] text-sm uppercase tracking-[0.2em] mb-2 font-medium">
                {services[current].subtitle}
              </p>
              <h3 className="text-3xl md:text-4xl font-bold text-[#2d2419] mb-4 font-playfair">
                {services[current].title}
              </h3>
              <p className="text-[#6b5e52] max-w-xl mx-auto mb-8 leading-relaxed">
                {services[current].description}
              </p>
              <div className="flex items-center justify-center gap-4">
                <a href="#services" className="px-6 py-3 bg-[#8B6840] text-white rounded-lg font-semibold text-sm uppercase tracking-wider hover:bg-[#7a5c38] transition-all">
                  Devamını Oku
                </a>
                <a href="#contact" className="px-6 py-3 border border-[#b0a090] text-[#4a3728] rounded-lg font-semibold text-sm uppercase tracking-wider hover:border-[#8B6840] hover:text-[#8B6840] transition-all">
                  Ücretsiz Konsültasyon
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#d4c9bc] rounded-full flex items-center justify-center text-[#4a3728] hover:bg-[#8B6840] hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#d4c9bc] rounded-full flex items-center justify-center text-[#4a3728] hover:bg-[#8B6840] hover:text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === current ? "bg-[#8B6840] w-8" : "bg-[#b0a090]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}