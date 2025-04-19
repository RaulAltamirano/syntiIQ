import { computed, ref } from "vue";
import { UserSession } from "../interfaces/auth.types";
import { useNotification } from "../../shared/composables/useNotification";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import { ApiService } from "@/modules/services/api-service";

const apiService = ApiService.getInstance();


export const useAuth = () => {
  const storeAuth = useAuthStore()
  const router = useRouter()
  const notify = useNotification();
  const isAuthenticated = computed(() => !!tokens.value?.accessToken);
  const isLoading = ref(false);

  const login = async (email: string, password: string): Promise<void> => {
    isLoading.value = true;
    try {
      const response = await apiService.api.post<UserSession>('/auth/login', {
        email,
        password,
      });
      console.log({response});
      if (!response.data || !response.data.user) {
        throw new Error('Invalid login response');
      }
      storeAuth.setSession(response.data.user, response.data.tokens);
      router.push({
        name: 'Home'
      })
    } catch (error) {
      notify.error('Login failed: ' + error);
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (userData: { email: string, password: string, fullName: string }): Promise<void> => {
    isLoading.value = true;
    try {
      const response = await apiService.api.post<UserSession>('/auth/signup', {
        email: userData.email,
        password: userData.password,
        fullName: userData.fullName,
        profileType: 'default'
      });

      if (!response.data || !response.data.tokens) {
        throw new Error('Invalid register response');
      }

      storeAuth.setSession(response.data, response.data.tokens);
      router.push({ name: 'Home' });
    } catch (error) {
      notify.error('Login failed: ' + error);
    } finally {
      isLoading.value = false;
    }
  };


  const logout = async (): Promise<void> => {
    try {
      isLoading.value = true

      const response = await apiService.api.post<any>('/auth/logout');
      if (response.status !== 200 || !response.data) {
        throw new Error('Logout operation failed');
      }
      storeAuth.clearSession();

      await router.push({ name: 'Login' });

    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'An unexpected error occurred during logout';

      notify.error(errorMessage);
      throw error;
    } finally {
      isLoading.value = false
    }
  };


  return {
    isAuthenticated,
    isLoading,
    register,
    login,
    logout,
  };
};
