import * as React from "react";
import * as THREE from "three";

// 조화로운 다색 팔레트 (로즈·시안·바이올렛·앰버·에메랄드)
const ACCENT = 0xf43f5e; // rose (브랜드 포인트)
const PARTICLE_COUNT = 800;
const ORBIT_SPEED = 0.14;
const PULSE_SPEED = 0.85;
const GROWTH_CYCLE_DURATION = 7;
const WAVE_CYCLE_DURATION = 5.2;
const CONVERGE_COUNT = 80;
const RING_INSTANCE_COUNT = 56;
const TUNNEL_PALETTE = [
  0xf43f5e, 0x22d3ee, 0xa78bfa, 0xfbbf24, 0x34d399,
  0x38bdf8, 0xc084fc, 0xf59e0b, 0x2dd4bf,
  0x6366f1, 0xfb923c,
]; // 로즈, 시안, 바이올렛, 앰버, 에메랄드, 스카이, 퍼플, 앰버다크, 틸, 인디고, 오렌지
const dummy = new THREE.Object3D();
const color = new THREE.Color();

export default function OurStrengthCanvas() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const frameRef = React.useRef<number>(0);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 100);
    camera.position.set(0, 0, 1.8);
    camera.lookAt(0, 0, -3);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0f172a, 1);
    container.appendChild(renderer.domElement);

    // ---- 인스턴스 링 터널 (Instanced vertex-colors 스타일) ----
    const ringGeo = new THREE.TorusGeometry(0.42, 0.028, 16, 64);
    const ringMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0x334155,
      emissiveIntensity: 0.5,
      metalness: 0.85,
      roughness: 0.2,
      transparent: true,
      opacity: 0.92,
      side: THREE.DoubleSide,
      vertexColors: true,
    });
    const instancedRings = new THREE.InstancedMesh(ringGeo, ringMat, RING_INSTANCE_COUNT);
    instancedRings.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    const instanceColors = new Float32Array(RING_INSTANCE_COUNT * 3);
    for (let i = 0; i < RING_INSTANCE_COUNT; i++) {
      const c = TUNNEL_PALETTE[i % TUNNEL_PALETTE.length];
      color.setHex(c);
      instanceColors[i * 3] = color.r;
      instanceColors[i * 3 + 1] = color.g;
      instanceColors[i * 3 + 2] = color.b;
    }
    instancedRings.instanceColor = new THREE.InstancedBufferAttribute(instanceColors, 3);
    instancedRings.instanceColor.setUsage(THREE.DynamicDrawUsage);
    for (let i = 0; i < RING_INSTANCE_COUNT; i++) {
      const z = -0.3 - (i / RING_INSTANCE_COUNT) * 5.2;
      const scale = 0.45 + (1 - (i / RING_INSTANCE_COUNT)) * 0.85;
      dummy.position.set(0, 0, z);
      dummy.scale.setScalar(scale);
      dummy.rotation.x = Math.PI * 0.5;
      dummy.updateMatrix();
      instancedRings.setMatrixAt(i, dummy.matrix);
    }
    instancedRings.instanceMatrix.needsUpdate = true;
    scene.add(instancedRings);

    // ---- 성장 링: 반지름이 주기적으로 확장·리셋 (노출 → 선점, 성장 메커니즘) ----
    const ring1Angles = new Float32Array(PARTICLE_COUNT * 2); // [angle, yOffset] per particle
    const ring1BaseRadius = 1.35;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      ring1Angles[i * 2] = (i / PARTICLE_COUNT) * Math.PI * 2;
      ring1Angles[i * 2 + 1] = (Math.random() - 0.5) * 0.35;
    }
    const ring1Positions = new Float32Array(PARTICLE_COUNT * 3);
    const ring1Geo = new THREE.BufferGeometry();
    ring1Geo.setAttribute("position", new THREE.BufferAttribute(ring1Positions, 3));
    const ring1Mat = new THREE.PointsMaterial({
      color: 0x22d3ee,
      size: 0.042,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ring1 = new THREE.Points(ring1Geo, ring1Mat);
    scene.add(ring1);

    // ---- 기어 링: 기울어진 궤도 (메커니즘, 설계) ----
    const ring2Positions = new Float32Array(PARTICLE_COUNT * 3);
    const ring2Radius = 1.2;
    const tilt = Math.PI * 0.38;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const t = (i / PARTICLE_COUNT) * Math.PI * 2;
      const x = Math.cos(t) * ring2Radius;
      const y = Math.sin(t) * ring2Radius;
      ring2Positions[i * 3] = x * Math.cos(tilt);
      ring2Positions[i * 3 + 1] = y;
      ring2Positions[i * 3 + 2] = x * Math.sin(tilt);
    }
    const ring2Geo = new THREE.BufferGeometry();
    ring2Geo.setAttribute("position", new THREE.BufferAttribute(ring2Positions, 3));
    const ring2Mat = new THREE.PointsMaterial({
      color: 0xa78bfa,
      size: 0.032,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ring2 = new THREE.Points(ring2Geo, ring2Mat);
    scene.add(ring2);

    // ---- 펄스 웨이브: 중심에서 퍼져 나가는 성장 웨이브 (압도적 성장) ----
    const waveGeo = new THREE.SphereGeometry(0.5, 32, 32);
    const waveMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.3,
      side: THREE.BackSide,
      depthWrite: false,
    });
    const wave = new THREE.Mesh(waveGeo, waveMat);
    scene.add(wave);

    // ---- 시선 수렴 파티클: 바깥 → 중심 (시선을 확신으로) ----
    const convergePositions = new Float32Array(CONVERGE_COUNT * 3);
    const convergeTargets = new Float32Array(CONVERGE_COUNT * 3);
    const convergeSpeeds = new Float32Array(CONVERGE_COUNT);
    for (let i = 0; i < CONVERGE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.4 + Math.random() * 0.8;
      convergePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      convergePositions[i * 3 + 1] = r * Math.cos(phi);
      convergePositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      convergeTargets[i * 3] = (Math.random() - 0.5) * 0.15;
      convergeTargets[i * 3 + 1] = (Math.random() - 0.5) * 0.15;
      convergeTargets[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
      convergeSpeeds[i] = 0.003 + Math.random() * 0.005;
    }
    const convergeGeo = new THREE.BufferGeometry();
    convergeGeo.setAttribute("position", new THREE.BufferAttribute(convergePositions, 3));
    const convergeMat = new THREE.PointsMaterial({
      color: 0xc4b5fd,
      size: 0.028,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const convergePoints = new THREE.Points(convergeGeo, convergeMat);
    scene.add(convergePoints);

    // ---- 중앙 코어 (확신의 중심) ----
    const coreGeo = new THREE.SphereGeometry(0.1, 24, 24);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.75,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(2, 2, 2);
    scene.add(dirLight);
    const ambLight = new THREE.AmbientLight(0x64748b, 0.5);
    scene.add(ambLight);

    let time = 0;
    let wavePhase = 0;

    function animate() {
      frameRef.current = requestAnimationFrame(animate);
      const dt = 0.016;
      time += dt;

      // 인스턴스 링 터널: 링마다 회전 (퍼널 포탈 느낌)
      for (let i = 0; i < RING_INSTANCE_COUNT; i++) {
        const z = -0.3 - (i / RING_INSTANCE_COUNT) * 5.2;
        const scale = 0.45 + (1 - i / RING_INSTANCE_COUNT) * 0.85;
        const rotY = time * (0.16 + (i % 3) * 0.06);
        const rotZ = time * 0.08 * (i % 2 === 0 ? 1 : -1);
        dummy.position.set(0, 0, z);
        dummy.scale.setScalar(scale);
        dummy.rotation.order = "YXZ";
        dummy.rotation.x = Math.PI * 0.5;
        dummy.rotation.y = rotY;
        dummy.rotation.z = rotZ;
        dummy.updateMatrix();
        instancedRings.setMatrixAt(i, dummy.matrix);
      }
      instancedRings.instanceMatrix.needsUpdate = true;
      const pulse = 0.55 + Math.sin(time * PULSE_SPEED) * 0.2;
      (ringMat as THREE.MeshPhysicalMaterial).emissiveIntensity = pulse;

      // 성장 링: 반지름이 1 → 1.45 → 1 사이클 (노출을 선점으로)
      const growthT = (time % GROWTH_CYCLE_DURATION) / GROWTH_CYCLE_DURATION;
      const growthScale = 1 + 0.45 * Math.sin(growthT * Math.PI * 2);
      const posAttr = ring1Geo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const a = ring1Angles[i * 2];
        const yOff = ring1Angles[i * 2 + 1];
        const r = ring1BaseRadius * growthScale;
        posAttr.array[i * 3] = Math.cos(a) * r;
        posAttr.array[i * 3 + 1] = yOff;
        posAttr.array[i * 3 + 2] = Math.sin(a) * r;
      }
      posAttr.needsUpdate = true;
      ring1.rotation.y = time * ORBIT_SPEED;

      ring2.rotation.y = -time * ORBIT_SPEED * 1.15;
      ring2.rotation.z = time * 0.024;

      // 펄스 웨이브: 주기적으로 커졌다가 페이드아웃 (압도적 성장)
      wavePhase += dt;
      if (wavePhase > WAVE_CYCLE_DURATION) wavePhase -= WAVE_CYCLE_DURATION;
      const waveT = wavePhase / WAVE_CYCLE_DURATION;
      const waveScale = 0.3 + waveT * 4.2;
      const waveOpacity = Math.max(0, 0.4 * (1 - waveT) * (1 - waveT));
      wave.scale.setScalar(waveScale);
      waveMat.opacity = waveOpacity;

      // 시선 수렴: 바깥 → 중심으로 이동 후 리셋
      const convergePos = convergeGeo.attributes.position as THREE.BufferAttribute;
      const arr = convergePos.array as Float32Array;
      for (let i = 0; i < CONVERGE_COUNT; i++) {
        let x = arr[i * 3];
        let y = arr[i * 3 + 1];
        let z = arr[i * 3 + 2];
        const tx = convergeTargets[i * 3];
        const ty = convergeTargets[i * 3 + 1];
        const tz = convergeTargets[i * 3 + 2];
        const spd = convergeSpeeds[i];
        x += (tx - x) * spd;
        y += (ty - y) * spd;
        z += (tz - z) * spd;
        arr[i * 3] = x;
        arr[i * 3 + 1] = y;
        arr[i * 3 + 2] = z;
        const dist = Math.sqrt((tx - x) ** 2 + (ty - y) ** 2 + (tz - z) ** 2);
        if (dist < 0.08) {
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const r = 1.5 + Math.random() * 0.6;
          arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
          arr[i * 3 + 1] = r * Math.cos(phi);
          arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
        }
      }
      convergePos.needsUpdate = true;

      core.scale.setScalar(1 + Math.sin(time * 1.1) * 0.12);

      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frameRef.current);
      ringGeo.dispose();
      ringMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      waveGeo.dispose();
      waveMat.dispose();
      convergeGeo.dispose();
      convergeMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full min-h-[280px] rounded-b-2xl overflow-hidden"
      aria-hidden="true"
    />
  );
}
