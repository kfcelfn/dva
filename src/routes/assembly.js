import dynamic from 'dva/dynamic';

const app = window.app

export const Tables = dynamic({
  app,
  models: () => [
    import('@/models/table'),
  ],
  component: () => import('@/pages/table'),
})
