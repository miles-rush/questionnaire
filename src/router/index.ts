import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../components/Base.vue')
  },
  {
	path: '/main',
	name: 'Main',
	component: () => import('../components/Main.vue')
  },
  { path: '/', redirect: { name: 'Main' } }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
