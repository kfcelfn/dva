import dynamic from 'dva/dynamic';

const app = window.app

export const Home = dynamic({
  app,
  models: () => [
    import('@/models/home'),
  ],
  component: () => import('@/pages/home'),
})

export const Error = dynamic({
  app,
  models: () => [
    import('@/models/error'),
  ],
  component: () => import('@/pages/error'),
})

export const Tables = dynamic({
  app,
  models: () => [
    import('@/models/table'),
  ],
  component: () => import('@/pages/table'),
})