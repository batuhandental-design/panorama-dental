import { motion } from "framer-motion";

const brandLogos = [
  {
    name: "Nobel Biocare",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Nobel_Biocare_logo.svg/320px-Nobel_Biocare_logo.svg.png",
  },
  {
    name: "MegaGen",
    url: "https://www.megagen.com/skin/images/megagen/logo.png",
  },
  {
    name: "Implantswiss",
    url: "https://www.implantswiss.com/wp-content/themes/implantswiss/images/logo.svg",
  },
  {
    name: "Dentsply Sirona",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Dentsply_Sirona_logo.svg/320px-Dentsply_Sirona_logo.svg.png",
  },
];

const certLogos = [
  {
    name: "T.C. Kültür ve Turizm Bakanlığı",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Emblem_of_Turkey.svg/200px-Emblem_of_Turkey.svg.png",
    label: "T.C. Kültür ve Turizm Bakanlığı",
    isRound: true,
  },
  {
    name: "ISO",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/ISO_Logo_%28Red_square%29.svg/200px-ISO_Logo_%28Red_square%29.svg.png",
    label: "International Organization for Standardization",
    isRound: false,
  },
  {
    name: "Türk Patent",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/T%C3%BCrkPatent.svg/320px-T%C3%BCrkPatent.svg.png",
    label: "Türk Patent ve Marka Kurumu",
    isRound: false,
  },
  {
    name: "T.C. Sağlık Bakanlığı",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Emblem_of_Turkey.svg/200px-Emblem_of_Turkey.svg.png",
    label: "T.C. Sağlık Bakanlığı",
    isRound: true,
  },
];

export default function TrustLogos() {
  return (
    <section className="bg-[#f7f3ef] py-12 font-inter">
      <div className="max-w-5xl mx-auto px-4">

        {/* Brand Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-14 mb-10"
        >
          {brandLogos.map((logo) => (
            <img
              key={logo.name}
              src={logo.url}
              alt={logo.name}
              className="h-8 md:h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
            />
          ))}
        </motion.div>

        <div className="border-t border-[#e0d8d0] mb-10" />

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          {certLogos.map((cert) => (
            <div key={cert.name} className="flex flex-col items-center gap-2 text-center">
              <img
                src={cert.url}
                alt={cert.name}
                className={`object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 ${cert.isRound ? "h-16 w-16" : "h-12"}`}
              />
              <span className="text-[10px] text-[#9c8e84] max-w-[100px] leading-tight">{cert.label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}