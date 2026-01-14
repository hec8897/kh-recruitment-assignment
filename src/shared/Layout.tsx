import { Outlet } from "react-router-dom";
import { GNB } from "./GNB";

export function Layout() {
  return (
    <div className="max-w-[430px] m-auto min-h-screen bg-white">
      <GNB />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}
