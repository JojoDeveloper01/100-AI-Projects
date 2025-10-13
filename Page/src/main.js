import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Tres from '@tresjs/core'

import 'highlight.js/styles/tokyo-night-dark.css'
import 'highlight.js/lib/common';
import hljsVuePlugin from "@highlightjs/vue-plugin";

const app = createApp(App)
app.use(router)
app.use(hljsVuePlugin)
app.use(Tres)
app.mount('body')
