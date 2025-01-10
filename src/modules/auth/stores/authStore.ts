import { computed, ref } from "vue";
import { defineStore } from "pinia";

import { TokenPayload, UserSession } from "../interfaces/auth.types";
import { useTokenStorage } from "../../services/composables/useTokenStorage";
import { apiService } from "../../services/api-service";

export const useAuthStore = defineStore('auth', () => {
  const { clearTokens, setTokens, tokens } = useTokenStorage();
  const user = ref<UserSession | null>();

  const isAuthenticated = computed(() => !!user.value?.tokens?.accessToken);
  const hasRole = (role: string) => user.value?.roles.includes(role) || false;
  const hasPermission = (permission: string) =>
    user.value?.permissions?.includes(permission) || false;

  const setSession = (session: UserSession, tokens: TokenPayload): void => {
    user.value = session;
    apiService.setTokens(tokens.accessToken, tokens.refreshToken);
    setTokens(tokens)
  };

  const clearSession = (): void => {
    user.value = null;
    apiService.clearTokens();
    clearTokens()
  };

  return {
    user,
    isAuthenticated,
    tokens,
    hasRole,
    hasPermission,
    setSession,
    clearSession,
  };
});

