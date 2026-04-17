import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useLanguage } from "@/lib/LanguageContext";

// 3 implants side by side, each with screw + abutment + crown
// Animation: assembled → explode apart vertically → info cards per part → reassemble → loop
// Style inspired by Envato titanium dental implant animation: black bg, metallic chrome screws, white ceramic crowns

function lerp(a, b, t) { return a + (b - a) * t; }
function easeInOut(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }
function easeOut(t) { return 1 - (1 - t) * (1 - t); }

const IMPLANT_POSITIONS_X = [-2.6, 0, 2.6];

// Thread helper: add horizontal rings to a group to simulate screw threads
function buildImplantGroup(xPos) {
  const group = new THREE.Group();
  group.position.x = xPos;

  // Screw / titanium post — tapered cylinder, chrome metallic
  const screwGeo = new THREE.CylinderGeometry(0.19, 0.26, 1.5, 20);
  const screwMat = new THREE.MeshStandardMaterial({
    color: 0xc0d8e8,
    metalness: 0.92,
    roughness: 0.12,
    envMapIntensity: 1.0,
  });
  const screw = new THREE.Mesh(screwGeo, screwMat);
  screw.name = "screw";

  // Thread rings
  const threadGroup = new THREE.Group();
  for (let i = 0; i < 8; i++) {
    const tGeo = new THREE.TorusGeometry(0.23 - i * 0.003, 0.022, 8, 20);
    const tMat = new THREE.MeshStandardMaterial({ color: 0x9ab8cc, metalness: 0.95, roughness: 0.1 });
    const tMesh = new THREE.Mesh(tGeo, tMat);
    tMesh.rotation.x = Math.PI / 2;
    tMesh.position.y = -0.55 + i * 0.14;
    threadGroup.add(tMesh);
  }
  threadGroup.name = "threads";

  // Abutment — gold/titanium connector
  const abutGeo = new THREE.CylinderGeometry(0.14, 0.19, 0.48, 16);
  const abutMat = new THREE.MeshStandardMaterial({
    color: 0xd4a85a,
    metalness: 0.85,
    roughness: 0.18,
  });
  const abut = new THREE.Mesh(abutGeo, abutMat);
  abut.name = "abutment";

  // Crown — white ceramic tooth shape
  const crownGeo = new THREE.SphereGeometry(0.38, 24, 20);
  crownGeo.scale(0.92, 0.82, 0.78);
  const crownMat = new THREE.MeshStandardMaterial({
    color: 0xf5f0ea,
    metalness: 0.02,
    roughness: 0.38,
  });
  const crown = new THREE.Mesh(crownGeo, crownMat);
  crown.name = "crown";

  // Assembled positions (Y)
  screw.position.y = -0.92;
  threadGroup.position.y = -0.92;
  abut.position.y = 0.12;
  crown.position.y = 0.74;

  group.add(screw);
  group.add(threadGroup);
  group.add(abut);
  group.add(crown);

  return { group, screw, threadGroup, abut, crown, screwMat, abutMat, crownMat };
}

const PHASE_TIMINGS = [
  { name: "assemble_in", start: 0,    end: 2.5 },
  { name: "hold",        start: 2.5,  end: 3.5 },
  { name: "explode",     start: 3.5,  end: 6.0 },
  { name: "info_screw",  start: 6.0,  end: 9.0 },
  { name: "info_abut",   start: 9.0,  end: 12.0 },
  { name: "info_crown",  start: 12.0, end: 15.0 },
  { name: "reassemble",  start: 15.0, end: 18.0 },
  { name: "done",        start: 18.0, end: 9999 },
];

// Exploded Y offsets relative to assembled
const EXPLODE = { screw: -2.0, abut: 0.0, crown: 2.2 };

