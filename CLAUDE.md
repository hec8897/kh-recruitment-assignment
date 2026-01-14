# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Frontend recruitment assignment - a task management application built with React 19 and TypeScript.

## Commands

```bash
npm run dev      # Start development server
npm run build    # TypeScript check + production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **State Management**: TanStack Query
- **Styling**: Tailwind CSS (design tokens: `primary: #3b82f6`, `disabled: #9ca3af`)
- **Icons**: Lucide React
- **API Mocking**: MSW (service worker in `public/`)
- **HTTP**: Axios with interceptors
- **Routing**: React Router DOM
- **Virtual Scroll**: @tanstack/react-virtual

## Architecture

### Folder Structure (Domain-Driven)

```
src/
├── domains/              # 비즈니스 도메인별 그룹화
│   ├── auth/             # 인증 도메인
│   │   ├── components/   # SignInForm
│   │   ├── pages/        # SignIn
│   │   ├── hooks/        # useAuth
│   │   └── api/          # auth API
│   │
│   ├── task/             # 할 일 도메인
│   │   ├── components/   # TaskCard, TaskList
│   │   ├── pages/        # TaskListPage, TaskDetailPage
│   │   └── api/          # task API
│   │
│   ├── dashboard/        # 대시보드 도메인
│   │   ├── components/   # StatCard
│   │   ├── pages/        # Dashboard
│   │   └── api/          # dashboard API
│   │
│   └── user/             # 사용자 도메인
│       ├── pages/        # User
│       └── api/          # user API
│
├── shared/               # 공용 (도메인 무관)
│   ├── components/       # Layout, ProtectedRoute, Button, Modal
│   └── hooks/            # useModal
│
├── routes/               # 라우터 설정
│   ├── index.tsx
│   └── paths.ts
│
├── types/                # TypeScript interfaces
├── mocks/                # MSW handlers
└── lib/                  # QueryClient setup
```

### Authentication Flow

- JWT tokens stored in localStorage (accessToken, refreshToken)
- Axios interceptor auto-attaches token to requests
- 401 responses trigger token refresh or redirect to `/sign-in`
- ProtectedRoute wrapper for auth-required pages

### Key Features

- **Task List**: Virtual scrolling + infinite scroll pagination
- **Login**: Form validation (email format, password 8-24 chars with Korean/English/numbers)
- **Delete Modal**: Requires typing task ID to confirm deletion

## Font

Pretendard font is loaded via CDN in `index.html`.

## Git Flow

Branch strategy:

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features (branch from `develop`)
- `release/*` - Release preparation (branch from `develop`)
- `hotfix/*` - Production bug fixes (branch from `main`)

Workflow:

```bash
# Start new feature
git checkout develop
git checkout -b feature/feature-name

# Complete feature
git checkout develop
git merge feature/feature-name

# Create release
git checkout develop
git checkout -b release/v1.0.0

# Finish release
git checkout main
git merge release/v1.0.0
git checkout develop
git merge release/v1.0.0
```

## Claude 작업 규칙

- Push 후에는 항상 PR 메시지를 추천해준다
- 코드 구현은 사용자가 직접 작업하므로, 코드 추천/가이드만 제공한다

## PR Template

```markdown
## 제목

feat/fix/chore: 간단한 설명

## 적용사항

- 변경/추가된 내용 목록
- 주요 구현 사항

## 다음 계획

- [ ] 다음에 진행할 작업 1
- [ ] 다음에 진행할 작업 2
```

---

## Implementation Plan (구현 계획)

### 진행 상황

- [x] Phase 0: 프로젝트 초기 설정
- [ ] Phase 1: 기반 인프라 구축
- [ ] Phase 2: 인증 시스템
- [ ] Phase 3: 레이아웃 및 공통 컴포넌트
- [ ] Phase 4: 페이지 구현
- [ ] Phase 5: 테스트 및 최적화

### Phase 0: 프로젝트 초기 설정 ✅ 완료

- [x] Vite + React 19 + TypeScript 세팅
- [x] Tailwind CSS 디자인 시스템 설정
- [x] 타입 정의 (`src/types/index.ts`)
- [x] Path alias 설정 (`@/`)
- [x] 의존성 설치 (TanStack Query, Axios, MSW, React Router 등)

### Phase 1: 기반 인프라 구축 🔄 진행 예정

- [ ] MSW 핸들러 구현
  - [ ] `src/mocks/handlers/auth.ts` - 로그인, 토큰 갱신
  - [ ] `src/mocks/handlers/user.ts` - 사용자 정보
  - [ ] `src/mocks/handlers/dashboard.ts` - 대시보드 데이터
  - [ ] `src/mocks/handlers/task.ts` - 작업 CRUD, 목록 (페이지네이션)
  - [ ] `src/mocks/browser.ts` - MSW 브라우저 설정
- [ ] Axios 클라이언트 설정
  - [ ] `src/api/client.ts` - 인스턴스 생성, 인터셉터 (토큰 자동 첨부, 401 처리)
- [ ] TanStack Query 설정
  - [ ] `src/lib/queryClient.ts` - QueryClient 설정
- [ ] API 쿼리 훅
  - [ ] `src/api/queries/auth.ts` - useSignIn, useRefreshToken
  - [ ] `src/api/queries/user.ts` - useUser
  - [ ] `src/api/queries/dashboard.ts` - useDashboard
  - [ ] `src/api/queries/task.ts` - useTasks (무한스크롤), useTask, useCreateTask, useUpdateTask, useDeleteTask

### Phase 2: 인증 시스템

- [ ] `src/hooks/useAuth.ts` - localStorage 토큰 관리, 로그인/로그아웃
- [ ] `src/components/ProtectedRoute.tsx` - 인증 필요 페이지 래퍼
- [ ] React Router 설정 (`src/App.tsx`)

### Phase 3: 레이아웃 및 공통 컴포넌트

- [ ] `src/components/common/Button.tsx`
- [ ] `src/components/common/Modal.tsx`
- [ ] `src/components/layout/GNB.tsx` - 상단 네비게이션
- [ ] `src/components/layout/LNB.tsx` - 좌측 네비게이션
- [ ] `src/components/layout/Layout.tsx` - 페이지 레이아웃 래퍼

### Phase 4: 페이지 구현

- [ ] `src/pages/SignIn.tsx` - 로그인 (폼 검증: 이메일 형식, 비밀번호 8-24자)
- [ ] `src/pages/Dashboard.tsx` - 대시보드 (작업 통계)
- [ ] `src/pages/TaskList.tsx` - 작업 목록 (가상 스크롤 + 무한 스크롤)
- [ ] `src/pages/TaskDetail.tsx` - 작업 상세/수정
- [ ] `src/pages/User.tsx` - 사용자 정보
- [ ] `src/pages/NotFound.tsx` - 404 페이지

### Phase 5: 테스트 및 최적화

- [ ] 전체 기능 테스트
- [ ] 빌드 검증 (`npm run build`)
- [ ] 린트 검사 (`npm run lint`)

### 현재 작업 브랜치

- `feature/type-definitions` - Phase 0 완료, Phase 1 시작 예정
