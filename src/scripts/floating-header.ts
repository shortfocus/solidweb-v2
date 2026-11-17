import { getLenis } from "./smooth-scroll";

const SCROLL_THRESHOLD = 24;

/** veryeasy식: 스크롤 시 .scrolled → 플로팅 필 헤더 */
export function initFloatingHeader() {
  if (typeof window === "undefined") return;

  const header = document.querySelector<HTMLElement>("[data-site-header]");
  if (!header) return;

  // 홈 외 페이지는 히어로 블렌드가 없으므로 처음부터 필 형태
  const alwaysPill = !document.body.classList.contains("home-page");

  const sync = (scrollY: number) => {
    header.classList.toggle(
      "scrolled",
      alwaysPill || scrollY > SCROLL_THRESHOLD,
    );
  };

  sync(window.scrollY);

  const onWindowScroll = () => sync(window.scrollY);
  window.addEventListener("scroll", onWindowScroll, { passive: true });

  const lenis = getLenis();
  if (lenis) {
    lenis.on("scroll", ({ scroll }: { scroll: number }) => sync(scroll));
  }
}
