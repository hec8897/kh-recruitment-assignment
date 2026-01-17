import { setupWorker } from "msw/browser";

import {
  authHandlers,
  userHandlers,
  dashboardHandlers,
  taskHandlers,
} from "./handlers";

export const worker = setupWorker(
  ...authHandlers,
  ...userHandlers,
  ...dashboardHandlers,
  ...taskHandlers
);
