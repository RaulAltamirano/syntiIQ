import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

import { useTokenStorage } from '@/modules/services/composables/useTokenStorage';
import { useNotification } from '@/modules/shared/composables/useNotification';
import { useAuthStore } from '@/modules/auth/stores/authStore';
import { apiService } from '@/modules/services/api-service';
import { useAuth } from '@/modules/auth/composables/useAuth';


vi.mock('vue-router');
vi.mock('@/modules/services/composables/useTokenStorage');
vi.mock('@/modules/shared/composables/useNotification');
vi.mock('@/modules/auth/stores/authStore');
vi.mock('@/modules/services/api-service');

describe('useAuth', () => {
  const mockTokens = { accessToken: 'mock-token' };
  const mockResponse = { data: { tokens: mockTokens } };
  const mockRouter = { push: vi.fn() };
  const mockNotify = { error: vi.fn() };
  const mockStore = {
    setSession: vi.fn(),
    clearSession: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useTokenStorage as any).mockReturnValue({ tokens: ref(mockTokens) });
    (useRouter as any).mockReturnValue(mockRouter);
    (useNotification as any).mockReturnValue(mockNotify);
    (useAuthStore as any).mockReturnValue(mockStore);
  });

  describe('isAuthenticated', () => {
    it('should return true when access token exists', () => {
      const { isAuthenticated } = useAuth();
      expect(isAuthenticated.value).toBe(true);
    });

    it('should return false when access token is null', () => {
      (useTokenStorage as any).mockReturnValue({ tokens: ref(null) });
      const { isAuthenticated } = useAuth();
      expect(isAuthenticated.value).toBe(false);
    });

    it('should return false when tokens object is empty', () => {
      (useTokenStorage as any).mockReturnValue({ tokens: ref({}) });
      const { isAuthenticated } = useAuth();
      expect(isAuthenticated.value).toBe(false);
    });
  });

  describe('login', () => {
    const mockCredentials = {
      email: 'test@example.com',
      password: 'password123'
    };

    it('should successfully login and redirect to home', async () => {
      vi.spyOn(apiService, 'post').mockResolvedValue(mockResponse);
      const { login, isLoading } = useAuth();

      await login(mockCredentials.email, mockCredentials.password);

      expect(apiService.post).toHaveBeenCalledWith('/auth/login', mockCredentials);
      expect(mockStore.setSession).toHaveBeenCalledWith(mockResponse.data, mockTokens);
      expect(mockRouter.push).toHaveBeenCalledWith({ name: 'Home' });
      expect(isLoading.value).toBe(false);
    });

    it('should handle invalid login response', async () => {
      vi.spyOn(apiService, 'post').mockResolvedValue({
          data: null,
          status: 0
      });
      const { login, isLoading } = useAuth();

      await login(mockCredentials.email, mockCredentials.password);

      expect(mockNotify.error).toHaveBeenCalledWith(expect.stringContaining('Invalid login response'));
      expect(isLoading.value).toBe(false);
    });

    it('should handle API errors during login', async () => {
      const mockError = new Error('Network error');
      vi.spyOn(apiService, 'post').mockRejectedValue(mockError);
      const { login, isLoading } = useAuth();

      await login(mockCredentials.email, mockCredentials.password);

      expect(mockNotify.error).toHaveBeenCalledWith(expect.stringContaining('Network error'));
      expect(isLoading.value).toBe(false);
    });

    it('should manage loading state correctly', async () => {
      vi.spyOn(apiService, 'post').mockResolvedValue(mockResponse);
      const { login, isLoading } = useAuth();

      const loginPromise = login(mockCredentials.email, mockCredentials.password);
      expect(isLoading.value).toBe(true);
      
      await loginPromise;
      expect(isLoading.value).toBe(false);
    });
  });

  describe('logout', () => {
    it('should clear session and redirect to login page', () => {
      const originalLocation = window.location;
      delete window.location;
      window.location = { href: '' } as Location;

      const { logout } = useAuth();
      logout();

      expect(mockStore.clearSession).toHaveBeenCalled();
      expect(window.location.href).toBe('/login');

      window.location = originalLocation;
    });

    it('should clear session even if redirect fails', () => {
      const originalLocation = window.location;
    //   delete window.location;
      window.location = { 
        set href(url: string) { throw new Error('Navigation failed'); }
      } as Location;

      const { logout } = useAuth();
      
      expect(() => logout()).toThrow('Navigation failed');
      expect(mockStore.clearSession).toHaveBeenCalled();

      window.location = originalLocation;
    });
  });
});