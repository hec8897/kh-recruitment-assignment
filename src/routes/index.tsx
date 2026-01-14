import { createBrowserRouter } from "react-router-dom";
import { PATHS } from "./paths";

export const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <div>대시보드</div>,
  },
]);
