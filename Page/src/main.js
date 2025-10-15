import "./assets/main.css"

import { createApp } from "vue"
import App from "./App.vue"
import { createAppRouter } from "./router"
import Tres from "@tresjs/core"
import hljsVuePlugin from "@highlightjs/vue-plugin"
import { createHead } from '@unhead/vue/client'

import "highlight.js/styles/tokyo-night-dark.css"
import "highlight.js/lib/common"

const app = createApp(App)
const router = createAppRouter()
const head = createHead()

app.use(router)
app.use(head)
app.use(hljsVuePlugin)
app.use(Tres)

router.isReady().then(() => {
    app.mount("body")
})
