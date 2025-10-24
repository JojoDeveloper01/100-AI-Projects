import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import Terminal from "vite-plugin-terminal";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    ...(process.env.NODE_ENV === 'development' ? [Terminal({
      console: 'terminal',
      output: ['terminal', 'console']
    })] : [])
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
  },
  server: {
    middlewareMode: 'ssr'
  },
  vue: {
    compilerOptions: {
      isCustomElement: tag => tag === 'spline-viewer'
    }
  }
})