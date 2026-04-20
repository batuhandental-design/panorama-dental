import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/LanguageContext";

const slugs = [
  "dis-implanti",
  "hollywood-gulusu",
  "dis-beyazlatma",
  "zirkonyum-kaplama",
  "kemik-grefti",
  "dis-teli-ortodonti",
];

const cardColors = [
  { bg: "from-[#e8f4f8] to-[#d0eaf5]", text: "#1a6a8a", border: "#7ec8e3" },
  { bg: "from-[#fff8e8] to-[#ffefc0]", text: "#a07820", border: "#f5c842" },
  { bg: "from-[#f0f8ff] to-[#ddeeff]", text: "#1a5080", border: "#88aadd" },
  { bg: "from-[#eef8f0] to-[#d4f0da]", text: "#1a7a3a", border: "#6dc88a" },
  { bg: "from-[#fdf0e8] to-[#f5ddc8]", text: "#8a4010", border: "#e09060" },
  { bg: "from-[#f5eeff] to-[#e8d8ff]", text: "#5a20a0", border: "#b088ee" },
];

export default function ServicesGrid() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-[#f7f3ef] font-inter" id="services">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#8B6840] text-sm uppercase tracking-[0.3em] mb-3 font-medium">{t.servicesLabel}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2419] font-playfair">
            {t.servicesTitle}
          </h2>
          <p className="text-[#6b5e52] mt-4 max-w-xl mx-auto">
            {t.servicesDesc}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.map((service, i) => {
            const c = cardColors[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group"
              >
                <Link
                  to={`/tedavi/${slugs[i]}`}
                  className={`bg-gradient-to-br ${c.bg} rounded-2xl p-8 text-center transition-all duration-300 h-full flex flex-col cursor-pointer block shadow-sm hover:shadow-xl`}
                  style={{ border: `1.5px solid ${c.border}` }}
                >
                  {/* Animated title badge */}
                  <motion.div
                    className="mb-5 flex items-center justify-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                  >
                    <span
                      className="inline-flex items-center justify-center px-4 py-2 rounded-xl font-bold text-sm uppercase tracking-widest shadow-md"
                      style={{ background: c.border + "40", color: c.text, border: `1.5px solid ${c.border}` }}
                    >
                      {service.title}
                    </span>
                  </motion.div>

                  <h3 className="text-xl font-bold text-[#2d2419] mb-3 font-playfair">{service.title}</h3>
                  <p className="text-[#6b5e52] text-sm leading-relaxed flex-grow mb-5">{service.desc}</p>
                  <motion.span
                    className="inline-block px-5 py-2 rounded-lg font-semibold text-sm uppercase tracking-wider transition-all"
                    style={{ background: c.border + "30", color: c.text }}
                    whileHover={{ background: c.border, color: "#fff" }}
                  >
                    {t.exploreBtn}
                  </motion.span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}