import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const labVideos = [
  "eU477VXDyas",
  "EH5_LHpZWbw",
  "ylGQoZ7QmUo",
];

const labLabels = {
  tr: ["Zirkonyum Üretimi", "Porselen Veneer", "Dijital Tasarım"],
  en: ["Zirconia Production", "Porcelain Veneer", "Digital Design"],
  de: ["Zirkon-Produktion", "Porzellan-Veneer", "Digitales Design"],
  ar: ["إنتاج الزركونيا", "قشرة البورسلين", "التصميم الرقمي"],
  es: ["Producción Zirconia", "Veneer de Porcelana", "Diseño Digital"],
  it: ["Produzione Zirconia", "Veneer in Porcellana", "Design Digitale"],
  fr: ["Production Zircone", "Veneer Porcelaine", "Design Numérique"],
  ru: ["Производство Циркония", "Фарфоровый Винир", "Цифровой Дизайн"],
};

const sectionTitles = {
  tr: { badge: "Laboratuvarımız", title: "Sahne Arkası: Üretim Süreci", desc: "Dişleriniz için kullandığımız malzemeler en ileri teknoloji ile laboratuvarımızda üretilmektedir." },
  en: { badge: "Our Laboratory", title: "Behind the Scenes: Production", desc: "The materials we use for your teeth are produced in our laboratory with the most advanced technology." },
  de: { badge: "Unser Labor", title: "Hinter den Kulissen: Produktion", desc: "Die Materialien für Ihre Zähne werden in unserem Labor mit modernster Technologie hergestellt." },
  ar: { badge: "مختبرنا", title: "خلف الكواليس: الإنتاج", desc: "المواد التي نستخدمها لأسنانك تُنتج في مختبرنا بأحدث التقنيات." },
  es: { badge: "Nuestro Laboratorio", title: "Detrás de Escena: Producción", desc: "Los materiales que usamos para sus dientes se producen en nuestro laboratorio con la tecnología más avanzada." },
  it: { badge: "Il Nostro Laboratorio", title: "Dietro le Quinte: Produzione", desc: "I materiali che usiamo per i tuoi denti sono prodotti nel nostro laboratorio con la tecnologia più avanzata." },
  fr: { badge: "Notre Laboratoire", title: "Dans les Coulisses : Production", desc: "Les matériaux que nous utilisons pour vos dents sont produits dans notre laboratoire avec la technologie la plus avancée." },
  ru: { badge: "Наша Лаборатория", title: "За Кулисами: Производство", desc: "Материалы, которые мы используем для ваших зубов, производятся в нашей лаборатории с использованием самых передовых технологий." },
};

export default function LabVideoSection() {
  const { lang } = useLanguage();
  const labels = labLabels[lang] || labLabels.tr;
  const txt = sectionTitles[lang] || sectionTitles.tr;

  return (
    <section className="py-20 bg-[#2c2419] font-inter">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#c9a87c] text-sm uppercase tracking-[0.3em] mb-3 font-medium">{txt.badge}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair mb-4">{txt.title}</h2>
          <p className="text-[#b0a090] max-w-xl mx-auto text-sm leading-relaxed">{txt.desc}</p>
        </motion.div>

        {/* 3-column video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {labVideos.map((videoId, i) => (
            <motion.div
              key={videoId}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="flex flex-col items-center gap-3"
            >
              <div
                className="w-full rounded-2xl overflow-hidden shadow-xl bg-black"
                style={{ position: "relative", paddingBottom: "177.78%", height: 0 }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&rel=0&modestbranding=1&playsinline=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  sandbox="allow-scripts allow-same-origin allow-presentation allow-autoplay"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title={labels[i]}
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                />
              </div>
              <p className="text-[#c9a87c] text-sm font-semibold uppercase tracking-wider text-center">{labels[i]}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}