import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const videos = [
  { id: "yPl3bK48_hY", type: "landscape" },  // ALAN G1 - yatay
  { id: "c5W93IteeZs", type: "portrait" },    // ALAN G2 - dikey
];

export default function ImplantVideoSlider() {
  const [current, setCurrent] = useState(0);
  const startX = useRef(null);

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

  const video = videos[current];

  return (
    <div className="relative select-none" style={{ touchAction: "pan-y" }}>
      <div
        className="rounded-2xl overflow-hidden shadow-xl bg-black cursor-grab active:cursor-grabbing flex items-center justify-center"
        style={{ height: 480 }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {video.type === "landscape" ? (
          <iframe
            key={video.id}
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&loop=1&playlist=${video.id}&controls=0&rel=0&modestbranding=1&iv_load_policy=3`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            sandbox="allow-scripts allow-same-origin allow-presentation allow-autoplay"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{ width: "100%", height: "100%", border: "none", pointerEvents: "none" }}
          />
        ) : (
          <iframe
            key={video.id}
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&loop=1&playlist=${video.id}&controls=0&rel=0&modestbranding=1&playsinline=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            sandbox="allow-scripts allow-same-origin allow-presentation allow-autoplay"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{ width: "270px", height: "100%", border: "none", pointerEvents: "none" }}
          />
        )}
      </div>

      {/* Prev / Next */}
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