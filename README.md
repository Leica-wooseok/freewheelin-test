# Freewheelin Test Project

취업 과제를 위한 문제 관리 애플리케이션입니다.

## 목차

- [프로젝트 개요](#프로젝트-개요)
- [기술 스택 및 의사 결정](#기술-스택-및-의사-결정)
- [프로젝트 구조](#프로젝트-구조)
- [주요 기능 구현](#주요-기능-구현)
- [아키텍처 및 설계 패턴](#아키텍처-및-설계-패턴)
- [성능 최적화](#성능-최적화)
- [실행 방법](#실행-방법)

---

## 프로젝트 개요

이 프로젝트는 문제(Problem) 목록을 관리하고, 활성화된 문제에 대한 유사 문제를 조회하며, 문제 간 교체/추가/삭제 등의 작업을 수행하는 SPA 애플리케이션입니다.

### 주요 기능

- 기본 문제 목록 조회 및 표시
- 특정 문제 활성화 시 유사 문제 자동 조회
- 유사 문제를 기본 목록에 추가
- 활성 문제와 유사 문제 교체 (swap)
- 문제 삭제

---

## 기술 스택 및 의사 결정

### Core Technologies

| 기술 스택      | 버전   | 선택 이유                                  |
| -------------- | ------ | ------------------------------------------ |
| **React**      | 19.2.0 | 컴포넌트 기반 UI 개발 및 선언적 프로그래밍 |
| **TypeScript** | 5.9.3  | 타입 안정성 및 개발 생산성 향상            |
| **Vite**       | 7.2.6  | 빠른 개발 서버 및 최적화된 빌드            |

### State Management

#### 1. **TanStack Query (React Query) v5**

```typescript
// 서버 상태 관리 및 캐싱
- 비동기 데이터 fetching 및 캐싱
- Optimistic updates를 통한 즉각적인 UI 반영
- 자동 background refetch 제어
```

**선택 이유:**

- 서버 상태와 클라이언트 상태를 명확히 분리
- 복잡한 캐싱 로직을 라이브러리가 처리
- `staleTime`, `queryKey` 등을 통한 세밀한 캐시 제어
- Optimistic updates로 사용자 경험 향상

#### 2. **Context API**

```typescript
// 클라이언트 전역 상태 관리 (ProblemContext)
- activeProblemId: 현재 활성화된 문제 ID
- problems: 기본 문제 목록
- similarProblems: 유사 문제 목록
```

**선택 이유:**

- 외부 라이브러리 없이 React 내장 기능 활용
- 컴포넌트 트리 전체에 상태 공유 필요
- Redux 등 대비 가벼운 구현으로 충분한 요구사항

### Styling

#### **SCSS Modules**

```scss
// 컴포넌트별 스코프 분리된 스타일링
```

**선택 이유:**

- CSS Module을 통한 클래스명 충돌 방지
- SCSS 문법으로 중첩, 변수, mixin 등 활용
- 컴포넌트 단위 스타일 관리로 유지보수성 향상
- 전역 스타일(`global.scss`)과 로컬 스타일의 명확한 분리

### Utility Libraries

- **clsx**: 조건부 클래스명 결합
- **vite-plugin-svgr**: SVG를 React 컴포넌트로 import

---

## 프로젝트 구조

```
freewheelin-test/
├── src/
│   ├── api/                    # API 호출 함수
│   │   └── problems.ts         # 문제 관련 API (fetch, fetchSimilar)
│   │
│   ├── components/             # 재사용 가능한 컴포넌트
│   │   ├── buttons/
│   │   │   └── CardButton.tsx  # 카드 내 액션 버튼
│   │   ├── CardBadge/          # 카드 뱃지 컴포넌트
│   │   ├── DifficultyBadge/    # 난이도 표시 뱃지
│   │   └── ProblemCard/        # 문제 카드 컴포넌트
│   │       ├── ProblemCardBase.tsx      # 공통 베이스 컴포넌트
│   │       ├── BasicProblemCard.tsx     # 기본 문제 카드
│   │       └── SimilarProblemCard.tsx   # 유사 문제 카드
│   │
│   ├── contexts/               # Context API
│   │   └── ProblemContext.tsx  # 문제 관리 전역 상태
│   │
│   ├── hooks/                  # 커스텀 훅
│   │   ├── useProblems.ts      # React Query 훅 (CRUD)
│   │   └── useProblemCardActions.ts  # 카드 액션 로직
│   │
│   ├── pages/                  # 페이지 컴포넌트
│   │   └── create-problem/
│   │       ├── index.tsx       # 메인 페이지
│   │       └── components/     # 페이지 전용 컴포넌트
│   │
│   ├── styles/                 # 전역 스타일
│   │   └── colors.ts           # 색상 상수
│   │
│   ├── types/                  # TypeScript 타입 정의
│   │   └── problem.ts          # Problem 타입 정의
│   │
│   ├── App.tsx                 # 메인 앱 컴포넌트
│   └── main.tsx                # 앱 진입점 (QueryClient 설정)
│
└── index.html
```

---

## 주요 기능 구현

### 1. 문제 목록 관리 (useProblems)

```typescript
// src/hooks/useProblems.ts
export function useProblems() {
  return useQuery({
    queryKey: ["problems"],
    queryFn: fetchProblems,
  });
}
```

- React Query를 사용한 서버 데이터 캐싱
- 자동 refetch 및 에러 처리

### 2. 유사 문제 조회 (useSimilarProblems)

```typescript
export function useSimilarProblems(
  problemId: number | null,
  excludedProblemIds: number[]
) {
  return useQuery({
    queryKey: ["problems", "similar", problemId],
    queryFn: () => fetchSimilarProblems(problemId!, excludedProblemIds),
    enabled: problemId !== null,
    staleTime: Infinity, // 불필요한 refetch 방지
  });
}
```

**핵심 최적화:**

- `staleTime: Infinity`: 캐시된 데이터가 있으면 refetch하지 않음
- `enabled` 옵션으로 조건부 쿼리 실행

### 3. 문제 교체 (useReplaceProblem)

```typescript
export function useReplaceProblem() {
  return useMutation({
    onMutate: async ({ targetProblemId, newProblem }) => {
      // 1. problems 배열에서 교체
      queryClient.setQueryData(["problems"], ...);

      // 2. similarProblems에서 교체 (length 유지)
      const updatedSimilarProblems = previousSimilarProblems.map((p) =>
        p.id === newProblem.id ? targetProblem : p
      );

      // 3. 새 queryKey에 미리 캐시 설정 (refetch 방지)
      queryClient.setQueryData(
        ["problems", "similar", newProblem.id],
        updatedSimilarProblems
      );
    },
  });
}
```

**핵심 로직:**

- **Optimistic Update**: 서버 요청 없이 즉시 UI 반영
- **Swap 로직**: `problems[A] ↔ similarProblems[B]` 교환
- **캐시 프리셋팅**: 새 활성 문제의 similarProblems를 미리 설정하여 refetch 방지

### 4. ProblemContext - 전역 상태 관리

```typescript
// src/contexts/ProblemContext.tsx
const replaceProblemWithActive = (problem: Problem) => {
  replaceProblem(
    { targetProblemId: activeProblemId, newProblem: problem },
    {
      onSuccess: () => {
        // onMutate 완료 후 activeProblemId 변경
        setActiveProblemId(problem.id);
      },
    }
  );
};
```

**상태 업데이트 순서:**

1. `onMutate`: 캐시 데이터 설정 완료
2. `mutationFn`: Promise.resolve()
3. `onSuccess`: `activeProblemId` 변경
4. `useSimilarProblems`: 새 queryKey로 조회 → 캐시 hit → refetch 안함

---

## 아키텍처 및 설계 패턴

### 1. 컴포넌트 설계

#### **Composition Pattern - ProblemCard**

```typescript
// src/components/ProblemCard/ProblemCardBase.tsx
export function ProblemCardBase({
  isActive = false,
  children,
  cardBody,
}: ProblemCardBaseProps) {
  const cardClassName = clsx(styles.problem_card, {
    [styles.active]: isActive,
  });

  return (
    <div className={cardClassName}>
      {children}
      {cardBody}
    </div>
  );
}

// src/components/ProblemCard/BasicProblemCard.tsx - 사용 예시
<ProblemCardBase isActive={isActive} cardBody={<CardBody {...} />}>
  <div className={styles.card_header}>
    <CardTitleGroup index={problem.id} title={problem.unitName} />
    <div className={styles.card_header_button_group}>
      <CardButton label="삭제" icon={<TrashIcon />} onClick={handleDelete} />
    </div>
  </div>
</ProblemCardBase>
```

**장점:**

- 코드 중복 제거 (DRY 원칙)
- 각 카드 타입별 독립적인 기능 확장 가능
- 공통 UI는 Base 컴포넌트에서 일괄 수정

### 2. 커스텀 훅 분리

```typescript
// src/hooks/useProblemCardActions.ts
export function useProblemCardActions() {
  const {
    similarProblems,
    activeProblemId,
    setActiveProblemId,
    deleteProblem,
    addProblemAfterActive,
    replaceProblemWithActive,
  } = useProblemContext();

  const handleSimilarClick = (problemId: number) => {
    setActiveProblemId(problemId);
  };

  const handleDeleteClick = (problemId: number) => {
    deleteProblem(problemId);
    if (problemId === activeProblemId) setActiveProblemId(null);
  };

  const handleChangeClick = (problemId: number) => {
    const problem = similarProblems?.find((p) => p.id === problemId);
    if (!problem) return;
    replaceProblemWithActive(problem);
  };

  const handleAddClick = (problemId: number) => {
    const problem = similarProblems?.find((p) => p.id === problemId);
    if (!problem) return;
    addProblemAfterActive(problem);
  };

  return {
    handleSimilarClick,
    handleDeleteClick,
    handleChangeClick,
    handleAddClick,
  };
}
```

**장점:**

- 비즈니스 로직과 UI 분리
- 테스트 용이성 향상
- 여러 컴포넌트에서 동일 로직 재사용

### 3. SCSS Module 구조

```scss
// src/components/buttons/CardButton.module.scss
@use "@/styles/variables.scss" as *;
@use "@/styles/mixins.scss" as *;

.card_button_root {
  padding: 0;
  background: transparent;
  border: 0;
  color: $gray-600;
  gap: 4px;
  @include typo-caption1;
  @include flex-center;

  & svg {
    width: 16px;
    height: 16px;
    color: #c0c0c0;
    opacity: 0.87;
  }

  &.active {
    color: #00abff;
    svg {
      color: #00abff;
      opacity: 1;
    }
  }
}
```

```tsx
// 사용 예시 - src/components/buttons/CardButton.tsx
<button className={clsx(styles.card_button_root, { [styles.active]: active })}>
  {icon && icon}
  <span>{label}</span>
</button>
```

**장점:**

- BEM 방법론 적용으로 명확한 네이밍 (`card_button_root`)
- 컴포넌트 스코프로 스타일 충돌 방지
- 전역 변수(`$gray-600`)와 mixin(`@include`)의 조화
- `clsx`를 통한 조건부 클래스명 결합

---

## 성능 최적화

### 1. 불필요한 Refetch 방지

**문제 상황:**

- 문제 교체 시 `activeProblemId` 변경
- `useSimilarProblems`가 새 queryKey로 쿼리 시도
- 캐시에 데이터가 있어도 `staleTime: 0`이면 background refetch 발생

**해결 방법:**

```typescript
// 1. staleTime: Infinity 설정
useSimilarProblems(..., { staleTime: Infinity })

// 2. onMutate에서 새 queryKey에 미리 캐시 설정
queryClient.setQueryData(["problems", "similar", newProblem.id], data)

// 3. onSuccess에서 activeProblemId 변경 (onMutate 완료 후)
```

### 2. Optimistic Updates

```typescript
onMutate: async () => {
  // 진행 중인 쿼리 취소
  await queryClient.cancelQueries({ queryKey: ["problems"] });

  // 이전 데이터 백업
  const previousProblems = queryClient.getQueryData(["problems"]);

  // 즉시 UI 업데이트
  queryClient.setQueryData(["problems"], newData);

  return { previousProblems }; // rollback용
};
```

**효과:**

- 서버 응답 대기 없이 즉각적인 UI 반응
- 사용자 경험 크게 향상

### 3. 조건부 쿼리 실행

```typescript
enabled: problemId !== null;
```

- 불필요한 API 호출 방지
- 네트워크 트래픽 감소

---

## 실행 방법

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

개발 서버가 `http://localhost:5173`에서 실행됩니다.

### 빌드

```bash
npm run build
```

TypeScript 컴파일 후 Vite를 통해 프로덕션 빌드가 생성됩니다.

### 프리뷰

```bash
npm run preview
```

빌드된 프로덕션 버전을 로컬에서 프리뷰합니다.

---

## 주요 의사 결정 요약

| 항목              | 선택                           | 이유                                          |
| ----------------- | ------------------------------ | --------------------------------------------- |
| **상태 관리**     | React Query + Context API      | 서버/클라이언트 상태 명확히 분리, 캐싱 자동화 |
| **스타일링**      | SCSS Modules                   | 컴포넌트 스코프 분리, CSS 충돌 방지           |
| **컴포넌트 구조** | Composition Pattern            | 코드 재사용성 및 확장성                       |
| **타입 시스템**   | TypeScript                     | 타입 안정성 및 개발 생산성                    |
| **최적화 전략**   | Optimistic Updates + staleTime | 즉각적인 UI 반응 + 불필요한 refetch 방지      |

---

## API 명세

### Base URL

```
https://assignment.mathflat.com
```

### Endpoints

#### 1. 문제 목록 조회

```
GET /problems
Response: ProblemsResponse
```

#### 2. 유사 문제 조회

```
GET /problems/:problemId/similarity?excludedProblemIds=1,2,3
Response: ProblemsResponse
```

---

## 개발 환경

- **Node.js**: v18 이상 권장
- **Package Manager**: npm
- **IDE**: Cursor

---
