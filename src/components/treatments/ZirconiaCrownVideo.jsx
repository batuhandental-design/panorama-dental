import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useLanguage } from "@/lib/LanguageContext";

// Phases:
// 0-2s: Damaged/prepared tooth stump appears
// 2-5s: Zirconia block (raw) appears via CAD/CAM
// 5-8s: Milling animation — block transforms into crown shape
// 8-11s: Porcelain layering on top (monolithic design)
// 11-14s: Crown placed on tooth, perfect fit glow

function easeInOut(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }
function lerp(a, b, t) { return a + (b - a) * t; }

const PHASES = [
  { name: "stump", start: 0, end: 2 },
  { name: "block", start: 2, end: 5 },
  { name: "mill", start: 5, end: 8 },
  { name: "layer", start: 8, end: 11 },
  { name: "place", start: 11, end: 14 },
  { name: "done", start: 14, end: 9999 },
];

const INFOS = [
  { phase: "block", title: "CAD/CAM Zirkon Blok", detail: "Tam seramik monolitik zirkon blok, dijital ağız taraması ile bilgisayar ortamında tasarlanır. Metal içermeyen saf yapı.", color: "#60b8d4" },
  { phase: "mill", title: "Frezeleme İşlemi", detail: "CNC freze makinesi zirkon bloğu, 0.02 mm hassasiyetle kron formuna getirir. Tam diş anatomisi dijital olarak aktarılır.", color: "#a78bfa" },
  { phase: "layer", title: "Porselen Tabaka", detail: "Monolitik tasarımda üst yüzey porselen ile kaplanarak ışık geçirgenliği ve doğal renk geçişi sağlanır.", color: "#f5e6d0" },
  { phase: "place", title: "Hassas Yerleşim", detail: "Adeziv siman ile diş yüzeyine tam uyumlu yapıştırma. Isırış ve renk kontrolü sonrası teslim.", color: "#4ade80" },
];

