import { initSmoothScroll, scrollToTarget } from "./smooth-scroll";
import { initScrollReveal, initHeroReveal } from "./scroll-reveal";

function bindScrollIndicators() {
  document.querySelectorAll<HTMLElement>("[data-scroll-to]").forEach((el) => {
    el.addEventListener("click", (e) => {
      const target = el.getAttribute("data-scroll-to");
      if (!target) return;
      e.preventDefault();
      scrollToTarget(target, { offset: -16 });
    });
  });
}

/** 전역 모션 초기화: Lenis + reveal + hero + scroll indicator */
export function initSiteMotion() {
  if (typeof window === "undefined") return;

  initSmoothScroll();
  initHeroReveal();
  initScrollReveal();
  bindScrollIndicators();

  document.documentElement.classList.add("js-motion");
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initSiteMotion(), { once: true });
  } else {
    initSiteMotion();
  }
}
