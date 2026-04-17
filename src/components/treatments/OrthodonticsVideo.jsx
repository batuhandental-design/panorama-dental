import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useLanguage } from "@/lib/LanguageContext";

// Phases:
// 0-2s: Crooked teeth appear
// 2-5s: Aligner 1 placed — teeth start moving slightly
// 5-8s: Day 10 — aligner swap animation, further movement
// 8-11s: Aligner 3 — teeth nearly straight
// 11-14s: Final straight teeth, retainer placed, glow

function easeInOut(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }
function lerp(a, b, t) { return a + (b - a) * t; }

const PHASES = [
  { name: "crooked", start: 0, end: 2 },
  { name: "aligner1", start: 2, end: 5 },
  { name: "aligner2", start: 5, end: 8 },
  { name: "aligner3", start: 8, end: 11 },
  { name: "straight", start: 11, end: 14 },
  { name: "done", start: 14, end: 9999 },
];

// 5 teeth: initial offsets and rotations → final straight positions
const TOOTH_DATA = [
  { initX: -2.0, initRot: 0.3, finalX: -2.0, finalRot: 0, color: 0xf5ece0 },
  { initX: -1.0, initRot: -0.2, finalX: -1.0, finalRot: 0, color: 0xf2e8d8 },
  { initX: 0.0, initRot: 0.4, finalX: 0.0, finalRot: 0, color: 0xf5ece0 },
  { initX: 1.0, initRot: -0.3, finalX: 1.0, finalRot: 0, color: 0xf2e8d8 },
  { initX: 2.0, initRot: 0.2, finalX: 2.0, finalRot: 0, color: 0xf5ece0 },
];

const INFOS = [
  { phase: "aligner1", title: "Plak 1 — Başlangıç", detail: "Şeffaf termoform plak dişlere yerleştirilir. 0.1–0.3 mm hassas kuvvet uygulayarak dişleri hedeflenen yönde hareket ettirir.", color: "#60d4b8", day: "1. Gün" },
  { phase: "aligner2", title: "Plak 2 — 10. Gün", detail: "Her 10 günde bir yeni plak takılır. Her plak bir öncekine göre biraz daha ileri konumda tasarlanmıştır.", color: "#60b8d4", day: "10. Gün" },
  { phase: "aligner3", title: "Plak 3 — 20. Gün", detail: "Seri plaklar dişleri adım adım doğrultur. Dijital simülasyon tüm aşamaları önceden modellenmiştir.", color: "#a78bfa", day: "20. Gün" },
  { phase: "straight", title: "Retansiyon Plağı", detail: "Tedavi sonunda kalıcı pekiştirici plak kullanılır. Dişlerin elde edilen konumda sabit kalması sağlanır.", color: "#4ade80", day: "Son" },
];

