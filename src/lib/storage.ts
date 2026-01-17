import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "./constants";

/**
 * 토큰 저장소 유틸리티
 * localStorage 접근을 추상화하여 일관된 인터페이스 제공
 */
export const tokenStorage = {
  /**
   * Access Token 조회
   */
  getAccessToken: (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  /**
   * Refresh Token 조회
   */
  getRefreshToken: (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  /**
   * 토큰 저장 (Access Token + Refresh Token)
   */
  setTokens: (accessToken: string, refreshToken: string): void => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  /**
   * Access Token만 저장
   */
  setAccessToken: (accessToken: string): void => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  },

  /**
   * Refresh Token만 저장
   */
  setRefreshToken: (refreshToken: string): void => {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  /**
   * 모든 토큰 삭제 (로그아웃)
   */
  clearTokens: (): void => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  /**
   * 토큰 존재 여부 확인
   */
  hasTokens: (): boolean => {
    return !!(
      localStorage.getItem(ACCESS_TOKEN_KEY) &&
      localStorage.getItem(REFRESH_TOKEN_KEY)
    );
  },
};
