# 에이전시형 모션·인터랙션 개선 계획

> 목표: DESIGN/LOVERS 급 에이전시 모션을 참고하되, **솔리드웹 브랜드·기존 Three.js·GEO/SEO 작업을 유지한 채** 모션 레이어를 얹는다.  
> 상태: **P1 구현 완료** · **What We Do / Beyond SEO(Our Strength) designlovers식 재편** · 히어로 풀블리드 · 플로팅 헤더  
> 관련: `docs/geo-ai-고도화-발전방향.md`

---

## 1. 결론 요약

- 방향은 맞지만 **전부 한 번에 넣으면 위험**하다.
- 지금 사이트에는 이미 Three.js(Hero / Our Strength)·리뷰 세로 마키·다크 톤이 있으므로, 에이전시 모션은 **교체가 아니라 추가**가 맞다.
- DESIGN/LOVERS식 초대형 영문 타이포를 그대로 복제하지 않는다. 솔리드웹 브랜드 카피·워드마크에 키네틱을 적용한다.
- 권장 기술: **Lenis + GSAP ScrollTrigger** (+ CSS / 가벼운 React 컴포넌트).

---

## 2. 참고 효과 목록 (요청 원안)

### 2.1 히어로 섹션

| 효과 | 설명 |
|------|------|
| Magnetic cursor / Mouse-tracking Orb | 우측 상단 Glow Orb가 커서에 반응해 위치·크기 변화 |
| Dot Matrix / Dot Grid Background | 어두운 배경 위 미세 점 그리드 |
| Kinetic Typography / Staggered Text Reveal | 진입 시 대형 타이포 스태거 리빌 |
| Pulsing Scroll Indicator | SCROLL TO EXPLORE 옆 점 펄스 |

### 2.2 스크롤·섹션 전환

| 효과 | 설명 |
|------|------|
| Infinite Marquee / Ticker | TRUSTED BY 영역 가로 무한 루프 |
| Smooth Scroll (Lenis / GSAP ScrollSmoother) | 관성 있는 부드러운 스크롤 |
| Scroll-Triggered Reveal / Fade-Up | 뷰포트 진입 시 순차 등장 |
| Hover Reveal / Micro-interactions | 프로젝트 호버 시 썸네일·화살표 등 |

### 2.3 참고 스택

- GSAP + ScrollTrigger
- Lenis (smooth scroll)

---

## 3. 현재 사이트 vs 목표 매핑

| 제안 효과 | 현재 상태 | 판단 |
|-----------|-----------|------|
| Magnetic cursor / Glow Orb | 없음 (Hero는 마우스 따라 블록 회전만) | 추가 후보 (P2) |
| Dot Grid 배경 | 없음 (단색 `#0d0d0d`) | 추가 후보 (P1) |
| Kinetic typography | 없음 (정적 히어로 카피) | 추가 후보 (P1, 브랜드 카피 적용) |
| Scroll indicator pulse | 없음 | 가벼운 추가 (P1) |
| Infinite marquee | Review 세로 마키만 있음 | TRUSTED BY 가로 마키 신규 (P2) |
| Smooth scroll (Lenis) | 기본 브라우저 스크롤 | 기반 레이어 (P1) |
| Scroll-triggered reveal | 없음 | 전 섹션 공통 (P1) |
| Project hover reveal | 카드 hover 보더 정도 | Our Projects 강화 (P2) |

**현재 기술:** Astro + React + Three.js. GSAP/Lenis 미도입.

---

## 4. 작업 원칙

1. **Three.js는 Hero 톤을 기준으로 통일** — Our Strength도 동일 재료·인터랙션 언어를 쓰고, 형태만 차별화한다.
2. **초대형 영문 타이포 복제 금지** — 솔리드웹 카피로 키네틱 적용.
3. **퍼포먼스·접근성 우선** — `prefers-reduced-motion` 대응, 모바일은 효과 축소.
4. **GEO/SEO 본문 노이즈 재발 방지** — 장식용 텍스트는 `aria-hidden` / 스크린리더 분리.
5. **CTA·가독성 우선** — 모션이 전환을 방해하면 축소한다.

