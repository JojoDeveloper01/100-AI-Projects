import { createSSRApp } from 'vue'
import { createAppRouter } from './router'
import App from './App.vue'
import Tres from '@tresjs/core'

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp() {
  const app = createSSRApp(App)
  const router = createAppRouter()

  app.use(router)
  app.use(Tres)

  return { app, router }
}
