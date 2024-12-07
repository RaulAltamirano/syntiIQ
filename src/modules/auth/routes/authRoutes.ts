import { RouteRecordRaw } from 'vue-router';
import AuthLayout from '../../shared/layouts/AuthLayout/AuthLayout.vue';

const authRoutes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: AuthLayout,
    meta: { requiresAuth: false },
    children: [
      {
        path: 'login',
        name: 'Login',
        meta: {
          requiresAuth: false,
          title: 'Login'
        },
        component: () => import(/* webpackChunkName: "login-module" */ '../../auth/pages/Login/Login.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        meta: {
          requiresAuth: false,
          title: 'Register'
        },
        component: () => import(/* webpackChunkName: "register-module" */ '../../auth/pages/Register/Register.vue'),
      },
    ],
  },
];


export default authRoutes;
