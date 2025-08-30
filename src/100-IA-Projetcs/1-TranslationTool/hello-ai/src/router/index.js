import { createRouter, createWebHistory } from 'vue-router'
import EasyTranslate from '../views/EasyTranslate.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'EasyTranslate',
      component: EasyTranslate,
    },
  ],
})

export default router
