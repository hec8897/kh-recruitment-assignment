import { setupWorker } from "msw/browser";
import { authHandlers, userHandlers, dashboardHandlers } from "./handlers";

export const worker = setupWorker(
  ...authHandlers,
  ...userHandlers,
  ...dashboardHandlers
);
