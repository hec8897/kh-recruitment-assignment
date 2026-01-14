import { createBrowserRouter, Outlet } from "react-router-dom";
import { PATHS } from "./paths";

export const router = createBrowserRouter([
  {
    path: PATHS.SIGN_IN,
    element: <div>로그인</div>,
  },
  {
    element: <Outlet />,
    children: [
      {
        path: PATHS.HOME,
        element: <div>대시보드</div>,
      },
      {
        path: PATHS.TASK,
        element: <div>할 일 목록</div>,
      },
      {
        path: PATHS.TASK_DETAIL,
        element: <div>할 일 상세</div>,
      },
      {
        path: PATHS.USER,
        element: <div>회원정보</div>,
      },
    ],
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);