---

## 5. 로드맵 (3단계)

### Phase 1 — 기반 + 체감 큰 효과 (1차 권장) ← 아래 §7 상세

- Lenis 스무스 스크롤 (전역)
- GSAP ScrollTrigger 섹션별 fade-up / stagger
- Hero: 텍스트 리빌 + 스크롤 인디케이터 펄스
- Hero 배경: Dot Grid (가벼운 CSS/SVG)

### Phase 2 — 히어로·포트폴리오 고급 인터랙션

- Magnetic Glow Orb (우측, 주황/로즈, 커서 추적) — Three와 레이어 분리
- TRUSTED BY 가로 마키 (고객명/로고)
- Our Projects 호버: 썸네일 확대, 화살표 이동, (선택) 커서 팔로잉 썸네일

### Phase 3 — 폴리시 (선택)

- 숫자 카운트업, 섹션 핀/패럴랙스(과하면 제외)
- 페이지 전환 짧은 페이드
- 모바일 전용 모션 프로필 (orb/마키 축소 또는 끄기)

---

## 6. 기술 선택

| 항목 | 제안 | 이유 |
|------|------|------|
| Smooth scroll | **Lenis** | 가볍고 Astro와 궁합 좋음 |
| Scroll reveal / kinetic | **GSAP + ScrollTrigger** | 업계 표준, 디테일 제어 쉬움 |
| Dot grid / pulse | **CSS** | 번들·성능 부담 적음 |
| Magnetic orb | **작은 React 컴포넌트** 또는 vanilla | Three 전체 씬 새로 만들 필요 없음 |
| Marquee | CSS animation 또는 GSAP | Review와 패턴 통일 가능 |

**비추천 / 대안**

- Framer Motion만으로 전 사이트 → Astro 섹션 전반엔 GSAP이 더 맞음.
- Lenis 없이 `scroll-behavior: smooth`만 → 에이전시 감 부족.

**리스크**

- Lenis + sticky Header / fixed 카카오 버튼 충돌 → 초기화 순서·wrapper 설계 필요.
- Three 캔버스 2개 + GSAP + Lenis → 모바일 프레임 드롭 → reduced-motion / 저사양 분기.
- 키네틱 과하면 히어로 가독성·CTA 전환율 저하 → 짧은 리빌로 제한.

---

## 7. Phase 1 구현 계획 (상세)

### 7.1 목표

한 번에 “에이전시 같다”는 인상이 나도록, **기반 스크롤 + 히어로 리빌 + 섹션 등장**에 집중한다.  
Magnetic Orb / TRUSTED BY / 프로젝트 커서 팔로잉은 **P2**.

### 7.2 의존성

```bash
npm install gsap lenis
```

- `gsap` + (필요 시) ScrollTrigger는 gsap 패키지에 포함.
- `lenis` (또는 `@studio-freight/lenis` → 현재 패키지명 `lenis` 확인 후 설치).

### 7.3 파일·역할

| 파일 | 작업 |
|------|------|
| `package.json` | `gsap`, `lenis` 추가 |
| `src/styles/global.css` (또는 전용 CSS) | Dot grid 유틸, scroll indicator pulse `@keyframes`, `prefers-reduced-motion` 분기 |
| `src/scripts/smooth-scroll.ts` (신규) | Lenis 초기화, GSAP ticker 연동, reduced-motion 시 no-op |
| `src/scripts/scroll-reveal.ts` (신규) | ScrollTrigger로 `[data-reveal]` 요소 fade-up / stagger |
| `src/layouts/BaseLayout.astro` | 위 스크립트 `client`/`<script>` 로드, (선택) Lenis wrapper 클래스 |
| `src/components/Hero.astro` | Dot grid 배경 레이어, 타이틀/서브/CTA에 `data-reveal` 또는 전용 리빌 클래스, 스크롤 인디케이터 |
| `src/components/WhatWeDo.astro` | 섹션/카드 `data-reveal` |
| `src/components/OurStrength.astro` | 헤더·카드 `data-reveal` (캔버스는 건드리지 않음) |
| `src/components/OurProjects.astro` | 헤더·카드 그리드 `data-reveal` |
| `src/components/FAQ.astro` | 헤더·아이템 `data-reveal` |
| `src/components/Review.astro` | 헤더만 reveal (기존 세로 마키는 유지) |

