import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useLanguage } from "@/lib/LanguageContext";

// Phases:
// 0-2s: Tooth appears (yellowish)
// 2-5s: Opalescence device appears, gel applied
// 5-8s: Light activates, bleach penetrates enamel layer by layer
// 8-11s: Tooth brightens shade by shade (8 shades)
// 11-14s: Final white tooth glow

function easeInOut(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }
function lerp(a, b, t) { return a + (b - a) * t; }

const SHADES = [0xc8b070, 0xd4bc78, 0xddc882, 0xe6d48e, 0xeedd9a, 0xf3e6a8, 0xf8f0c4, 0xfffde0];

const PHASES = [
  { name: "appear", start: 0, end: 2 },
  { name: "gel", start: 2, end: 5 },
  { name: "activate", start: 5, end: 8 },
  { name: "whiten", start: 8, end: 12 },
  { name: "done", start: 12, end: 9999 },
];

const INFO_CARDS = [
  { phase: "gel", title: "Opalescence Jeli", detail: "Karbamid peroksit bazlı özel beyazlatma jeli diş yüzeyine uygulanır. Diş eti koruyucu bariyer ile güvenli izolasyon sağlanır.", color: "#60b8d4" },
  { phase: "activate", title: "LED Işık Aktivasyonu", detail: "Mavi dalga boyundaki LED ışık, jeldeki peroksidi aktive ederek serbest radikallerin mine içine nüfuz etmesini hızlandırır.", color: "#a78bfa" },
  { phase: "whiten", title: "8 Ton Beyazlama", detail: "Oksijen molekülleri diş minesi tübüllerinden geçerek renkli organik pigmentleri parçalar. Tek seansta 8 tona kadar açılma!", color: "#fbbf24" },
];

