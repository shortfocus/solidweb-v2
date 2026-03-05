# shadcn/ui 디자인 시스템

이 프로젝트는 [shadcn/ui](https://ui.shadcn.com)를 디자인 시스템으로 사용합니다.

## 사용 방법

### 1. 컴포넌트 추가

필요한 컴포넌트는 CLI로 추가합니다:

```bash
npx shadcn@latest add button    # 버튼
npx shadcn@latest add card      # 카드
npx shadcn@latest add input     # 입력 필드
npx shadcn@latest add dialog    # 다이얼로그
# 전체 목록: https://ui.shadcn.com/docs/components
```

### 2. Astro에서 React(shadcn) 컴포넌트 사용

**인터랙션이 필요한 경우** (클릭, 폼 등) → `.tsx`로 래퍼를 만들고 `client:load` 또는 `client:visible` 사용:

```astro
---
import MyButton from "@/components/MyButton.tsx";
---
<MyButton client:load />
```

**정적 렌더만 필요한 경우** → Astro에서 직접 사용 가능 (일부 컴포넌트는 React이므로 `.tsx` 래퍼 권장).

### 3. 테마

- `BaseLayout.astro`의 `<html>`에 `class="dark"`가 적용되어 있어 **다크 테마**가 기본입니다.
- 색상/반경 등은 `src/styles/global.css`의 CSS 변수(`:root`, `.dark`)로 조정할 수 있습니다.

### 4. 현재 포함된 컴포넌트

- **Button** – `@/components/ui/button`
- **Card** – `@/components/ui/card` (CardHeader, CardTitle, CardDescription, CardContent, CardFooter)

추가 컴포넌트는 위 CLI 명령으로 설치 후 `@/components/ui/` 경로에서 import 하면 됩니다.
