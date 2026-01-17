import { createBrowserRouter } from "react-router-dom";

import {
  SignInPage,
  DashBoardPage,
  TaskList,
  TaskDetailPage,
  UserPage,
} from "@/domains";
import { Layout } from "@/shared";

import { PATHS } from "./paths";

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
