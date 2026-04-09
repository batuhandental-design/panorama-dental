import { motion } from "framer-motion";
import { Shield, Microscope, Award, Clock } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Uzman Diş Hekimleri",
    desc: "Alanında uzmanlaşmış, uluslararası sertifikalı diş hekimlerimiz her prosedürde yılların deneyimini sunar.",
  },
  {
    icon: Microscope,
    title: "Son Teknoloji Ekipman",
    desc: "3D tomografi, dijital gülüş tasarımı ve laser sistemleriyle en hassas tedavileri gerçekleştiriyoruz.",
  },
  {
    icon: Shield,
    title: "Steril & Güvenli Ortam",
    desc: "Uluslararası standartlarda sterilizasyon ve hasta güvenliği protokolleriyle en hijyenik ortamı sunuyoruz.",
  },
  {
    icon: Clock,
    title: "Hızlı & Konforlu Tedavi",
    desc: "Tek seansta büyük dönüşümler mümkün. Tedavi sürecinizi mümkün olan en konforlu şekilde tamamlıyoruz.",
  },
];

export default function WhyUsSection() {
  return (
    <section className="py-20 bg-[#f7f3ef] font-inter" id="about">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#8B6840] text-sm uppercase tracking-[0.3em] mb-3 font-medium">Neden Biz?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d2419] font-playfair mb-4">
            Neden Panorama Dental'i Tercih Etmelisiniz?
          </h2>
          <p className="text-[#6b5e52] max-w-2xl mx-auto leading-relaxed">
            Diş tedavinizde doğru klinik seçimi hayat değiştiren bir karardır.
            Panorama Dental olarak mükemmel diş sağlığı ve estetik için en iyi deneyimi sunuyoruz.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#ede8e0] border border-[#d4c9bc] rounded-2xl p-6 text-center hover:border-[#8B6840]/20 transition-all group"
            >
              <div className="w-14 h-14 mx-auto bg-[#8B6840]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#8B6840]/20 transition-colors">
                <r.icon className="w-7 h-7 text-[#8B6840]" />
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