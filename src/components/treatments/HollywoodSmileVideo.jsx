import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Phases:
// 0-2s: Single layer zirconia crown appears
// 2-5s: Splits into dual layer (monolithic inner + outer veneer)
// 5-8s: Inner layer highlight + info
// 8-11s: Outer layer highlight + info
// 11-14s: Layers merge → perfect smile glow

const PHASES = [
  { name: "intro", start: 0, end: 2 },
  { name: "split", start: 2, end: 4 },
  { name: "inner", start: 4, end: 7 },
  { name: "outer", start: 7, end: 10 },
  { name: "merge", start: 10, end: 13 },
  { name: "done", start: 13, end: 9999 },
];

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
function lerp(a, b, t) { return a + (b - a) * t; }

const INFO = [
  {
    title: "Monolitik Zirkon Alt Yapı",
    detail: "Tek parça zirkon bloktan frezelenen iç yapı, yüksek kırılma direnci ve tam opaklık sağlar. Metal içermez.",
    color: 0x7eb8c9,
  },
  {
    title: "Porselen Üst Veneer Katmanı",
    detail: "0.3–0.5 mm ultra ince porselen tabaka, doğal diş şeffaflığını ve renk geçişini taklit eder. Işık geçirgenliği ile mükemmel estetik.",
    color: 0xf5e6d0,
  },
];

