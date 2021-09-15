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
  {
	path:'/list',
	name:'List',
	component: () => import('../components/List.vue')
  },
  { path: '/', redirect: { name: 'Home' } }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