export default function OrthodonticsVideo() {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState("crooked");
  const [activeInfo, setActiveInfo] = useState(null);
  const [day, setDay] = useState(0);
  const { t } = useLanguage();
  const vt = t.videoTexts || {};
  const ot = vt.orthodontics || {};

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    scene.add(new THREE.AmbientLight(0xfff8f0, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 1.3);
    dir.position.set(4, 6, 5);
    scene.add(dir);

    const bg = new THREE.Mesh(new THREE.PlaneGeometry(16, 10), new THREE.MeshBasicMaterial({ color: 0x060810 }));
    bg.position.z = -3;
    scene.add(bg);

    // Build teeth
    const toothMeshes = TOOTH_DATA.map(d => {
      const geo = new THREE.SphereGeometry(0.36, 20, 20);
      geo.scale(0.8, 1.1, 0.6);
      const mat = new THREE.MeshStandardMaterial({ color: d.color, metalness: 0.05, roughness: 0.5, transparent: true, opacity: 0 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(d.initX, 0, 0);
      mesh.rotation.z = d.initRot;
      scene.add(mesh);
      return mesh;
    });

    // Aligner shell (transparent arch shape)
    const alignerGeos = [];
    const alignerMeshes = [];
    for (let i = 0; i < 3; i++) {
      const geo = new THREE.TorusGeometry(2.4, 0.08, 8, 40, Math.PI);
      const mat = new THREE.MeshStandardMaterial({ color: 0x88ddff, metalness: 0, roughness: 0.1, transparent: true, opacity: 0 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = Math.PI / 2;
      mesh.position.y = 0.4;
      scene.add(mesh);
      alignerGeos.push(geo);
      alignerMeshes.push(mesh);
    }

    // Retainer (slightly different color)
    const retainerGeo = new THREE.TorusGeometry(2.4, 0.06, 8, 40, Math.PI);
    const retainerMat = new THREE.MeshStandardMaterial({ color: 0x4ade80, metalness: 0, roughness: 0.2, transparent: true, opacity: 0 });
    const retainer = new THREE.Mesh(retainerGeo, retainerMat);
    retainer.rotation.x = Math.PI / 2;
    retainer.position.y = 0.4;
    scene.add(retainer);

    // Movement arrows (small)
    const arrowGroup = new THREE.Group();
    scene.add(arrowGroup);

    // Glow
    const ringGeo = new THREE.TorusGeometry(2.6, 0.02, 8, 64, Math.PI);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x4ade80, transparent: true, opacity: 0 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    let startTime = null;
    let frameId;
    const running = { val: true };

    function setTeethPositions(progress, alignerIdx) {
      // progress 0 = crooked, 1 = straight
      toothMeshes.forEach((mesh, i) => {
        const d = TOOTH_DATA[i];
        mesh.position.x = d.initX; // stays in column
        mesh.position.y = lerp(d.initRot * 0.3, 0, progress); // slight up/down from rotation
        mesh.rotation.z = lerp(d.initRot, 0, progress);
        mesh.material.opacity = 1;
      });
    }

    function animate(ts) {
      if (!running.val) return;
      frameId = requestAnimationFrame(animate);
      if (!startTime) startTime = ts;
      const t = (ts - startTime) / 1000;

      const cur = PHASES.find(p => t >= p.start && t < p.end) || PHASES[PHASES.length - 1];
      setPhase(cur.name);
      scene.rotation.y = Math.sin(t * 0.25) * 0.25;

      const info = INFOS.find(i => i.phase === cur.name);
      setActiveInfo(info || null);
      if (info) {
        const dayMap = { aligner1: ot.day1, aligner2: ot.day10, aligner3: ot.day20, straight: ot.dayFinal };
        setDay(dayMap[cur.name] || info.day);
      }

      alignerMeshes.forEach(m => { m.material.opacity = 0; });
      retainerMat.opacity = 0;
      ringMat.opacity = 0;

      if (cur.name === "crooked") {
        const p = easeInOut(Math.min(t / 2, 1));
        toothMeshes.forEach((mesh, i) => {
          mesh.material.opacity = p;
          mesh.rotation.z = TOOTH_DATA[i].initRot;
          mesh.position.y = TOOTH_DATA[i].initRot * 0.3;
        });
        setDay(0);
      }

      if (cur.name === "aligner1") {
        const p = easeInOut(Math.min((t - 2) / 3, 1));
        setTeethPositions(p * 0.33, 0);
        alignerMeshes[0].material.opacity = p * 0.5;
        // Flash on swap
        if (p < 0.1) alignerMeshes[0].material.opacity = p * 5;
      }

      if (cur.name === "aligner2") {
        const p = easeInOut(Math.min((t - 5) / 3, 1));
        setTeethPositions(0.33 + p * 0.33, 1);
        alignerMeshes[1].material.opacity = 0.5;
        // Swap flash
        if (p < 0.15) {
          alignerMeshes[0].material.opacity = lerp(0.5, 0, p / 0.15);
          alignerMeshes[1].material.opacity = lerp(0, 0.5, p / 0.15);
        }
      }

      if (cur.name === "aligner3") {
        const p = easeInOut(Math.min((t - 8) / 3, 1));
        setTeethPositions(0.66 + p * 0.34, 2);
        alignerMeshes[2].material.opacity = 0.5;
        if (p < 0.15) {
          alignerMeshes[1].material.opacity = lerp(0.5, 0, p / 0.15);
          alignerMeshes[2].material.opacity = lerp(0, 0.5, p / 0.15);
        }
      }

      if (cur.name === "straight") {
        setTeethPositions(1, -1);
        const p = easeInOut(Math.min((t - 11) / 3, 1));
        retainerMat.opacity = p * 0.6;
        ringMat.opacity = lerp(0, 0.7, p) * (0.5 + Math.sin(t * 4) * 0.5);
        ring.rotation.z = t * 0.3;
      }

      if (cur.name === "done") {
        setTeethPositions(1, -1);
        retainerMat.opacity = 0.5 + Math.sin(t * 2) * 0.1;
        ringMat.opacity = 0.4 + Math.sin(t * 1.5) * 0.2;
        ring.rotation.z = t * 0.3;
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

  const alignerNumber = { aligner1: 1, aligner2: 2, aligner3: 3 }[phase] || null;

  return (
    <div className="relative w-full rounded-3xl overflow-hidden mb-16 font-inter" style={{ minHeight: 420 }}>
      <canvas ref={canvasRef} className="w-full" style={{ height: 420, display: "block" }} />
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6">
        {/* Day counter */}
        <div className="flex justify-start">
          {day !== 0 && (
            <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-1.5 border border-white/10">
              <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest">{day}</span>
              {alignerNumber && <span className="text-[#60d4b8] text-[10px] font-bold ml-2">{vt.aligner || "Aligner"} {alignerNumber}</span>}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          {activeInfo && (
            <div key={activeInfo.phase} className="bg-black/60 backdrop-blur-md rounded-2xl border p-5 max-w-xs shadow-xl" style={{ borderColor: activeInfo.color + "55", animation: "fadeSlideIn 0.4s ease" }}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: activeInfo.color }}>
                {activeInfo.phase === "aligner1" ? ot.aligner1Title : activeInfo.phase === "aligner2" ? ot.aligner2Title : activeInfo.phase === "aligner3" ? ot.aligner3Title : ot.straightTitle}
              </p>
              <p className="text-white/70 text-xs leading-relaxed">
                {activeInfo.phase === "aligner1" ? ot.aligner1Detail : activeInfo.phase === "aligner2" ? ot.aligner2Detail : activeInfo.phase === "aligner3" ? ot.aligner3Detail : ot.straightDetail}
              </p>
            </div>
          )}
          {phase === "done" && !activeInfo && (
            <div className="bg-black/60 backdrop-blur-md rounded-2xl border border-green-400/30 p-5 max-w-xs shadow-xl" style={{ animation: "fadeSlideIn 0.4s ease" }}>
              <p className="text-green-400 text-[10px] font-bold uppercase tracking-widest mb-2">{ot.doneTitle}</p>
              <p className="text-white/60 text-xs leading-relaxed">{ot.doneDetail}</p>
            </div>
          )}
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2">
          {["crooked", "aligner1", "aligner2", "aligner3", "straight", "done"].map((p, i) => (
            <div key={i} className="rounded-full transition-all duration-500"
              style={{ width: phase === p ? 24 : 8, height: 8, background: phase === p ? "#60d4b8" : "rgba(255,255,255,0.2)" }} />
          ))}
        </div>
      </div>
      <style>{`@keyframes fadeSlideIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}