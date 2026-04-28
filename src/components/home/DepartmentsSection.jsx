import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/LanguageContext";
import {
  Stethoscope, Eye, Scissors, Zap, Microscope, Sparkles,
  Crown, Gem, Star, Syringe, FlaskConical, PersonStanding,
  Smile, Leaf, WandSparkles, Weight, Baby, ShieldPlus,
  Glasses, Droplet, User, Heart
} from "lucide-react";

const allCategories = {
  tr: [
    {
      label: "Diş Tedavileri",
      color: "text-[#8B6840]",
      bg: "bg-[#8B6840]/10",
      items: [
        { title: "Diş İmplantı", icon: Crown, href: "/tedavi/dis-implanti" },
        { title: "Hollywood Gülüşü", icon: Smile, href: "/tedavi/hollywood-gulusu" },
        { title: "All on 4 İmplantasyon", icon: ShieldPlus, href: "/operasyon/all-on-4" },
        { title: "Emax Taç", icon: Gem, href: "/operasyon/emax-tac" },
        { title: "Zirkonyum Kaplama", icon: Crown, href: "/tedavi/zirkonyum-kaplama" },
        { title: "Veneer", icon: Star, href: "/operasyon/veneer" },
        { title: "Hareketli ve Sabit Protez", icon: User, href: "/operasyon/hareketli-protez" },
        { title: "Kanal Tedavisi", icon: Syringe, href: "/operasyon/kanal-tedavisi" },
        { title: "Diş Beyazlatma", icon: Sparkles, href: "/tedavi/dis-beyazlatma" },
      ],
    },
    {
      label: "Estetik Cerrahi",
      color: "text-[#2d6a8a]",
      bg: "bg-[#2d6a8a]/10",
      items: [
        { title: "Göz Kapağı Estetiği", icon: Eye, href: "/operasyon/goz-kapagi-estetigi" },
        { title: "Yüze Yağ Enjeksiyonu", icon: FlaskConical, href: "/operasyon/yuze-yag-enjeksiyonu" },
        { title: "Yüz Germe", icon: Smile, href: "/operasyon/yuz-germe" },
        { title: "Rinoplasti", icon: User, href: "/operasyon/rinoplasti" },
        { title: "Bişektomi", icon: Scissors, href: "/operasyon/bisektomi" },
        { title: "Liposuction", icon: Weight, href: "/operasyon/liposuction" },
        { title: "Karın Germe", icon: PersonStanding, href: "/operasyon/karin-germe" },
        { title: "Meme Estetiği", icon: Heart, href: "/operasyon/meme-estetigi" },
        { title: "BBL", icon: PersonStanding, href: "/operasyon/bbl" },
        { title: "Penis Büyütme", icon: ShieldPlus, href: "/operasyon/penis-buyutme" },
        { title: "Vajina Estetiği", icon: ShieldPlus, href: "/operasyon/vajina-estetigi" },
      ],
    },
    {
      label: "Saç Ekimi",
      color: "text-[#5a8a5a]",
      bg: "bg-[#5a8a5a]/10",
      items: [
        { title: "DHI Saç Ekimi", icon: Leaf, href: "/operasyon/dhi-sac-ekimi" },
        { title: "DHI Kaş Ekimi", icon: Eye, href: "/operasyon/dhi-kas-ekimi" },
        { title: "DHI Sakal Ekimi", icon: User, href: "/operasyon/dhi-sakal-ekimi" },
        { title: "PRP", icon: FlaskConical, href: "/operasyon/prp" },
        { title: "Kök Hücre Tedavisi", icon: Microscope, href: "/operasyon/kok-hucre-tedavisi" },
        { title: "Saç Lazeri", icon: WandSparkles, href: "/operasyon/sac-lazeri" },
      ],
    },
    {
      label: "Obezite Cerrahisi",
      color: "text-[#8a5a2d]",
      bg: "bg-[#8a5a2d]/10",
      items: [
        { title: "Mide Bypass", icon: Stethoscope, href: "/operasyon/mide-baypas" },
        { title: "Tüp Mide Ameliyatı", icon: Stethoscope, href: "/operasyon/tup-mide" },
        { title: "Mide Balonu (6-12 Aylık)", icon: Zap, href: "/operasyon/mide-balonu" },
        { title: "Mide Botoksu", icon: Syringe, href: "/operasyon/mide-botoksu" },
        { title: "Tip 2 Diyabet Operasyonu", icon: ShieldPlus, href: "/operasyon/tip2-diyabet" },
      ],
    },
    {
      label: "Göz Operasyonları",
      color: "text-[#4a6abf]",
      bg: "bg-[#4a6abf]/10",
      items: [
        { title: "Excimer Laser", icon: Eye, href: "/operasyon/lazer-goz" },
        { title: "Katarakt Ameliyatı", icon: Droplet, href: "/operasyon/katarakt-ameliyati" },
        { title: "Smart Lens", icon: Glasses, href: "/operasyon/akilli-lens" },
      ],
    },
  ],
  en: [
    {
      label: "Dental Treatments",
      color: "text-[#8B6840]",
      bg: "bg-[#8B6840]/10",
      items: [
        { title: "Dental Implant", icon: Crown, href: "/tedavi/dis-implanti" },
        { title: "Hollywood Smile", icon: Smile, href: "/tedavi/hollywood-gulusu" },
        { title: "All on 4 Implantation", icon: ShieldPlus, href: "/operasyon/all-on-4" },
        { title: "Emax Crown", icon: Gem, href: "/operasyon/emax-tac" },
        { title: "Zirconia Crown", icon: Crown, href: "/tedavi/zirkonyum-kaplama" },
        { title: "Veneer", icon: Star, href: "/operasyon/veneer" },
        { title: "Removable & Fixed Dentures", icon: User, href: "/operasyon/hareketli-protez" },
        { title: "Root Canal", icon: Syringe, href: "/operasyon/kanal-tedavisi" },
        { title: "Teeth Whitening", icon: Sparkles, href: "/tedavi/dis-beyazlatma" },
      ],
    },
    {
      label: "Aesthetic Surgery",
      color: "text-[#2d6a8a]",
      bg: "bg-[#2d6a8a]/10",
      items: [
        { title: "Eyelid Aesthetics", icon: Eye, href: "/operasyon/goz-kapagi-estetigi" },
        { title: "Fat Injection to Face", icon: FlaskConical, href: "/operasyon/yuze-yag-enjeksiyonu" },
        { title: "Facelift", icon: Smile, href: "/operasyon/yuz-germe" },
        { title: "Rhinoplasty", icon: User, href: "/operasyon/rinoplasti" },
        { title: "Bichectomy", icon: Scissors, href: "/operasyon/bisektomi" },
        { title: "Liposuction", icon: Weight, href: "/operasyon/liposuction" },
        { title: "Tummy Tuck", icon: PersonStanding, href: "/operasyon/karin-germe" },
        { title: "Breast Aesthetics", icon: Heart, href: "/operasyon/meme-estetigi" },
        { title: "BBL", icon: PersonStanding, href: "/operasyon/bbl" },
        { title: "Penis Enlargement", icon: ShieldPlus, href: "/operasyon/penis-buyutme" },
        { title: "Vaginal Aesthetics", icon: ShieldPlus, href: "/operasyon/vajina-estetigi" },
      ],
    },
    {
      label: "Hair Transplant",
      color: "text-[#5a8a5a]",
      bg: "bg-[#5a8a5a]/10",
      items: [
        { title: "DHI Hair Transplant", icon: Leaf, href: "/operasyon/dhi-sac-ekimi" },
        { title: "DHI Eyebrow Transplant", icon: Eye, href: "/operasyon/dhi-kas-ekimi" },
        { title: "DHI Beard Transplant", icon: User, href: "/operasyon/dhi-sakal-ekimi" },
        { title: "PRP", icon: FlaskConical, href: "/operasyon/prp" },
        { title: "Stem Cell Treatment", icon: Microscope, href: "/operasyon/kok-hucre-tedavisi" },
        { title: "Hair Laser", icon: WandSparkles, href: "/operasyon/sac-lazeri" },
      ],
    },
    {
      label: "Obesity Surgery",
      color: "text-[#8a5a2d]",
      bg: "bg-[#8a5a2d]/10",
      items: [
        { title: "Gastric Bypass", icon: Stethoscope, href: "/operasyon/mide-baypas" },
        { title: "Sleeve Gastrectomy", icon: Stethoscope, href: "/operasyon/tup-mide" },
        { title: "Gastric Balloon (6-12 months)", icon: Zap, href: "/operasyon/mide-balonu" },
        { title: "Gastric Botox", icon: Syringe, href: "/operasyon/mide-botoksu" },
        { title: "Type 2 Diabetes Operation", icon: ShieldPlus, href: "/operasyon/tip2-diyabet" },
      ],
    },
    {
      label: "Eye Operations",
      color: "text-[#4a6abf]",
      bg: "bg-[#4a6abf]/10",
      items: [
        { title: "Excimer Laser", icon: Eye, href: "/operasyon/lazer-goz" },
        { title: "Cataract Surgery", icon: Droplet, href: "/operasyon/katarakt-ameliyati" },
        { title: "Smart Lens", icon: Glasses, href: "/operasyon/akilli-lens" },
      ],
    },
  ],
};

