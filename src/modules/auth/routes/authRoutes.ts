import { RouteRecordRaw } from 'vue-router';
import AuthLayout from '../../shared/layouts/AuthLayout/AuthLayout.vue';


const authRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login-module" */ '../../auth/pages/Login/Login.vue'),
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "register-module" */ '../../auth/pages/Register/Register.vue'),
      },
    ],
  },
];


export default authRoutes;
