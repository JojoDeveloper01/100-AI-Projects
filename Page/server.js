import fs from 'node:fs/promises'
import express from 'express'
import { routeMetaData } from './src/config/routes.js'

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

// Create http server
const app = express()

// Add Vite middleware for development
if (!isProduction) {
    const { createServer } = await import('vite')
    const vite = await createServer({
        server: { middlewareMode: true },
        appType: 'custom',
        base
    })
    app.use(vite.middlewares)
} else {
    const compression = (await import('compression')).default
    const sirv = (await import('sirv')).default
    app.use(compression())
    app.use(base, sirv('./dist', { extensions: [] }))
}

// Handle all routes - just inject meta tags, let Vue handle the rest
app.use(async (req, res, next) => {
    // Skip if it's a static file request
    if (req.url.includes('.') && !req.url.includes('.html')) {
        return next()
    }

    try {
        const url = req.originalUrl
        const route = url.split('?')[0] // Remove query params

        // Get meta data for this route
        const meta = routeMetaData[route] || routeMetaData['/']
        const currentUrl = `${req.protocol}://${req.get('host')}${url}`

        // Read the HTML template
        let template
        if (!isProduction) {
            template = await fs.readFile('./index.html', 'utf-8')
        } else {
            template = await fs.readFile('./dist/index.html', 'utf-8')
        }

        // Generate meta tags HTML
        const metaTagsHtml = `
      <title>${meta.title}</title>
      <meta name="description" content="${meta.description}">
      <meta property="og:title" content="${meta.title}">
      <meta property="og:description" content="${meta.description}">
      <meta property="og:image" content="${meta.image}">
      <meta property="og:url" content="${currentUrl}">
      <meta property="og:type" content="website">
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="${meta.title}">
      <meta name="twitter:description" content="${meta.description}">
      <meta name="twitter:image" content="${meta.image}">
      <link rel="canonical" href="${currentUrl}">
    `

        // Replace placeholder with meta tags
        const responseHtml = template.replace(`<!--meta-tags-->`, metaTagsHtml)

        res.status(200).set({ 'Content-Type': 'text/html' }).send(responseHtml)
    } catch (e) {
        console.log(e.stack)
        res.status(500).end(e.stack)
    }
})

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})