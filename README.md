# Freewheelin Test Project

취업 과제를 위한 프로젝트입니다.

## 기술 스택

- **React** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구
- **TanStack Query (React Query)** - 서버 상태 관리
- **SCSS Modules** - 스타일링

## 프로젝트 구조

```
freewheelin-test/
├── src/
│   ├── api/          # API 호출 함수
│   ├── components/   # 재사용 가능한 컴포넌트
│   ├── hooks/        # 커스텀 훅
│   ├── pages/        # 페이지 컴포넌트
│   ├── styles/       # 전역 스타일 및 변수
│   ├── types/        # TypeScript 타입 정의
│   ├── App.tsx       # 메인 앱 컴포넌트
│   └── main.tsx      # 앱 진입점
├── public/           # 정적 파일
└── index.html        # HTML 템플릿
```

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

### 프리뷰

```bash
npm run preview
```

## 주요 기능

- **TypeScript**: 타입 안정성 보장
- **React Query**: 효율적인 서버 상태 관리 및 캐싱
- **SCSS Modules**: 스코프가 지정된 스타일링
- **Path Alias**: `@/` 경로를 통한 절대 경로 import
