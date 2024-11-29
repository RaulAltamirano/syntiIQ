import { jwtDecode } from "jwt-decode";
import { TokenPayload } from "../interfaces/auth.types";
import { useApi } from "../../services/composables/useApi";
import { useTokenStorage } from "../../services/composables/useTokenStorage";

export const useTokenService = () => {
  const { getStoredTokens, setTokens } = useTokenStorage();
  const { api } = useApi<any>();
  let refreshPromise: Promise<TokenPayload> | null = null;

  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded = jwtDecode<{ exp: number }>(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp <= currentTime + 5 * 60; 
    } catch {
      return true;
    }
  };

  const refreshTokens = async (): Promise<TokenPayload> => {
    console.log('refresh token');
    if (refreshPromise) return refreshPromise;

    refreshPromise = new Promise(async (resolve, reject) => {
      try {
        const currentTokens = getStoredTokens();
        if (!currentTokens?.refreshToken) {
          throw new Error('No refresh token available');
        }
        const response = await api.post<any>('/auth/refresh-token', {
          refreshToken: currentTokens.refreshToken
        })

        if (!response.data) throw new Error('Failed to refresh token');

        const newTokens: TokenPayload = await response.data.tokens
        setTokens(newTokens);
        resolve(newTokens);
      } catch (error) {
        reject(error);
      } finally {
        refreshPromise = null;
      }
    });

    return refreshPromise;
  };

  return {
    isTokenExpired,
    refreshTokens
  };
};
