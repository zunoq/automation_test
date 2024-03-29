import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    redirect: '/',
    path: '/e',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '/login',
        component: () => import('pages/auth/LoginPage.vue'),
      },
      {
        path: '/register',
        component: () => import('pages/auth/RegisterPage.vue'),
      },
      {
        path: '/verify',
        component: () => import('pages/auth/VerifyPage.vue'),
      },
      {
        path: '/forgot-password',
        component: () => import('pages/auth/ForgotPassword.vue'),
      },
      {
        path: '/',
        component: () => import('pages/LandingPage.vue'),
      },
      {
        path: '/system-error',
        component: () => import('pages/error/ErrorInternalServer.vue'),
      },
      {
        path: '/network-error',
        component: () => import('pages/error/ErrorNetwork.vue'),
      },
      {
        path: '/no-permission',
        component: () => import('pages/error/ErrorNoPermission.vue'),
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
        component: () => import('pages/scan/ScanPage.vue'),
      },
      {
        path: '/scan/:groupResultID',
        component: () => import('pages/scan/GroupResult.vue'),
      },
      {
        path: '/scan/:groupResultID/:TargetResultID',
        component: () => import('pages/scan/TargetResult.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/error/ErrorNotFound.vue'),
  },
];

export default routes;
