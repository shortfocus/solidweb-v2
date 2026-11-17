import * as React from "react";
import * as THREE from "three";

/**
 * [보관] three.js points/waves — 슬레이트/로즈
 * 활성: HeroCanvasWavesBlue.tsx · 네트워크: HeroCanvasNetwork.tsx
 */
const SEPARATION = 0.14;
const AMOUNT_X = 48;
const AMOUNT_Y = 36;

const VERTEX_SHADER = /* glsl */ `
  attribute float scale;
  varying float vAlpha;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = scale * (180.0 / -mvPosition.z);
    vAlpha = clamp(scale / 28.0, 0.15, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 color;
  uniform vec3 accent;
  varying float vAlpha;

  void main() {
    vec2 c = gl_PointCoord - vec2(0.5);
    if (length(c) > 0.475) discard;
    vec3 col = mix(color, accent, smoothstep(0.35, 0.95, vAlpha));
    gl_FragColor = vec4(col, vAlpha * 0.9);
  }
`;

export default function HeroCanvas() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const frameRef = React.useRef<number>(0);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const width = container.clientWidth;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.set(0.4, 1.1, 3.6);
    camera.lookAt(0.4, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0d0d0d, 1);
    container.appendChild(renderer.domElement);

    const numParticles = AMOUNT_X * AMOUNT_Y;
    const positions = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);

    let i = 0;
    let j = 0;
    for (let ix = 0; ix < AMOUNT_X; ix++) {
      for (let iy = 0; iy < AMOUNT_Y; iy++) {
        positions[i] = ix * SEPARATION - (AMOUNT_X * SEPARATION) / 2;
        positions[i + 1] = 0;
        positions[i + 2] = iy * SEPARATION - (AMOUNT_Y * SEPARATION) / 2;
        scales[j] = 1;
        i += 3;
        j++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0x94a3b8) },
        accent: { value: new THREE.Color(0xf43f5e) },
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    particles.position.set(0.55, -0.15, 0);
    particles.rotation.x = -0.28;
    scene.add(particles);

    const pointer = { x: 0, y: 0 };
    const pointerTarget = { x: 0, y: 0 };

    const onPointerMove = (e: PointerEvent) => {
      if (e.isPrimary === false) return;
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      pointerTarget.x = nx * 0.55;
      pointerTarget.y = -ny * 0.35;
    };
    const onPointerLeave = () => {
      pointerTarget.x = 0;
      pointerTarget.y = 0;
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);

    let count = 0;

    function animate() {
      frameRef.current = requestAnimationFrame(animate);

      pointer.x += (pointerTarget.x - pointer.x) * 0.05;
      pointer.y += (pointerTarget.y - pointer.y) * 0.05;

      camera.position.x = 0.4 + pointer.x;
      camera.position.y = 1.1 + pointer.y;
      camera.lookAt(0.4, 0, 0);

      const pos = geometry.attributes.position.array as Float32Array;
      const sc = geometry.attributes.scale.array as Float32Array;

      let pi = 0;
      let si = 0;
      for (let ix = 0; ix < AMOUNT_X; ix++) {
        for (let iy = 0; iy < AMOUNT_Y; iy++) {
          if (!reduced) {
            pos[pi + 1] =
              Math.sin((ix + count) * 0.3) * 0.22 +
              Math.sin((iy + count) * 0.5) * 0.22;
            sc[si] =
              (Math.sin((ix + count) * 0.3) + 1) * 8 +
              (Math.sin((iy + count) * 0.5) + 1) * 8;
          } else {
            pos[pi + 1] = Math.sin(ix * 0.3) * 0.12 + Math.sin(iy * 0.5) * 0.12;
            sc[si] = 12;
          }
          pi += 3;
          si++;
        }
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.scale.needsUpdate = true;

      if (!reduced) count += 0.08;

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
      geometry.dispose();
      material.dispose();
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