export default function TeethWhiteningVideo() {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState("appear");
  const [shade, setShade] = useState(0);
  const [activeCard, setActiveCard] = useState(null);
  const { t } = useLanguage();
  const vt = t.videoTexts || {};
  const wt = vt.whitening || {};

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    scene.add(new THREE.AmbientLight(0xfff8f0, 0.5));
    const dir = new THREE.DirectionalLight(0xffffff, 1.3);
    dir.position.set(3, 5, 5);
    scene.add(dir);

    // Background
    const bg = new THREE.Mesh(new THREE.PlaneGeometry(16, 10), new THREE.MeshBasicMaterial({ color: 0x05080d }));
    bg.position.z = -3;
    scene.add(bg);

    // Single large tooth — left half yellow, right half white
    const toothGroup = new THREE.Group();
    scene.add(toothGroup);

    // Build a split tooth using two half-sphere geometries
    // Left half = yellow (stained)
    const leftGeo = new THREE.SphereGeometry(1.0, 32, 32, Math.PI, Math.PI); // left hemisphere
    leftGeo.scale(0.85, 1.2, 0.7);
    const leftMat = new THREE.MeshStandardMaterial({ color: SHADES[0], metalness: 0.05, roughness: 0.6, transparent: true, opacity: 0 });
    const leftMesh = new THREE.Mesh(leftGeo, leftMat);
    toothGroup.add(leftMesh);

    // Right half = starts yellow, whitens
    const rightGeo = new THREE.SphereGeometry(1.0, 32, 32, 0, Math.PI); // right hemisphere
    rightGeo.scale(0.85, 1.2, 0.7);
    const rightMat = new THREE.MeshStandardMaterial({ color: SHADES[0], metalness: 0.05, roughness: 0.45, transparent: true, opacity: 0 });
    const rightMesh = new THREE.Mesh(rightGeo, rightMat);
    toothGroup.add(rightMesh);

    // Divider line in the middle
    const divGeo = new THREE.PlaneGeometry(0.03, 2.5);
    const divMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
    const divider = new THREE.Mesh(divGeo, divMat);
    divider.position.z = 0.71;
    toothGroup.add(divider);

    // Fake teeth array for backward compat (only right half whitens)
    const teeth = [leftMesh, rightMesh];

    // Opalescence device (cylinder above)
    const deviceGeo = new THREE.CylinderGeometry(0.12, 0.15, 1.2, 16);
    const deviceMat = new THREE.MeshStandardMaterial({ color: 0x2255aa, metalness: 0.7, roughness: 0.3, transparent: true, opacity: 0 });
    const device = new THREE.Mesh(deviceGeo, deviceMat);
    device.position.set(0, 2.5, 0);
    device.rotation.z = Math.PI / 2;
    scene.add(device);

    // LED light beam
    const beamGeo = new THREE.CylinderGeometry(0.05, 0.3, 1.5, 16, 1, true);
    const beamMat = new THREE.MeshBasicMaterial({ color: 0x6699ff, transparent: true, opacity: 0, side: THREE.DoubleSide });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.position.set(0, 1.2, 0);
    scene.add(beam);

    // Gel layer on tooth
    const gelGeo = new THREE.SphereGeometry(1.08, 24, 24);
    gelGeo.scale(0.85, 1.2, 0.7);
    const gelMat = new THREE.MeshStandardMaterial({ color: 0x88ccff, transparent: true, opacity: 0, metalness: 0, roughness: 0.1 });
    const gelMesh = new THREE.Mesh(gelGeo, gelMat);
    scene.add(gelMesh);

    // Particles for light activation
    const pCount = 80;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 3;
      pPos[i * 3 + 1] = Math.random() * 2 - 0.5;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 1;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x88aaff, size: 0.06, transparent: true, opacity: 0 });
    const particles = new THREE.Points(pGeo, pMat);
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

      toothGroup.rotation.y = Math.sin(t * 0.3) * 0.3;

      if (cur.name === "appear") {
        const p = easeInOut(Math.min(t / 2, 1));
        leftMat.opacity = p; leftMat.color.setHex(SHADES[0]);
        rightMat.opacity = p; rightMat.color.setHex(SHADES[0]);
        divMat.opacity = p * 0.6;
        deviceMat.opacity = 0; beamMat.opacity = 0; gelMat.opacity = 0; pMat.opacity = 0;
        setActiveCard(null); setShade(0);
      }

      if (cur.name === "gel") {
        const p = easeInOut(Math.min((t - 2) / 3, 1));
        leftMat.opacity = 1; leftMat.color.setHex(SHADES[0]);
        rightMat.opacity = 1; rightMat.color.setHex(SHADES[0]);
        divMat.opacity = 0.6;
        deviceMat.opacity = p;
        device.position.y = lerp(3.5, 2.0, p);
        gelMat.opacity = lerp(0, 0.35, p);
        gelMat.color.setHex(0x88ccff);
        beamMat.opacity = 0; pMat.opacity = 0;
        setActiveCard("gel"); setShade(0);
      }

      if (cur.name === "activate") {
        const p = easeInOut(Math.min((t - 5) / 3, 1));
        leftMat.opacity = 1; rightMat.opacity = 1; divMat.opacity = 0.6;
        deviceMat.opacity = 1;
        beamMat.opacity = lerp(0, 0.5, p) * (0.5 + Math.sin(t * 8) * 0.5);
        pMat.opacity = lerp(0, 0.8, p);
        gelMat.opacity = 0.2;
        setActiveCard("activate"); setShade(0);
      }

      if (cur.name === "whiten") {
        const p = Math.min((t - 8) / 4, 1);
        const shadeIdx = Math.min(Math.floor(p * SHADES.length), SHADES.length - 1);
        setShade(shadeIdx);
        // Left stays yellow (stained), right whitens
        leftMat.color.setHex(SHADES[0]); leftMat.opacity = 1;
        rightMat.color.setHex(SHADES[shadeIdx]); rightMat.opacity = 1;
        divMat.opacity = 0.8;
        deviceMat.opacity = 1;
        beamMat.opacity = 0.3 + Math.sin(t * 6) * 0.2;
        pMat.opacity = 0.6;
        gelMat.opacity = lerp(0.2, 0, p);
        setActiveCard("whiten");
      }

      if (cur.name === "done") {
        // Left stays yellow to show contrast, right stays white
        leftMat.color.setHex(SHADES[0]); leftMat.opacity = 1;
        rightMat.color.setHex(SHADES[SHADES.length - 1]); rightMat.opacity = 1;
        divMat.opacity = 0.8;
        deviceMat.opacity = lerp(1, 0, Math.min((t - 12) / 1, 1));
        beamMat.opacity = 0;
        pMat.opacity = 0.3 + Math.sin(t * 2) * 0.2;
        pMat.color.setHex(0xffffaa);
        gelMat.opacity = 0;
        setActiveCard(null); setShade(7);
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
        <div className="flex justify-between items-end">
          {/* Shade meter */}
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
            <p className="text-white/50 text-[9px] uppercase tracking-widest mb-2">{vt.shadeMeter || "Shade"}</p>
            <div className="flex gap-1">
              {SHADES.map((hex, i) => (
                <div key={i} className="w-4 h-8 rounded transition-all duration-300"
                  style={{ background: `#${hex.toString(16).padStart(6, "0")}`, opacity: shade >= i ? 1 : 0.3, transform: shade === i ? "scaleY(1.2)" : "scaleY(1)" }} />
              ))}
            </div>
            <p className="text-[#fbbf24] text-[9px] mt-1 font-bold">{shade > 0 ? (wt.tonLabel || "+{n} Shades").replace("{n}", shade) : (vt.shadeStart || "Start")}</p>
          </div>

          {activeCard && (
            <div key={activeCard} className="bg-black/60 backdrop-blur-md rounded-2xl border p-5 max-w-xs shadow-xl" style={{ borderColor: (activeCard === "gel" ? "#60b8d4" : activeCard === "activate" ? "#a78bfa" : "#fbbf24") + "66", animation: "fadeSlideIn 0.4s ease" }}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: activeCard === "gel" ? "#60b8d4" : activeCard === "activate" ? "#a78bfa" : "#fbbf24" }}>
                {activeCard === "gel" ? wt.gelTitle : activeCard === "activate" ? wt.activateTitle : wt.whitenTitle}
              </p>
              <p className="text-white/70 text-xs leading-relaxed">
                {activeCard === "gel" ? wt.gelDetail : activeCard === "activate" ? wt.activateDetail : wt.whitenDetail}
              </p>
            </div>
          )}

          {phase === "done" && (
            <div className="bg-black/60 backdrop-blur-md rounded-2xl border border-yellow-400/30 p-5 max-w-xs shadow-xl" style={{ animation: "fadeSlideIn 0.4s ease" }}>
              <p className="text-yellow-300 text-[10px] font-bold uppercase tracking-widest mb-2">{wt.doneTitle}</p>
              <p className="text-white/60 text-xs leading-relaxed">{wt.doneDetail}</p>
            </div>
          )}
        </div>
        <div />
      </div>
      <style>{`@keyframes fadeSlideIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}