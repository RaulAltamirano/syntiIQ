import DefaultLayout from '@/modules/shared/layouts/DefaultLayout/DefaultLayout.vue';
import { RouteRecordRaw } from 'vue-router';

export const storeRoutes: RouteRecordRaw[] = [
  {
    path: '/store',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '', // path vacío para usar como dashboard por defecto
        name: 'StoreDashboard',
        meta: {
          requiresAuth: true,
          roles: ['admin'],
          title: 'Store Dashboard'
        },
        component: () =>
          import(
            /* webpackChunkName: "store-dashboard" */ '../pages/storeDashboard/storeDashboard.vue'
          ),
      },
      {
        path: 'add',
        name: 'AddStore',
        meta: {
          requiresAuth: true,
          roles: ['admin'],
          title: 'Add Store'
        },
        component: () =>
          import(
            /* webpackChunkName: "add-store" */ '../pages/StoreForm/StoreForm.vue'
          ),
      },
      {
        path: 'edit/:id',
        name: 'EditStore',
        meta: {
          requiresAuth: true,
          roles: ['admin'],
          title: 'Edit Store'
        },
        component: () =>
          import(
            /* webpackChunkName: "edit-store" */ '../pages/StoreForm/StoreForm.vue'
          ),
      },
    ],
  },
];
