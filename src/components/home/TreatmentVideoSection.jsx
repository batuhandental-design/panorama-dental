import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Animation phases: explode → info → assemble
// Total ~13 seconds: 0-3s explode, 3-9s info cards, 9-13s assemble

const PARTS = [
  {
    name: "Titanyum Vida",
    detail: "Çene kemiğine yerleştirilen titanyum vida, doğal diş kökü işlevi görür. Biyouyumlu yapısıyla kemikle kaynaşır.",
    color: 0x8ab4c2,
    finalY: -1.2,
    explodeY: -3.5,
    geometry: "screw",
  },
  {
    name: "Abutment (Bağlantı)",
    detail: "Vida ile üst yapıyı birbirine bağlayan parçadır. Kron için sağlam bir zemin oluşturur.",
    color: 0xd4a96a,
    finalY: 0,
    explodeY: 0.5,
    geometry: "cylinder",
  },
  {
    name: "Zirkonyum Kron",
    detail: "Tamamen seramik yapısıyla doğal dişten ayırt edilemez. Üst yapı olarak implantı tamamlar.",
    color: 0xf0ece5,
    finalY: 1.2,
    explodeY: 4.0,
    geometry: "crown",
  },
];

function buildMesh(part) {
  let geo;
  if (part.geometry === "screw") {
    geo = new THREE.CylinderGeometry(0.22, 0.28, 1.4, 12);
    // Add thread rings
  } else if (part.geometry === "cylinder") {
    geo = new THREE.CylinderGeometry(0.18, 0.22, 0.5, 12);
  } else {
    geo = new THREE.SphereGeometry(0.38, 16, 16);
    geo.scale(1, 0.75, 1);
  }
  const mat = new THREE.MeshStandardMaterial({
    color: part.color,
    metalness: part.geometry === "screw" ? 0.85 : part.geometry === "cylinder" ? 0.6 : 0.1,
    roughness: part.geometry === "screw" ? 0.2 : part.geometry === "cylinder" ? 0.35 : 0.55,
    transparent: true,
    opacity: 1,
  });
  return new THREE.Mesh(geo, mat);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}
