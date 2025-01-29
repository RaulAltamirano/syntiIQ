import { createRouter, createWebHistory } from 'vue-router';
import { RouteRecordRaw } from 'vue-router';

import mainRoutes from '../modules/home/router/mainRoutes';
import authRoutes from '../modules/auth/routes/authRoutes';
import Login from '../modules/auth/pages/Login/Login.vue';
import NotFoundRoute from '../modules/shared/components/NotFoundRoute/NotFoundRoute.vue';
import NotPermissionRoute from '../modules/shared/components/NotPermissionRoute/NotPermissionRoute.vue';
import LoadingView from '../modules/shared/pages/LoadingView/LoadingView.vue';
import { setupRouterGuards } from '../modules/auth/guard/setupRouterGuards';

const errorNotFoundRoute: RouteRecordRaw = {
  path: '/:catchAll(.*)*',
  component: NotFoundRoute,
};
const errorNotPermissionRoute: RouteRecordRaw = {
  path: '/403',
  component: NotPermissionRoute,
};
const LoadingViewRoute: RouteRecordRaw = {
  path: '/loading',
  name: 'Loading',
  component: LoadingView,
};

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  ...authRoutes,
  ...mainRoutes,
  LoadingViewRoute,
  errorNotFoundRoute,
  errorNotPermissionRoute,

];

// Router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});


setupRouterGuards(router);

export default router;