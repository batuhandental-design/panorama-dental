import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/LanguageContext";

const categories = {
  tr: [
    {
      label: "Diş Tedavileri",
      items: [
        { title: "Diş İmplantı", href: "/tedavi/dis-implanti" },
        { title: "Hollywood Gülüşü", href: "/tedavi/hollywood-gulusu" },
        { title: "All on 4 İmplantasyon", href: "/#contact" },
        { title: "Emax Taç", href: "/#contact" },
        { title: "Zirkonyum Kaplama", href: "/tedavi/zirkonyum-kaplama" },
        { title: "Veneer", href: "/tedavi/hollywood-gulusu" },
        { title: "Hareketli ve Sabit Protez", href: "/#contact" },
        { title: "Kanal Tedavisi", href: "/#contact" },
        { title: "Diş Beyazlatma", href: "/tedavi/dis-beyazlatma" },
      ],
    },
    {
      label: "Estetik Cerrahi",
      items: [
        { title: "Göz Kapağı Estetiği", href: "/#contact" },
        { title: "Yüze Yağ Enjeksiyonu", href: "/#contact" },
        { title: "Yüz Germe", href: "/#contact" },
        { title: "Rinoplasti", href: "/#contact" },
        { title: "Bişektomi", href: "/#contact" },
        { title: "Liposuction", href: "/#contact" },
        { title: "Karın Germe", href: "/#contact" },
        { title: "Meme Estetiği", href: "/#contact" },
        { title: "BBL", href: "/#contact" },
        { title: "Penis Büyütme", href: "/#contact" },
        { title: "Vajina Estetiği", href: "/#contact" },
      ],
    },
    {
      label: "Saç Ekimi",
      items: [
        { title: "DHI Saç Ekimi", href: "/#contact" },
        { title: "DHI Kaş Ekimi", href: "/#contact" },
        { title: "DHI Sakal Ekimi", href: "/#contact" },
        { title: "PRP", href: "/#contact" },
        { title: "Kök Hücre Tedavisi", href: "/#contact" },
        { title: "Saç Lazeri", href: "/#contact" },
      ],
    },
    {
      label: "Obezite Cerrahisi",
      items: [
        { title: "Mide Bypass", href: "/#contact" },
        { title: "Tüp Mide Ameliyatı", href: "/#contact" },
        { title: "Mide Balonu (6-12 Aylık)", href: "/#contact" },
        { title: "Mide Botoksu", href: "/#contact" },
        { title: "Tip 2 Diyabet Operasyonu", href: "/#contact" },
      ],
    },
    {
      label: "Göz Operasyonları",
      items: [
        { title: "Excimer Laser", href: "/#contact" },
        { title: "Katarakt Ameliyatı", href: "/#contact" },
        { title: "Smart Lens", href: "/#contact" },
      ],
    },
  ],
  en: [
    {
      label: "Dental Treatments",
      items: [
        { title: "Dental Implant", href: "/tedavi/dis-implanti" },
        { title: "Hollywood Smile", href: "/tedavi/hollywood-gulusu" },
        { title: "All on 4 Implantation", href: "/#contact" },
        { title: "Emax Crown", href: "/#contact" },
        { title: "Zirconia Crown", href: "/tedavi/zirkonyum-kaplama" },
        { title: "Veneer", href: "/tedavi/hollywood-gulusu" },
        { title: "Removable & Fixed Dentures", href: "/#contact" },
        { title: "Root Canal", href: "/#contact" },
        { title: "Teeth Whitening", href: "/tedavi/dis-beyazlatma" },
      ],
    },
    {
      label: "Aesthetic Surgery",
      items: [
        { title: "Eyelid Aesthetics", href: "/#contact" },
        { title: "Fat Injection to Face", href: "/#contact" },
        { title: "Facelift", href: "/#contact" },
        { title: "Rhinoplasty", href: "/#contact" },
        { title: "Bichectomy", href: "/#contact" },
        { title: "Liposuction", href: "/#contact" },
        { title: "Tummy Tuck", href: "/#contact" },
        { title: "Breast Aesthetics", href: "/#contact" },
        { title: "BBL", href: "/#contact" },
        { title: "Penis Enlargement", href: "/#contact" },
        { title: "Vaginal Aesthetics", href: "/#contact" },
      ],
    },
    {
      label: "Hair Transplant",
      items: [
        { title: "DHI Hair Transplant", href: "/#contact" },
        { title: "DHI Eyebrow Transplant", href: "/#contact" },
        { title: "DHI Beard Transplant", href: "/#contact" },
        { title: "PRP", href: "/#contact" },
        { title: "Stem Cell Treatment", href: "/#contact" },
        { title: "Hair Laser", href: "/#contact" },
      ],
    },
    {
      label: "Obesity Surgery",
      items: [
        { title: "Gastric Bypass", href: "/#contact" },
        { title: "Sleeve Gastrectomy", href: "/#contact" },
        { title: "Gastric Balloon (6-12 months)", href: "/#contact" },
        { title: "Gastric Botox", href: "/#contact" },
        { title: "Type 2 Diabetes Operation", href: "/#contact" },
      ],
    },
    {
      label: "Eye Operations",
      items: [
        { title: "Excimer Laser", href: "/#contact" },
        { title: "Cataract Surgery", href: "/#contact" },
        { title: "Smart Lens", href: "/#contact" },
      ],
    },
  ],
};

// For other languages fall back to TR categories with translated label
const fallbackCategories = (lang) => {
  return categories.tr;
};

const getCategories = (lang) => categories[lang] || fallbackCategories(lang);

export default function DepartmentsSection() {
  const { t, lang } = useLanguage();
  const cats = getCategories(lang);

  return (
    <section className="py-20 bg-[#f7f3ef] font-inter" id="departments">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#8B6840] text-sm uppercase tracking-[0.3em] mb-3 font-medium">{t.deptLabel}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2419] font-playfair mb-4">{t.deptTitle}</h2>
          <p className="text-[#6b5e52] max-w-2xl mx-auto leading-relaxed">{t.deptDesc}</p>
        </div>

        <div className="space-y-10">
          {cats.map((cat, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: ci * 0.08 }}
            >
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#8B6840] mb-4 border-b border-[#d4c9bc] pb-2">
                {cat.label}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {cat.items.map((item, i) => (
                  <Link
                    key={i}
                    to={item.href}
                    className="bg-white border border-[#d4c9bc] rounded-xl px-4 py-3 text-center text-sm font-medium text-[#2d2419] hover:border-[#8B6840] hover:text-[#8B6840] hover:shadow-sm transition-all"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}