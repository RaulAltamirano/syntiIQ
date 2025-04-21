import { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import { useTokenService } from '../composables/tokenService';

export const setupRouterGuards = (router: Router) => {
  let isVerifyingSession = false;

  router.beforeEach(async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const authStore = useAuthStore();
    const tokenService = useTokenService();

    // Verificar si la ruta requiere autenticación
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const requiredRoles = to.meta.roles as string[] | undefined;

    try {
      if (!requiresAuth) {
        if (authStore.isAuthenticated && to.path.startsWith('/auth')) {
          return next({ name: 'Home' });
        }
        return next();
      }

      if (!authStore.isAuthenticated) {
        if (!isVerifyingSession) {
          isVerifyingSession = true;
          try {
            const userData = await tokenService.verifySession();
            console.log({userData});
          } catch (error) {
            console.error('Error al verificar sesión:', error);
            isVerifyingSession = false;
            return next({ 
              name: 'Login',
              query: { redirect: to.fullPath }
            });
          }
          isVerifyingSession = false;
        } else {
          return next({ name: 'Loading' });
        }
      }

      if (!authStore.isAuthenticated) {
        console.warn('Usuario no autenticado, redirigiendo a login.');
        return next({
          name: 'Login',
          query: { redirect: to.fullPath }
        });
      }

      // if (requiredRoles?.length) {
      //   const hasRequiredRole = requiredRoles.some((role) => authStore.hasRole(role));
      //   if (!hasRequiredRole) {
      //     return next({ name: 'Forbidden' });
      //   }
      // }

      // // 5. Validar estado del token
      // try {
      //   await tokenService.validateAccessToken();
      // } catch (error) {
      //   console.warn('Token inválido o expirado, intentando refresh...');
      //   try {
      //     await tokenService.refreshAccessToken();
      //   } catch (refreshError) {
      //     console.error('Error al refrescar el token:', refreshError);
      //     authStore.clearSession();
      //     return next({ 
      //       name: 'Login',
      //       query: { redirect: to.fullPath }
      //     });
      //   }
      // }

      // 6. Permitir la navegación
      return next();

    } catch (error) {
      console.error('Error en la protección de rutas:', error);
      // authStore.clearSession();
      return next({ 
        name: 'Login',
        query: { redirect: to.fullPath }
      });
    }
  });

  // Guardia después de cada navegación
  router.afterEach((to) => {
    // Resetear el flag de verificación si estábamos en la página de loading
    if (to.name !== 'Loading') {
      isVerifyingSession = false;
    }
  });
};
