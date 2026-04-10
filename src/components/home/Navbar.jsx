import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
{ label: "Anasayfa", href: "#" },
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