export default function HollywoodSmileVideo() {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState("intro");
  const [activeInfo, setActiveInfo] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 7);

    // Lights
    scene.add(new THREE.AmbientLight(0xfff8f0, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 1.4);
    dir.position.set(4, 6, 5);
    scene.add(dir);
    const rim = new THREE.DirectionalLight(0xffd700, 0.5);
    rim.position.set(-4, -2, -3);
    scene.add(rim);

    // Background
    const bgGeo = new THREE.PlaneGeometry(14, 9);
    const bgMat = new THREE.MeshBasicMaterial({ color: 0x0d0a05, transparent: true, opacity: 0.97 });
    scene.add(new THREE.Mesh(bgGeo, bgMat)).position.z = -2;

    // Inner layer - zirconia core (flatter tooth shape)
    const innerGeo = new THREE.SphereGeometry(0.9, 32, 32);
    innerGeo.scale(1.1, 0.85, 0.6);
    const innerMat = new THREE.MeshStandardMaterial({ color: 0x7eb8c9, metalness: 0.2, roughness: 0.4, transparent: true, opacity: 0 });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // Outer layer - porcelain veneer (slightly larger)
    const outerGeo = new THREE.SphereGeometry(1.05, 32, 32);
    outerGeo.scale(1.1, 0.85, 0.6);
    const outerMat = new THREE.MeshStandardMaterial({ color: 0xf5e6d0, metalness: 0.0, roughness: 0.25, transparent: true, opacity: 0 });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    scene.add(outerMesh);

    // Glow ring
    const ringGeo = new THREE.TorusGeometry(1.3, 0.02, 8, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffd700, transparent: true, opacity: 0 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    // Particles (sparkles)
    const particleCount = 60;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    const partGeo = new THREE.BufferGeometry();
    partGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const partMat = new THREE.PointsMaterial({ color: 0xffd700, size: 0.05, transparent: true, opacity: 0 });
    const particles = new THREE.Points(partGeo, partMat);
    scene.add(particles);

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

      scene.rotation.y = Math.sin(t * 0.4) * 0.5;

      if (cur.name === "intro") {
        const p = easeInOut(Math.min(t / 2, 1));
        outerMat.opacity = p;
        innerMat.opacity = 0;
        ringMat.opacity = 0;
        partMat.opacity = 0;
        setActiveInfo(null);
      }

      if (cur.name === "split") {
        const p = easeInOut(Math.min((t - 2) / 2, 1));
        outerMesh.position.x = lerp(0, 1.4, p);
        innerMesh.position.x = lerp(0, -1.4, p);
        innerMat.opacity = lerp(0, 1, p);
        outerMat.opacity = 1;
        setActiveInfo(null);
      }

      if (cur.name === "inner") {
        innerMesh.position.x = -1.4;
        outerMesh.position.x = 1.4;
        innerMat.opacity = 1;
        outerMat.opacity = 0.25;
        innerMesh.scale.setScalar(1 + Math.sin(t * 3) * 0.04);
        setActiveInfo(0);
      }

      if (cur.name === "outer") {
        innerMesh.position.x = -1.4;
        outerMesh.position.x = 1.4;
        outerMat.opacity = 1;
        innerMat.opacity = 0.25;
        outerMesh.scale.setScalar(1 + Math.sin(t * 3) * 0.04);
        setActiveInfo(1);
      }

      if (cur.name === "merge") {
        const p = easeInOut(Math.min((t - 10) / 3, 1));
        outerMesh.position.x = lerp(1.4, 0, p);
        innerMesh.position.x = lerp(-1.4, 0, p);
        outerMat.opacity = 1;
        innerMat.opacity = lerp(1, 0.6, p);
        ringMat.opacity = lerp(0, 0.8, p) * (0.5 + Math.sin(t * 5) * 0.5);
        partMat.opacity = lerp(0, 0.7, p);
        outerMesh.scale.setScalar(1);
        innerMesh.scale.setScalar(1);
        setActiveInfo(null);
      }

      if (cur.name === "done") {
        outerMesh.position.x = 0;
        innerMesh.position.x = 0;
        outerMat.opacity = 1;
        innerMat.opacity = 0.6;
        ringMat.opacity = 0.4 + Math.sin(t * 2) * 0.3;
        ring.rotation.z = t * 0.5;
        partMat.opacity = 0.5 + Math.sin(t * 1.5) * 0.3;
        setActiveInfo(null);
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
          {activeInfo !== null && (
            <div key={activeInfo} className="bg-black/60 backdrop-blur-md rounded-2xl border border-yellow-400/30 p-5 max-w-xs shadow-xl" style={{ animation: "fadeSlideIn 0.4s ease" }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ background: `#${INFO[activeInfo].color.toString(16).padStart(6, "0")}` }} />
                <p className="text-yellow-400 text-[10px] font-bold uppercase tracking-widest">Katman {activeInfo + 1}</p>
              </div>
              <h4 className="text-white font-bold text-base mb-2">{INFO[activeInfo].title}</h4>
              <p className="text-white/70 text-xs leading-relaxed">{INFO[activeInfo].detail}</p>
            </div>
          )}
          {phase === "done" && (
            <div className="bg-black/60 backdrop-blur-md rounded-2xl border border-yellow-400/30 p-5 max-w-xs shadow-xl" style={{ animation: "fadeSlideIn 0.4s ease" }}>
              <p className="text-yellow-400 text-[10px] font-bold uppercase tracking-widest mb-2">✓ Hollywood Gülüşü</p>
              <h4 className="text-white font-bold text-sm mb-1">Çift katman, tek mükemmel kaplama</h4>
              <p className="text-white/60 text-xs leading-relaxed">Zirkon altyapı + porselen veneer = doğal, kalıcı ve estetik gülüş.</p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center gap-3">
          {INFO.map((info, i) => (
            <div key={i} className="flex items-center gap-2 rounded-full px-3 py-1 border transition-all duration-500"
              style={{ background: activeInfo === i ? "rgba(255,215,0,0.15)" : "rgba(0,0,0,0.3)", borderColor: activeInfo === i ? "#ffd700" : "rgba(255,255,255,0.1)" }}>
              <div className="w-2 h-2 rounded-full" style={{ background: `#${info.color.toString(16).padStart(6, "0")}` }} />
              <span className="text-white/70 text-[10px] font-medium">{info.title}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes fadeSlideIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}