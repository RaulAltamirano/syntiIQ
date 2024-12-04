import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '../modules/auth/stores/authStore';
import { useTokenService } from '../modules/auth/composables/tokenService';
import { useTokenStorage } from '../modules/services/composables/useTokenStorage';

import mainRoutes from '../modules/home/router/mainRoutes';
import authRoutes from '../modules/auth/routes/authRoutes';
import Login from '../modules/auth/pages/Login/Login.vue';
import NotFoundRoute from '../modules/shared/components/NotFoundRoute/NotFoundRoute.vue';
import NotPermissionRoute from '../modules/shared/components/NotPermissionRoute/NotPermissionRoute.vue';

const errorNotFoundRoute: RouteRecordRaw = {
  path: '/:catchAll(.*)*',
  component: NotFoundRoute ,
};
const errorNotPermissionRoute: RouteRecordRaw = {
  path: '/403',
  component: NotPermissionRoute ,
};

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  ...authRoutes,
  ...mainRoutes,
  errorNotFoundRoute,
  errorNotPermissionRoute,

];

// Router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});



// router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
//   const authStore = useAuthStore();
//   const { getStoredTokens, clearTokens } = useTokenStorage();
//   const tokenService = useTokenService();
  
//   // Verificar si la ruta requiere autenticación
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   const requiredRoles = to.meta.roles as string[] | undefined;

//   try {
//     if (!requiresAuth) {
//       console.log(to.path);
//       if (authStore.isAuthenticated && to.path.startsWith('/auth')) {
//         return next({ name: 'Dashboard' });
//       }
//       return next();
//     }

//     const tokens = getStoredTokens();
//     if (!tokens) {
//       console.warn('Tokens no encontrados');
//       return next({ name: 'Login' }); 
//     }

//     if (tokenService.isTokenExpired(tokens.accessToken)) {
//       console.info('Token expirado, intentando refrescar...');
//       try {
//         await tokenService.refreshTokens();
//       } catch (error) {
//         console.error('Error al renovar el token:', error);
//         clearTokens();  
//         return next({ name: 'Login' }); 
//       }
//     }

//     // if (requiredRoles?.length) {
//     //   const hasRequiredRole = requiredRoles.some(role => authStore.hasRole(role));  
//     //   if (!hasRequiredRole) {
//     //     console.warn('Acceso denegado: Roles insuficientes');
//     //     return next({ path: '/403' });  
//     //   }
//     // }

//     // Continuar con la navegación si todo es correcto
//     return next();

//   } catch (error) {
//     console.error('Error en la protección de ruta:', error);
//     return next({ name: 'Login' }); 
//   }
// });


// Navigation guard (optional but recommended)
// router.beforeEach((to, from, next) => {
//   // Add your authentication logic here
//   console.log(next(), to, from);
//   next();
// });

export default router;