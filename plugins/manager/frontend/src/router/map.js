const map = [
  {
    path: '/login',
    name: 'login',
    title: '登录',
    component: () => import('@/views/login/login.vue'),
  },
  {
    path: '/',
    name: 'index',
    title: '首页',
    redirect: '/dashboard',
    component: () => import('@/views/main/index.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component:  () => import('@/views/dashboard/index.vue'),
      },
    ],
  },
  {
    path: '/manager/login',
    name: 'login2',
    title: '登录',
    component: () => import('@/views/login/login.vue'),
  },
];
export default map;
