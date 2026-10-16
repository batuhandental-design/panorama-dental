import { useState, useEffect } from "react";

// Haliç, Pendik ve İstanbul silüeti manzaraları — scroll ilerledikçe çapraz geçiş yapar
const IMAGES = [
  "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/d86732f8b_generated_image.png",
  "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/5ddb3a53d_generated_image.png",
  "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/a0dc4efb8_generated_image.png",
];

export default function ScrollBackground() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = null;
    const update = () => {
      raf = null;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      setProgress(p);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // 0 -> 0.5: Haliç -> Pendik, 0.5 -> 1: Pendik -> İstanbul
  const opacities = [
    Math.max(1 - progress * 2, 0),
    Math.max(0, 1 - Math.abs(progress * 2 - 1)),
    Math.max(progress * 2 - 1, 0),
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {IMAGES.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${src})`,
            opacity: opacities[i],
          }}
        />
      ))}
      {/* Sıcak krem tonu — manzara görünür kalan, metin okunurluğunu destekler */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(247,243,239,0.30) 0%, rgba(237,232,224,0.28) 100%)" }}
      />
    </div>
  );
}