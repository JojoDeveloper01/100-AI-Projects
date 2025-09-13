import { createRouter, createWebHistory } from 'vue-router'
import Projects from '@/views/Projects.vue'
import Contact from '@/views/Contact.vue'
import Tradux from '@/views/Tradux.vue'

const routes = [
  {
    path: '/',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/tradux',
    name: 'Tradux',
    component: Tradux
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

export default router