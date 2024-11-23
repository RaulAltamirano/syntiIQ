import { createRouter, createWebHistory } from 'vue-router';
import { RouteRecordRaw } from 'vue-router';
import mainRoutes from '../modules/home/router/mainRoutes';
import authRoutes from '../modules/auth/routes/authRoutes';
import Login from '../modules/auth/pages/Login/Login.vue';


// const errorNotFoundRoute: RouteRecordRaw = {
//   path: '/:catchAll(.*)*',
//   component: Home,
// };

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  
  ...authRoutes,
  ...mainRoutes,

  {
    path: '/:catchAll(.*)*',
    redirect: '/'
  },
  // errorNotFoundRoute,

];

// Router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard (optional but recommended)
// router.beforeEach((to, from, next) => {
//   // Add your authentication logic here
//   console.log(next(), to, from);
//   next();
// });

export default router;