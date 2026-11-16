import * as React from "react";
import * as THREE from "three";

/**
 * [활성] three.js drawrange 네트워크
 * 보관: HeroCanvasNetwork.tsx (동일) · HeroCanvasWaves.tsx (2번 waves)
 */
const MAX_PARTICLES = 140;
const PARTICLE_COUNT = 90;
const BOX = 2.4;
const BOX_HALF = BOX / 2;
const MIN_DISTANCE = 0.55;
const MAX_CONNECTIONS = 4;
const ROTATION_MAX = 0.35;
const LERP = 0.08;
const INIT_ROTATION_X = -0.12;
const INIT_ROTATION_Y = 0.18;

const SLATE = new THREE.Color(0x94a3b8);
const ROSE = new THREE.Color(0xf43f5e);

export default function HeroCanvas() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const frameRef = React.useRef<number>(0);
  const targetRot = React.useRef({ x: INIT_ROTATION_X, y: INIT_ROTATION_Y });
  const currentRot = React.useRef({ x: INIT_ROTATION_X, y: INIT_ROTATION_Y });

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const width = container.clientWidth;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 40);
    camera.position.set(0.2, 0.15, 4.2);
    camera.lookAt(0.35, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0d0d0d, 1);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.position.set(0.55, 0, 0);
    scene.add(group);

    // 희미한 바운딩 박스 (설계 프레임)
    const helper = new THREE.BoxHelper(
      new THREE.Mesh(new THREE.BoxGeometry(BOX, BOX, BOX))
    );
    (helper.material as THREE.LineBasicMaterial).color.setHex(0x334155);
    (helper.material as THREE.LineBasicMaterial).transparent = true;
    (helper.material as THREE.LineBasicMaterial).opacity = 0.35;
    group.add(helper);

    type ParticleData = {
      velocity: THREE.Vector3;
      numConnections: number;
    };

    const particlesData: ParticleData[] = [];
    const particlePositions = new Float32Array(MAX_PARTICLES * 3);

    for (let i = 0; i < MAX_PARTICLES; i++) {
      particlePositions[i * 3] = Math.random() * BOX - BOX_HALF;
      particlePositions[i * 3 + 1] = Math.random() * BOX - BOX_HALF;
      particlePositions[i * 3 + 2] = Math.random() * BOX - BOX_HALF;
      particlesData.push({
        velocity: new THREE.Vector3(
          (-0.5 + Math.random()) * 0.006,
          (-0.5 + Math.random()) * 0.006,
          (-0.5 + Math.random()) * 0.006
        ),
        numConnections: 0,
      });
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setDrawRange(0, PARTICLE_COUNT);
    particlesGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3).setUsage(THREE.DynamicDrawUsage)
    );

    const pointsMat = new THREE.PointsMaterial({
      color: 0xcbd5e1,
      size: 0.045,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const pointCloud = new THREE.Points(particlesGeo, pointsMat);
    group.add(pointCloud);

    const maxSegments = MAX_PARTICLES * MAX_CONNECTIONS;
    const linePositions = new Float32Array(maxSegments * 2 * 3);
    const lineColors = new Float32Array(maxSegments * 2 * 3);

    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage)
    );
    linesGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage)
    );
    linesGeo.setDrawRange(0, 0);
    linesGeo.computeBoundingSphere();

    const linesMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const linesMesh = new THREE.LineSegments(linesGeo, linesMat);
    group.add(linesMesh);

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      targetRot.current.y = INIT_ROTATION_Y + (x - 0.5) * 2 * ROTATION_MAX;
      targetRot.current.x = INIT_ROTATION_X + (0.5 - y) * 2 * ROTATION_MAX;
    };
    const onPointerLeave = () => {
      targetRot.current.x = INIT_ROTATION_X;
      targetRot.current.y = INIT_ROTATION_Y;
    };
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);

    let time = 0;

    function animate() {
      frameRef.current = requestAnimationFrame(animate);
      time += 0.016;

      const tr = targetRot.current;
      const cr = currentRot.current;
      cr.x += (tr.x - cr.x) * LERP;
      cr.y += (tr.y - cr.y) * LERP;
      group.rotation.x = cr.x;
      group.rotation.y = cr.y + (reduced ? 0 : time * 0.05);

      let vertexpos = 0;
      let colorpos = 0;
      let numConnected = 0;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particlesData[i].numConnections = 0;
      }

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const data = particlesData[i];

        if (!reduced) {
          particlePositions[i * 3] += data.velocity.x;
          particlePositions[i * 3 + 1] += data.velocity.y;
          particlePositions[i * 3 + 2] += data.velocity.z;

          if (
            particlePositions[i * 3 + 1] < -BOX_HALF ||
            particlePositions[i * 3 + 1] > BOX_HALF
          ) {
            data.velocity.y = -data.velocity.y;
          }
          if (
            particlePositions[i * 3] < -BOX_HALF ||
            particlePositions[i * 3] > BOX_HALF
          ) {
            data.velocity.x = -data.velocity.x;
          }
          if (
            particlePositions[i * 3 + 2] < -BOX_HALF ||
            particlePositions[i * 3 + 2] > BOX_HALF
          ) {
            data.velocity.z = -data.velocity.z;
          }
        }

        if (data.numConnections >= MAX_CONNECTIONS) continue;

        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dataB = particlesData[j];
          if (dataB.numConnections >= MAX_CONNECTIONS) continue;

          const dx = particlePositions[i * 3] - particlePositions[j * 3];
          const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
          const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < MIN_DISTANCE) {
            data.numConnections++;
            dataB.numConnections++;

            const alpha = 1 - dist / MIN_DISTANCE;

            linePositions[vertexpos++] = particlePositions[i * 3];
            linePositions[vertexpos++] = particlePositions[i * 3 + 1];
            linePositions[vertexpos++] = particlePositions[i * 3 + 2];
            linePositions[vertexpos++] = particlePositions[j * 3];
            linePositions[vertexpos++] = particlePositions[j * 3 + 1];
            linePositions[vertexpos++] = particlePositions[j * 3 + 2];

            // 가까울수록 로즈, 멀수록 슬레이트
            const t = alpha * 0.85;
            const r = (SLATE.r + (ROSE.r - SLATE.r) * t) * alpha;
            const g = (SLATE.g + (ROSE.g - SLATE.g) * t) * alpha;
            const b = (SLATE.b + (ROSE.b - SLATE.b) * t) * alpha;
            for (let k = 0; k < 2; k++) {
              lineColors[colorpos++] = r;
              lineColors[colorpos++] = g;
              lineColors[colorpos++] = b;
            }

            numConnected++;
          }
        }
      }

      linesGeo.setDrawRange(0, numConnected * 2);
      linesGeo.attributes.position.needsUpdate = true;
      linesGeo.attributes.color.needsUpdate = true;
      particlesGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 400;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(frameRef.current);
      particlesGeo.dispose();
      pointsMat.dispose();
      linesGeo.dispose();
      linesMat.dispose();
      helper.geometry?.dispose();
      (helper.material as THREE.Material).dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full cursor-default overflow-hidden"
      aria-hidden="true"
    />
  );
}
