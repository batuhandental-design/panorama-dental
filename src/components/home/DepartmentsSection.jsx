import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  {
    label: "Diş Tedavileri",
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
    items: [
      { title: "Excimer Laser", icon: "🔆", slug: "lazer-goz" },
      { title: "Katarakt Ameliyatı", icon: "💧", slug: "katarakt-ameliyati" },
      { title: "Smart Lens", icon: "🔍", slug: "akilli-lens" },
    ],
  },
];

function OperationCard({ item, catLabel, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
    >
      <Link
        to={`/operasyon/${item.slug}`}
        className="group flex flex-col items-center text-center gap-3 p-6 rounded-2xl transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(201,168,124,0.18)",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = "rgba(201,168,124,0.13)";
          e.currentTarget.style.border = "1px solid rgba(201,168,124,0.55)";
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.35)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "rgba(255,255,255,0.04)";
          e.currentTarget.style.border = "1px solid rgba(201,168,124,0.18)";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Icon wrapper — big circle like reference */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0 transition-all duration-300 group-hover:scale-110"
          style={{
            background: "linear-gradient(135deg, rgba(201,168,124,0.18) 0%, rgba(201,168,124,0.06) 100%)",
            border: "1.5px solid rgba(201,168,124,0.35)",
          }}
        >
          {item.icon}
        </div>

        {/* Category label */}
        <span
          className="text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ color: "rgba(201,168,124,0.65)" }}
        >
          {catLabel}
        </span>

        {/* Title */}
        <h4 className="text-white text-sm font-semibold leading-snug group-hover:text-[#c9a87c] transition-colors duration-300">
          {item.title}
        </h4>
      </Link>
    </motion.div>
  );
}

export default function DepartmentsSection() {
  return (
    <section
      className="py-20 font-inter"
      id="departments"
      style={{ background: "linear-gradient(180deg, #1e1a14 0%, #2c2419 100%)" }}
    >
      <div className="max-w-6xl mx-auto px-4">

        {/* Section header */}
        <div className="text-center mb-16">
          <div className="w-12 h-0.5 bg-[#c9a87c] mx-auto mb-5" />
          <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair mb-4 uppercase tracking-widest">
            OPERASYONLAR
          </h2>
          <p className="text-white/50 text-base max-w-xl mx-auto">
            Kliniğimizin uzmanlaştığı bir hizmet grubudur.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-14">
          {categories.map((cat, ci) => (
            <div key={ci}>
              {/* Category divider */}
              <div className="flex items-center gap-3 mb-7">
                <div className="w-1 h-7 rounded-full bg-[#c9a87c]" />
                <h3 className="text-[#c9a87c] text-xs font-bold uppercase tracking-[0.3em]">
                  {cat.label}
                </h3>
                <div className="flex-1 h-px" style={{ background: "rgba(201,168,124,0.18)" }} />
              </div>

              {/* Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {cat.items.map((item, ii) => (
                  <OperationCard key={ii} item={item} catLabel={cat.label} index={ii} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}