import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Tres from '@tresjs/core'
import { usePageMeta } from './composables/usePageMeta.js'

import 'highlight.js/styles/tokyo-night-dark.css'
import 'highlight.js/lib/common';
import hljsVuePlugin from "@highlightjs/vue-plugin";

const app = createApp(App)
app.use(router)
app.use(hljsVuePlugin)
app.use(Tres)

// Initialize default meta tags
const { setPageMeta } = usePageMeta()
setPageMeta({}) // This will apply the default meta from the composable

app.mount('body')
