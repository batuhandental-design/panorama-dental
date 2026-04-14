import { useState } from "react";
import { ChevronLeft, ChevronRight, Smile, Sparkles, Star, Gem, Bone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    icon: Smile,
    title: "Hollywood Gülüşü",
    subtitle: "Hollywood Smile",
    slug: "hollywood-gulusu",
    description: "Porselen laminate ve zirkonyum kaplamalar kullanarak diş tasarımı yapıyoruz. Estetik ve doğal görünümlü gülüşünüze kavuşun.",
  },
  {
    icon: Sparkles,
    title: "Diş İmplantı",
    subtitle: "Dental Implant",
    slug: "dis-implanti",
    description: "Eksik dişleriniz için en kalıcı ve doğal görünümlü çözüm. All-on-4 ve All-on-6 implant sistemleriyle tam ağız restorasyonu.",
  },
  {
    icon: Star,
    title: "Diş Beyazlatma",
    subtitle: "Teeth Whitening",
    slug: "dis-beyazlatma",
    description: "Profesyonel laser diş beyazlatma ile dişlerinizi birkaç ton açın. Hızlı, güvenli ve uzun süreli beyazlık garantisi.",
  },
  {
    icon: Gem,
    title: "Zirkonyum Kaplama",
    subtitle: "Zirconia Crown",
    slug: "zirkonyum-kaplama",
    description: "Metal içermeyen tam seramik yapısıyla en doğal görünümü sunan diş kaplaması. Işık geçirgenliği sayesinde doğal dişten ayırt edilemez.",
  },
  {
    icon: Bone,
    title: "Kemik Grefti",
    subtitle: "Bone Graft",
    slug: "kemik-grefti",
    description: "Diş kaybına bağlı kemik erimesi olan hastalarda implant uygulaması öncesi kemik hacmini yeniden kazandıran prosedür.",
  },
];

export default function ServicesSlider() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % services.length);
  const prev = () => setCurrent((prev) => (prev - 1 + services.length) % services.length);

  return (
    <section className="py-20 bg-[#f0ece5] font-inter" id="operations">
      <div className="max-w-4xl mx-auto px-10">
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.35 }}
              className="py-14 px-6 text-center"
            >
              {/* Icon box */}
              <div className="w-20 h-20 mx-auto bg-[#ede8e0] border border-[#d4c9bc] rounded-2xl flex items-center justify-center mb-7 shadow-sm">
                {(() => {
                  const Icon = services[current].icon;
                  return <Icon className="w-9 h-9 text-[#8B6840]" />;
                })()}
              </div>

              {/* Subtitle */}
              <p className="text-[#8B6840] text-xs uppercase tracking-[0.3em] mb-2 font-semibold">
                {services[current].subtitle}
              </p>

              {/* Title */}
              <h3 className="text-3xl md:text-4xl font-bold text-[#2d2419] mb-5 font-playfair">
                {services[current].title}
              </h3>

              {/* Description */}
              <p className="text-[#6b5e52] max-w-lg mx-auto mb-8 leading-relaxed text-[15px]">
                {services[current].description}
              </p>

              {/* Buttons */}
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <a
                  href={`/tedavi/${services[current].slug}`}
                  className="px-7 py-3 bg-[#6b4e2a] text-white rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-[#5a3f22] transition-all"
                >
                  Devamını Oku
                </a>
                <a
                  href="#contact"
                  className="px-7 py-3 border-2 border-[#b0a090] text-[#4a3728] rounded-lg font-bold text-sm uppercase tracking-wider hover:border-[#8B6840] hover:text-[#8B6840] transition-all bg-transparent"
                >
                  Ücretsiz Konsültasyon
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Prev arrow */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-[#d4c9bc] rounded-full flex items-center justify-center text-[#4a3728] hover:bg-[#8B6840] hover:text-white hover:border-[#8B6840] transition-all shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next arrow */}
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-[#d4c9bc] rounded-full flex items-center justify-center text-[#4a3728] hover:bg-[#8B6840] hover:text-white hover:border-[#8B6840] transition-all shadow-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "bg-[#8B6840] w-7" : "bg-[#c9bfb4] w-2"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}