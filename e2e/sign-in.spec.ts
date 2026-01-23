import { test, expect } from "@playwright/test";

test.describe("로그인 페이지", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/sign-in");
  });

  test("페이지가 올바르게 렌더링된다", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "로그인" })).toBeVisible();
    await expect(page.getByPlaceholder("email@example.com")).toBeVisible();
    await expect(page.getByPlaceholder("비밀번호")).toBeVisible();
    await expect(page.getByRole("button", { name: "로그인" })).toBeVisible();
  });

  test.describe("이메일 유효성 검증", () => {
    test("빈 이메일 입력 후 지우면 에러 메시지 표시", async ({ page }) => {
      const emailInput = page.getByPlaceholder("email@example.com");
      await emailInput.fill("a");
      await emailInput.fill("");

      await expect(page.getByText("이메일을 입력해주세요")).toBeVisible();
    });

    test("잘못된 이메일 형식 입력 시 에러 메시지 표시", async ({ page }) => {
      const emailInput = page.getByPlaceholder("email@example.com");
      await emailInput.fill("invalid-email");

      await expect(
        page.getByText("올바른 이메일 형식이 아닙니다")
      ).toBeVisible();
    });

    test("올바른 이메일 형식 입력 시 에러 메시지 없음", async ({ page }) => {
      const emailInput = page.getByPlaceholder("email@example.com");
      await emailInput.fill("test@example.com");

      await expect(
        page.getByText("올바른 이메일 형식이 아닙니다")
      ).not.toBeVisible();
    });
  });

  test.describe("비밀번호 유효성 검증", () => {
    test("빈 비밀번호 입력 후 지우면 에러 메시지 표시", async ({ page }) => {
      const passwordInput = page.getByPlaceholder("비밀번호");
      await passwordInput.fill("a");
      await passwordInput.fill("");

      await expect(page.getByText("비밀번호를 입력해주세요")).toBeVisible();
    });

    test("8자 미만 비밀번호 입력 시 에러 메시지 표시", async ({ page }) => {
      const passwordInput = page.getByPlaceholder("비밀번호");
      await passwordInput.fill("short");

      await expect(
        page.getByText("비밀번호는 8자 이상이어야 합니다")
      ).toBeVisible();
    });

    test("특수문자 포함 비밀번호 입력 시 에러 메시지 표시", async ({ page }) => {
      const passwordInput = page.getByPlaceholder("비밀번호");
      await passwordInput.fill("password!@#");

      await expect(
        page.getByText("비밀번호는 영문, 숫자, 한글만 사용할 수 있습니다")
      ).toBeVisible();
    });
  });

  test.describe("로그인 버튼 상태", () => {
    test("유효하지 않은 입력 시 버튼 비활성화", async ({ page }) => {
      const button = page.getByRole("button", { name: "로그인" });
      await expect(button).toBeDisabled();
    });

    test("유효한 입력 시 버튼 활성화", async ({ page }) => {
      await page.getByPlaceholder("email@example.com").fill("test@example.com");
      await page.getByPlaceholder("비밀번호").fill("password123");

      const button = page.getByRole("button", { name: "로그인" });
      await expect(button).toBeEnabled();
    });
  });

  test.describe("로그인 시도", () => {
    test("잘못된 자격증명으로 로그인 실패 시 에러 모달 표시", async ({
      page,
    }) => {
      await page.getByPlaceholder("email@example.com").fill("wrong@example.com");
      await page.getByPlaceholder("비밀번호").fill("wrongpassword");
      await page.getByRole("button", { name: "로그인" }).click();

      await expect(
        page.getByText("이메일 또는 비밀번호가 올바르지 않습니다")
      ).toBeVisible();
    });

    test("올바른 자격증명으로 로그인 성공 시 대시보드로 이동", async ({
      page,
    }) => {
      await page.getByPlaceholder("email@example.com").fill("test@example.com");
      await page.getByPlaceholder("비밀번호").fill("password123");
      await page.getByRole("button", { name: "로그인" }).click();

      // 로그인 성공 후 홈(대시보드)으로 리다이렉트 확인
      await expect(page).toHaveURL("/");
    });
  });
});
