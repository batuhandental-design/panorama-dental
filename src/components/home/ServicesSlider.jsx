import { useState } from "react";
import { ChevronLeft, ChevronRight, Smile, Scissors, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    icon: Smile,
    title: "Yüz Estetiği",
    subtitle: "Face Lifting",
    description: "Yüzünüzü gençleştirin ve doğal güzelliğinizi ortaya çıkarın. Uzman cerrahlarımızla en iyi sonuçları elde edin.",
  },
  {
    icon: Activity,
    title: "Saç Ekimi",
    subtitle: "FUE Hair Transplantation",
    description: "En son teknoloji FUE yöntemiyle doğal görünümlü, kalıcı saç ekimi çözümleri sunuyoruz.",
  },
  {
    icon: Scissors,
    title: "Vücut Şekillendirme",
    subtitle: "Vaser Liposuction",
    description: "Vaser liposuction ile fazla yağlardan kurtulun ve hayalinizdeki vücut şekline kavuşun.",
  },
];

export default function ServicesSlider() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % services.length);
  const prev = () => setCurrent((prev) => (prev - 1 + services.length) % services.length);

  return (
    <section className="py-20 bg-[#0d1b2a] font-inter" id="operations">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-br from-[#1a2940] to-[#0f2027] rounded-2xl p-8 md:p-16 text-center border border-white/5"
            >
              <div className="w-20 h-20 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                {(() => {
                  const Icon = services[current].icon;
                  return <Icon className="w-10 h-10 text-primary" />;
                })()}
              </div>
              <p className="text-primary text-sm uppercase tracking-[0.2em] mb-2 font-medium">
                {services[current].subtitle}
              </p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 font-playfair">
                {services[current].title}
              </h3>
              <p className="text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
                {services[current].description}
              </p>
              <div className="flex items-center justify-center gap-4">
                <a href="#" className="px-6 py-3 bg-primary text-white rounded-lg font-semibold text-sm uppercase tracking-wider hover:bg-primary/90 transition-all">
                  Devamını Oku
                </a>
                <a href="#contact" className="px-6 py-3 border border-white/20 text-white rounded-lg font-semibold text-sm uppercase tracking-wider hover:border-primary hover:text-primary transition-all">
                  Ücretsiz Danışmanlık
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === current ? "bg-primary w-8" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}