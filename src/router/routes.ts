import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    redirect: '/',
    path: '/e',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '/signin',
        component: () => import('pages/SignIn.vue'),
      },
      {
        path: '/signup',
        component: () => import('pages/SignUp.vue'),
      },
      {
        path: '/',
        component: () => import('pages/LandingPage.vue'),
      },
    ],
  },
  {
    path: '/m',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/dashboard',
        component: () => import('pages/DashboardPage.vue'),
      },
      {
        path: '/scan',
        component: () => import('pages/ScanPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
