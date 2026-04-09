import { motion } from "framer-motion";
import { Shield, Heart, Microscope, Globe } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Uzmanlık",
    desc: "Sertifikalı plastik cerrahlar ekibimiz, her prosedüre yılların deneyimi ve ileri düzey eğitimini getirir.",
  },
  {
    icon: Heart,
    title: "Hasta Odaklı Bakım",
    desc: "Yolculuğunuz boyunca konforunuzu, güvenliğinizi ve memnuniyetinizi ön planda tutuyoruz.",
  },
  {
    icon: Microscope,
    title: "Son Teknoloji Tesisler",
    desc: "Modern kliniğimiz, üstün sonuçlar ve rahat bir deneyim sağlamak için en son teknoloji ile donatılmıştır.",
  },
  {
    icon: Globe,
    title: "Küresel Standartlar",
    desc: "Uluslararası standartlara uygun hareket ederken, farklı müşteri kitlenizin benzersiz güzellik anlayışlarını da anlar.",
  },
];

export default function WhyUsSection() {
  return (
    <section className="py-20 bg-[#0d1b2a] font-inter" id="about">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-primary text-sm uppercase tracking-[0.3em] mb-3 font-medium">Neden Biz?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair mb-4">
            Neden Panorama Dental'i Tercih Etmelisiniz?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Panorama Dental olarak, estetik cerrahiyi seçmenin son derece kişisel bir karar olduğunu anlıyoruz.
            Kendinizi bilgilendirilmiş, güçlenmiş ve kararlarınızda emin hissettirecek destekleyici bir ortam sağlamaya özen gösteriyoruz.
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
              className="bg-[#1a2940]/50 border border-white/5 rounded-2xl p-6 text-center hover:border-primary/20 transition-all group"
            >
              <div className="w-14 h-14 mx-auto bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <r.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{r.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}