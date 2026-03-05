import * as React from "react";
import * as THREE from "three";

const ROTATION_MAX = 0.6;
const LERP = 0.14;
const INIT_ROTATION_X = -0.42;
const INIT_ROTATION_Y = 0.48;

export default function HeroCanvas() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const frameRef = React.useRef<number>(0);
  const targetRotationRef = React.useRef({ x: INIT_ROTATION_X, y: INIT_ROTATION_Y });
  const currentRotationRef = React.useRef({ x: INIT_ROTATION_X, y: INIT_ROTATION_Y });

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 2.2;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xffffff, 1);
    container.appendChild(renderer.domElement);

    const size = 0.82;
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshLambertMaterial({
      color: 0xc0c4cc,
      transparent: true,
      opacity: 0.24,
      flatShading: true,
      side: THREE.DoubleSide,
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, 0);
    scene.add(cube);

    const light = new THREE.DirectionalLight(0xffffff, 0.85);
    light.position.set(0.5, 0.5, 1);
    scene.add(light);
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      targetRotationRef.current.y = INIT_ROTATION_Y + (x - 0.5) * 2 * ROTATION_MAX;
      targetRotationRef.current.x = INIT_ROTATION_X + (0.5 - y) * 2 * ROTATION_MAX;
    };

    const onMouseLeave = () => {
      targetRotationRef.current.x = INIT_ROTATION_X;
      targetRotationRef.current.y = INIT_ROTATION_Y;
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    function animate() {
      frameRef.current = requestAnimationFrame(animate);

      const target = targetRotationRef.current;
      const current = currentRotationRef.current;
      current.x += (target.x - current.x) * LERP;
      current.y += (target.y - current.y) * LERP;

      cube.rotation.x = current.x;
      cube.rotation.y = current.y;

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
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
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
      className="h-full w-full min-h-[18rem] cursor-default rounded-2xl overflow-hidden"
      aria-hidden="true"
    />
  );
}
