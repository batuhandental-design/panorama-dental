import { useRef, useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const REELS = [
  "DKJsg5SKyOR",
  "C-kgM-JqZAl",
  "C-kfa-pq-ab",
];

export default function InstagramSlider() {
  const scrollRef = useRef(null);
  const autoRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const total = REELS.length;

  const scrollToIndex = useCallback((idx) => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.children[idx];
    if (!card) return;
    const containerWidth = container.offsetWidth;
    const cardLeft = card.offsetLeft;
    const cardWidth = card.offsetWidth;
    container.scrollTo({ left: cardLeft - (containerWidth - cardWidth) / 2, behavior: "smooth" });
  }, []);

  const go = useCallback((dir) => {
    setCurrent((c) => {
      const next = (c + dir + total) % total;
      scrollToIndex(next);
      return next;
    });
  }, [total, scrollToIndex]);

  const resetAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => go(1), 6000);
  }, [go]);

  useEffect(() => {
    autoRef.current = setInterval(() => go(1), 6000);
    return () => clearInterval(autoRef.current);
  }, [go]);

  useEffect(() => {
    setTimeout(() => scrollToIndex(0), 100);
  }, [scrollToIndex]);

  return (
    <div className="mt-16">
      {/* Başlık */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0" fill="url(#igGrad2)">
          <defs>
            <linearGradient id="igGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f09433" />
              <stop offset="25%" stopColor="#e6683c" />
              <stop offset="50%" stopColor="#dc2743" />
              <stop offset="75%" stopColor="#cc2366" />
              <stop offset="100%" stopColor="#bc1888" />
            </linearGradient>
          </defs>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
        <span className="text-lg font-bold text-[#2d2419] font-playfair">@panoramadentalinternational</span>
        <a
          href="https://www.instagram.com/panoramadentalinternational"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-[#8B6840] border border-[#8B6840]/30 px-3 py-1 rounded-full hover:bg-[#8B6840] hover:text-white transition-colors"
        >
          Takip Et
        </a>
      </div>

      {/* Slider */}
      <div className="relative">
        <button
          onClick={() => { go(-1); resetAuto(); }}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-5 z-20 w-11 h-11 rounded-full bg-white shadow-xl border border-[#e4dcd2] flex items-center justify-center text-[#4a3728] hover:bg-[#8B6840] hover:text-white hover:border-[#8B6840] transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto py-4 px-4 md:px-8 select-none"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            scrollSnapType: "x mandatory",
            cursor: "grab",
          }}
          onMouseDown={(e) => {
            const el = scrollRef.current;
            if (!el) return;
            el.style.cursor = "grabbing";
            el.style.scrollBehavior = "auto";
            const startX = e.pageX - el.offsetLeft;
            const startScroll = el.scrollLeft;
            clearInterval(autoRef.current);
            const onMove = (ev) => { el.scrollLeft = startScroll - (ev.pageX - el.offsetLeft - startX); };
            const onUp = () => {
              el.style.cursor = "grab";
              el.style.scrollBehavior = "smooth";
              resetAuto();
              window.removeEventListener("mousemove", onMove);
              window.removeEventListener("mouseup", onUp);
            };
            window.addEventListener("mousemove", onMove);
            window.addEventListener("mouseup", onUp);
          }}
        >
          {REELS.map((reelId, i) => (
            <div
              key={reelId}
              onClick={() => { setCurrent(i); scrollToIndex(i); resetAuto(); }}
              className="flex-shrink-0 w-[75vw] sm:w-[50%] md:w-[28%] lg:w-[26%]"
              style={{ scrollSnapAlign: "center" }}
            >
              <div
                className="bg-white rounded-3xl overflow-hidden border border-[#e4dcd2] shadow-md"
                style={{
                  transform: i === current ? "scale(1)" : "scale(0.95)",
                  opacity: i === current ? 1 : 0.75,
                  transition: "transform 0.4s ease, opacity 0.4s ease",
                }}
              >
                <iframe
                  src={`https://www.instagram.com/reel/${reelId}/embed/`}
                  className="w-full"
                  style={{ height: 560, border: "none" }}
                  allowFullScreen
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => { go(1); resetAuto(); }}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-5 z-20 w-11 h-11 rounded-full bg-white shadow-xl border border-[#e4dcd2] flex items-center justify-center text-[#4a3728] hover:bg-[#8B6840] hover:text-white hover:border-[#8B6840] transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {REELS.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); scrollToIndex(i); resetAuto(); }}
            className={`rounded-full transition-all duration-300 ${i === current ? "bg-[#8B6840] w-7 h-2.5" : "bg-[#c9bfb4] w-2.5 h-2.5 hover:bg-[#8B6840]/50"}`}
          />
        ))}
      </div>
    </div>
  );
}