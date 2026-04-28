import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  {
    label: "Diş Tedavileri",
    color: "#8B6840",
    items: [
      { title: "Diş İmplantı", slug: "dis-implanti" },
      { title: "Hollywood Gülümsemesi", slug: "hollywood-gulumsemesi" },
      { title: "All on 4 İmplantasyon", slug: "all-on-4" },
      { title: "Emax Taç", slug: "emax-tac" },
      { title: "Zirkonyum Kaplama", slug: "zirkonyum-kaplama" },
      { title: "Veneer", slug: "veneer" },
      { title: "Hareketli ve Sabit Protez", slug: "hareketli-protez" },
      { title: "Kanal Tedavisi", slug: "kanal-tedavisi" },
      { title: "Diş Beyazlatma", slug: "dis-beyazlatma" },
    ],
  },
  {
    label: "Estetik Cerrahi",
    color: "#7a5c8a",
    items: [
      { title: "Göz Kapağı Estetiği", slug: "goz-kapagi-estetigi" },
      { title: "Yüze Yağ Enjeksiyonu", slug: "yuze-yag-enjeksiyonu" },
      { title: "Yüz Germe", slug: "yuz-germe" },
      { title: "Rinoplasti", slug: "rinoplasti" },
      { title: "Bişektomi", slug: "bisektomi" },
      { title: "Liposuction", slug: "liposuction" },
      { title: "Karın Germe", slug: "karin-germe" },
      { title: "Meme Estetiği", slug: "meme-estetigi" },
      { title: "BBL", slug: "bbl" },
      { title: "Penis Büyütme", slug: "penis-buyutme" },
      { title: "Vajina Estetiği", slug: "vajina-estetigi" },
    ],
  },
  {
    label: "Saç Ekimi",
    color: "#4a7a5c",
    items: [
      { title: "DHI Saç Ekimi", slug: "dhi-sac-ekimi" },
      { title: "DHI Kaş Ekimi", slug: "dhi-kas-ekimi" },
      { title: "DHI Sakal Ekimi", slug: "dhi-sakal-ekimi" },
      { title: "PRP", slug: "prp" },
      { title: "Kök Hücre Tedavisi", slug: "kok-hucre-tedavisi" },
      { title: "Saç Lazeri", slug: "sac-lazeri" },
    ],
  },
  {
    label: "Obezite Cerrahisi",
    color: "#7a4a4a",
    items: [
      { title: "Mide Bypass", slug: "mide-baypas" },
      { title: "Tüp Mide Ameliyatı", slug: "tup-mide" },
      { title: "Mide Balonu (6-12 Aylık)", slug: "mide-balonu" },
      { title: "Mide Botoksu", slug: "mide-botoksu" },
      { title: "Tip 2 Diyabet Operasyonu", slug: "tip2-diyabet" },
    ],
  },
  {
    label: "Göz Operasyonları",
    color: "#4a6a7a",
    items: [
      { title: "Excimer Laser", slug: "lazer-goz" },
      { title: "Katarakt Ameliyatı", slug: "katarakt-ameliyati" },
      { title: "Smart Lens", slug: "akilli-lens" },
    ],
  },
];

export default function DepartmentsSection() {
  return (
    <section className="py-20 bg-[#f7f3ef] font-inter" id="departments">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#8B6840] text-sm uppercase tracking-[0.3em] mb-3 font-medium">BÖLÜMLER</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2419] font-playfair mb-4">Operasyonlarımız</h2>
          <p className="text-[#6b5e52] max-w-2xl mx-auto leading-relaxed">
            Kliniğimizin uzmanlaştığı tüm tedavi ve operasyon alanları.
          </p>
        </div>

        <div className="space-y-10">
          {categories.map((cat, ci) => (
            <div key={ci}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                <h3 className="text-lg font-bold text-[#2d2419] font-playfair">{cat.label}</h3>
                <div className="flex-1 h-px bg-[#d4c9bc]" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {cat.items.map((item, ii) => (
                  <motion.div
                    key={ii}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: ii * 0.04 }}
                  >
                    <Link
                      to={`/operasyon/${item.slug}`}
                      className="block bg-gradient-to-br from-[#ede8e0] to-[#e4dcd2] border border-[#d4c9bc] rounded-xl p-4 text-center hover:border-[#8B6840]/50 hover:shadow-sm transition-all group"
                    >
                      <h4 className="text-[#2d2419] font-semibold text-sm group-hover:text-[#8B6840] transition-colors leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-[#9c8e84] mt-1">{cat.label}</p>
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