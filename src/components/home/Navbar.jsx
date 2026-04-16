import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/lib/LanguageContext";

const hashes = ["#hero", "#about", "#services", "#operations", "#contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { t } = useLanguage();

  const getHref = (hash) => isHome ? hash : `/${hash}`;

  return (
    <nav className="bg-[#2c2419] text-white sticky top-0 z-50 font-inter">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-3 text-2xl font-bold tracking-tight">
          <div className="flex-shrink-0">
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="19" cy="12" rx="10" ry="9" fill="#2c2419" stroke="#c9a87c" strokeWidth="1.5"/>
              <path d="M9 12c0 0-2 4-2 8 0 3 1.5 5 3.5 5s3-2 4.5-2 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 3.5-2 3.5-5c0-4-2-8-2-8" fill="#2c2419" stroke="#c9a87c" strokeWidth="1.5" strokeLinejoin="round"/>
              <ellipse cx="13" cy="10" rx="2.5" ry="3.5" fill="#c9a87c" opacity="0.35"/>
              <ellipse cx="19" cy="8.5" rx="2" ry="3" fill="#c9a87c" opacity="0.35"/>
              <ellipse cx="25" cy="10" rx="2.5" ry="3.5" fill="#c9a87c" opacity="0.35"/>
              <path d="M11 12 Q19 6 27 12" stroke="#c9a87c" strokeWidth="1" fill="none" opacity="0.5"/>
              <circle cx="13" cy="10" r="1" fill="#e8dfd5" opacity="0.6"/>
              <circle cx="19" cy="8.5" r="0.8" fill="#e8dfd5" opacity="0.6"/>
              <circle cx="25" cy="10" r="1" fill="#e8dfd5" opacity="0.6"/>
            </svg>
          </div>
          <div>
            <div><span className="text-primary">PANORAMA</span></div>
            <div><span className="text-white text-xl">DENTAL</span></div>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {t.nav.map((label, i) =>
          <a
            key={i}
            href={getHref(hashes[i])}
            className="mx-2 px-5 py-2 text-sm font-medium uppercase tracking-wide hover:text-primary transition-colors">
            
              {label}
            </a>
          )}
          <a
            href={getHref("#contact")}
            className="ml-4 relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-300 overflow-hidden group"
            style={{ border: '1.5px solid rgba(201,168,124,0.7)', color: '#c9a87c', background: 'rgba(139,104,64,0.12)', backdropFilter: 'blur(8px)', boxShadow: '0 0 12px rgba(201,168,124,0.2), inset 0 1px 0 rgba(255,255,255,0.08)' }}
            onMouseEnter={(e) => {e.currentTarget.style.background = 'rgba(139,104,64,0.28)';e.currentTarget.style.boxShadow = '0 0 28px rgba(201,168,124,0.45), 0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)';e.currentTarget.style.borderColor = '#c9a87c';e.currentTarget.style.color = '#e2c48e';}}
            onMouseLeave={(e) => {e.currentTarget.style.background = 'rgba(139,104,64,0.12)';e.currentTarget.style.boxShadow = '0 0 12px rgba(201,168,124,0.2), inset 0 1px 0 rgba(255,255,255,0.08)';e.currentTarget.style.borderColor = 'rgba(201,168,124,0.7)';e.currentTarget.style.color = '#c9a87c';}}>
            
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(201,168,124,0.18) 50%, transparent 60%)' }} />
            <span className="absolute inset-0 rounded-xl animate-ping pointer-events-none" style={{ border: '1px solid rgba(201,168,124,0.3)', animationDuration: '2.2s' }} />
            <Phone className="w-4 h-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <span className="relative z-10">{t.freeConsult}</span>
          </a>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open &&
      <div className="md:hidden bg-[#2c2419] border-t border-white/10 px-4 pb-4">
          {t.nav.map((label, i) =>
        <a
          key={i}
          href={getHref(hashes[i])}
          className="block py-3 text-sm font-medium uppercase tracking-wide hover:text-primary transition-colors border-b border-white/5"
          onClick={() => setOpen(false)}>
          
              {label}
            </a>
        )}
        </div>
      }
    </nav>);

}