export default function ZirconiaCrownVideo() {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState("stump");
  const [activeInfo, setActiveInfo] = useState(null);
  const { t } = useLanguage();
  const vt = t.videoTexts?.zirconia || {};

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 7);

    scene.add(new THREE.AmbientLight(0xfff0e0, 0.5));
    const dir = new THREE.DirectionalLight(0xffffff, 1.3);
    dir.position.set(4, 6, 5);
    scene.add(dir);
    const rim = new THREE.DirectionalLight(0x4488ff, 0.4);
    rim.position.set(-4, -2, -3);
    scene.add(rim);

    const bg = new THREE.Mesh(new THREE.PlaneGeometry(16, 10), new THREE.MeshBasicMaterial({ color: 0x080510 }));
    bg.position.z = -3;
    scene.add(bg);

    // Tooth stump
    const stumpGeo = new THREE.CylinderGeometry(0.35, 0.45, 0.9, 16);
    const stumpMat = new THREE.MeshStandardMaterial({ color: 0xd4a876, metalness: 0.05, roughness: 0.7, transparent: true, opacity: 0 });
    const stump = new THREE.Mesh(stumpGeo, stumpMat);
    stump.position.y = -0.8;
    scene.add(stump);

    // Raw block
    const blockGeo = new THREE.BoxGeometry(1.2, 1.0, 0.9);
    const blockMat = new THREE.MeshStandardMaterial({ color: 0x9dd4e4, metalness: 0.3, roughness: 0.3, transparent: true, opacity: 0 });
    const block = new THREE.Mesh(blockGeo, blockMat);
    block.position.set(2, 0.5, 0);
    scene.add(block);

    // Crown (target shape — sphere squished)
    const crownGeo = new THREE.SphereGeometry(0.65, 32, 32);
    crownGeo.scale(1, 0.8, 0.75);
    const crownMat = new THREE.MeshStandardMaterial({ color: 0xb8e8f5, metalness: 0.15, roughness: 0.25, transparent: true, opacity: 0 });
    const crown = new THREE.Mesh(crownGeo, crownMat);
    crown.position.y = 0.5;
    scene.add(crown);

    // Porcelain outer layer
    const porcelainGeo = new THREE.SphereGeometry(0.72, 32, 32);
    porcelainGeo.scale(1, 0.8, 0.75);
    const porcelainMat = new THREE.MeshStandardMaterial({ color: 0xf0e8d8, metalness: 0, roughness: 0.2, transparent: true, opacity: 0 });
    const porcelain = new THREE.Mesh(porcelainGeo, porcelainMat);
    porcelain.position.y = 0.5;
    scene.add(porcelain);

    // Mill sparks
    const sCount = 60;
    const sPos = new Float32Array(sCount * 3);
    for (let i = 0; i < sCount; i++) {
      sPos[i * 3] = (Math.random() - 0.5) * 1.5;
      sPos[i * 3 + 1] = (Math.random() - 0.5) * 1.0;
      sPos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
    const sGeo = new THREE.BufferGeometry();
    sGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
    const sMat = new THREE.PointsMaterial({ color: 0xffa040, size: 0.05, transparent: true, opacity: 0 });
    const sparks = new THREE.Points(sGeo, sMat);
    scene.add(sparks);

    // Glow ring
    const ringGeo = new THREE.TorusGeometry(0.85, 0.02, 8, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x4da6ff, transparent: true, opacity: 0 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.3;
    scene.add(ring);

    let startTime = null;
    let frameId;
    const running = { val: true };

    function animate(ts) {
      if (!running.val) return;
      frameId = requestAnimationFrame(animate);
      if (!startTime) startTime = ts;
      const t = (ts - startTime) / 1000;

      const cur = PHASES.find(p => t >= p.start && t < p.end) || PHASES[PHASES.length - 1];
      setPhase(cur.name);
      scene.rotation.y = Math.sin(t * 0.35) * 0.4;

      const info = INFOS.find(i => i.phase === cur.name);
      setActiveInfo(info || null);

      if (cur.name === "stump") {
        stumpMat.opacity = easeInOut(Math.min(t / 2, 1));
        blockMat.opacity = 0; crownMat.opacity = 0; porcelainMat.opacity = 0; sMat.opacity = 0; ringMat.opacity = 0;
      }

      if (cur.name === "block") {
        stumpMat.opacity = 1;
        const p = easeInOut(Math.min((t - 2) / 3, 1));
        block.position.x = lerp(2.5, 0, p);
        blockMat.opacity = p;
        crownMat.opacity = 0; porcelainMat.opacity = 0; sMat.opacity = 0;
      }

      if (cur.name === "mill") {
        stumpMat.opacity = 1;
        block.position.x = 0;
        const p = easeInOut(Math.min((t - 5) / 3, 1));
        blockMat.opacity = lerp(1, 0, p);
        crownMat.opacity = lerp(0, 1, p);
        sMat.opacity = p * (0.5 + Math.sin(t * 10) * 0.5);
        porcelainMat.opacity = 0;
        block.scale.setScalar(lerp(1, 0.85, p));
      }

      if (cur.name === "layer") {
        stumpMat.opacity = 1;
        blockMat.opacity = 0; sMat.opacity = 0;
        crownMat.opacity = 1;
        const p = easeInOut(Math.min((t - 8) / 3, 1));
        porcelainMat.opacity = p * 0.75;
        porcelain.scale.setScalar(1 + Math.sin(t * 3) * 0.02 * p);
      }

      if (cur.name === "place") {
        blockMat.opacity = 0; sMat.opacity = 0;
        crownMat.opacity = 1; porcelainMat.opacity = 0.75;
        const p = easeInOut(Math.min((t - 11) / 3, 1));
        crown.position.y = lerp(0.5, -0.3, p);
        porcelain.position.y = lerp(0.5, -0.3, p);
        ringMat.opacity = lerp(0, 0.8, p) * (0.5 + Math.sin(t * 5) * 0.5);
        ring.position.y = crown.position.y;
      }

      if (cur.name === "done") {
        crownMat.opacity = 1; porcelainMat.opacity = 0.75;
        crown.position.y = -0.3; porcelain.position.y = -0.3;
        ringMat.opacity = 0.4 + Math.sin(t * 2) * 0.3;
        ring.position.y = -0.3;
        ring.rotation.z = t * 0.5;
      }

      renderer.render(scene, camera);
    }

    frameId = requestAnimationFrame(animate);
    const onResize = () => {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);
    return () => {
      running.val = false;
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden mb-16 font-inter" style={{ minHeight: 420 }}>
      <canvas ref={canvasRef} className="w-full" style={{ height: 420, display: "block" }} />
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6">
        <div />
        <div className="flex justify-end">
          {activeInfo && (
            <div key={activeInfo.phase} className="bg-black/60 backdrop-blur-md rounded-2xl border p-5 max-w-xs shadow-xl" style={{ borderColor: activeInfo.color + "55", animation: "fadeSlideIn 0.4s ease" }}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: activeInfo.color }}>
                {activeInfo.phase === "block" ? vt.blockTitle : activeInfo.phase === "mill" ? vt.millTitle : activeInfo.phase === "layer" ? vt.layerTitle : vt.placeTitle}
              </p>
              <p className="text-white/70 text-xs leading-relaxed">
                {activeInfo.phase === "block" ? vt.blockDetail : activeInfo.phase === "mill" ? vt.millDetail : activeInfo.phase === "layer" ? vt.layerDetail : vt.placeDetail}
              </p>
            </div>
          )}
          {phase === "done" && !activeInfo && (
            <div className="bg-black/60 backdrop-blur-md rounded-2xl border border-blue-400/30 p-5 max-w-xs shadow-xl" style={{ animation: "fadeSlideIn 0.4s ease" }}>
              <p className="text-blue-300 text-[10px] font-bold uppercase tracking-widest mb-2">{vt.doneTitle}</p>
              <p className="text-white/60 text-xs leading-relaxed">{vt.doneDetail}</p>
            </div>
          )}
        </div>
        <div />
      </div>
      <style>{`@keyframes fadeSlideIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}