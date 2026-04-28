import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// SVG icon paths for each operation (Font Awesome style, white fill)
const svgIcons = {
  tooth: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M12 2C9.5 2 7.5 3.5 6 5c-1 1-1.5 2.5-1.5 4 0 2 .8 3.8 1 5.5.3 2 .5 4.5 1.5 6 .4.7 1 1.5 2 1.5s1.5-.8 1.8-1.5c.3-.7.7-2 1.2-2s.9 1.3 1.2 2c.3.7.8 1.5 1.8 1.5s1.6-.8 2-1.5c1-1.5 1.2-4 1.5-6 .2-1.7 1-3.5 1-5.5 0-1.5-.5-3-1.5-4C16.5 3.5 14.5 2 12 2z"/>
    </svg>
  ),
  smile: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-3 8c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-3 7c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z"/>
    </svg>
  ),
  grid: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M3 3h7v7H3zm0 11h7v7H3zm11-11h7v7h-7zm0 11h7v7h-7z"/>
    </svg>
  ),
  crown: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M12 2L9 9 2 7l4 10h16l4-10-7 2z"/>
    </svg>
  ),
  diamond: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M12 2L2 9l10 13L22 9z"/>
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  ),
  dentures: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M4 8c0-2.2 1.8-4 4-4s4 1.8 4 4v2H4V8zm12-4c2.2 0 4 1.8 4 4v2h-8V8c0-2.2 1.8-4 4-4zM3 12h18v2c0 3.3-2.7 6-6 6H9c-3.3 0-6-2.7-6-6v-2z"/>
    </svg>
  ),
  syringe: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M17.5 2.5l4 4-1.5 1.5-1-1-8.5 8.5.5 2.5-4 4-4-4 4-4 2.5.5 8.5-8.5-1-1zM3 17l4 4-1 1H2v-4l1-1z"/>
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5zm0 10l1 3 3 1-3 1-1 3-1-3-3-1 3-1z"/>
    </svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
    </svg>
  ),
  drop: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M12 2C6.5 8 4 12.5 4 15.5 4 19.1 7.7 22 12 22s8-2.9 8-6.5C20 12.5 17.5 8 12 2z"/>
    </svg>
  ),
  face: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
    </svg>
  ),
  nose: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M12 3C9.5 3 8 5 8 7v8c0 2 2 4 4 4s4-2 4-4V7c0-2-1.5-4-4-4z"/>
    </svg>
  ),
  scissors: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3h-3z"/>
    </svg>
  ),
  scale: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M12 3L4 7v2c0 5.5 3.4 10.7 8 12 4.6-1.3 8-6.5 8-12V7l-8-4z"/>
    </svg>
  ),
  run: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7z"/>
    </svg>
  ),
  flower: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M12 22q-1.25 0-2.125-.875T9 19q0-.575.213-1.088.212-.512.587-.912l-.65-.65q-.4.375-.913.588Q7.725 17.15 7.15 17.15q-1.25 0-2.125-.875T4.15 14.15q0-.575.213-1.088.212-.512.587-.912l-.65-.65q-.4.375-.913.588Q2.875 12.3 2.3 12.3q-1.25 0-2.125-.875T-.7 9.3q0-1.25.875-2.125T2.3 6.3q.575 0 1.087.213.513.212.913.587l.65-.65q-.375-.4-.587-.913Q4.15 5 4.15 4.425q0-1.25.875-2.125T7.15 1.425q1.25 0 2.125.875T10.15 4.425q0 .575-.213 1.088-.212.512-.587.912l.65.65q.4-.375.913-.587Q11.425 6.3 12 6.3q1.25 0 2.125.875T15 9.3q0 1.25-.875 2.125T12 12.3q-1.25 0-2.125-.875T9 9.3h-.025q.025.1.025.2 0 1.675 1.175 2.85Q11.35 13.525 13 13.525h-.025q-.1 0-.2.025 1.25.025 2.125.9T15.8 16.7q0 1.25-.875 2.125T12.8 19.7q-.575 0-1.088-.213-.512-.212-.912-.587l-.65.65q.375.4.587.913.213.512.213 1.087 0 1.25-.875 2.125T8 22z"/>
    </svg>
  ),
  muscle: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
    </svg>
  ),
  medical: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z"/>
    </svg>
  ),
  gender: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
    </svg>
  ),
  femaleSymbol: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M12 2C8.69 2 6 4.69 6 8c0 2.97 2.04 5.44 4.8 6.21L10 16H8v2h2l-.01 2H12l.01-2H14v-2h-2l.8-1.79C15.96 13.44 18 10.97 18 8c0-3.31-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
    </svg>
  ),
  sprout: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M17 8C8 10 5.9 16.17 3.82 21H5.71c.25-.66.48-1.32.75-1.96 1.06.75 2.25 1.21 3.54 1.21C14 20.25 17 16 17 8z"/>
    </svg>
  ),
  eyebrow: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M12 4C6.48 4 2 8.48 2 14h20c0-5.52-4.48-10-10-10zM4.5 12c.83-2.94 3.5-5 7.5-5s6.67 2.06 7.5 5H4.5z"/>
    </svg>
  ),
  beard: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M12 2C8.13 2 5 5.13 5 9v3.5c0 3 1.5 5.5 4 7l3 1.5 3-1.5c2.5-1.5 4-4 4-7V9c0-3.87-3.13-7-7-7z"/>
    </svg>
  ),
  microscope: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M9.46 6.28L11.05 9c-.7.41-1.17 1.15-1.17 2.01 0 1.3 1.06 2.35 2.36 2.35S14.6 12.31 14.6 11c0-.86-.47-1.6-1.17-2.01l1.59-2.71c1.58.92 2.65 2.62 2.65 4.58 0 2.25-1.41 4.19-3.43 4.99V18h1.91v2H7.85v-2h1.91v-3.15C7.74 14.14 6.33 12.2 6.33 9.97c0-1.96 1.07-3.66 2.65-4.58l.48.89zm3.78-1.4c.24 0 .47.04.69.09L12.24 2 10.55 4.98c.23-.05.46-.09.69-.09.75 0 1.44.25 2 .67l1-1.72c-.6-.58-1.35-.96-2.18-1.04L12.24 0l-1.03 1.8c-.83.08-1.58.46-2.18 1.04l1 1.72c.56-.42 1.25-.67 2-.67z"/>
    </svg>
  ),
  laser: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
    </svg>
  ),
  stomach: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M18 4H6C4.9 4 4 4.9 4 6v4c0 4.4 3.6 8 8 8s8-3.6 8-8V6c0-1.1-.9-2-2-2zm-2 9c0 2.2-1.8 4-4 4s-4-1.8-4-4V6h8v7z"/>
    </svg>
  ),
  balloon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M12 2C8.69 2 6 4.69 6 8c0 3.86 3.44 8.21 5.38 10.38.32.37.93.37 1.25 0C14.56 16.21 18 11.86 18 8c0-3.31-2.69-6-6-6zm0 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
    </svg>
  ),
  pill: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M4.22 11.29l6.36-6.36c1.17-1.17 3.07-1.17 4.24 0l4.24 4.24c1.17 1.17 1.17 3.07 0 4.24l-6.36 6.36c-1.17 1.17-3.07 1.17-4.24 0L4.22 15.53c-1.17-1.17-1.17-3.07 0-4.24zm9.19-5.65L8.05 11l2.83 2.83 5.36-5.36-2.83-2.83z"/>
    </svg>
  ),
  clipboard: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
    </svg>
  ),
  eyeCheck: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
    </svg>
  ),
  glasses: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M20 7H4c-1.1 0-2 .9-2 2v2c0 .55.45 1 1 1h1.5c.83 0 1.5.67 1.5 1.5S5.33 15 4.5 15H4c-.55 0-1 .45-1 1s.45 1 1 1h.5C6.43 17 8 15.43 8 13.5V13h8v.5c0 1.93 1.57 3.5 3.5 3.5H20c.55 0 1-.45 1-1s-.45-1-1-1h-.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5H21c.55 0 1-.45 1-1V9c0-1.1-.9-2-2-2z"/>
    </svg>
  ),
  stethoscope: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M19 8c0-1.1-.9-2-2-2h-1V4h-2v2H8V4H6v2H5C3.9 6 3 6.9 3 8v2c0 3.31 2.69 6 6 6h.08C9.95 17.16 11 18.45 11 20c0 1.1.9 2 2 2s2-.9 2-2c0-1.55 1.05-2.84 2.92-4H18c3.31 0 6-2.69 6-6V8h-5zm3 2c0 2.21-1.79 4-4 4H5c-2.21 0-4-1.79-4-4V8h20v2z"/>
    </svg>
  ),
};

