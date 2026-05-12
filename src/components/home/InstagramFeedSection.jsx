import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Her sütun için görsel grupları — kendi Instagram görsel URL'lerinizle değiştirin
const COLUMNS = [
  [
    "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/ed946f566_1.png",
    "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/0f68dc5f0_2.png",
    "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/3165b21b7_3.png",
    "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/a2631b18a_4.png",
    "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/81e694748_5.png",
    "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/5254cb7ca_6.png",
  ],
  [
    "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/598e6993d_7.png",
    "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/bac2fca14_8.png",
    "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/985a49a67_9.png",
    "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/59a94a24f_10.png",
    "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/732eb19d1_11.png",
    "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/cdeedde90_12.png",
  ],
  [
    "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/19d222a60_13.png",
    "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/3cdb29ca5_14.png",
    "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/554eaa8e7_15.png",
    "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/beca0a937_16.png",
    "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/375c2e708_17.png",
    "https://media.base44.com/images/public/69d79ff6631966558dbdfca2/6bb7d8582_18.png",
  ],
];

function AutoColumn({ images, delay = 0 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setIndex((i) => (i + 1) % images.length);
      }, 2000);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [images.length, delay]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-lg bg-[#e8e0d5]" style={{ aspectRatio: "1/1" }}>
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt=""
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ mixBlendMode: "multiply" }}
        />
      </AnimatePresence>
    </div>
  );
}

export default function InstagramFeedSection() {
  return (
    <section className="py-20 bg-[#f7f3ef] font-inter">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg viewBox="0 0 24 24" className="w-7 h-7 flex-shrink-0" fill="url(#igGradFeed)">
              <defs>
                <linearGradient id="igGradFeed" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f09433" />
                  <stop offset="25%" stopColor="#e6683c" />
                  <stop offset="50%" stopColor="#dc2743" />
                  <stop offset="75%" stopColor="#cc2366" />
                  <stop offset="100%" stopColor="#bc1888" />
                </linearGradient>
              </defs>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d2419] font-playfair">
              @panoramadentalinternational
            </h2>
          </div>
          <a
            href="https://www.instagram.com/panoramadentalinternational"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-semibold text-[#8B6840] border border-[#8B6840]/30 px-5 py-1.5 rounded-full hover:bg-[#8B6840] hover:text-white transition-colors"
          >
            Takip Et
          </a>
        </div>

        {/* SociableKit Instagram Feed */}
        <div className="overflow-hidden rounded-2xl" style={{ height: "1000px" }}>
          <iframe
            src="https://widgets.sociablekit.com/instagram-feed/iframe/25681094"
            frameBorder="0"
            width="100%"
            height="1060px"
            style={{ marginTop: 0, display: "block" }}
          />
        </div>
      </div>
    </section>
  );
}