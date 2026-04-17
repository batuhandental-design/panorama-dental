import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useLanguage } from "@/lib/LanguageContext";

// Phases:
// 0-2s: Jawbone cross-section appears with bone loss visible
// 2-5s: Bone level measurement + implant height guide
// 5-8s: Graft material placed, bone starts filling
// 8-11s: New bone grows (particles filling)
// 11-14s: Implant placed on regenerated bone — success

function easeInOut(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }
function lerp(a, b, t) { return a + (b - a) * t; }

const PHASES = [
  { name: "jaw", start: 0, end: 2 },
  { name: "measure", start: 2, end: 5 },
  { name: "graft", start: 5, end: 8 },
  { name: "grow", start: 8, end: 11 },
  { name: "implant", start: 11, end: 14 },
  { name: "done", start: 14, end: 9999 },
];

const INFOS = [
  { phase: "jaw", title: "Kemik Kaybı", detail: "Diş çekiminden sonra çene kemiği zamanla erir. İmplant için yeterli kemik yüksekliği ve genişliği kritik öneme sahiptir.", color: "#f87171" },
  { phase: "measure", title: "3D CBCT Ölçümü", detail: "Tomografi ile kemik yoğunluğu, yüksekliği ve kalınlığı milimetrik hassasiyetle ölçülür. Greft miktarı hesaplanır.", color: "#60b8d4" },
  { phase: "graft", title: "Greft Materyali", detail: "Doğal veya sentetik kemik tozu defekt bölgesine yerleştirilir. Kollajen membran ile korunur.", color: "#fbbf24" },
  { phase: "grow", title: "Kemik Rejenerasyonu", detail: "3–6 ay içinde yeni kemik dokusu büyür, greft ile kaynaşır. Osteokonduktif matriks yeni kemik hücrelerine zemin hazırlar.", color: "#4ade80" },
  { phase: "implant", title: "İmplant Yerleşimi", detail: "Yeterli kemik hacmine ulaşıldığında titanyum implant güvenle yerleştirilebilir. Yeni kemikte osseointegrasyon başlar.", color: "#a78bfa" },
];

