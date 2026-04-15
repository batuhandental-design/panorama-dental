import { Clock, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function TopBar() {
  return (
    <div className="bg-[#3d3028] text-white py-2 px-4 font-inter hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-primary/40 flex items-center justify-center">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-gray-400">7/24 Hizmetinizdeyiz</p>
              <p className="text-xs font-medium">Pazar : KAPALI</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-primary/40 flex items-center justify-center">
              <Phone className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Bizi Arayın</p>
              <a href="tel:+905491240103" className="text-xs font-medium hover:text-primary transition-colors">+90 549 124 01 03</a>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-primary/40 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-gray-400">İstanbul / Turkey</p>
              <p className="text-xs font-medium">Haliç</p>
            </div>
          </div>
        </div>


      </div>
    </div>);

}