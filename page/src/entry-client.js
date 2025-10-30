import './assets/main.css'
import 'highlight.js/lib/common'
import 'highlight.js/styles/tokyo-night-dark.css'
import hljsVuePlugin from '@highlightjs/vue-plugin'

import { createApp } from './main'

const { app } = createApp()

app.use(hljsVuePlugin)
app.mount('body')
