import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

/** Lenis + GSAP ScrollTrigger 동기화. reduced-motion이면 no-op. */
export function initSmoothScroll(): Lenis | null {
  if (typeof window === "undefined") return null;
  if (prefersReducedMotion()) return null;
  if (lenisInstance) return lenisInstance;

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    touchMultiplier: 1.2,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  lenisInstance = lenis;
  return lenis;
}

export function scrollToTarget(target: string | HTMLElement, options?: { offset?: number }) {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target, { offset: options?.offset ?? 0 });
    return;
  }
  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  if (el instanceof HTMLElement) {
    el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }
}

export function destroySmoothScroll() {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}
