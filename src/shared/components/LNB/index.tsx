import { LayoutDashboard, ListTodo } from "lucide-react";
import { NavLink } from "react-router-dom";

import { PATHS } from "@/routes/paths";

const navItems = [
  { path: PATHS.HOME, icon: LayoutDashboard, label: "대시보드" },
  { path: PATHS.TASK, icon: ListTodo, label: "할 일" },
];

export function LNB() {
  return (
    <nav className="sticky bottom-0 z-10 bg-white flex justify-around items-center h-16 border-t border-gray-200">
      {navItems.map(({ path, icon: Icon, label }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 p-2 transition ${
              isActive ? "text-primary" : "text-gray-500 hover:text-gray-700"
            }`
          }>
          <Icon size={24} />
          <span className="text-xs">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
