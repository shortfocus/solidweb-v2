import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./smooth-scroll";

gsap.registerPlugin(ScrollTrigger);

function isInView(el: Element, offsetRatio = 0.92): boolean {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * offsetRatio && rect.bottom > 0;
}

function revealSingles(els: HTMLElement[]) {
  els.forEach((el) => {
    gsap.set(el, { opacity: 0, y: 32 });

    const play = () => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    if (isInView(el)) {
      play();
      return;
    }

    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: play,
    });
  });
}

function revealStaggers(parents: HTMLElement[]) {
  parents.forEach((parent) => {
    const children = Array.from(parent.children) as HTMLElement[];
    if (!children.length) return;

    gsap.set(children, { opacity: 0, y: 28 });

    const play = () => {
      gsap.to(children, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    if (isInView(parent)) {
      play();
      return;
    }

    ScrollTrigger.create({
      trigger: parent,
      start: "top 90%",
      once: true,
      onEnter: play,
    });
  });
}

/** 스크롤 진입 시 fade-up. data-reveal / data-reveal-stagger */
export function initScrollReveal() {
  if (typeof window === "undefined") return;

  const singles = gsap.utils.toArray<HTMLElement>("[data-reveal]");
  const staggers = gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]");

  if (prefersReducedMotion()) {
    [...singles, ...staggers].forEach((el) => {
      gsap.set(el, { clearProps: "all" });
      Array.from(el.children).forEach((child) => gsap.set(child, { clearProps: "all" }));
    });
    return;
  }

  revealSingles(singles);
  revealStaggers(staggers);

  // Lenis/이미지 로드 후 트리거 위치 재계산 + 뷰포트 내 요소 보정
  const refresh = () => {
    ScrollTrigger.refresh();
    staggers.forEach((parent) => {
      if (!isInView(parent)) return;
      const children = Array.from(parent.children) as HTMLElement[];
      const hidden = children.some((c) => Number(gsap.getProperty(c, "opacity")) < 0.05);
      if (hidden) {
        gsap.to(children, { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, overwrite: "auto" });
      }
    });
    singles.forEach((el) => {
      if (!isInView(el)) return;
      if (Number(gsap.getProperty(el, "opacity")) < 0.05) {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.45, overwrite: "auto" });
      }
    });
  };

  requestAnimationFrame(refresh);
  window.addEventListener("load", refresh, { once: true });
  setTimeout(refresh, 400);
}

/** Hero 로드 시 스태거 리빌 (스크롤과 무관) */
export function initHeroReveal() {
  if (typeof window === "undefined") return;

  const items = gsap.utils.toArray<HTMLElement>("[data-hero-reveal]");
  if (!items.length) return;

  if (prefersReducedMotion()) {
    items.forEach((el) => gsap.set(el, { clearProps: "all" }));
    return;
  }

  gsap.fromTo(
    items,
    { opacity: 0, y: 36 },
    {
      opacity: 1,
      y: 0,
      duration: 0.75,
      stagger: 0.12,
      ease: "power2.out",
      delay: 0.15,
    }
  );
}
