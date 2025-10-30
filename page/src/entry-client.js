import './assets/main.css'
import hljsVuePlugin from "@highlightjs/vue-plugin";
import { createApp } from './main'

const { app } = createApp()

app.use(hljsVuePlugin)
app.mount('body')
