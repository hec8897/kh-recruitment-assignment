## 미구현 / 추가 작업 필요

### 할 일 목록 페이지

- [ ] 400 에러 시 에러 모달 표시 + refetch 버튼
- [ ] 401 에러 시 로그인 페이지 이동 → 로그인 후 원래 페이지로 redirect

### 401 redirect 구현 방안

1. 401 발생 시 현재 경로를 query param에 저장
   - `navigate(/sign-in?redirect=${encodeURIComponent(currentPath)})`
2. 로그인 성공 후 redirect param 확인하여 이동
   - `const redirect = searchParams.get("redirect") || PATHS.HOME`
