import fs from 'node:fs/promises'
import express from 'express'
import { t, getCurrentLanguage } from 'tradux'

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : ''

// Create http server
const app = express()

// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
}

// Serve HTML
app.use('*all', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    /** @type {string} */
    let template
    /** @type {import('./src/entry-server.js').render} */
    let render
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.js')).render
    } else {
      template = templateHtml
      render = (await import('./dist/server/entry-server.js')).render
    }

    const rendered = await render(url)

    // Tradux meta logic
    const page = url.split('/').filter(Boolean)[0] || ''
    const traduxLang = req.headers.cookie?.split('; ').find(c => c.startsWith('tradux_lang='))?.split('=')[1] || 'en'
    const lang = await getCurrentLanguage(traduxLang)

    const title = page ? t[page]?.title_meta ?? t.title_meta : t.title_meta
    const description = page ? t[page]?.description_meta ?? t.description_meta : t.description_meta
    const keywords = page ? t[page]?.keywords_meta ?? t.keywords_meta : t.keywords_meta
    const image = page && page !== 'contact'
      ? `https://100aiprojects.dev/shots/${page}_shot.png`
      : 'https://100aiprojects.dev/shots/100_AI_Projects_shot.png'

    const traduxHead = `
      <title>${title}</title>
      
      <meta name="theme-color" content="#0f0f21">
      <meta name="description" content="${description}">
      <meta name="keywords" content="${keywords}">
      <meta name="author" content="Joseth Balcazar">

      <meta property="og:site_name" content="${title}">
      <meta property="og:title" content="${title}">
      <meta property="og:description" content="${description}">
      <meta property="og:image" content="${image}">
      <meta property="og:type" content="website">
      <meta property="og:url" content="${image}">
      
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="${title}">
      <meta name="twitter:description" content="${description}">
      <meta name="twitter:image" content="${image}">
    `

    let html = template
      .replace(/<html lang=".*?">/, `<html lang="${lang}">`)
      .replace(`<!--app-head-->`, traduxHead + (rendered.head ?? ''))
      .replace(`<!--app-html-->`, rendered.html ?? '')

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
