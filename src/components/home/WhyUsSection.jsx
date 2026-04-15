import { motion } from "framer-motion";
import { Shield, Microscope, Award, Clock } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const icons = [Award, Microscope, Shield, Clock];

export default function WhyUsSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-[#f7f3ef] font-inter">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#8B6840] text-sm uppercase tracking-[0.3em] mb-3 font-medium">{t.whyLabel}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2419] font-playfair mb-4">{t.whyTitle}</h2>
          <p className="text-[#6b5e52] max-w-2xl mx-auto leading-relaxed">{t.whyDesc}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#ede8e0] border border-[#d4c9bc] rounded-2xl p-6 text-center hover:border-[#8B6840]/20 transition-all group"
            >
              <div className="w-14 h-14 mx-auto bg-[#8B6840]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#8B6840]/20 transition-colors">
                {(() => { const Icon = icons[i]; return <Icon className="w-7 h-7 text-[#8B6840]" />; })()}
              </div>
              <h3 className="text-lg font-bold text-[#2d2419] mb-3">{r.title}</h3>
              <p className="text-[#6b5e52] text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}