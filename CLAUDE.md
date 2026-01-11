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

### Folder Structure

```
src/
├── api/           # axios client + TanStack Query hooks
├── mocks/         # MSW handlers (auth, user, dashboard, task)
├── components/
│   ├── layout/    # GNB, LNB, Layout
│   └── common/    # Modal, Button
├── pages/         # SignIn, Dashboard, TaskList, TaskDetail, User, NotFound
├── hooks/         # useAuth (localStorage-based token management)
├── types/         # TypeScript interfaces
└── lib/           # QueryClient setup
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
