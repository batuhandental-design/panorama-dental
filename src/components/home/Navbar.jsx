import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
{ label: "Anasayfa", href: "#hero" },
{ label: "Hakkımızda", href: "#about" },
{ label: "Hizmetlerimiz", href: "#services" },
{ label: "Operasyonlar", href: "#operations" },
{ label: "Bize Ulaşın", href: "#contact" }];


export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#2c2419] text-white sticky top-0 z-50 font-inter">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <a href="#" className="text-2xl font-bold tracking-tight">
          <span className="text-primary">PANORAMA</span>{" "}
          <span className="text-white">DENTAL</span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) =>
          <a
            key={item.label}
            href={item.href} className="mx-2 px-5 py-2 text-sm font-medium uppercase tracking-wide hover:text-primary transition-colors">
              {item.label}
            </a>
          )}
          <a
            href="https://wa.me/905315898089"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 relative flex items-center gap-2 px-5 py-2 bg-[#25D366] text-white text-sm font-bold rounded-xl uppercase tracking-wide hover:bg-[#20bb5a] transition-all shadow-lg shadow-green-500/30 hover:scale-105 hover:shadow-green-500/50"
          >
            <span className="absolute inset-0 rounded-xl bg-[#25D366] opacity-0 hover:opacity-30 animate-ping pointer-events-none" style={{ animationDuration: '2.5s' }} />
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.849L.057 23.882l6.204-1.448A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.876 9.876 0 01-5.034-1.376l-.361-.214-3.741.873.937-3.63-.235-.374A9.851 9.851 0 012.106 12C2.106 6.525 6.525 2.106 12 2.106c5.476 0 9.894 4.419 9.894 9.894 0 5.476-4.418 9.894-9.894 9.894z"/>
            </svg>
            Ücretsiz Konsültasyon
          </a>
        </div>


        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}>
          
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open &&
      <div className="md:hidden bg-[#2c2419] border-t border-white/10 px-4 pb-4">
          {navItems.map((item) =>
        <a
          key={item.label}
          href={item.href}
          className="block py-3 text-sm font-medium uppercase tracking-wide hover:text-primary transition-colors border-b border-white/5"
          onClick={() => setOpen(false)}>
          
              {item.label}
            </a>
        )}
        </div>
      }
    </nav>);

}