const categories = [
  {
    label: "Diş Tedavileri",
    items: [
      { title: "Diş\nİmplantı", icon: svgIcons.tooth, slug: "dis-implanti" },
      { title: "Hollywood\nGülümsemesi", icon: svgIcons.smile, slug: "hollywood-gulumsemesi" },
      { title: "All on 4\nİmplantasyon", icon: svgIcons.grid, slug: "all-on-4" },
      { title: "Emax\nTaç", icon: svgIcons.crown, slug: "emax-tac" },
      { title: "Zirkonyum\nKaplama", icon: svgIcons.diamond, slug: "zirkonyum-kaplama" },
      { title: "Veneer", icon: svgIcons.star, slug: "veneer" },
      { title: "Hareketli ve\nSabit Protez", icon: svgIcons.dentures, slug: "hareketli-protez" },
      { title: "Kanal\nTedavisi", icon: svgIcons.syringe, slug: "kanal-tedavisi" },
      { title: "Diş\nBeyazlatma", icon: svgIcons.sparkle, slug: "dis-beyazlatma" },
    ],
  },
  {
    label: "Estetik Cerrahi",
    items: [
      { title: "Göz Kapağı\nEstetiği", icon: svgIcons.eye, slug: "goz-kapagi-estetigi" },
      { title: "Yüze Yağ\nEnjeksiyonu", icon: svgIcons.drop, slug: "yuze-yag-enjeksiyonu" },
      { title: "Yüz\nGerme", icon: svgIcons.face, slug: "yuz-germe" },
      { title: "Rinoplasti", icon: svgIcons.nose, slug: "rinoplasti" },
      { title: "Bişektomi", icon: svgIcons.scissors, slug: "bisektomi" },
      { title: "Liposuction", icon: svgIcons.scale, slug: "liposuction" },
      { title: "Karın\nGerme", icon: svgIcons.run, slug: "karin-germe" },
      { title: "Meme\nEstetiği", icon: svgIcons.flower, slug: "meme-estetigi" },
      { title: "BBL", icon: svgIcons.muscle, slug: "bbl" },
      { title: "Penis\nBüyütme", icon: svgIcons.gender, slug: "penis-buyutme" },
      { title: "Vajina\nEstetiği", icon: svgIcons.femaleSymbol, slug: "vajina-estetigi" },
    ],
  },
  {
    label: "Saç Ekimi",
    items: [
      { title: "DHI Saç\nEkimi", icon: svgIcons.sprout, slug: "dhi-sac-ekimi" },
      { title: "DHI Kaş\nEkimi", icon: svgIcons.eyebrow, slug: "dhi-kas-ekimi" },
      { title: "DHI Sakal\nEkimi", icon: svgIcons.beard, slug: "dhi-sakal-ekimi" },
      { title: "PRP", icon: svgIcons.microscope, slug: "prp" },
      { title: "Kök Hücre\nTedavisi", icon: svgIcons.laser, slug: "kok-hucre-tedavisi" },
      { title: "Saç\nLazeri", icon: svgIcons.laser, slug: "sac-lazeri" },
    ],
  },
  {
    label: "Obezite Cerrahisi",
    items: [
      { title: "Mide\nBypass", icon: svgIcons.stomach, slug: "mide-baypas" },
      { title: "Tüp Mide\nAmeliyatı", icon: svgIcons.stethoscope, slug: "tup-mide" },
      { title: "Mide Balonu\n(6-12 Aylık)", icon: svgIcons.balloon, slug: "mide-balonu" },
      { title: "Mide\nBotoksu", icon: svgIcons.pill, slug: "mide-botoksu" },
      { title: "Tip 2 Diyabet\nOperasyonu", icon: svgIcons.clipboard, slug: "tip2-diyabet" },
    ],
  },
  {
    label: "Göz Operasyonları",
    items: [
      { title: "Excimer\nLaser", icon: svgIcons.eyeCheck, slug: "lazer-goz" },
      { title: "Katarakt\nAmeliyatı", icon: svgIcons.eye, slug: "katarakt-ameliyati" },
      { title: "Smart\nLens", icon: svgIcons.glasses, slug: "akilli-lens" },
    ],
  },
];

