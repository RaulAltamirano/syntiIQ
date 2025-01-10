import { ref } from 'vue';
import { TokenPayload } from '../../auth/interfaces/auth.types';

export const useTokenStorage = () => {
  const TOKEN_KEY = 'auth_tokens';
  const tokens = ref<TokenPayload | null>(null);

  const getStoredTokens = (): TokenPayload | null => {
    try {
      const storedTokens = localStorage.getItem(TOKEN_KEY);
      return storedTokens ? JSON.parse(storedTokens) : null;
    } catch {
      return null;
    }
  };

  const setTokens = (newTokens: TokenPayload): void => {
    tokens.value = newTokens;
    localStorage.setItem(TOKEN_KEY, JSON.stringify(newTokens));
  };

  const clearTokens = (): void => {
    tokens.value = null;
    localStorage.removeItem(TOKEN_KEY);
  };

  tokens.value = getStoredTokens();

  return {
    tokens,
    getStoredTokens,
    setTokens,
    clearTokens,
  };
};
