import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="max-w-[430px] m-auto min-h-screen bg-white">
      <Outlet />
    </div>
  );
}
