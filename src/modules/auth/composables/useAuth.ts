import { computed, ref } from "vue";
import { useTokenStorage } from "../../services/composables/useTokenStorage";
import { TokenPayload, UserSession } from "../interfaces/auth.types";
import { useNotification } from "../../shared/composables/useNotification";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import { apiService } from "../../services/api-service";

export const useAuth = () => {
  const { tokens, clearTokens, setTokens, } = useTokenStorage();
  const storeAuth = useAuthStore()
  const router = useRouter()
  const notify = useNotification();
  const isAuthenticated = computed(() => !!tokens.value?.accessToken);
  const isLoading = ref(false);

  const login = async (email: string, password: string): Promise<void> => {
    isLoading.value = true;
    try {
      const response = await apiService.post<UserSession>('/auth/login', {
        email,
        password,
      });
      if (!response.data || !response.data.tokens) {
        throw new Error('Invalid login response');
      }
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

  const register = async (email: string, password: string, fullName: string): Promise<void> => {
    isLoading.value = true;
    try {
      const response = await apiService.post<UserSession>('/auth/signup', {
        email,
        password,
        fullName,
      });
      if (!response.data || !response.data.tokens) {
        throw new Error('Invalid register response');
      }
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
    window.location.href = '/login';
  };


  return {
    isAuthenticated,
    isLoading,
    tokens,
    register,
    login,
    clearTokens,
    setTokens,
    logout,
  };
};
