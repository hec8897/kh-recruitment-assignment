import { createBrowserRouter } from "react-router-dom";
import { PATHS } from "./paths";
import { Layout } from "@/shared";
import {
  SignInPage,
  DashBoardPage,
  TaskList,
  TaskDetailPage,
  UserPage,
} from "@/domains";

export const router = createBrowserRouter([
  {
    path: PATHS.SIGN_IN,
    element: <SignInPage />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: PATHS.HOME,
        element: <DashBoardPage />,
      },
      {
        path: PATHS.TASK,
        element: <TaskList />,
      },
      {
        path: PATHS.TASK_DETAIL,
        element: <TaskDetailPage />,
      },
      {
        path: PATHS.USER,
        element: <UserPage />,
      },
    ],
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);
