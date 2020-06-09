import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    meta: { requireAuth: true },
    redirect: { path: '/activity' },
  },
  {
    path: '/squareLottery',
    name: 'squareLottery',
    meta: { requireAuth: true },
    redirect: { path: '/squareLottery/config' },
    component: () => import(/* webpackChunkName: "squareLottery" */ '../views/squareLottery/index.vue'),
    children: [
      {
        path: 'config',
        name: 'config',
        meta: { requireAuth: true },
        component: () => import(/* webpackChunkName: "config" */ '../views/squareLottery/config.vue'),
      },
      {
        path: 'win',
        name: 'win',
        meta: { requireAuth: true },
        component: () => import(/* webpackChunkName: "win" */ '../views/squareLottery/win.vue'),
      },
      {
        path: 'lose',
        name: 'lose',
        meta: { requireAuth: true },
        component: () => import(/* webpackChunkName: "lose" */ '../views/squareLottery/lose.vue'),
      },
    ],
  },
  {
    path: '/activity',
    name: 'activity',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "activity" */ '../views/activity.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