> Astro에서 GSAP/Lenis는 클라이언트에서만 동작하므로, `BaseLayout`의 `<script>` 또는 작은 React island/`client:load`로 초기화한다. SSR 시 DOM 준비 후 `requestAnimationFrame`/`DOMContentLoaded`에서 시작.

### 7.4 구현 단위 (순서)

#### P1-1. Lenis 스무스 스크롤

1. `smooth-scroll.ts`에서 Lenis 인스턴스 생성.
2. `gsap.ticker`에 Lenis `raf` 연결 (스크롤 위치와 ScrollTrigger 동기화).
3. `ScrollTrigger.update`를 Lenis scroll 이벤트에 연결.
4. `prefers-reduced-motion: reduce`이면 Lenis를 켜지 않음.
5. sticky Header / fixed 카카오 플로팅 버튼과 충돌 여부 확인.

#### P1-2. 공통 Scroll Reveal

1. 유틸: `data-reveal` (단일), `data-reveal-stagger` (자식들 stagger).
2. 기본 모션: `opacity 0 → 1`, `y: 24~40 → 0`, duration ~0.7s, ease `power2.out`.
3. `once: true` (한 번만 재생).
4. reduced-motion이면 즉시 최종 상태로 표시.
5. 홈 주요 섹션에 속성만 추가 (레이아웃 대변경 없음).

#### P1-3. Hero 키네틱 타이포 (브랜드 카피)

1. `h1` / subtitle / CTA를 줄·블록 단위로 감싸 스태거 리빌.
2. Mask reveal 또는 `y + opacity` 중 **가벼운 쪽** 선택 (가독성 우선).
3. HeroCanvas(Three.js)는 그대로 두고, 텍스트·CTA만 모션.
4. 진입 타이밍: 페이지 로드 직후 짧은 딜레이 후 재생 (스크롤 트리거와 별개).

#### P1-4. Dot Grid 배경

1. Hero 섹션 `::before` 또는 절대 위치 레이어.
2. CSS `radial-gradient` 도트 반복 또는 SVG pattern.
3. Three 캔버스 위/아래 레이어 순서 정리 (텍스트 z-index > grid > bg).
4. 대비·노이즈가 카피를 가리지 않게 opacity 낮게.

#### P1-5. Scroll Indicator Pulse

1. Hero 하단(또는 캔버스 하단)에 `Scroll` + 점 UI.
2. CSS `@keyframes`로 scale/opacity 펄스.
3. 클릭/포커스 시 다음 섹션(`#what-we-do` 등)으로 스크롤 (Lenis `scrollTo` 사용 가능).
4. `aria-hidden` 또는 적절한 `aria-label`.

### 7.5 완료 기준 (P1 Done)

- [x] 데스크톱에서 스크롤이 관성 있게 동작한다. *(구현됨 — 브라우저에서 확인)*
- [x] 홈 주요 섹션이 뷰포트 진입 시 fade-up 된다. *(data-reveal 적용)*
- [x] Hero 타이틀·서브·CTA가 로드 시 스태거로 등장한다.
- [x] Hero에 Dot Grid가 보이되 카피·CTA를 가리지 않는다.
- [x] Scroll indicator가 펄스하며, 다음 섹션으로 이동 가능하다.
- [x] `prefers-reduced-motion`에서 모션이 꺼지거나 최소화된 상태로 콘텐츠가 바로 보인다.
- [x] HeroCanvas / OurStrengthCanvas가 깨지지 않는다. *(빌드 통과)*
- [ ] 모바일에서 치명적 버벅임이 없다 (필요 시 Lenis만 끄거나 reveal만 유지). *(실기기 확인 필요)*

