import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import { useTokenService } from '../composables/tokenService';
import { useTokenStorage } from '../../services/composables/useTokenStorage';

export const setupRouterGuards = (router: any) => {
  let isVerifyingSession = false;

  router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const authStore = useAuthStore();
    const tokenStorage = useTokenStorage();
    const tokenService = useTokenService();
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const requiredRoles = to.meta.roles as string[] | undefined;
    
    try {
      // 1. Rutas públicas
      if (!requiresAuth) {
        // Si el usuario está autenticado y accede a una ruta de autenticación, redirigir al Home o Dashboard
        if (authStore.isAuthenticated && to.path.startsWith('/auth')) {
          console.log('Validacion');
          return next({ name: 'Home' });
        }
        return next();
      }
      // 2. Verificar sesión si no está autenticado pero hay token en localStorage
      if (!authStore.isAuthenticated && tokenStorage.tokens?.value?.refreshToken) {
        if (!isVerifyingSession) {
          isVerifyingSession = true;
          try {
            const userData = await tokenService.verifySession();
            authStore.setSession(userData, userData.tokens);
          } catch (error) {
            console.error('Error al verificar sesión:', error);
            authStore.clearSession();
            isVerifyingSession = false;
            return next({ name: 'Login' });
          }
          isVerifyingSession = false;
        } else {
          return next({ name: 'Loading' });
        }
      }

      // // 3. Verificar autenticación
      // if (!authStore.isAuthenticated) {
      //   console.warn('Usuario no autenticado, redirigiendo a login.');
      //   return next({
      //     name: 'Login',
      //     query: { redirect: to.fullPath },
      //   });
      // }

      // // 5. Validar roles (opcional)
      // if (requiredRoles?.length) {
      //   const hasRequiredRole = requiredRoles.some((role) => authStore.hasRole(role));
      //   if (!hasRequiredRole) {
      //     return next({ name: 'Forbidden' });
      //   }
      // }

      // 6. Continuar con la navegación
      return next();
    } catch (error) {
      console.error('Error en la protección de rutas:', error);
      authStore.clearSession();
      return next({ name: 'Login' });
    }
  });

};