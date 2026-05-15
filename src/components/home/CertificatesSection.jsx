export default function CertificatesSection() {
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
      src: "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/46671d11f_7.png",
      alt: "USHAŞ Uluslararası Sağlık Turizmi Yetki Belgesi",
    },
    {
      src: "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/872a2a570_8.png",
      alt: "Türk Patent ve Marka Kurumu Marka Tescil Belgesi",
    },
  ];

  return (
    <section className="py-16 bg-[#f7f3ef] font-inter">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-[#8B6840] text-xs uppercase tracking-[0.3em] font-medium mb-2">Belgelerimiz</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#2d2419] font-playfair">Lisans &amp; Sertifikalar</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {certs.map((cert, i) => (
            <div key={i} className="flex items-center justify-center">
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
    </section>
  );
}