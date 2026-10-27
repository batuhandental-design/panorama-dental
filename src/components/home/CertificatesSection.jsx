import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { X } from "lucide-react";

export default function CertificatesSection() {
  const [selected, setSelected] = useState(null);
  const { t } = useLanguage();

  // 4. sertifika (index 3) ortaya alındı: sıra 0,1,3,2,4
  const certs = [
    {
      src: "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/ba19f5cee_1.png",
      alt: "İstanbul Valiliği İl Sağlık Müdürlüğü Ruhsatnamesi",
    },
    {
      src: "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/8c9d2e838_2.png",
      alt: "NDK Nükleer Düzenleme Kurumu Lisans Belgesi",
    },
    {
      src: "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/872a2a570_8.png",
      alt: "Türk Patent ve Marka Kurumu Marka Tescil Belgesi",
    },
    {
      src: "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/46671d11f_7.png",
      alt: "USHAŞ Uluslararası Sağlık Turizmi Yetki Belgesi",
    },
    {
      src: "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/19388de92_3.png",
      alt: "IQR ISO 9001:2015 Kalite Yönetim Sistemi Sertifikası",
    },
  ];

  return (
    <section className="py-16 bg-[#f7f3ef] font-inter">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-[#8B6840] text-xs uppercase tracking-[0.3em] font-medium mb-2">{t.certsLabel}</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#2d2419] font-playfair">{t.certsTitle}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {certs.map((cert, i) => (
            <div
              key={i}
              className="flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => setSelected(cert)}
            >
              <img
                src={cert.src}
                alt={cert.alt}
                className="w-full h-auto object-contain drop-shadow-md"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-3 -right-3 bg-white rounded-full p-1.5 shadow-lg hover:bg-gray-100 transition-colors z-10"
            >
              <X className="w-5 h-5 text-[#2d2419]" />
            </button>
            <img
              src={selected.src}
              alt={selected.alt}
              className="w-full h-auto rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}