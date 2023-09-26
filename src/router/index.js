import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../account/components/login.component.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../account/components/account.component.vue')
    },
    {
      path: '/facebook',
    },
    {
      path: '/instagram',
    },
    {
      path: '/tiktok',
    },
    {
      path: '/404',
      name: 'Page not Found',
      component: () => import('../public/components/404.component.vue')
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/404'
    }
  ]
})

export default router
