import { motion } from "framer-motion";
import { Plane, Hotel, Car, Languages } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const icons = [Plane, Hotel, Car, Languages];

export default function PackageServices() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-[#ede8e0] font-inter">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#8B6840] text-sm uppercase tracking-[0.3em] mb-3">{t.packagesLabel}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2419] font-playfair">{t.packagesTitle}</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.packages.map((pkg, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-gradient-to-br from-[#f7f3ef] to-[#e4dcd2] border border-[#d4c9bc] rounded-2xl p-6 text-center hover:border-primary/30 transition-all group"
              >
                <div className="w-14 h-14 mx-auto bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-7 h-7 text-[#8B6840]" />
                </div>
                <h3 className="text-lg font-bold text-[#2d2419] mb-3">{pkg.title}</h3>
                <p className="text-[#6b5e52] text-sm leading-relaxed">{pkg.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}