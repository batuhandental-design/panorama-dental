import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/LanguageContext";

const hrefs = [
  "/tedavi/dis-implanti",
  "/tedavi/hollywood-gulusu",
  "/tedavi/zirkonyum-kaplama",
  "/tedavi/dis-beyazlatma",
  "/tedavi/hollywood-gulusu",
  "/tedavi/dis-teli-ortodonti",
  "/#contact",
  "/#contact",
  "/tedavi/kemik-grefti",
  "/tedavi/dis-implanti",
  "/#contact",
  "/#contact",
];

export default function DepartmentsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-[#f7f3ef] font-inter" id="departments">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#8B6840] text-sm uppercase tracking-[0.3em] mb-3 font-medium">{t.deptLabel}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2419] font-playfair mb-4">{t.deptTitle}</h2>
          <p className="text-[#6b5e52] max-w-2xl mx-auto leading-relaxed">{t.deptDesc}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {t.departments.map((label, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                to={hrefs[i]}
                className="block bg-gradient-to-br from-[#ede8e0] to-[#e4dcd2] border border-[#d4c9bc] rounded-xl p-5 text-center hover:border-[#8B6840]/40 hover:shadow-sm transition-all group"
              >
                <h3 className="text-[#2d2419] font-semibold text-sm group-hover:text-[#8B6840] transition-colors">{label}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}