import { useRef } from "react";

const logos = [
  { src: "https://oneclinic.co/wp-content/uploads/2025/08/cert-3.png", alt: "Sertifika 3" },
  { src: "https://oneclinic.co/wp-content/uploads/2025/08/iso1.png", alt: "ISO" },
  { src: "https://oneclinic.co/wp-content/uploads/2025/08/cert-4-1.png", alt: "Sertifika 4" },
  { src: "https://oneclinic.co/wp-content/uploads/2025/08/cert-2.png", alt: "Sertifika 2" },
];

// Duplicate logos for seamless loop
const allLogos = [...logos, ...logos, ...logos];

export default function StatsSection() {
  return (
    <section className="py-16 font-inter overflow-hidden" style={{ backgroundColor: "#f0ece6" }}>
      <div className="relative w-full overflow-hidden">
        <div
          className="flex items-center gap-16"
          style={{
            animation: "marquee-logos 18s linear infinite",
            width: "max-content",
          }}
        >
          {allLogos.map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center flex-shrink-0"
              style={{ width: 220 }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-40 max-w-[220px] w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-logos {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
      `}</style>
    </section>
  );
}