const logos = [
  { src: "https://oneclinic.co/wp-content/uploads/2025/08/cert-3.png", alt: "Sertifika 3" },
  { src: "https://oneclinic.co/wp-content/uploads/2025/08/iso1.png", alt: "ISO" },
  { src: "https://oneclinic.co/wp-content/uploads/2025/08/cert-4-1.png", alt: "Sertifika 4" },
  { src: "https://oneclinic.co/wp-content/uploads/2025/08/cert-2.png", alt: "Sertifika 2" },
];

export default function StatsSection() {
  return (
    <section className="py-16 font-inter overflow-hidden" style={{ backgroundColor: "#f0ece6" }}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 items-center justify-items-center">
          {logos.map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center"
              style={{
                perspective: "600px",
                width: 220,
                height: 160,
              }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                style={{
                  maxHeight: 160,
                  maxWidth: 220,
                  width: "100%",
                  objectFit: "contain",
                  animation: `oval-spin-${i} 4s linear infinite`,
                  animationDelay: `${i * 0.6}s`,
                  transformStyle: "preserve-3d",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes oval-spin-0 {
          0%   { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        @keyframes oval-spin-1 {
          0%   { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        @keyframes oval-spin-2 {
          0%   { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        @keyframes oval-spin-3 {
          0%   { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
      `}</style>
    </section>
  );
}