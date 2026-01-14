import { LogIn, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { PATHS } from "@/routes/paths";

const isLoggedIn = true; // 임시

export function GNB() {
  return (
    <header className="sticky top-0 z-10 flex justify-between items-center px-2 h-14 bg-white border-b">
      <NavLink to={PATHS.HOME} className="text-xl font-bold">
        <h1>TODO LIST</h1>
      </NavLink>

      <NavLink
        to={isLoggedIn ? PATHS.USER : PATHS.SIGN_IN}
        className="p-2 rounded-full transition">
        {isLoggedIn ? <User size={24} /> : <LogIn size={24} />}
      </NavLink>
    </header>
  );
}
