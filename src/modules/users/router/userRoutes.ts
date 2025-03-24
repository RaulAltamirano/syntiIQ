import DefaultLayout from '@/modules/shared/layouts/DefaultLayout/DefaultLayout.vue';
import { RouteRecordRaw } from 'vue-router';

export const userRoutes: RouteRecordRaw[] = [
  {
    path: '/users',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/users',
        name: 'Users',
        meta: {
          requiresAuth: true,
          roles: ['admin'],
          title: 'Users'
        },
        component: () => import(/* webpackChunkName: "users-module" */ '../../users/pages/Users.vue'),
      },
      {
        path: 'add',
        name: 'AddUser',
        component: () => import(/* webpackChunkName: "add-user-module" */ '../pages/FormUser/FormUser.vue'),
      },
      {
        path: 'edit/:id',
        name: 'EditUser',
        component: () => import(/* webpackChunkName: "edit-user-module" */ '../pages/FormUser/FormUser.vue'),
      },
      {
        path: 'dashboard/:id',
        name: 'UserDashboard',
        component: () => import(/* webpackChunkName: "user-dashboard-module" */ '../pages/UserDashboard/UserDashboard.vue'),
      },
    ],
  },
];
