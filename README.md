# 📱 할일 관리 애플리케이션

React + TypeScript 기반의 할일 관리 웹 애플리케이션입니다. 사용자 인증, 대시보드, 할일 목록 관리 기능을 제공하며, MSW를 활용한 API 모킹으로 개발되었습니다.

## 🚀 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 린트 검사
npm run lint
```

**개발 서버:** http://localhost:5173

**개발 환경 자동 로그인:**
- `.env` 파일에 `VITE_DEV_EMAIL`, `VITE_DEV_PASSWORD` 설정 시 자동으로 필드에 채워짐

---

## 📑 페이지 구성

### 🔐 로그인 페이지 (`/sign-in`)
- 이메일/비밀번호 기반 로그인
- Zod를 활용한 실시간 폼 validation
- 로그인 성공 시 액세스 토큰/리프레시 토큰 저장
- 401 에러 발생 시 리다이렉트 쿼리 파라미터 처리

### 🏠 대시보드 페이지 (`/`)
- 전체 할일 통계 표시
  - 총 할일 개수
  - 완료되지 않은 할일 개수
  - 완료된 할일 개수
- 카드 형태의 시각적 대시보드

### 📋 할일 목록 페이지 (`/task`)
- 무한 스크롤 기반 할일 목록
- 가상 스크롤(Virtual Scroll)로 성능 최적화
- 할일 상태 표시 (TODO/DONE)
- 각 항목 클릭 시 상세 페이지 이동

### 📝 할일 상세 페이지 (`/task/:id`)
- 할일 제목, 내용, 등록일시 표시
- 할일 삭제 기능
- 삭제 확인 모달

### 👤 사용자 페이지 (`/user`)
- 사용자 정보 표시 (이름, 메모)
- 로그아웃 기능
- 401 에러 시 자동 로그인 페이지 리다이렉트

---

## 🏗️ 프로젝트 구조

```
src/
├── domains/              # 도메인별 기능 모듈
│   ├── auth/            # 인증 관련
│   │   ├── api/         # API 함수
│   │   ├── components/  # 인증 컴포넌트
│   │   ├── hooks/       # 인증 훅
│   │   ├── pages/       # 인증 페이지
│   │   └── schemas/     # Zod 스키마
│   ├── home/            # 대시보드
│   ├── task/            # 할일 관리
│   └── user/            # 사용자 관리
├── shared/              # 공통 컴포넌트
│   └── components/
│       ├── Button/      # 공통 버튼
│       ├── Input/       # 공통 인풋
│       ├── Modal/       # 공통 모달
│       ├── GNB/         # 상단 네비게이션
│       ├── LNB/         # 하단 네비게이션
│       └── Layout.tsx   # 레이아웃
├── lib/                 # 유틸리티
│   ├── axios.ts         # Axios 인스턴스 설정
│   ├── storage.ts       # localStorage 추상화
│   ├── queryClient.ts   # React Query 설정
│   └── queryKeys.ts     # Query Key 관리
├── routes/              # 라우팅 설정
├── mocks/               # MSW 모킹
└── types/               # 타입 정의
```

---

## 📚 사용한 라이브러리 및 선택 이유

### 핵심 라이브러리

#### React 19.2.0
- 최신 React 기능 활용
- Server Components 및 최신 API 지원

#### TypeScript 5.9.3
- 타입 안전성 보장
- 개발 경험 향상
- 런타임 에러 사전 방지

#### Vite 7.2.4
- 빠른 개발 서버 구동
- HMR(Hot Module Replacement)로 개발 생산성 향상
- 최적화된 프로덕션 빌드

### 상태 관리 & 데이터 페칭

#### @tanstack/react-query 5.90.16
**선택 이유:**
- 서버 상태 관리의 사실상 표준
- 자동 캐싱, 리페칭, 동기화
- `useInfiniteQuery`로 무한 스크롤 구현 용이
- Optimistic Updates 및 에러 처리 간편

**주요 사용처:**
- 할일 목록 무한 스크롤 (`useTasks`)
- 대시보드 데이터 페칭 (`useDashboard`)
- 할일 상세 조회 (`useTaskDetail`)
- 할일 삭제 mutation (`useDeleteTask`)

#### Axios 1.13.2
**선택 이유:**
- Fetch API보다 풍부한 기능
- Request/Response 인터셉터로 토큰 갱신 로직 구현
- 타입스크립트 지원 우수
- 에러 처리 편리

**주요 기능:**
- Request 인터셉터: 자동 토큰 헤더 추가
- Response 인터셉터: 401 에러 시 토큰 자동 갱신

### UI/UX

#### React Router DOM 7.12.0
**선택 이유:**
- React의 표준 라우팅 라이브러리
- Nested Routes 지원
- 타입 안전한 라우팅
- `useNavigate`, `useLocation`, `useParams` 등 유용한 훅 제공

#### Tailwind CSS 4.1.18
**선택 이유:**
- Utility-first 방식으로 빠른 스타일링
- 디자인 시스템 구축 용이
- 불필요한 CSS 제거로 번들 크기 최적화
- 반응형 디자인 간편

#### lucide-react 0.562.0
**선택 이유:**
- 경량 아이콘 라이브러리
- Tree-shaking 지원으로 필요한 아이콘만 번들링
- 일관된 디자인
- 쉬운 커스터마이징

#### clsx 2.1.1
**선택 이유:**
- 조건부 클래스명 조합 편리
- 가볍고 빠름 (0.2KB)
- Tailwind와 궁합이 좋음

### 폼 관리

#### React Hook Form 7.71.1
**선택 이유:**
- 최소한의 리렌더링으로 성능 우수
- 직관적인 API
- Zod와 쉬운 통합
- 비제어 컴포넌트 기반으로 성능 최적화

#### Zod 4.3.5
**선택 이유:**
- TypeScript 친화적인 스키마 validation
- 타입 추론 자동화 (`z.infer`)
- 런타임 + 컴파일 타임 검증
- React Hook Form과 완벽한 통합

#### @hookform/resolvers 5.2.2
**선택 이유:**
- React Hook Form과 Zod 연결
- 다양한 validation 라이브러리 지원

### 성능 최적화

#### @tanstack/react-virtual 3.13.18
**선택 이유:**
- 대량의 리스트 렌더링 성능 최적화
- 가상 스크롤로 DOM 노드 수 최소화
- 부드러운 스크롤 경험
- 무한 스크롤과 호환성 좋음

**사용처:**
- 할일 목록 페이지의 가상 스크롤

### 개발 도구

#### MSW (Mock Service Worker) 2.12.7
**선택 이유:**
- 실제 HTTP 요청을 가로채서 모킹
- 백엔드 개발과 독립적으로 프론트엔드 개발 가능
- Service Worker 기반으로 브라우저에서도 동작
- 개발/테스트 환경 일관성 유지

**주요 모킹 API:**
- 로그인 (`POST /api/sign-in`)
- 토큰 갱신 (`POST /api/refresh`)
- 대시보드 (`GET /api/dashboard`)
- 할일 목록 (`GET /api/tasks`)
- 할일 상세 (`GET /api/tasks/:id`)
- 할일 삭제 (`DELETE /api/tasks/:id`)
- 사용자 정보 (`GET /api/user`)

#### ESLint 9.39.1 + TypeScript ESLint
**선택 이유:**
- 코드 품질 유지
- 일관된 코딩 스타일
- 잠재적 버그 사전 발견

**적용된 플러그인:**
- `eslint-plugin-react-hooks`: React Hooks 규칙
- `eslint-plugin-react-refresh`: Fast Refresh 호환성
- `eslint-plugin-import`: Import 순서 정리, 중복 방지, 순환 참조 감지

---

## 🔑 주요 기능 및 구현 포인트

### 1. 인증 시스템
- ✅ JWT 기반 액세스/리프레시 토큰
- ✅ Axios 인터셉터를 통한 자동 토큰 갱신
- ✅ 401 에러 시 자동 로그인 페이지 리다이렉트
- ✅ 로그인 성공 후 원래 페이지로 복귀

### 2. 토큰 관리
- ✅ localStorage 추상화 (`tokenStorage`)
- ✅ 토큰 갱신 실패 시 자동 로그아웃
- ✅ Request 인터셉터에서 자동 토큰 헤더 추가

### 3. 성능 최적화
- ✅ React Virtual로 수천 개 항목도 부드럽게 렌더링
- ✅ React Query 캐싱으로 불필요한 API 호출 방지
- ✅ Intersection Observer로 효율적인 무한 스크롤
- ✅ Code Splitting (준비)

### 4. 개발 경험
- ✅ TypeScript로 타입 안전성 보장
- ✅ Zod로 런타임 validation
- ✅ ESLint로 코드 품질 관리
- ✅ Import 자동 정렬
- ✅ Path alias (`@/`) 설정

### 5. 코드 품질
- ✅ 도메인별 폴더 구조로 관심사 분리
- ✅ Custom Hooks로 로직 재사용
- ✅ 공통 컴포넌트 분리
- ✅ API 레이어 분리

---

## 📋 API 엔드포인트 (MSW 모킹)

| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/api/sign-in` | 로그인 |
| POST | `/api/refresh` | 토큰 갱신 |
| GET | `/api/dashboard` | 대시보드 통계 |
| GET | `/api/tasks` | 할일 목록 (페이지네이션) |
| GET | `/api/tasks/:id` | 할일 상세 |
| DELETE | `/api/tasks/:id` | 할일 삭제 |
| GET | `/api/user` | 사용자 정보 |

---

## 🎨 디자인 시스템

**색상:**
- Primary: `#3b82f6` (파란색)
- Secondary: `#6b7280` (회색)
- Success: `#10b981` (초록색)
- Error: `#ef4444` (빨간색)

**반응형:**
- 최대 너비: `430px` (모바일 최적화)
- 중앙 정렬 레이아웃

**컴포넌트:**
- Button: 2가지 variant (primary, secondary)
- Input: 에러 상태 표시
- Modal: Portal을 통한 렌더링

---

## 🛠️ 기술 스택

**Frontend:**
- React 19.2.0
- TypeScript 5.9.3
- Vite 7.2.4

**State Management:**
- TanStack Query (React Query) 5.90.16

**UI:**
- Tailwind CSS 4.1.18
- Lucide React (Icons)

**Form:**
- React Hook Form 7.71.1
- Zod 4.3.5

**API:**
- Axios 1.13.2
- MSW 2.12.7

**Code Quality:**
- ESLint 9.39.1
- TypeScript ESLint
- eslint-plugin-import

