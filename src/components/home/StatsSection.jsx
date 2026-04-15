import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const values = ["12+", "8.000+", "5.000+", "98%"];

export default function StatsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-[#8B6840] font-inter">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {t.stats.map((label, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-bold text-white mb-2 font-playfair">{values[i]}</p>
              <p className="text-white/80 text-sm font-medium uppercase tracking-wider">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}