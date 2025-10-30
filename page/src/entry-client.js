import './assets/main.css'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import 'highlight.js/lib/common'
import 'highlight.js/styles/tokyo-night-dark.css'

import { createApp } from './main'

const { app } = createApp()

app.use(hljsVuePlugin)
app.mount('body')
