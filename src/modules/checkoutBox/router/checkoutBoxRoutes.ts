import CheckoutBoxLayout from '@/modules/shared/layouts/CheckoutBoxLayout/CheckoutBoxLayout.vue';
import { RouteRecordRaw } from 'vue-router';

const ROLES = {
    ADMIN: 'admin',
};

const BASE_PATH = '/cashier';

const salesViewRoutes: RouteRecordRaw[] = [
    {
        path: 'sales',
        name: 'cashier-sales',
        meta: {
            requiresAuth: true,
            roles: [ROLES.ADMIN],
            title: 'Sales'
        },
        component: () => import(/* webpackChunkName: "sales-view" */ '../page/SalesView/SalesView.vue'),
    },
    {
        path: 'returns',
        name: 'cashier-returns',
        meta: {
            requiresAuth: true,
            roles: [ROLES.ADMIN],
            title: 'Returns'
        },
        component: () => import(/* webpackChunkName: "returns-view" */ '../page/ReturnsView/ReturnsView.vue'),
    },
    {
        path: 'register',
        name: 'cashier-register',
        meta: {
            requiresAuth: true,
            roles: [ROLES.ADMIN],
            title: 'CashRegister'
        },
        component: () => import(/* webpackChunkName: "register-view" */ '../page/CashRegister/CashRegister.vue'),
    },
    {
        path: 'credits',
        name: 'cashier-credits',
        meta: {
            requiresAuth: true,
            roles: [ROLES.ADMIN],
            title: 'Credits'
        },
        component: () => import(/* webpackChunkName: "credits-view" */ '../page/CustomerCredit/CustomerCredit.vue'),
    },
    {
        path: 'history',
        name: 'cashier-history',
        meta: {
            requiresAuth: true,
            roles: [ROLES.ADMIN],
            title: 'SalesHistory'
        },
        component: () => import(/* webpackChunkName: "history-view" */ '../page/SalesHistory/SalesHistory.vue'),
    },
    {
        path: 'inventory',
        name: 'cashier-inventory',
        meta: {
            requiresAuth: true,
            roles: [ROLES.ADMIN],
            title: 'InventoryManagement'
        },
        component: () => import(/* webpackChunkName: "inventory-view" */ '../page/InventoryManagement/InventoryManagement.vue'),
    },
    {
        path: 'reports',
        name: 'cashier-reports',
        meta: {
            requiresAuth: true,
            roles: [ROLES.ADMIN],
            title: 'Reports'
        },
        component: () => import(/* webpackChunkName: "reports-view" */ '../page/ReportsCheckout/ReportsCheckout.vue'),
    },
];

export const checkoutBoxRoutes: RouteRecordRaw[] = [
    {
        path: BASE_PATH,
        component: CheckoutBoxLayout,
        meta: { requiresAuth: true },
        children: salesViewRoutes,
    },
];