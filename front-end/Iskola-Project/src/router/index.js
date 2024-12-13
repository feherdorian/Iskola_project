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
      path: '/kartyak',
      name: 'kartyak',
      component: () => import('../views/KartyakView.vue')
    },
    {
      path: '/kereso',
      name: 'kereso',
      component: () => import('../views/KeresoView.vue')
    }
  ]
})

export default router
