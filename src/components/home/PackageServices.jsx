import { motion } from "framer-motion";
import { Plane, Hotel, Car, Languages } from "lucide-react";

const packages = [
  {
    icon: Plane,
    title: "Havaalanı Transferi",
    description: "Havaalanından Panorama Dental'e stressiz bir transfer deneyimi yaşayın. Profesyonel şoförlerimiz sizi terminalde karşılayacak.",
  },
  {
    icon: Hotel,
    title: "Otel Konaklama",
    description: "İhtiyaçlarınıza uygun çeşitli olanaklar sunan yakındaki birçok otelle ortaklığımız var.",
  },
  {
    icon: Car,
    title: "7/24 Ulaşım",
    description: "Ulaşım hizmetlerimiz programınıza uyacak şekilde 7/24 hizmetinizdedir ve zamanında varış ve kalkışları garanti eder.",
  },
  {
    icon: Languages,
    title: "Tercüman Hizmeti",
    description: "Türkiye ziyaretiniz sırasında güvenebileceğiniz her dilde uzmanlaşmış tercümanlarımız mevcuttur.",
  },
];

export default function PackageServices() {
  return (
    <section className="py-20 bg-[#111827] font-inter">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-primary text-sm uppercase tracking-[0.3em] mb-3 font-medium">VIP Hizmetler</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair">
            Sizin İçin Düşündük
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-gradient-to-br from-[#1a2940] to-[#0f2027] border border-white/5 rounded-2xl p-6 text-center hover:border-primary/30 transition-all group"
            >
              <div className="w-14 h-14 mx-auto bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <pkg.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{pkg.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{pkg.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}