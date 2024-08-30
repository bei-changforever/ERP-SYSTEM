import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { RouterItem } from './modules/index'
const routes: Array<RouteRecordRaw> = [

  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    children: RouterItem,
    component: () => import('@/views/dashboard/index.vue'),
    redirect: '/dashboard/upload'
  },
  {
    path: "/:pathMatch(.*)",
    component: () => import("../views/404/index.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  else {
    document.title = 'WMS'
  }
  next()
})

export default router
