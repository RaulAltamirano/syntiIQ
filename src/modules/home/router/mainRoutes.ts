import { RouteRecordRaw } from 'vue-router';
import DefaultLayout from '../../shared/layouts/DefaultLayout/DefaultLayout.vue';


const mainRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: { 
          requiresAuth: true,
          roles: ['user', 'admin'],
          title: 'Dashboard'
        },
        component: () => import(/* webpackChunkName: "home-module" */ '../../home/pages/Home.vue'),
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import(/* webpackChunkName: "cart-module" */ '../../products/components/Cart/Cart.vue'),
      },
      {
        path: '/wishlist',
        name: 'Wishlist',
        component: () => import(/* webpackChunkName: "wishlist-module" */ '../../home/pages/Home.vue'),
      },
      {
        path: '/products',
        name: 'Products',
        component: () => import(/* webpackChunkName: "products-module" */ '../../products/pages/Products/Products.vue'),
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "profile-module" */ '../../profile/page/Profile/Profile.vue'),
      },
    ],
  },
];

export default mainRoutes