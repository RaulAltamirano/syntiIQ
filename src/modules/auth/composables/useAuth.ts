import { computed, ref } from "vue";
import { useTokenStorage } from "../../services/composables/useTokenStorage";
import { TokenPayload } from "../interfaces/auth.types";
import { useApi } from "../../services/composables/useApi";
import { useNotification } from "../../shared/composables/useNotification";
import { useTokenService } from "./tokenService";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";

export const useAuth = () => {
  const { tokens } = useTokenStorage();
  const { refreshTokens } = useTokenService();
  const storeAuth = useAuthStore()
  const router = useRouter()
  const { api } = useApi();
  const notify = useNotification();
  const isAuthenticated = computed(() => !!tokens.value?.accessToken);
  const isLoading = ref(false);

  const login = async (email: string, password: string): Promise<void> => {
    isLoading.value = true;
    try {
      const response = await api.post<{ tokens: TokenPayload }>('/auth/login', {
        email,
        password,
      });
      if (!response.data || !response.data.tokens) {
        throw new Error('Invalid login response');
      }
      console.log({response});
      storeAuth.setSession(response.data, response.data.tokens);
      router.push({
        name: 'Home'
      })
    } catch (error) {
      notify.error('Login failed: ' + error);
    } finally {
      isLoading.value = false;
    }
  };

  const logout = (): void => {
    storeAuth.clearSession();
    notify.info('Logged out');
    window.location.href = '/login';
  };

  const handleUnauthorized = async (): Promise<boolean> => {
    try {
      await refreshTokens();
      return true; // Retry successful.
    } catch {
      logout(); // Force logout on failure.
      return false;
    }
  };

  return {
    isAuthenticated,
    isLoading,
    tokens,
    login,
    logout,
    handleUnauthorized,
  };
};
