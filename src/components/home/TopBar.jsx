import { Clock, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function TopBar() {
  const { t } = useLanguage();

  return (
    <div
      className="text-white font-inter hidden md:block fixed top-0 left-0 right-0 z-50"
      style={{ background: "#3d3028" }}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-2 text-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-primary/40 flex items-center justify-center">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-gray-400">{t.topBarAvail}</p>
              <p className="text-xs font-medium">{t.topBarClosed}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-primary/40 flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-gray-400">{t.topBarCall}</p>
              <div className="flex flex-col gap-0.5">
                <a href="tel:+905551896062" className="text-xs font-medium hover:text-primary transition-colors">
                  <span className="text-gray-400">Haliç</span> — +90 555 189 60 62
                </a>
                <a href="tel:+905321592703" className="text-xs font-medium hover:text-primary transition-colors">
                  <span className="text-gray-400">Pendik</span> — +90 532 159 27 03
                </a>
              </div>
            </div>
          </div>
          <a href="#contact" className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
            <div className="w-8 h-8 rounded-full border border-primary/40 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-gray-400">İstanbul / Turkey</p>
              <p className="text-xs font-medium">Haliç ve Pendik</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}