export default function DepartmentsSection() {
  const { t, lang } = useLanguage();
  const cats = allCategories[lang] || allCategories.tr;

  return (
    <section className="py-20 bg-[#f7f3ef] font-inter" id="departments">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#8B6840] text-sm uppercase tracking-[0.3em] mb-3 font-medium">{t.deptLabel}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2419] font-playfair mb-4">{t.deptTitle}</h2>
          <p className="text-[#6b5e52] max-w-2xl mx-auto leading-relaxed">{t.deptDesc}</p>
        </div>

        <div className="space-y-12">
          {cats.map((cat, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: ci * 0.08 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`h-px flex-1 bg-[#d4c9bc]`} />
                <span className={`text-xs font-bold uppercase tracking-[0.25em] px-3 py-1 rounded-full ${cat.bg} ${cat.color}`}>
                  {cat.label}
                </span>
                <div className={`h-px flex-1 bg-[#d4c9bc]`} />
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {cat.items.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                    >
                      <Link
                        to={item.href}
                        className="flex flex-col items-center gap-2 bg-white border border-[#e0d8d0] rounded-2xl px-3 py-4 text-center hover:border-[#8B6840]/50 hover:shadow-md transition-all group"
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cat.bg} group-hover:scale-110 transition-transform`}>
                          <Icon className={`w-5 h-5 ${cat.color}`} />
                        </div>
                        <span className="text-xs font-medium text-[#2d2419] leading-tight group-hover:text-[#8B6840] transition-colors">
                          {item.title}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}