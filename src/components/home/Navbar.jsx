import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

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
            href="#contact"
            className="ml-4 relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-300 overflow-hidden group"
            style={{ border: '1.5px solid rgba(201,168,124,0.5)', color: '#c9a87c', background: 'rgba(139,104,64,0.08)', backdropFilter: 'blur(8px)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,104,64,0.22)'; e.currentTarget.style.borderColor = '#c9a87c'; e.currentTarget.style.boxShadow = '0 0 18px rgba(201,168,124,0.25), 0 4px 16px rgba(0,0,0,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(139,104,64,0.08)'; e.currentTarget.style.borderColor = 'rgba(201,168,124,0.5)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(201,168,124,0.08) 0%, transparent 100%)' }} />
            <Phone className="w-4 h-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <span className="relative z-10">Ücretsiz Konsültasyon</span>
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