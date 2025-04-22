import { ApiService } from "@/modules/services/api-service";
import { AUTH_CONSTANTS } from "@/modules/services/constants/constants-api";
import { SecureStorage } from "@/modules/services/secure-storage";
import { defineStore } from "pinia";
import { reactive, computed, readonly } from "vue";
import { Tokens, UserSession } from "../interfaces/auth.types";

const apiService = ApiService.getInstance();
const secureStorage = SecureStorage.getInstance();

export const useAuthStore = defineStore('auth', () => {
  // Estado privado
  const state = reactive<any>({
    user: secureStorage.getUser<UserSession>(),
    tokens: secureStorage.getTokens(),
    loading: false,
    error: null
  });

  // Timeout para detección de inactividad
  let inactivityTimer: number | null = null;

  // Getters
  const isAuthenticated = computed(() => !!state.user && !!state.tokens);
  const accessToken = computed(() => state.tokens?.accessToken.token || null);
  const refreshToken = computed(() => state.tokens?.refreshToken.token || null);
  const currentUser = computed(() => readonly(state.user) || null);
  const isLoading = computed(() => state.loading);
  const authError = computed(() => state.error);

  // Verificador de permisos
  const hasPermission = (permission: UserPermission): boolean => {
    return state.user?.permissions?.includes(permission) || false;
  };

  const hasAnyPermission = (permissions: UserPermission[]): boolean => {
    if (!state.user?.permissions?.length) return false;
    return permissions.some(perm => state.user!.permissions!.includes(perm));
  };

  const hasAllPermissions = (permissions: UserPermission[]): boolean => {
    if (!state.user?.permissions?.length) return false;
    return permissions.every(perm => state.user!.permissions!.includes(perm));
  };

  const hasRole = (role: string): boolean => {
    return state.user?.roles?.includes(role) || false;
  };

  // Verificar expiración de tokens
  const isTokenExpired = (expiresAt: number): boolean => {
    // Añadir un buffer de 10 segundos
    return Date.now() >= (expiresAt - 10000);
  };

  const checkAndRefreshTokens = async (): Promise<boolean> => {
    if (!state.tokens) return false;

    // Si el token de acceso está por expirar pero el refresh no
    if (
      isTokenExpired(state.tokens.accessToken.expiresAt) &&
      !isTokenExpired(state.tokens.refreshToken.expiresAt)
    ) {
      try {
        state.loading = true;
        const response = await apiService.api.post('/auth/refresh', {
          refreshToken: state.tokens.refreshToken.token
        });

        const newTokens = validateToken(response.data);
        setTokens(newTokens);

        return true;
      } catch (error) {
        await logout();
        return false;
      } finally {
        state.loading = false;
      }
    }

    // Si ambos tokens expiraron
    if (isTokenExpired(state.tokens.refreshToken.expiresAt)) {
      await logout();
      return false;
    }

    return true;
  };

  // Métodos para gestionar sesión
  const setSession = (session: UserSession, tokens: Tokens): void => {
    try {
      // Validar datos

      // Actualizar estado
      state.user = session;
      secureStorage.setUser(tokens);

      setTokens(tokens);
      state.error = null;

      // Iniciar monitor de inactividad
      setupInactivityMonitor();

      // Registrar evento para escuchar expiración de sesión
      window.addEventListener('auth:session-expired', handleSessionExpired);

    } catch (error) {
      state.error = error instanceof Error ? error : new Error('Unknown error in setSession');
      throw state.error;
    }
  };

  const setTokens = (tokens: Tokens): void => {
    try {
      state.tokens = tokens;
      secureStorage.setTokens(tokens);

      // Configurar el servicio API
      apiService.setTokens(tokens);
    } catch (error) {
      state.error = error instanceof Error ? error : new Error('Invalid token format');
      throw state.error;
    }
  };

  const login = async (email: string, password: string): Promise<UserSession> => {
    try {
      state.loading = true;
      state.error = null;

      // Implementar protección contra ataques de fuerza bruta
      const loginAttempts = getLoginAttempts(email);
      if (loginAttempts >= 5) {
        const lastAttempt = getLastLoginAttempt(email);
        const cooldownPeriod = 15 * 60 * 1000; // 15 minutos

        if (Date.now() - lastAttempt < cooldownPeriod) {
          throw new Error('Too many login attempts. Please try again later.');
        } else {
          resetLoginAttempts(email);
        }
      }

      const response = await apiService.api.post('/auth/login', { email, password });

      const session = response.data.user
      const tokens = response.data.tokens

      setSession(session, tokens);
      resetLoginAttempts(email);

      return session;
    } catch (error) {
      incrementLoginAttempts(email);
      if (error instanceof Error) {
        state.error = error;
      } else {
        state.error = new Error('Login failed');
      }
      throw state.error;
    } finally {
      state.loading = false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      state.loading = true;
      if (state.tokens) {
        // Intenta invalidar el token en el servidor
        try {
          await apiService.api.post('/auth/logout');
        } catch (error) {
          // Si falla, continuamos con el logout local
          console.error('Error during server logout:', error);
        }
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearSession();
      state.loading = false;
    }
  };

  const clearSession = (): void => {
    // Remover listener de evento
    window.removeEventListener('auth:session-expired', handleSessionExpired);

    // Limpiar timeout
    if (inactivityTimer !== null) {
      window.clearTimeout(inactivityTimer);
      inactivityTimer = null;
    }

    // Restablecer el estado
    state.user = null;
    state.tokens = null;
    state.error = null;

    // Limpiar almacenamiento y tokens de API
    secureStorage.clearAll();
    apiService.clearTokens();
  };

  // Control de intentos de login (protección contra fuerza bruta)
  const LOGIN_ATTEMPTS_PREFIX = 'login_attempts_';
  const LOGIN_LAST_ATTEMPT_PREFIX = 'login_last_attempt_';

  const getLoginAttempts = (email: string): number => {
    const key = `${LOGIN_ATTEMPTS_PREFIX}${email}`;
    return parseInt(sessionStorage.getItem(key) || '0', 10);
  };

  const getLastLoginAttempt = (email: string): number => {
    const key = `${LOGIN_LAST_ATTEMPT_PREFIX}${email}`;
    return parseInt(sessionStorage.getItem(key) || '0', 10);
  };

  const incrementLoginAttempts = (email: string): void => {
    const key = `${LOGIN_ATTEMPTS_PREFIX}${email}`;
    const lastKey = `${LOGIN_LAST_ATTEMPT_PREFIX}${email}`;
    const attempts = getLoginAttempts(email) + 1;
    sessionStorage.setItem(key, attempts.toString());
    sessionStorage.setItem(lastKey, Date.now().toString());
  };

  const resetLoginAttempts = (email: string): void => {
    const key = `${LOGIN_ATTEMPTS_PREFIX}${email}`;
    const lastKey = `${LOGIN_LAST_ATTEMPT_PREFIX}${email}`;
    sessionStorage.removeItem(key);
    sessionStorage.removeItem(lastKey);
  };

  // Control de inactividad
  const setupInactivityMonitor = (): void => {
    if (inactivityTimer !== null) {
      window.clearTimeout(inactivityTimer);
    }

    inactivityTimer = window.setTimeout(() => {
      logout();
      window.dispatchEvent(new CustomEvent('auth:session-timeout'));
    }, AUTH_CONSTANTS.SESSION_TIMEOUT);

    // Reiniciar el temporizador en actividad del usuario
    const resetTimer = (): void => {
      if (inactivityTimer !== null) {
        window.clearTimeout(inactivityTimer);
        setupInactivityMonitor();
      }
    };

    // Eventos para detectar actividad
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('scroll', resetTimer);
    window.addEventListener('touchstart', resetTimer);
  };

  const handleSessionExpired = (): void => {
    clearSession();
    window.dispatchEvent(new CustomEvent('auth:session-expired-alert'));
  };

  // Devolver API pública del store
  return {
    // Getters
    isAuthenticated,
    currentUser,
    accessToken,
    refreshToken,
    isLoading,
    authError,

    // Verificadores de permisos
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,

    // Métodos de autenticación
    login,
    logout,
    setSession,
    checkAndRefreshTokens,
  };
});