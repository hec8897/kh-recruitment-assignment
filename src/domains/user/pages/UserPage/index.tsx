import { Button } from "@/shared";

import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

import { PATHS } from "@/routes/paths";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/lib/constants";

export function UserPage() {
  const { data: user, isLoading } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    navigate(PATHS.SIGN_IN);
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">{user?.name}</h2>
        <p>{user?.memo}</p>
      </div>
      <Button onClick={handleLogout}>로그아웃</Button>
    </div>
  );
}