export default function BoneGraftVideo() {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState("jaw");
  const [activeInfo, setActiveInfo] = useState(null);
  const [boneLevel, setBoneLevel] = useState(0);
  const { t } = useLanguage();
  const vt = t.videoTexts || {};
  const bt = vt.bonegraft || {};

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    scene.add(new THREE.AmbientLight(0xfff0e0, 0.5));
    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(4, 6, 5);
    scene.add(dir);

    const bg = new THREE.Mesh(new THREE.PlaneGeometry(16, 10), new THREE.MeshBasicMaterial({ color: 0x060410 }));
    bg.position.z = -3;
    scene.add(bg);

    // Jaw bone (elongated box, cross-section feel)
    const jawGeo = new THREE.BoxGeometry(4, 1.0, 1.0);
    const jawMat = new THREE.MeshStandardMaterial({ color: 0xd4a876, metalness: 0.1, roughness: 0.6, transparent: true, opacity: 0 });
    const jaw = new THREE.Mesh(jawGeo, jawMat);
    jaw.position.y = -1.2;
    scene.add(jaw);

    // Bone loss cavity
    const cavGeo = new THREE.CylinderGeometry(0.5, 0.4, 0.8, 16);
    const cavMat = new THREE.MeshStandardMaterial({ color: 0x8b4513, metalness: 0, roughness: 0.9, transparent: true, opacity: 0 });
    const cavity = new THREE.Mesh(cavGeo, cavMat);
    cavity.position.y = -0.8;
    scene.add(cavity);

    // Graft material (fills cavity)
    const graftGeo = new THREE.CylinderGeometry(0.45, 0.38, 0.1, 16);
    const graftMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0, roughness: 0.7, transparent: true, opacity: 0 });
    const graft = new THREE.Mesh(graftGeo, graftMat);
    graft.position.y = -1.1;
    scene.add(graft);

    // New bone (grows up from graft)
    const newBoneGeo = new THREE.CylinderGeometry(0.45, 0.38, 0.8, 16);
    const newBoneMat = new THREE.MeshStandardMaterial({ color: 0x88cc88, metalness: 0.1, roughness: 0.5, transparent: true, opacity: 0 });
    const newBone = new THREE.Mesh(newBoneGeo, newBoneMat);
    newBone.position.y = -0.8;
    scene.add(newBone);

    // Implant (screw)
    const implantGeo = new THREE.CylinderGeometry(0.18, 0.22, 1.4, 12);
    const implantMat = new THREE.MeshStandardMaterial({ color: 0x8ab4c2, metalness: 0.85, roughness: 0.2, transparent: true, opacity: 0 });
    const implant = new THREE.Mesh(implantGeo, implantMat);
    implant.position.y = 1.5;
    scene.add(implant);

    // Measurement arrow (line)
    const arrowGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0.7, -1.6, 0),
      new THREE.Vector3(0.7, -0.2, 0),
    ]);
    const arrowMat = new THREE.LineBasicMaterial({ color: 0x60b8d4, transparent: true, opacity: 0 });
    const arrowLine = new THREE.Line(arrowGeo, arrowMat);
    scene.add(arrowLine);

    // Bone particles
    const pCount = 100;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.4;
      pPos[i * 3] = Math.cos(angle) * r;
      pPos[i * 3 + 1] = -1.2 + Math.random() * 0.8;
      pPos[i * 3 + 2] = Math.sin(angle) * r;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x88cc88, size: 0.06, transparent: true, opacity: 0 });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Glow ring
    const ringGeo = new THREE.TorusGeometry(0.6, 0.02, 8, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xa78bfa, transparent: true, opacity: 0 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -0.4;
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
      scene.rotation.y = Math.sin(t * 0.3) * 0.3;

      const info = INFOS.find(i => i.phase === cur.name);
      setActiveInfo(info || null);

      if (cur.name === "jaw") {
        const p = easeInOut(Math.min(t / 2, 1));
        jawMat.opacity = p; cavMat.opacity = p * 0.8;
        graftMat.opacity = 0; newBoneMat.opacity = 0; implantMat.opacity = 0; pMat.opacity = 0; arrowMat.opacity = 0; ringMat.opacity = 0;
        setBoneLevel(0);
      }

      if (cur.name === "measure") {
        jawMat.opacity = 1; cavMat.opacity = 0.8;
        arrowMat.opacity = easeInOut(Math.min((t - 2) / 3, 1));
        graftMat.opacity = 0; newBoneMat.opacity = 0; implantMat.opacity = 0; pMat.opacity = 0;
        setBoneLevel(0);
      }

      if (cur.name === "graft") {
        const p = easeInOut(Math.min((t - 5) / 3, 1));
        jawMat.opacity = 1; cavMat.opacity = lerp(0.8, 0.3, p);
        graftMat.opacity = p;
        graft.scale.y = lerp(0.1, 1, p);
        arrowMat.opacity = 1;
        newBoneMat.opacity = 0; implantMat.opacity = 0; pMat.opacity = 0;
        setBoneLevel(Math.floor(p * 30));
      }

      if (cur.name === "grow") {
        const p = easeInOut(Math.min((t - 8) / 3, 1));
        jawMat.opacity = 1; cavMat.opacity = lerp(0.3, 0, p);
        graftMat.opacity = lerp(1, 0, p);
        newBoneMat.opacity = p;
        newBone.scale.y = p;
        newBone.position.y = lerp(-1.6, -0.8, p);
        pMat.opacity = lerp(0, 0.7, p);
        arrowMat.opacity = 1;
        implantMat.opacity = 0;
        setBoneLevel(Math.floor(30 + p * 70));
      }

      if (cur.name === "implant") {
        const p = easeInOut(Math.min((t - 11) / 3, 1));
        jawMat.opacity = 1; newBoneMat.opacity = 1; pMat.opacity = 0.5;
        implantMat.opacity = p;
        implant.position.y = lerp(1.5, -0.2, p);
        implant.rotation.y = t * 3;
        ringMat.opacity = lerp(0, 0.8, p) * (0.5 + Math.sin(t * 5) * 0.5);
        ring.position.y = implant.position.y;
        setBoneLevel(100);
      }

      if (cur.name === "done") {
        jawMat.opacity = 1; newBoneMat.opacity = 1;
        implantMat.opacity = 1; implant.position.y = -0.2;
        ringMat.opacity = 0.4 + Math.sin(t * 2) * 0.3;
        ring.rotation.z = t * 0.5;
        pMat.opacity = 0.4 + Math.sin(t * 1.5) * 0.2;
        setBoneLevel(100);
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
          {/* Bone level meter */}
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
            <p className="text-white/50 text-[9px] uppercase tracking-widest mb-2">{vt.boneLevel || "Bone Level"}</p>
            <div className="w-4 h-24 bg-white/10 rounded-full overflow-hidden flex flex-col-reverse">
              <div className="w-full rounded-full transition-all duration-300"
                style={{ height: `${boneLevel}%`, background: boneLevel > 80 ? "#4ade80" : boneLevel > 40 ? "#fbbf24" : "#f87171" }} />
            </div>
            <p className="text-[9px] mt-1 font-bold" style={{ color: boneLevel > 80 ? "#4ade80" : boneLevel > 40 ? "#fbbf24" : "#f87171" }}>{boneLevel}%</p>
          </div>

          {activeInfo && (
            <div key={activeInfo.phase} className="bg-black/60 backdrop-blur-md rounded-2xl border p-5 max-w-xs shadow-xl" style={{ borderColor: activeInfo.color + "55", animation: "fadeSlideIn 0.4s ease" }}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: activeInfo.color }}>
                {activeInfo.phase === "jaw" ? bt.jawTitle : activeInfo.phase === "measure" ? bt.measureTitle : activeInfo.phase === "graft" ? bt.graftTitle : activeInfo.phase === "grow" ? bt.growTitle : bt.implantTitle}
              </p>
              <p className="text-white/70 text-xs leading-relaxed">
                {activeInfo.phase === "jaw" ? bt.jawDetail : activeInfo.phase === "measure" ? bt.measureDetail : activeInfo.phase === "graft" ? bt.graftDetail : activeInfo.phase === "grow" ? bt.growDetail : bt.implantDetail}
              </p>
            </div>
          )}
          {phase === "done" && !activeInfo && (
            <div className="bg-black/60 backdrop-blur-md rounded-2xl border border-green-400/30 p-5 max-w-xs shadow-xl" style={{ animation: "fadeSlideIn 0.4s ease" }}>
              <p className="text-green-400 text-[10px] font-bold uppercase tracking-widest mb-2">{bt.doneTitle}</p>
              <p className="text-white/60 text-xs leading-relaxed">{bt.doneDetail}</p>
            </div>
          )}
        </div>
        <div />
      </div>
      <style>{`@keyframes fadeSlideIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}