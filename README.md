# 프론트엔드 채용 과제

React와 TypeScript를 활용한 할 일 관리 애플리케이션입니다.

## 기술 스택

- React 18/19
- TypeScript
- Pretendard 폰트

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 주요 기능

### 페이지 구성

| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/` | 대시보드 | 할 일 현황 요약 (전체/해야할 일/완료) |
| `/sign-in` | 로그인 | 이메일/비밀번호 로그인 |
| `/task` | 할 일 목록 | 카드 형태의 할 일 목록 (무한 스크롤, 가상 스크롤링) |
| `/task/:id` | 할 일 상세 | 할 일 상세 정보 및 삭제 기능 |
| `/user` | 회원정보 | 로그인된 사용자 정보 |

### 공통

- **GNB/LNB**: 대시보드, 할 일 메뉴 및 로그인 상태에 따른 아이콘 표시
- **인증**: JWT 기반 인증 (accessToken, refreshToken)
- **에러 처리**: API 에러에 따른 모달 표시 및 리다이렉트

### 디자인 토큰

- Primary: `blue`
- Disabled: `gray`

## API 명세

| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/api/sign-in` | 로그인 |
| POST | `/api/refresh` | 토큰 갱신 |
| GET | `/api/user` | 회원 정보 조회 |
| GET | `/api/dashboard` | 대시보드 데이터 조회 |
| GET | `/api/task` | 할 일 목록 조회 (페이지네이션) |
| GET | `/api/task/:id` | 할 일 상세 조회 |

## 폴더 구조

```
src/
├── api/
│   ├── client.ts           # axios 인스턴스 + interceptor (토큰 자동 첨부, 401 처리)
│   └── endpoints/          # API 함수
│       ├── auth.ts
│       ├── dashboard.ts
│       ├── task.ts
│       └── user.ts
├── mocks/
│   ├── browser.ts          # MSW 브라우저 워커 설정
│   ├── handlers/           # API 핸들러
│   │   ├── auth.ts
│   │   ├── dashboard.ts
│   │   ├── task.ts
│   │   └── user.ts
│   └── data/               # mock 데이터
│       ├── tasks.ts
│       └── users.ts
├── auth/
│   ├── AuthProvider.tsx    # 인증 컨텍스트 (localStorage 기반)
│   ├── useAuth.ts          # 인증 관련 훅
│   └── ProtectedRoute.tsx  # 인증 필요 라우트 래퍼
├── components/
│   ├── layout/             # GNB, LNB, Layout
│   ├── common/             # Button, Modal, Card 등
│   └── task/               # Task 관련 컴포넌트
├── pages/
│   ├── Dashboard.tsx
│   ├── SignIn.tsx
│   ├── TaskList.tsx
│   ├── TaskDetail.tsx
│   ├── User.tsx
│   └── NotFound.tsx
├── hooks/                  # 커스텀 훅
├── styles/
│   └── tokens.ts           # 디자인 토큰 (primary: blue, disabled: gray)
├── types/                  # TypeScript 타입 정의
└── utils/                  # 유틸리티 함수
```

## 기술 선택

| 항목 | 선택 | 이유 |
|------|------|------|
| API 모킹 | MSW | 실제 네트워크 요청 인터셉트, 프로덕션 코드 수정 불필요 |
| 토큰 저장 | localStorage | 구현 간단, 새로고침해도 인증 유지 |
| 인증 처리 | axios interceptor | 요청 시 토큰 자동 첨부, 401 시 자동 갱신/리다이렉트 |