export default function TreatmentVideoSection() {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState("assemble_in");
  const [infoPhase, setInfoPhase] = useState(null); // "screw" | "abut" | "crown" | null
  const { t } = useLanguage();
  const vt = t.videoTexts || {};

  const PARTS_INFO = [
    {
      key: "screw",
      label: vt.part ? `${vt.part} 1` : "Part 1",
      title: t.treatments?.["dis-implanti"]?.steps?.[1]?.title || "Titanyum Vida",
      detail: "Çene kemiğine yerleştirilen titanyum vida, doğal diş kökü işlevi görür. Biyouyumlu yapısıyla kemikle kaynaşır (osseointegrasyon).",
      color: "#9ab8cc",
    },
    {
      key: "abut",
      label: vt.part ? `${vt.part} 2` : "Part 2",
      title: "Abutment (Bağlantı)",
      detail: "Vida ile üst yapıyı birbirine bağlayan parçadır. Kron için sağlam ve hassas bir zemin oluşturur.",
      color: "#d4a85a",
    },
    {
      key: "crown",
      label: vt.part ? `${vt.part} 3` : "Part 3",
      title: "Zirkonyum Kron",
      detail: "Tamamen seramik yapısıyla doğal dişten ayırt edilemez görünüm. Implantı tamamlayan üst yapı.",
      color: "#f5f0ea",
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(42, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0.5, 11);

    // Lights — studio setup like the video
    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    keyLight.position.set(5, 10, 8);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xaaccff, 0.6);
    fillLight.position.set(-6, 2, 4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x88aacc, 0.5);
    rimLight.position.set(0, -4, -5);
    scene.add(rimLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 0.4);
    topLight.position.set(0, 12, 0);
    scene.add(topLight);

    // Subtle ground reflection plane
    const groundGeo = new THREE.PlaneGeometry(20, 6);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.6, roughness: 0.4 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2.2;
    scene.add(ground);

    // Build 3 implant groups
    const implants = IMPLANT_POSITIONS_X.map(x => buildImplantGroup(x));
    implants.forEach(imp => scene.add(imp.group));

    // Glow rings under each implant (for done phase)
    const glowRings = implants.map((imp) => {
      const rGeo = new THREE.TorusGeometry(0.55, 0.015, 8, 60);
      const rMat = new THREE.MeshBasicMaterial({ color: 0x4da6ff, transparent: true, opacity: 0 });
      const ring = new THREE.Mesh(rGeo, rMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(imp.group.position.x, -1.8, 0);
      scene.add(ring);
      return { ring, mat: rMat };
    });

    // Vertical dashed guide lines per implant
    const guideLines = implants.map((imp) => {
      const pts = [new THREE.Vector3(0, -2.8, 0), new THREE.Vector3(0, 2.5, 0)];
      const lGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const lMat = new THREE.LineDashedMaterial({ color: 0x3366aa, dashSize: 0.12, gapSize: 0.1, transparent: true, opacity: 0 });
      const line = new THREE.Line(lGeo, lMat);
      line.computeLineDistances();
      line.position.x = imp.group.position.x;
      scene.add(line);
      return { line, mat: lMat };
    });

    let startTime = null;
    let frameId;
    const running = { val: true };

    // Assembled Y positions
    const ASSEMBLED = {
      screw: -0.92,
      abut: 0.12,
      crown: 0.74,
    };

    function setPartOpacity(imp, val) {
      imp.screwMat.opacity = val; imp.screwMat.transparent = true;
      imp.abutMat.opacity = val; imp.abutMat.transparent = true;
      imp.crownMat.opacity = val; imp.crownMat.transparent = true;
      imp.screw.children?.forEach(c => { if (c.material) { c.material.opacity = val; c.material.transparent = true; } });
      imp.threadGroup.children.forEach(c => { c.material.opacity = val; c.material.transparent = true; });
    }

    function setImplantExploded(imp) {
      imp.screw.position.y = ASSEMBLED.screw + EXPLODE.screw;
      imp.threadGroup.position.y = ASSEMBLED.screw + EXPLODE.screw;
      imp.abut.position.y = ASSEMBLED.abut + EXPLODE.abut;
      imp.crown.position.y = ASSEMBLED.crown + EXPLODE.crown;
    }

    function setImplantAssembled(imp) {
      imp.screw.position.y = ASSEMBLED.screw;
      imp.threadGroup.position.y = ASSEMBLED.screw;
      imp.abut.position.y = ASSEMBLED.abut;
      imp.crown.position.y = ASSEMBLED.crown;
    }

    function lerpImplant(imp, p) {
      imp.screw.position.y = lerp(ASSEMBLED.screw + EXPLODE.screw, ASSEMBLED.screw, p);
      imp.threadGroup.position.y = lerp(ASSEMBLED.screw + EXPLODE.screw, ASSEMBLED.screw, p);
      imp.abut.position.y = lerp(ASSEMBLED.abut + EXPLODE.abut, ASSEMBLED.abut, p);
      imp.crown.position.y = lerp(ASSEMBLED.crown + EXPLODE.crown, ASSEMBLED.crown, p);
    }

    function explodeImplant(imp, p) {
      imp.screw.position.y = lerp(ASSEMBLED.screw, ASSEMBLED.screw + EXPLODE.screw, p);
      imp.threadGroup.position.y = lerp(ASSEMBLED.screw, ASSEMBLED.screw + EXPLODE.screw, p);
      imp.abut.position.y = lerp(ASSEMBLED.abut, ASSEMBLED.abut + EXPLODE.abut, p);
      imp.crown.position.y = lerp(ASSEMBLED.crown, ASSEMBLED.crown + EXPLODE.crown, p);
    }

    function animate(ts) {
      if (!running.val) return;
      frameId = requestAnimationFrame(animate);
      if (!startTime) startTime = ts;
      const elapsed = (ts - startTime) / 1000;

      const cur = PHASE_TIMINGS.find(p => elapsed >= p.start && elapsed < p.end) || PHASE_TIMINGS[PHASE_TIMINGS.length - 1];
      setPhase(cur.name);

      // Gentle scene rotation
      scene.rotation.y = Math.sin(elapsed * 0.2) * 0.15;

      if (cur.name === "assemble_in") {
        const p = easeOut(Math.min(elapsed / 2.5, 1));
        setInfoPhase(null);
        implants.forEach((imp, i) => {
          const delay = i * 0.15;
          const pp = easeOut(Math.min((elapsed - delay * 2.5) / 2.5, 1));
          lerpImplant(imp, Math.max(0, pp));
          setPartOpacity(imp, Math.max(0, pp));
          guideLines[i].mat.opacity = 0;
          glowRings[i].mat.opacity = 0;
        });
      }

      if (cur.name === "hold") {
        implants.forEach((imp, i) => {
          setImplantAssembled(imp);
          setPartOpacity(imp, 1);
          guideLines[i].mat.opacity = lerp(0, 0.5, (elapsed - 3.5) / 0.5);
        });
        setInfoPhase(null);
      }

      if (cur.name === "explode") {
        const p = easeInOut(Math.min((elapsed - 3.5) / 2.5, 1));
        implants.forEach((imp, i) => {
          explodeImplant(imp, p);
          setPartOpacity(imp, 1);
          guideLines[i].mat.opacity = lerp(0.5, 0.8, p);
          glowRings[i].mat.opacity = 0;
        });
        setInfoPhase(null);
      }

      if (cur.name === "info_screw") {
        setInfoPhase("screw");
        implants.forEach((imp, i) => {
          setImplantExploded(imp);
          // Highlight screw, dim others
          imp.screwMat.opacity = 1; imp.screwMat.transparent = false;
          imp.threadGroup.children.forEach(c => { c.material.opacity = 1; c.material.transparent = false; });
          imp.abutMat.opacity = 0.15; imp.abutMat.transparent = true;
          imp.crownMat.opacity = 0.15; imp.crownMat.transparent = true;
          // Screw pulse
          const pulse = 1 + Math.sin(elapsed * 3) * 0.05;
          imp.screw.scale.setScalar(pulse);
          imp.threadGroup.scale.setScalar(pulse);
          imp.abut.scale.setScalar(1);
          imp.crown.scale.setScalar(1);
          guideLines[i].mat.opacity = 0.3;
          glowRings[i].mat.color.setHex(0x4da6ff);
          glowRings[i].mat.opacity = 0.5 + Math.sin(elapsed * 4) * 0.3;
          glowRings[i].ring.position.y = imp.screw.position.y;
        });
      }

      if (cur.name === "info_abut") {
        setInfoPhase("abut");
        implants.forEach((imp, i) => {
          setImplantExploded(imp);
          imp.screwMat.opacity = 0.15; imp.screwMat.transparent = true;
          imp.threadGroup.children.forEach(c => { c.material.opacity = 0.15; c.material.transparent = true; });
          imp.abutMat.opacity = 1; imp.abutMat.transparent = false;
          imp.crownMat.opacity = 0.15; imp.crownMat.transparent = true;
          imp.screw.scale.setScalar(1); imp.threadGroup.scale.setScalar(1);
          const pulse = 1 + Math.sin(elapsed * 3) * 0.06;
          imp.abut.scale.setScalar(pulse);
          imp.crown.scale.setScalar(1);
          guideLines[i].mat.opacity = 0.3;
          glowRings[i].mat.color.setHex(0xd4a85a);
          glowRings[i].mat.opacity = 0.5 + Math.sin(elapsed * 4) * 0.3;
          glowRings[i].ring.position.y = imp.abut.position.y;
        });
      }

      if (cur.name === "info_crown") {
        setInfoPhase("crown");
        implants.forEach((imp, i) => {
          setImplantExploded(imp);
          imp.screwMat.opacity = 0.15; imp.screwMat.transparent = true;
          imp.threadGroup.children.forEach(c => { c.material.opacity = 0.15; c.material.transparent = true; });
          imp.abutMat.opacity = 0.15; imp.abutMat.transparent = true;
          imp.crownMat.opacity = 1; imp.crownMat.transparent = false;
          imp.screw.scale.setScalar(1); imp.threadGroup.scale.setScalar(1); imp.abut.scale.setScalar(1);
          const pulse = 1 + Math.sin(elapsed * 3) * 0.05;
          imp.crown.scale.setScalar(pulse);
          guideLines[i].mat.opacity = 0.3;
          glowRings[i].mat.color.setHex(0xffffff);
          glowRings[i].mat.opacity = 0.4 + Math.sin(elapsed * 4) * 0.25;
          glowRings[i].ring.position.y = imp.crown.position.y;
        });
      }

      if (cur.name === "reassemble") {
        const p = easeInOut(Math.min((elapsed - 15.0) / 3.0, 1));
        setInfoPhase(null);
        implants.forEach((imp, i) => {
          lerpImplant(imp, p);
          setPartOpacity(imp, 1);
          imp.screw.scale.setScalar(1); imp.threadGroup.scale.setScalar(1);
          imp.abut.scale.setScalar(1); imp.crown.scale.setScalar(1);
          guideLines[i].mat.opacity = lerp(0.4, 0, p);
          glowRings[i].mat.opacity = lerp(0, 0.6, p) * (0.5 + Math.sin(elapsed * 4) * 0.5);
          glowRings[i].ring.position.y = lerp(-1.5, -1.8, p);
        });
      }

      if (cur.name === "done") {
        setInfoPhase(null);
        implants.forEach((imp, i) => {
          setImplantAssembled(imp);
          setPartOpacity(imp, 1);
          imp.screw.scale.setScalar(1); imp.threadGroup.scale.setScalar(1);
          imp.abut.scale.setScalar(1); imp.crown.scale.setScalar(1);
          guideLines[i].mat.opacity = 0;
          glowRings[i].ring.position.y = -1.8;
          glowRings[i].mat.color.setHex(0x4da6ff);
          glowRings[i].mat.opacity = 0.3 + Math.sin(elapsed * 2 + i * 1.2) * 0.2;
          glowRings[i].ring.rotation.z = elapsed * 0.4;
        });
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

  const activeInfo = infoPhase ? PARTS_INFO.find(p => p.key === infoPhase) : null;
  const isDone = phase === "done";

  return (
    <div className="relative w-full rounded-3xl overflow-hidden mb-16 font-inter" style={{ minHeight: 440, background: "#000" }}>
      <canvas ref={canvasRef} className="w-full" style={{ height: 440, display: "block" }} />

      {/* Overlay UI */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6">
        {/* Top label */}
        <div className="flex justify-center">
          <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5">
            <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.25em]">
              3D Dental Implant
            </span>
          </div>
        </div>

        {/* Info card */}
        <div className="flex justify-end">
          {activeInfo && (
            <div
              key={activeInfo.key}
              className="bg-black/70 backdrop-blur-md rounded-2xl border p-5 max-w-xs shadow-2xl"
              style={{ borderColor: activeInfo.color + "55", animation: "fadeSlideIn 0.4s ease" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ background: activeInfo.color }} />
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: activeInfo.color }}>
                  {activeInfo.label}
                </p>
              </div>
              <h4 className="text-white font-bold text-sm mb-1.5">{activeInfo.title}</h4>
              <p className="text-white/65 text-xs leading-relaxed">{activeInfo.detail}</p>
            </div>
          )}

          {isDone && !activeInfo && (
            <div
              className="bg-black/70 backdrop-blur-md rounded-2xl border border-green-400/30 p-5 max-w-xs shadow-2xl"
              style={{ animation: "fadeSlideIn 0.4s ease" }}
            >
              <p className="text-green-400 text-[10px] font-bold uppercase tracking-widest mb-2">✓ İmplant Tamamlandı</p>
              <h4 className="text-white font-bold text-sm mb-1">3 parça, 1 mükemmel implant</h4>
              <p className="text-white/60 text-xs leading-relaxed">Vida + Abutment + Kron bir araya gelerek doğal dişin tam işlevselliğini kazandırır.</p>
            </div>
          )}
        </div>

        {/* Bottom part indicators */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {PARTS_INFO.map((p) => (
            <div
              key={p.key}
              className="flex items-center gap-2 rounded-full px-3 py-1.5 border transition-all duration-500"
              style={{
                background: infoPhase === p.key ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.5)",
                borderColor: infoPhase === p.key ? p.color : "rgba(255,255,255,0.12)",
              }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
              <span className="text-white/70 text-[10px] font-medium">{p.title}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}