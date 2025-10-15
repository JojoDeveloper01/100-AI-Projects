import { createRouter, createWebHistory } from 'vue-router'
import Projects from '@/views/Projects.vue'
import Contact from '@/views/Contact.vue'
import Tradux from '@/views/Tradux.vue'
import { usePageMeta } from '@/composables/usePageMeta.js'

const routes = [
  {
    path: '/',
    name: 'Projects',
    component: Projects,
    meta: {
      title: '100 AI Projects - AI Development Portfolio',
      description: 'Explore a comprehensive collection of 100 artificial intelligence projects showcasing cutting-edge AI technologies, machine learning implementations, and innovative solutions.',
      image: '/shots/100_AI_Projects_shot.png'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      title: '100 AI Projects - Contact',
      description: 'Get in touch with the 100 AI Projects team. Connect with us for collaborations, questions, or discussions about artificial intelligence and machine learning projects.',
      image: '/shots/100_AI_Projects_shot.png'
    }
  },
  {
    path: '/tradux',
    name: 'Tradux',
    component: Tradux,
    meta: {
      title: 'Tradux - Intelligent Translation Management Library',
      description: 'Discover Tradux, a powerful JavaScript library for intelligent translation management. Automate multilingual workflows with AI-powered translation updates and seamless internationalization.',
      image: '/shots/tradux_shot.png'
    }
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

router.beforeEach((to, from, next) => {
  const { setPageMeta } = usePageMeta()

  if (to.meta) {
    // Get current URL for meta tags
    const currentUrl = window.location.origin + to.fullPath

    setPageMeta({
      title: to.meta.title,
      description: to.meta.description,
      image: to.meta.image,
      url: currentUrl
    })
  }

  next()
})

export default router