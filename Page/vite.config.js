import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { routesConfig } from './src/config/routes.js'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    // Custom plugin to generate HTML files with meta tags for static deployment
    {
      name: 'generate-meta-html',
      closeBundle() {
        // Generate HTML for each route after build
        routesConfig.forEach(route => {
          const meta = route.meta
          const metaTagsHtml = `
      <title>${meta.title}</title>
      <meta name="description" content="${meta.description}">
      <meta property="og:title" content="${meta.title}">
      <meta property="og:description" content="${meta.description}">
      <meta property="og:image" content="${meta.image}">
      <meta property="og:url" content="https://100aiprojects.dev${route.path}">
      <meta property="og:type" content="website">
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="${meta.title}">
      <meta name="twitter:description" content="${meta.description}">
      <meta name="twitter:image" content="${meta.image}">
      <link rel="canonical" href="https://100aiprojects.dev${route.path}">
    `

          // Read the built index.html
          const indexPath = path.resolve('dist/index.html')
          if (fs.existsSync(indexPath)) {
            let html = fs.readFileSync(indexPath, 'utf-8')
            html = html.replace('<!--meta-tags-->', metaTagsHtml)

            // Save route-specific HTML files
            if (route.path === '/') {
              fs.writeFileSync(indexPath, html)
            } else {
              const routeDir = path.resolve('dist' + route.path)
              if (!fs.existsSync(routeDir)) {
                fs.mkdirSync(routeDir, { recursive: true })
              }
              fs.writeFileSync(path.join(routeDir, 'index.html'), html)
            }
          }
        })
        console.log('✅ Generated meta tags for all routes')
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@@': fileURLToPath(new URL('../', import.meta.url))
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-three': ['three'],
          'vendor-highlight': ['highlight.js'],
          'vendor-vue': ['vue', 'vue-router'],
          'vendor-utils': ['tradux']
        }
      }
    },
    sourcemap: false,
    minify: 'esbuild'
  }
})