function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export default function TreatmentVideoSection() {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState("explode"); // explode | info0 | info1 | info2 | assemble | done
  const [activePart, setActivePart] = useState(null);
  const animRef = useRef({ running: true, time: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Scene
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.shadowMap.enabled = true;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 7);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xfff8f0, 1.2);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);
    const rimLight = new THREE.DirectionalLight(0x4a90d9, 0.4);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    // Xray background plane
    const bgGeo = new THREE.PlaneGeometry(14, 9);
    const bgMat = new THREE.MeshBasicMaterial({
      color: 0x0a1520,
      transparent: true,
      opacity: 0.95,
    });
    const bg = new THREE.Mesh(bgGeo, bgMat);
    bg.position.z = -2;
    scene.add(bg);

    // Grid lines (xray feel)
    const gridHelper = new THREE.GridHelper(12, 20, 0x1a3a5c, 0x0d2035);
    gridHelper.rotation.x = Math.PI / 2;
    gridHelper.position.z = -1.9;
    scene.add(gridHelper);

    // Build part meshes
    const meshes = PARTS.map((part, i) => {
      const mesh = buildMesh(part);
      mesh.position.y = part.finalY;
      mesh.userData.finalY = part.finalY;
      mesh.userData.explodeY = part.explodeY;
      mesh.userData.partIndex = i;
      scene.add(mesh);

      // Glow ring
      const ringGeo = new THREE.TorusGeometry(0.48 + i * 0.05, 0.015, 8, 48);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x4da6ff, transparent: true, opacity: 0 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = part.finalY;
      ring.userData.isRing = true;
      scene.add(ring);
      mesh.userData.ring = ring;

      return mesh;
    });

    // Connector line between parts (dashed look)
    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, -2.2, 0),
      new THREE.Vector3(0, 2.2, 0),
    ]);
    const lineMat = new THREE.LineDashedMaterial({ color: 0x4da6ff, dashSize: 0.15, gapSize: 0.1, opacity: 0, transparent: true });
    const connLine = new THREE.Line(lineGeo, lineMat);
    connLine.computeLineDistances();
    scene.add(connLine);

    // Animation timeline (seconds)
    // 0-2: parts fly in from assembled to exploded
    // 2-3: hold exploded
    // 3-5: part 0 highlight
    // 5-7: part 1 highlight
    // 7-9: part 2 highlight
    // 9-12: assemble back
    // 12-13: hold assembled + glow

    let startTime = null;
    let frameId;

    const phaseTimings = [
      { name: "explode", start: 0, end: 2.5 },
      { name: "info0", start: 2.5, end: 5.5 },
      { name: "info1", start: 5.5, end: 8.5 },
      { name: "info2", start: 8.5, end: 11.5 },
      { name: "assemble", start: 11.5, end: 14 },
      { name: "done", start: 14, end: 9999 },
    ];

    function animate(ts) {
      if (!animRef.current.running) return;
      frameId = requestAnimationFrame(animate);

      if (!startTime) startTime = ts;
      const elapsed = (ts - startTime) / 1000;
      animRef.current.time = elapsed;

      // Determine phase
      const currentPhase = phaseTimings.find(p => elapsed >= p.start && elapsed < p.end) || phaseTimings[phaseTimings.length - 1];
      setPhase(currentPhase.name);

      // Slow rotation
      scene.rotation.y = Math.sin(elapsed * 0.3) * 0.3;

      meshes.forEach((mesh, i) => {
        const part = PARTS[i];
        const ring = mesh.userData.ring;

        if (currentPhase.name === "explode") {
          // Fly apart
          const t = easeInOut(Math.min((elapsed - 0) / 2.5, 1));
          mesh.position.y = lerp(part.finalY, part.explodeY, t);
          mesh.material.opacity = 1;
          connLine.material.opacity = lerp(0, 0.4, t);
          ring.material.opacity = 0;
          setActivePart(null);

        } else if (currentPhase.name === `info${i}`) {
          // This part is active
          mesh.position.y = part.explodeY;
          mesh.material.opacity = 1;
          mesh.scale.setScalar(lerp(1, 1.15, Math.sin(elapsed * 2) * 0.5 + 0.5));
          ring.position.y = part.explodeY;
          ring.material.opacity = 0.7 + Math.sin(elapsed * 4) * 0.3;
          ring.rotation.z = elapsed * 1.5;
          setActivePart(i);

          // Dim other parts
          meshes.forEach((m2, j) => {
            if (j !== i) {
              m2.material.opacity = 0.2;
              m2.userData.ring.material.opacity = 0;
              m2.scale.setScalar(1);
            }
          });
          connLine.material.opacity = 0.15;

        } else if (currentPhase.name === "assemble") {
          // Fly back together
          const t = easeInOut(Math.min((elapsed - 11.5) / 2.5, 1));
          mesh.position.y = lerp(part.explodeY, part.finalY, t);
          mesh.material.opacity = 1;
          mesh.scale.setScalar(1);
          ring.material.opacity = lerp(0, 0.6, t) * Math.sin(elapsed * 3);
          ring.position.y = mesh.position.y;
          connLine.material.opacity = lerp(0.4, 0, t);
          setActivePart(null);

        } else if (currentPhase.name === "done") {
          mesh.position.y = part.finalY;
          mesh.material.opacity = 1;
          mesh.scale.setScalar(1);
          ring.position.y = part.finalY;
          ring.material.opacity = 0.4 + Math.sin(elapsed * 2 + i) * 0.3;
          ring.rotation.z = elapsed;
          connLine.material.opacity = 0;
          setActivePart(null);
        }

        // Handle info phases for non-active parts
        if (currentPhase.name.startsWith("info") && !currentPhase.name.endsWith(`${i}`)) {
          // already handled above in the active part block
        }
      });

      renderer.render(scene, camera);
    }

    frameId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!canvas) return;
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      animRef.current.running = false;
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  const infoIndex = phase?.startsWith("info") ? parseInt(phase.replace("info", "")) : null;
  const isDone = phase === "done";
  const isAssemble = phase === "assemble";

  return (
    <div className="relative w-full rounded-3xl overflow-hidden mb-16 font-inter" style={{ minHeight: 420 }}>
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ height: 420, display: "block" }}
      />

      {/* Overlay UI */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6">
        {/* Top label */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-4 py-1.5 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#4da6ff] animate-pulse" />
            <span className="text-[#4da6ff] text-[10px] font-bold uppercase tracking-[0.25em]">3D Simülasyon — Diş İmplantı</span>
          </div>
          <div className="bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 border border-white/10">
            <span className="text-white/50 text-[10px]">
              {phase === "explode" && "Parçalara ayrılıyor..."}
              {phase?.startsWith("info") && `Parça ${(infoIndex ?? 0) + 1} / 3`}
              {phase === "assemble" && "Birleşiyor..."}
              {phase === "done" && "✓ Tamamlandı"}
            </span>
          </div>
        </div>

        {/* Info card */}
        <div className="flex justify-end">
          {infoIndex !== null && PARTS[infoIndex] && (
            <div
              key={infoIndex}
              className="bg-black/60 backdrop-blur-md rounded-2xl border border-[#4da6ff]/30 p-5 max-w-xs shadow-xl"
              style={{ animation: "fadeSlideIn 0.4s ease" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ background: `#${PARTS[infoIndex].color.toString(16).padStart(6, "0")}` }} />
                <p className="text-[#4da6ff] text-[10px] font-bold uppercase tracking-widest">
                  Parça {infoIndex + 1}
                </p>
              </div>
              <h4 className="text-white font-bold text-base mb-2">{PARTS[infoIndex].name}</h4>
              <p className="text-white/70 text-xs leading-relaxed">{PARTS[infoIndex].detail}</p>
            </div>
          )}

          {isDone && (
            <div
              className="bg-black/60 backdrop-blur-md rounded-2xl border border-green-400/30 p-5 max-w-xs shadow-xl"
              style={{ animation: "fadeSlideIn 0.4s ease" }}
            >
              <p className="text-green-400 text-[10px] font-bold uppercase tracking-widest mb-2">✓ İmplant Tamamlandı</p>
              <h4 className="text-white font-bold text-sm mb-1">3 parça, 1 mükemmel implant</h4>
              <p className="text-white/60 text-xs leading-relaxed">Vida + Abutment + Kron bir araya gelerek doğal dişin tam işlevselliğini kazandırır.</p>
            </div>
          )}
        </div>

        {/* Bottom part indicators */}
        <div className="flex items-center justify-center gap-3">
          {PARTS.map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-full px-3 py-1 border transition-all duration-500"
              style={{
                background: infoIndex === i ? "rgba(77,166,255,0.15)" : "rgba(0,0,0,0.3)",
                borderColor: infoIndex === i ? "#4da6ff" : "rgba(255,255,255,0.1)",
              }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: `#${p.color.toString(16).padStart(6, "0")}` }} />
              <span className="text-white/70 text-[10px] font-medium">{p.name}</span>
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