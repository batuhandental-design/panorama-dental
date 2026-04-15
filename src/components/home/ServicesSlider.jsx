import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/LanguageContext";

const slugs = ["hollywood-gulusu", "dis-implanti", "dis-beyazlatma", "zirkonyum-kaplama", "kemik-grefti", "dis-teli-ortodonti"];
const emojis = ["😊", "🦷", "🪥", "💎", "🦴", "😁"];

export default function ServicesSlider() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-[#2c2419] font-inter" id="operations">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {t.services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Link
                to={`/tedavi/${slugs[i]}`}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-20 h-20 rounded-full bg-[#8B6840] flex items-center justify-center mb-4 group-hover:bg-[#c9a87c] transition-colors duration-300 shadow-lg shadow-[#8B6840]/30">
                  <span className="text-3xl">{emojis[i]}</span>
                </div>
                <p className="text-[#9c8e84] text-xs uppercase tracking-wider mb-1 font-medium">
                  {t.sliderCategory}
                </p>
                <h3 className="text-white font-bold text-base leading-tight group-hover:text-[#c9a87c] transition-colors duration-300">
                  {service.title}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}