function OperationCard({ item, catLabel, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
    >
      <Link
        to={`/operasyon/${item.slug}`}
        className="group flex flex-col items-center text-center gap-2 py-5 px-3 rounded-xl transition-all duration-300 operation-card"
      >
        {/* Gold circle icon */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #c9a87c 0%, #a07840 100%)",
            boxShadow: "0 4px 15px rgba(201,168,124,0.25)",
          }}
        >
          <span className="text-white">{item.icon}</span>
        </div>

        {/* Category label */}
        <span
          className="text-[9px] font-bold uppercase tracking-[0.18em] mt-1 transition-colors duration-300"
          style={{ color: "rgba(201,168,124,0.6)" }}
        >
          {catLabel}
        </span>

        {/* Title */}
        <h4
          className="text-white text-xs font-semibold leading-snug transition-colors duration-300 whitespace-pre-line"
        >
          {item.title}
        </h4>
      </Link>
    </motion.div>
  );
}

export default function DepartmentsSection() {
  return (
    <section
      className="py-20 font-inter"
      id="departments"
      style={{ background: "#10172a" }}
    >
      <style>{`
        .operation-card:hover .operation-icon-circle {
          box-shadow: 0 0 30px rgba(201,168,124,0.7), 0 0 60px rgba(201,168,124,0.35);
        }
        .operation-card:hover span[style] {
          color: #c9a87c !important;
        }
        .operation-card:hover h4 {
          color: #c9a87c;
        }
        .operation-card:hover > div:first-child {
          box-shadow: 0 0 25px rgba(201,168,124,0.8), 0 0 50px rgba(201,168,124,0.4), 0 0 80px rgba(201,168,124,0.2) !important;
          transform: scale(1.08);
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="w-10 h-0.5 bg-[#c9a87c] mx-auto mb-5" />
          <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair mb-4 tracking-[0.25em]">
            OPERASYONLAR
          </h2>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            Kliniğimizin uzmanlaştığı bir hizmet grubudur.
          </p>
        </div>

        {/* All cards in a single flowing grid — like reference image */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {categories.flatMap((cat) =>
            cat.items.map((item, ii) => (
              <OperationCard key={item.slug} item={item} catLabel={cat.label} index={ii} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}