  import { createRouter, createWebHistory } from 'vue-router';
import authRoutes from '../modules/auth/routes/authRoutes';
import mainRoutes from '../modules/home/router/mainRoutes';
  
  const routes = [
    ...authRoutes,
    ...mainRoutes,
    { path: '/:catchAll(.*)', redirect: '/login' }, 
  ];
  
  const router = createRouter({
    history: createWebHistory('example'),
    routes,
  });
  
  export default router;
  