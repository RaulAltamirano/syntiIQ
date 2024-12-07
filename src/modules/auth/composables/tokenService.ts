import { jwtDecode } from "jwt-decode";
import {  UserSession } from "../interfaces/auth.types";
import { ref } from "vue";
import { apiService } from "../../services/api-service";

export const useTokenService = () => {
  const isLoading = ref(false);

  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded = jwtDecode<{ exp: number }>(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp <= currentTime + 5 * 60;
    } catch {
      return true;
    }
  };


  const verifySession = async () : Promise<UserSession>=> {
    try {
      isLoading.value = true;
      const response = await apiService.get<UserSession>('/auth/me');
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  };


  return {
    isTokenExpired,
    verifySession,
    isLoading,
  };
};
