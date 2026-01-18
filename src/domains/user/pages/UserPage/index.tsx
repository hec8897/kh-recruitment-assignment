import { useCallback, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { tokenStorage } from "@/lib/storage";
import { PATHS } from "@/routes/paths";
import { Button } from "@/shared";

import { useUser } from "../../hooks/useUser";

export function UserPage() {
  const { data: user, isLoading, error } = useUser();
  const navigate = useNavigate();

  // 로그아웃 핸들러를 useCallback으로 메모이제이션
  const handleLogout = useCallback(() => {
    tokenStorage.clearTokens();
    navigate(PATHS.SIGN_IN);
  }, [navigate]);

  useEffect(() => {
    if (error) {
      navigate(PATHS.SIGN_IN);
    }
  }, [error, navigate]);

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
