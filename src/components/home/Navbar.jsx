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
        <a href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <div>
            <div><span className="text-primary">PANORAMA</span></div>
            <div><span className="text-white text-xl">DENTAL</span></div>
          </div>
          {/* El çizimi diş ikonu - sağ taraf */}
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 ml-1">
            {/* El çizimi stili - kalem darbeli diş */}
            <path d="M14 8 C12 7, 8 8, 7 12 C6 15, 7 18, 8 21 C9 25, 9 30, 11 34 C12 37, 13 38, 15 37 C16 36, 16 33, 17 31 C18 28, 19 27, 22 27 C25 27, 26 28, 27 31 C28 33, 28 36, 29 37 C31 38, 32 37, 33 34 C35 30, 35 25, 36 21 C37 18, 38 15, 37 12 C36 8, 32 7, 30 8 C28 9, 27 11, 25 12 C24 13, 23 13, 22 13 C21 13, 20 13, 19 12 C17 11, 16 9, 14 8 Z"
              stroke="#c9a87c" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"
              style={{filter: 'drop-shadow(0 0 3px rgba(201,168,124,0.4))'}}
            />
            {/* Diş yüzeyi çizgileri - el çizimi görünüm */}
            <path d="M16 11 C16 11, 17 14, 17 17" stroke="#c9a87c" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7"/>
            <path d="M22 13 C22 13, 22 16, 22 18" stroke="#c9a87c" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7"/>
            <path d="M28 11 C28 11, 27 14, 27 17" stroke="#c9a87c" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7"/>
            {/* Hafif parlama noktası */}
            <path d="M13 10 C14 9, 16 9, 17 10" stroke="#e8dfd5" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
          </svg>
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