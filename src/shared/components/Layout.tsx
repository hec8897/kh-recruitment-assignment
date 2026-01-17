import { Outlet } from "react-router-dom";

import { GNB } from "./GNB";
import { LNB } from "./LNB";

export function Layout() {
  return (
    <div className="max-w-[430px] m-auto min-h-screen bg-white flex flex-col">
      <GNB />
      <main className="flex-1 p-4 overflow-hidden">
        <Outlet />
      </main>
      <LNB />
    </div>
  );
}
