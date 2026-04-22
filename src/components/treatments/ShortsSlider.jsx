import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const videos = [
  "uWIfjj9nm3A",
  "c5W93IteeZs",
  "uabPpcIU_Ms",
];

export default function ShortsSlider() {
  const [current, setCurrent] = useState(0);
  const startX = useRef(null);

  // Auto-advance every 30s as fallback
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % videos.length);
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const go = (dir) => setCurrent((c) => (c + dir + videos.length) % videos.length);

  const handleTouchStart = (e) => { startX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (startX.current === null) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) go(diff > 0 ? 1 : -1);
    startX.current = null;
  };

  const handleMouseDown = (e) => { startX.current = e.clientX; };
  const handleMouseUp = (e) => {
    if (startX.current === null) return;
    const diff = startX.current - e.clientX;
    if (Math.abs(diff) > 40) go(diff > 0 ? 1 : -1);
    startX.current = null;
  };

  const videoId = videos[current];
  const playlist = videos.join(",");

  return (
    <div className="relative select-none" style={{ touchAction: "pan-y" }}>
      {/* Video container */}
      <div
        className="rounded-2xl overflow-hidden shadow-xl bg-black cursor-grab active:cursor-grabbing"
        style={{ position: "relative", height: 480 }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <iframe
          key={videoId}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&rel=0&modestbranding=1&playsinline=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          sandbox="allow-scripts allow-same-origin allow-presentation allow-autoplay"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "270px", height: "100%", border: "none", pointerEvents: "none" }}
        />
      </div>

      {/* Prev / Next buttons */}
      <button
        onClick={() => go(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 shadow-md flex items-center justify-center hover:bg-white transition"
      >
        <ChevronLeft className="w-5 h-5 text-[#4a3728]" />
      </button>
      <button
        onClick={() => go(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 shadow-md flex items-center justify-center hover:bg-white transition"
      >
        <ChevronRight className="w-5 h-5 text-[#4a3728]" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-3">
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? "bg-[#8B6840] w-6 h-2.5" : "bg-[#c9bfb4] w-2.5 h-2.5"}`}
          />
        ))}
      </div>
    </div>
  );
}