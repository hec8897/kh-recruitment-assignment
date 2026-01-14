import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";

export default function App() {
  useEffect(() => {
    // 로그인 API 테스트
    fetch("/api/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@example.com",
        password: "password123",
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log("✅ 성공:", data))
      .catch((err) => console.error("❌ 실패:", err));
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