### 7.6 P1에서 하지 않는 것

- Magnetic Glow Orb
- TRUSTED BY 가로 마키
- 프로젝트 커서 팔로잉 썸네일
- 섹션 핀 / 강한 패럴랙스
- 페이지 전환 애니메이션

→ **Phase 2**로 미룸.

### 7.8 Our Strength 캔버스 (P1 후속 · 1차 반영)

기존 인스턴스 링 터널(다색 팔레트·파티클·펄스)은 데모씬 톤이 강해 **HeroCanvas와 톤을 맞춤**.

| 항목 | 내용 |
|------|------|
| 유지 | 흰 배경, `MeshLambert` 슬레이트 블록(opacity 0.35), 조립→홀드→리셋, 마우스 회전 |
| 형태 (1차) | **중공 프레임** — 6×6×6 외곽 모서리만 (히어로 솔리드 큐브와 대비) |
| 제거 | 하단 캡션(“시선을 확신으로…”), 다색 터널·웨이브·코어 |
| 레이아웃 | 캡션 영역만큼 캔버스 `min-height` 확대, `lg`에서 우측 카드 높이에 stretch |

**형태 후보 (보류)**: Signal Field / 상승 기둥 / 다이아몬드 / 나선 계단 / 아치 / 레이어 슬랩 — 톤 재검토 시 교체 가능.

### 7.9 예상 공수 (참고)

| 단위 | 대략 |
|------|------|
| Lenis + GSAP 기반 | 0.5일 |
| Scroll reveal 전 섹션 | 0.5일 |
| Hero 리빌 + Dot Grid + Indicator | 0.5~1일 |
| reduced-motion·모바일·회귀 확인 | 0.5일 |
| **합계** | **약 2~2.5일** |

---

## 8. 미결 질문

1. **범위**: P1 완료. P2는 별도.
2. **히어로 톤**: ~~해소~~ — 풀블리드 통합(1-A) + 카피 리라이트(2-B)로 반영. 흰 inset 카드·오버레이 로고 제거, `solidweb` 워드마크 히어로급, 캔버스 `clearColor` 다크(`#0d0d0d`).
3. **TRUSTED BY (P2)**: 고객사 텍스트명만? / 로고 이미지도?
4. **모바일**: 풀모션 vs 데스크톱 위주 + 모바일 축소?

---

## 9. 변경 이력

| 날짜 | 내용 |
|------|------|
| 2026-03-16 | 초안 작성: 매핑·원칙·로드맵·P1 구현 계획 정리 |
| 2026-11-16 | **P1 구현**: `gsap`/`lenis` 도입, `site-motion`·`smooth-scroll`·`scroll-reveal`, Hero Dot Grid·리빌·SCROLL 인디케이터, 섹션 `data-reveal` 적용 |
| 2026-11-16 | **Our Strength 캔버스 1차 교체**: 다색 링 터널·캡션 제거 → Hero와 동일 톤(흰 배경·반투명 슬레이트 블록·조립 루프·마우스 회전). 형태는 **중공 프레임**(6×6×6 모서리만). 후보로 검토 후 보류: Signal Field, 상승 기둥, 다이아몬드, 나선, 아치, 레이어 슬랩 |
| 2026-11-16 | **히어로 임팩트 개편 (1-A+2-B)**: 풀블리드 한 장면(카드 제거), HeroCanvas 다크 배경·우측 배치 |
| 2026-11-16 | **히어로·네비 레퍼런스 정렬 (B)**: Three.js 유지. 질문→답 헤드·아이브로우·듀얼 CTA·하단 전략/전환/측정 바. 헤더는 blur+흰 CTA로 통일. solidweb 워드마크·어색한 카피 제거 |
| 2026-11-17 | **홈 SEO·AEO·GEO 축 정렬**: Hero 하단 짧은 훅, What We Do/Our Strength를 검색·답변·AI 추천 메시지로 재작성 |
