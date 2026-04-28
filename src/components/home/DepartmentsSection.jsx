import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  {
    label: "Diş Tedavileri",
    emoji: "🦷",
    items: [
      { title: "Diş İmplantı", icon: "🦷", slug: "dis-implanti" },
      { title: "Hollywood Gülümsemesi", icon: "😁", slug: "hollywood-gulumsemesi" },
      { title: "All on 4 İmplantasyon", icon: "🦿", slug: "all-on-4" },
      { title: "Emax Taç", icon: "💎", slug: "emax-tac" },
      { title: "Zirkonyum Kaplama", icon: "👑", slug: "zirkonyum-kaplama" },
      { title: "Veneer", icon: "✨", slug: "veneer" },
      { title: "Hareketli ve Sabit Protez", icon: "🦷", slug: "hareketli-protez" },
      { title: "Kanal Tedavisi", icon: "💉", slug: "kanal-tedavisi" },
      { title: "Diş Beyazlatma", icon: "🪥", slug: "dis-beyazlatma" },
    ],
  },
  {
    label: "Estetik Cerrahi",
    emoji: "💆",
    items: [
      { title: "Göz Kapağı Estetiği", icon: "👁️", slug: "goz-kapagi-estetigi" },
      { title: "Yüze Yağ Enjeksiyonu", icon: "🧴", slug: "yuze-yag-enjeksiyonu" },
      { title: "Yüz Germe", icon: "✨", slug: "yuz-germe" },
      { title: "Rinoplasti", icon: "👃", slug: "rinoplasti" },
      { title: "Bişektomi", icon: "✂️", slug: "bisektomi" },
      { title: "Liposuction", icon: "⚖️", slug: "liposuction" },
      { title: "Karın Germe", icon: "🏃", slug: "karin-germe" },
      { title: "Meme Estetiği", icon: "🌸", slug: "meme-estetigi" },
      { title: "BBL", icon: "💪", slug: "bbl" },
      { title: "Penis Büyütme", icon: "⚕️", slug: "penis-buyutme" },
      { title: "Vajina Estetiği", icon: "🌺", slug: "vajina-estetigi" },
    ],
  },
  {
    label: "Saç Ekimi",
    emoji: "🌱",
    items: [
      { title: "DHI Saç Ekimi", icon: "🌱", slug: "dhi-sac-ekimi" },
      { title: "DHI Kaş Ekimi", icon: "👁️", slug: "dhi-kas-ekimi" },
      { title: "DHI Sakal Ekimi", icon: "🧔", slug: "dhi-sakal-ekimi" },
      { title: "PRP", icon: "🧪", slug: "prp" },
      { title: "Kök Hücre Tedavisi", icon: "🔬", slug: "kok-hucre-tedavisi" },
      { title: "Saç Lazeri", icon: "⚡", slug: "sac-lazeri" },
    ],
  },
  {
    label: "Obezite Cerrahisi",
    emoji: "🏥",
    items: [
      { title: "Mide Bypass", icon: "🏥", slug: "mide-baypas" },
      { title: "Tüp Mide Ameliyatı", icon: "🩺", slug: "tup-mide" },
      { title: "Mide Balonu (6-12 Aylık)", icon: "⭕", slug: "mide-balonu" },
      { title: "Mide Botoksu", icon: "💉", slug: "mide-botoksu" },
      { title: "Tip 2 Diyabet Operasyonu", icon: "📋", slug: "tip2-diyabet" },
    ],
  },
  {
    label: "Göz Operasyonları",
    emoji: "👁️",
    items: [
      { title: "Excimer Laser", icon: "🔆", slug: "lazer-goz" },
      { title: "Katarakt Ameliyatı", icon: "💧", slug: "katarakt-ameliyati" },
      { title: "Smart Lens", icon: "🔍", slug: "akilli-lens" },
    ],
  },
];

export default function DepartmentsSection() {
  return (
    <section className="py-20 font-inter" id="departments" style={{ background: "linear-gradient(180deg, #1e1a14 0%, #2c2419 100%)" }}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-12 h-0.5 bg-[#c9a87c] mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair mb-4 uppercase tracking-widest">
            OPERASYONLAR
          </h2>
          <p className="text-white/60 text-base max-w-xl mx-auto">
            Kliniğimizin uzmanlaştığı bir hizmet grubudur.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-14">
          {categories.map((cat, ci) => (
            <div key={ci}>
              {/* Category label */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 rounded-full bg-[#c9a87c]" />
                <h3 className="text-[#c9a87c] text-xs font-bold uppercase tracking-[0.3em]">{cat.label}</h3>
                <div className="flex-1 h-px" style={{ background: "rgba(201,168,124,0.2)" }} />
              </div>

              {/* Items grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {cat.items.map((item, ii) => (
                  <motion.div
                    key={ii}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: ii * 0.05 }}
                  >
                    <Link
                      to={`/operasyon/${item.slug}`}
                      className="group flex flex-col items-center justify-center gap-3 p-5 rounded-2xl text-center transition-all duration-300"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(201,168,124,0.15)",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = "rgba(201,168,124,0.12)";
                        e.currentTarget.style.border = "1px solid rgba(201,168,124,0.5)";
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.3)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                        e.currentTarget.style.border = "1px solid rgba(201,168,124,0.15)";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {/* Icon wrapper */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300"
                        style={{ background: "rgba(201,168,124,0.12)" }}
                      >
                        {item.icon}
                      </div>
                      {/* Category label */}
                      <span className="text-[#c9a87c] text-[9px] font-bold uppercase tracking-widest opacity-70">
                        {cat.label}
                      </span>
                      {/* Title */}
                      <h4 className="text-white text-xs font-semibold leading-snug">
                        {item.title}
                      </h4>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}