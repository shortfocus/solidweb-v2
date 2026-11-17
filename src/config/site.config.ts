export const siteConfig = {
  name: "solidweb",
  description: "SEO·AEO·GEO에 최적화된 웹을 설계하는 에이전시.",
  /** OG/Twitter 공유용 이미지 경로 (1200x630 권장). public 폴더 기준, 예: /og-image.webp */
  ogImage: "/og-image.webp",
  /** OG 이미지 대체 텍스트 (카카오톡·네이버 등 미리보기 접근성) */
  ogImageAlt: "솔리드웹",
  hero: {
    eyebrow: "차세대 검색 환경에 맞춘 웹 제작 기준",
    titleLine1: "단순 노출을 넘어,",
    titleLine2: "AI가 먼저 추천하는 웹사이트",
    /** @deprecated 하위 호환 — titleLine1+2 사용 */
    title: "단순 노출을 넘어, AI가 먼저 추천하는 웹사이트",
    subtitleLine1: "SEO · AEO · GEO 시대에 최적화된",
    subtitleLine2: "반응형 웹사이트 제작 파트너.",
    /** @deprecated 하위 호환 — subtitleLine1+2 사용 */
    subtitleMain: "SEO · AEO · GEO 시대에 최적화된 반응형 웹사이트 제작 파트너.",
    subtitleEnd: "",
    support: "",
    ctaText: "카톡 상담하기",
    ctaSecondaryText: "포트폴리오 보기",
    ctaSecondaryHref: "/portfolio",
  },
  nav: {
    consult: "상담 신청",
    items: [
      { label: "홈", href: "/" },
      { label: "포트폴리오", href: "/portfolio" },
    ],
  },
  whatWeDo: {
    sectionLabel: "01",
    title: "What We Do",
    subtitle: "검색·답변·AI 추천까지, 브랜드가 선택되는 웹의 전 과정을 설계합니다.",
    items: [
      {
        title: "시맨틱 구조 설계",
        description:
          "검색·AI가 페이지를 정확히 이해하도록 제목·섹션·링크 구조를 웹 표준으로 정리합니다.",
      },
      {
        title: "답변형 콘텐츠 설계",
        description:
          "고객이 묻는 문장에 바로 답이 되도록 FAQ·핵심 문단·서비스 설명을 질문형으로 재구성합니다.",
      },
      {
        title: "스키마·엔티티 구축",
        description:
          "Organization·Service·FAQ 등 구조화 데이터로 브랜드 정보를 AI가 인용 가능한 형태로 만듭니다.",
      },
      {
        title: "검색 랜딩 최적화",
        description:
          "네이버·구글 첫 페이지를 목표로 키워드·메타·내부 링크를 랜딩 목적에 맞게 설계합니다.",
      },
      {
        title: "AI 인용 콘텐츠",
        description:
          "ChatGPT·Gemini·Perplexity가 참고할 수 있는 명확한 사실·근거·브랜드 서술을 콘텐츠에 심습니다.",
      },
      {
        title: "전환 흐름 설계",
        description:
          "검색·추천으로 들어온 방문자가 상담·문의까지 이어지도록 CTA와 설득 흐름을 배치합니다.",
      },
      {
        title: "속도·인덱싱",
        description:
          "빠른 로딩과 안정적인 인덱싱으로 검색 로봇·AI 크롤러가 이탈 없이 읽게 만듭니다.",
      },
      {
        title: "측정·개선 루프",
        description:
          "노출·클릭·문의 데이터를 기준으로 구조를 다듬어, 한 번에 끝이 아닌 개선 사이클을 만듭니다.",
      },
    ],
    cta: {
      label: "상담 시작하기",
      href: "/contact",
    },
  },
  ourStrength: {
    sectionLabel: "02",
    title: "Beyond SEO",
    subtitle: "검색창을 넘어, 답변과 AI 추천까지 이어지는 노출 기준을 만듭니다.",
    items: [
      {
        acronym: "SEO",
        label: "Search Engine Optimization",
        title: "검색엔진 최적화",
        description:
          "네이버·구글이 사이트를 정확히 읽고 상위 노출할 수 있도록, 웹 표준·메타·속도·키워드 구조를 설계합니다. 검색의 기본 체력입니다.",
      },
      {
        acronym: "AEO",
        label: "Answer Engine Optimization",
        title: "검색 답변 최적화",
        description:
          "‘어디가 좋을까?’ 같은 문장형 질문에 우리 정보가 정답으로 뜨도록, 질문형 콘텐츠·FAQ·답변 블록으로 정보 구조를 재편합니다.",
      },
      {
        acronym: "GEO",
        label: "Generative Engine Optimization",
        title: "생성형 AI 최적화",
        description:
          "ChatGPT·Gemini·Perplexity가 업체를 추천·인용할 때 우리 브랜드가 먼저 언급되도록, 엔티티·스키마·신뢰 신호를 콘텐츠에 심습니다.",
      },
    ],
  },
  projects: {
    sectionLabel: "03",
    title: "Our Projects",
    subtitle: "검색·전환·브랜드가 맞닿은 결과물들을 확인하세요.",
    descriptionLines: [
      "우리가 함께 만든 프로젝트들은",
      "사용성과 기술, 그리고 디자인의 조화를 추구합니다.",
    ],
    viewMoreLabel: "프로젝트 더보기",
    featured: {
      title: "ISAC Food",
      description: "ISAC Food는 (주)이삭푸드의 새로운 브랜드 아이덴티티 구축 및 웹사이트 개발 프로젝트입니다.",
    },
    items: [
      { title: "Project A", desc: "웹/앱 개발" },
      { title: "Project B", desc: "브랜딩" },
      { title: "Project C", desc: "마케팅" },
      { title: "Project D", desc: "솔루션" },
      { title: "Project E", desc: "웹/앱" },
      { title: "Project F", desc: "브랜딩" },
    ],
  },
  portfolioPage: {
    heading: "What We Do",
    description: "솔리드웹은 단순히 기능을 구현하는 데 그치지 않습니다. 사용자 경험을 중심에 두고, 클라이언트의 목표와 사용자의 니즈가 자연스럽게 연결되도록 설계합니다.",
    projectButtonLabel: "상세 보기",
    projects: [
      { title: "다을건설", description: "신축·공장·주택 전문 다을건설 공식 웹사이트. 완공 실적, 건축 과정, 상담 신청을 담은 책임 시공 브랜딩.", image: "/portfolio/daeul.webp", link: "https://xn--2j1bk00b.com/" },
      { title: "올라포토", description: "카메라 클래스·리뷰 플랫폼 올라포토 웹사이트. 강의 안내, 카메라/렌즈 리뷰, 장비 팁·커뮤니티 구성.", image: "/portfolio/holaphoto.webp", link: "https://www.holaphoto.com/" },
      { title: "알체라 AI", description: "AI·얼굴인식 기술 기업 알체라의 기업 사이트 및 서비스 소개 페이지 기획·개발.", image: "/portfolio/alchera.webp", link: "http://alcherainc.com/" },
      { title: "LG 유니참", description: "반려동물 전문 브랜드 LG 유니참의 브랜드 사이트 구축 및 반응형 웹 개발.", image: "/portfolio/lgucpet.webp", link: "https://lgucpet.co.kr/" },
      { title: "백상예술대상", description: "영화·TV·연극 등 백상예술대상 공식 웹사이트 제작 및 시상식 정보·티켓팅 UX 설계.", image: "/portfolio/baeksang.webp", link: "https://www.baeksangawards.co.kr/" },
      { title: "소망교회", description: "소망교회 공식 홈페이지 기획·디자인·개발. 예배 안내, 교회 소개, 미디어 콘텐츠 구성.", image: "/portfolio/somang.webp", link: "https://somang.net/home" },
      { title: "콜렉트", description: "럭셔리 브랜드 콜렉트의 웹사이트 개발 및 디자인. 고급스러운 톤앤매너 반영.", image: "/portfolio/collect.webp", link: "https://www.collectluxe.com/" },
      { title: "cafe mememi", description: "카페 메메미 브랜드 웹사이트 제작. 매장 소개, 메뉴, 분위기를 담은 비주얼 구성.", image: "/portfolio/mememi.webp", link: "https://www.cafemememi.com/" },
      { title: "와이즈 웨딩", description: "웨딩 플랫폼 와이즈웨딩의 웹 개발·디자인. 예비 부부를 위한 정보 구조와 UI 설계.", image: "/portfolio/wisewedding.webp", link: "http://www.wisewedding.co.kr/" },
      { title: "mostapes", description: "모스테이프스 브랜드 웹사이트 기획·개발. 제품과 브랜드 스토리를 전달하는 구조 설계.", image: "/portfolio/mostapes.webp", link: "http://mostapes.com/" },
      { title: "NHN KCP", description: "NHN KCP 결제·정산 서비스 소개 사이트. B2B 신뢰감과 정보 전달성을 고려한 웹 구축.", image: "/portfolio/kcp.webp", link: "https://www.kcp.co.kr/" },
      { title: "NHN 클라우드", description: "NHN 클라우드 기업용 클라우드 서비스 소개 웹사이트 기획·개발 및 콘텐츠 구조 설계.", image: "/portfolio/nhncloud.webp", link: "https://company.nhncloud.com/" },
      { title: "nots korea", description: "노츠코리아 브랜드 웹사이트 제작. 제품·서비스 소개와 사용자 경험 중심의 디자인 적용.", image: "/portfolio/notskorea.webp", link: "http://notskorea.com/index.nots" },
      { title: "기아 인재채용", description: "기아 채용 사이트 구축. 채용 공고, 회사 소개, 지원 플로우를 담은 인재 채용 웹 경험 설계.", image: "/portfolio/kia.webp", link: "https://career.kia.com/main/main.kc" },
      { title: "아스티 캐빈", description: "아스티 캐빈 숙소·예약 브랜드 웹사이트 개발. 숙소 정보와 예약 UX 최적화.", image: "/portfolio/astycabin.webp", link: "https://www.astycabin.co.kr/" },
      { title: "국제특허이창", description: "국제특허이창 법률사무소 웹사이트 제작. 전문성과 신뢰감을 전달하는 구조·디자인 구성.", image: "/portfolio/echangpat.webp", link: "https://echangpat.com/" },
      { title: "데브시스터즈", description: "쿠키런 등 게임을 제작하는 데브시스터즈 기업 사이트. IP·채용·소개를 담은 웹 경험 설계.", image: "/portfolio/devsisters.webp", link: "https://www.devsisters.com/" },
      { title: "동국제약", description: "동국제약·인사돌 등 의약 브랜드 웹사이트 구축. 제품·브랜드 소개 및 사용자 친화적 정보 구조.", image: "/portfolio/dkbrand.webp", link: "https://dkbrand.co.kr/" },
      { title: "깨끗한 나라", description: "생활용지 브랜드 깨끗한나라 웹사이트 기획·개발. 제품 라인업과 브랜드 메시지 전달.", image: "/portfolio/kleannara.webp", link: "https://www.kleannara.co.kr/Main/main" },
      { title: "생명보험협회", description: "한국생명보험협회 공식 웹사이트 제작. 보험 산업 정보·정책·소식 전달 구조 설계.", image: "/portfolio/klia.webp", link: "https://www.klia.or.kr/" },
      { title: "LG 마미포코", description: "LG 마미포코 기저귀 브랜드 웹사이트 개발. 제품 정보와 육아 콘텐츠를 담은 UX 구성.", image: "/portfolio/mamypoko.webp", link: "https://mamypoko.co.kr/" },
      { title: "허스트 중앙", description: "허스트 중앙 멤버십·서비스 소개 웹사이트 기획·개발. 회원 경험과 정보 접근성 강화.", image: "/portfolio/hjmembers.webp", link: "https://www.hjmembers.co.kr/" },
      { title: "에스쁘아", description: "화장품 브랜드 에스쁘아 공식 웹사이트 구축. 제품 라인업·프로모션·브랜드 스토리 반영.", image: "/portfolio/espoir.webp", link: "https://www.espoir.com/ko/main.do" },
      { title: "MUA", description: "명상·웰니스 브랜드 MUA 웹사이트 제작. 프로그램 소개와 차분한 브랜드 톤을 살린 디자인.", image: "/portfolio/muameditation.webp", link: "https://muameditation.com/ko/main.do" },
      { title: "국립태권도박물관", description: "국립태권도박물관 공식 웹사이트 기획·개발. 전시·교육·관람 정보와 문화기관 이미지 반영.", image: "/portfolio/larchiveum.webp", link: "https://larchiveum.tpf.or.kr/" },
      { title: "코나아이", description: "코나아이 기업 웹사이트 구축. 서비스 소개·기술력·비전을 전달하는 구조와 비주얼 설계.", image: "/portfolio/konai.webp", link: "https://konai.com/" },
      { title: "테라에너지", description: "테라에너지 기업 사이트 제작. 에너지 사업·솔루션 소개 및 B2B 신뢰감 있는 웹 경험 구성.", image: "/portfolio/teraenergy.webp", link: "http://www.teraenergy.co.kr/" },
      { title: "렉서스코리아", description: "렉서스코리아 공식 웹사이트 개발. 프리미엄 자동차 브랜드 이미지와 차량·서비스 정보 전달.", image: "/portfolio/lexus.webp", link: "https://www.lexus.co.kr/" },
      { title: "웰컴에프엔디", description: "웰컴에프엔디 재단 웹사이트 기획·개발. 사업 소개·후원·소식 등 재단 메시지 구조화.", image: "/portfolio/welcomefnd.webp", link: "https://www.welcomefnd.com/" },
      { title: "대한민국은 공연중", description: "K스테이지페스타 '대한민국은 공연중' 공식 웹사이트. 공연·페스티벌 정보와 티켓팅 UX 설계.", image: "/portfolio/kstagefesta.webp", link: "https://kstagefesta.kr/" },
      { title: "에이투지라운지", description: "에이투지라운지 브랜드 웹사이트 제작. 공간 소개·이용 안내·브랜드 경험을 담은 디자인.", image: "/portfolio/atozlounge.webp", link: "https://atozlounge.com/" },
      { title: "포스코DX", description: "포스코DX 디지털 전환·IT 서비스 소개 웹사이트 기획·개발. 기업 이미지와 솔루션 정보 전달.", image: "/portfolio/poscodx.webp", link: "https://www.poscodx.com/kor/" },
      { title: "레카 벤처스", description: "레카 벤처스 투자·포트폴리오 소개 웹사이트 구축. 투자 철학과 파트너십 정보 구조 설계.", image: "/portfolio/leccaventures.webp", link: "https://leccaventures.com/" },
      { title: "주님의교회 유아숲", description: "주님의교회 유아숲 프로그램 웹사이트 제작. 유아·가족 대상 프로그램 소개와 참여 안내.", image: "/portfolio/pclkids.webp", link: "https://pclkids.co.kr/" },
      { title: "motion air compressors", description: "Motion Air Compressors 기업·제품 웹사이트 개발. 산업용 압축기 브랜드와 제품 정보 전달.", image: "/portfolio/motionaircompressors.webp", link: "https://motionaircompressors.com/" },
      { title: "명지반도체", description: "명지반도체 기업 웹사이트 기획·개발. 반도체 사업·제품·기술력을 담은 B2B 웹 경험 구성.", image: "/portfolio/myungjisemi.webp", link: "https://myungjisemi.com/" },
      { title: "경희대학교 실감미디어 사업단", description: "경희대 실감미디어 사업단 웹사이트 제작. 연구·사업·참여 정보와 학술 이미지 반영.", image: "/portfolio/imcoss.webp", link: "https://imcoss.khu.ac.kr/" },
      { title: "소다미술관", description: "소다미술관 공식 웹사이트 구축. 전시·교육·관람 안내와 미술관 브랜딩을 살린 디자인.", image: "/portfolio/museumsoda.webp", link: "https://museumsoda.org/" },
      { title: "NK MEDICS", description: "NK MEDICS 메디컬·헬스케어 브랜드 웹사이트 개발. 제품·서비스 소개와 전문성 전달.", image: "/portfolio/nkmedics.webp", link: "https://nkmedics.co.kr/" },
      { title: "디자인코리아", description: "디자인코리아(한국디자인진흥원) 웹사이트 기획·개발. 정책·행사·지원 사업 정보 구조화.", image: "/portfolio/designkorea.webp", link: "https://designkorea.kidp.or.kr/" },
      { title: "네이버 AI RUSH", description: "네이버 AI RUSH 프로그램 공식 웹사이트. AI·스타트업 지원 프로그램 소개 및 참가 안내.", image: "/portfolio/airush.webp", link: "https://airush.ncloud.com/" },
      { title: "소망교회 추모사이트", description: "소망교회 추모 전용 웹사이트 제작. 소망동산 추모공간 소개와 추억·편지 등 감성 UX 설계.", image: "/portfolio/lettersomang.webp", link: "https://lettersomang.net/" },
    ],
  },
  review: {
    sectionLabel: "04",
    title: "Review",
    subtitle: "함께 만든 결과와 협업 경험에 대한 이야기입니다.",
    items: [
      { author: "다***", subtitle: "건축·시공", quote: "공장·주택 신축 전문으로 일하다 보니 홈페이지는 늘 뒷전이었는데, 이번에 사이트 만들면서 완공 실적이랑 상담 신청까지 한 번에 정리되니까 문의 오는 게 확실히 늘었어요. 담당자분이 현장 이야기 잘 이해해 주시고, 우리 톤에 맞게 차분하게 만들어 주셔서 만족스럽습니다. 나중에 리뉴얼할 때도 다시 맡기고 싶어요." },
      { author: "올***", subtitle: "카메라·포토", quote: "강의 안내랑 리뷰 페이지 구조를 어떻게 잡을지 고민이 많았는데, 기획 단계에서부터 '이렇게 나누면 수강생이 찾기 쉽다'는 식으로 구체적으로 제안해 주셔서 방향이 빨리 잡혔어요. 디자인도 깔끔하고 모바일에서도 잘 보여서 수강 문의할 때 링크 보내기 편합니다. 실무에 쓸 수 있는 사이트로 잘 만들어 주셨다고 생각해요." },
      { author: "알******", subtitle: "AI·테크", quote: "AI 기술 소개와 서비스 설명을 한 페이지에 담으려다 보니 정보가 산만해지기 쉬운데, 구조 잡아 주시고 시각적으로도 정리해 주셔서 투자사 미팅할 때 보여주기 좋아졌어요. 기술 용어도 쉽게 풀어서 표현해 주시고, 이후 수정 요청할 때마다 빠르게 반영해 주셔서 협업이 수월했습니다. 다음 단계 서비스 오픈할 때도 함께하고 싶습니다." },
      { author: "L********", subtitle: "반려동물 브랜드", quote: "반려동물 브랜드 톤을 유지하면서도 쇼핑·정보가 잘 보이게 만들어 달라고 했는데, 기획부터 디자인까지 우리 타깃을 잘 파악해 주셨다는 느낌이 들었어요. 제품 페이지 구성이나 반응형 처리도 꼼꼼하게 해 주셔서, 런칭 후에도 '사이트 보기 편하다'는 고객 피드백이 많습니다. 유지보수 대응도 빨라서 믿고 맡기고 있어요." },
      { author: "백*********", subtitle: "시상식·문화", quote: "시상식 정보랑 티켓팅, 수상자 소개까지 한 사이트에 담아야 해서 요구사항이 많았는데, 단계별로 정리해서 제안해 주시고 일정도 잘 맞춰 주셨어요. 행사 당일 트래픽 대비나 접근성까지 고려해 주셔서 당시 운영할 때 부담이 적었습니다. 내년 시즌에도 리뉴얼이 필요하면 다시 의뢰할 생각이에요." },
      { author: "소***", subtitle: "교회", quote: "예배 안내, 교회 소개, 미디어 자료까지 넣을 게 많아서 처음엔 막막했는데, 메뉴 구조랑 페이지 구성을 같이 잡아 주시니까 정리가 잘 됐어요. 디자인도 차분하고 읽기 편하게 만들어 주셔서 성도분들도 찾아보기 쉽다고 하시고, 관리자 페이지 사용법도 자세히 알려주셔서 운영하는 데 무리가 없습니다. 감사합니다." },
      { author: "콜***", subtitle: "럭셔리 브랜드", quote: "럭셔리한 느낌을 유지하면서 제품과 브랜드 스토리를 잘 보여달라고 했는데, 비주얼과 타이포까지 세심하게 맞춰 주셔서 만족스러웠어요. 해외 사이트 참고한 부분도 우리 브랜드에 맞게 재해석해 주시고, 수정 요청할 때마다 빠르게 반영해 주셔서 마감 일정도 무리 없이 맞출 수 있었습니다. 다음 시즌 캠페인 페이지도 맡기고 싶어요." },
      { author: "c***********", subtitle: "카페·F&B", quote: "매장 분위기랑 메뉴를 사이트에 그대로 담고 싶었는데, 사진 활용 방식이랑 레이아웃 제안해 주시면서 '이렇게 하면 예쁘게 보인다'는 식으로 조언해 주셔서 결과물이 생각보다 훨씬 좋게 나왔어요. 인스타나 지도 연동 같은 부분도 처음엔 어렵게 생각했는데, 설명 잘 해 주셔서 직접 수정도 할 수 있게 됐습니다. 강추해요." },
      { author: "와********", subtitle: "웨딩 플랫폼", quote: "예비 부부들이 정보 찾기 쉽고 예약·문의까지 자연스럽게 이어지게 해 달라고 했는데, UX 흐름 제안이 실무에 잘 맞았어요. 디자인도 밝고 신뢰감 있게 나와서 파트너사 소개할 때 자주 쓰고 있고, 수정 요청해도 금방 반영해 주셔서 운영이 편합니다. 앞으로 기능 추가할 때도 계속 함께했으면 좋겠어요." },
      { author: "N******", subtitle: "결제·B2B", quote: "B2B 서비스라 신뢰감과 정보 전달이 중요했는데, 기획 단계에서부터 '이런 구조면 고객사가 이해하기 쉽다'는 식으로 제안해 주셔서 방향이 명확했어요. 내부 리뷰할 때도 디자인·콘텐츠 구성 모두 긍정적으로 나왔고, 런칭 후 유지보수 대응도 빠르게 해 주셔서 만족스럽습니다. 추가 개편 있을 때도 의뢰할 예정이에요." },
      { author: "기******", subtitle: "채용·HR", quote: "채용 공고랑 회사 소개, 지원 플로우까지 한 사이트에서 경험하게 만들어 달라고 했는데, 지원자 입장에서 어떻게 보일지 잘 고민해 주신 것 같아요. 모바일 지원 플로우도 부드럽게 만들어 주시고, 수정 요청해도 일정 맞춰 주셔서 무리 없이 오픈했어요. 채용 시즌마다 업데이트할 때도 잘 도와주셨으면 합니다." },
      { author: "에***", subtitle: "뷰티·화장품", quote: "제품 라인업이랑 프로모션, 브랜드 스토리를 한 사이트에 잘 담고 싶었는데, 기획부터 비주얼 톤까지 우리 브랜드에 맞게 잘 맞춰 주셨어요. 쇼핑 경험도 쾌적하게 만들어 주시고, 이후 이벤트 페이지나 수정 요청할 때마다 빠르게 반영해 주셔서 마케팅 팀에서도 만족도가 높아요. 다음 시즌에도 함께하고 싶습니다." },
    ],
  },
  faq: {
    sectionLabel: "05",
    title: "FAQ",
    subtitle: "문의 전에 가장 많이 받는 질문을 모았습니다. 여기에 없는 내용은 카톡·문의 폼으로 편하게 물어보세요.",
    items: [
      {
        q: "홈페이지 제작 비용은 어떻게 정해지나요?",
        a: "정해진 단일 가격표는 없고, 페이지 수·정보 구조, 기능 범위(문의 폼·게시판·다국어·관리자 등), 디자인 수준(템플릿 기반 vs 전면 맞춤), 콘텐츠 준비 상태(원고·사진 제공 여부)에 따라 범위가 달라집니다. 상담에서 요구사항을 확인한 뒤 견적서를 드립니다.",
      },
      {
        q: "제작 기간은 얼마나 걸리나요?",
        a: "규모와 기능에 따라 달라지며, 기획·정보구조 → 디자인 → 개발·퍼블리싱 → 검수·오픈 순서로 진행됩니다. 상담 시 범위를 확인하고 일정을 함께 확정합니다.",
      },
      {
        q: "AI 검색 최적화(AEO·GEO)가 무엇인가요?",
        a: "검색창이 링크 대신 답변을 보여주는 시대의 최적화입니다. AEO는 구글 AI 개요·네이버 AI 브리핑 같은 답변 영역에 인용되게 만드는 작업이고, GEO는 ChatGPT·Gemini·Perplexity가 답변에서 브랜드를 언급·추천하게 만드는 작업입니다. SEO 기본 체력 위에 답변·생성형 AI 노출까지 함께 설계합니다.",
      },
      {
        q: "기존 홈페이지 리뉴얼도 가능한가요?",
        a: "가능합니다. 기존 사이트의 구조와 콘텐츠를 진단한 뒤, 유지할 것과 다시 만들 것을 나눠 진행합니다. 검색 이력이 쌓인 주소는 리다이렉트로 보존해 리뉴얼로 인한 노출 손실을 막습니다.",
      },
      {
        q: "업종별 맞춤 제작도 가능한가요?",
        a: "네. 기업·브랜드·서비스·로컬 비즈니스 등 업종에 맞춰 정보 구조와 톤을 설계합니다. 특히 검색·AI 답변에 잘 잡히도록 질문형 콘텐츠와 구조화 데이터(스키마)를 함께 잡습니다.",
      },
      {
        q: "제작 후 운영·유지보수도 맡길 수 있나요?",
        a: "네. 오픈 이후 수정·보안 점검·정기 업데이트·장애 대응까지 운영을 이어갈 수 있습니다. 필요하면 콘텐츠 보강과 검색·AI 노출 개선도 함께 진행합니다.",
      },
      {
        q: "상담은 어떻게 신청하나요?",
        a: "카톡 상담하기 또는 문의 페이지 폼으로 남겨주시면 영업일 기준 빠르게 답변드립니다. 연락 가능한 시간과 원하시는 범위(신규/리뉴얼, 참고 사이트)를 함께 적어주시면 상담이 더 수월합니다.",
      },
      {
        q: "어떤 작업을 해왔는지 이력이 궁금합니다.",
        a: "포트폴리오에서 업종별 구축 사례를 확인하실 수 있습니다. 단순 비주얼이 아니라 검색·전환·브랜드 전달이 맞닿은 결과물 위주로 정리해 두었습니다.",
      },
    ],
  },
  contact: {
    title: "06 Contact Us",
    subtitle: "궁금한 점이 있다면 언제든지 문의해주세요.",
    email: "contact@solidweb.kr",
    ctaTitle: "지금 바로 상담 신청하고 더 나은 비즈니스 환경을 경험하세요.",
    ctaButton: "상담 신청하기",
  },
  contactPage: {
    heroTitle: "결과를 만드는 웹, 함께 설계합니다.",
    heroSubtitle: "전략·전환·측정까지. 솔리드웹.",
    heroDesc: "의견을 남겨주시면 24시간 이내로 전문가가 연락드립니다.",
    submitLabel: "문의하기",
    sections: {
      visitPath: "1. 방문 경로",
      projectInfo: "2. 프로젝트 정보",
      contactInfo: "3. 인적사항",
    },
    placeholders: {
      projectName: "프로젝트 이름을 입력하세요.",
      projectDetail: "프로젝트 상세 설명을 입력하세요.",
      budget: "0",
      dateSelect: "날짜 선택",
      name: "성명",
      company: "회사명(선택)",
      phone: "연락처",
      position: "직책(선택)",
      email: "이메일",
    },
    labels: {
      budget: "예산 (-만원)",
      dueDate: "프로젝트 마감일",
      name: "성명",
      company: "회사명",
      phone: "연락처",
      position: "직책",
      email: "이메일",
      privacyConsent: "개인정보 수집 동의",
      privacyView: "보기",
    },
    validation: {
      visitPath: "방문 경로를 선택해주세요.",
      projectName: "프로젝트 이름을 입력해주세요.",
      projectType: "프로젝트 유형을 선택해주세요.",
      projectDetail: "프로젝트 상세를 입력해주세요.",
      budget: "예산을 입력해주세요.",
      budgetFormat: "숫자만 입력해주세요.",
      dueDate: "마감일을 선택해주세요.",
      name: "성명을 입력해주세요.",
      phone: "연락처를 입력해주세요.",
      phoneFormat: "연락처 형식을 확인해주세요.",
      email: "이메일을 입력해주세요.",
      emailFormat: "이메일 주소를 확인해주십시오.",
      privacy: "개인정보 수집에 동의해주세요.",
    },
  },
  footer: {
    addressLine1: "인천광역시 연수구 인천타워대로 323,",
    addressLine2: "에이동 8층 801호 AB-162 (송도동, 송도 센트로드)",
    representative: "채희승",
    businessNumber: "사업자등록번호: 603-13-80609",
    services: ["웹/앱 개발", "브랜딩", "마케팅"],
    privacy: "개인정보처리방침",
  },
  kakaoChatUrl: "https://pf.kakao.com/_xkxmzqX/chat",
  kakaoChannelUrl: "https://pf.kakao.com/_xkxmzqX",
} as const;
