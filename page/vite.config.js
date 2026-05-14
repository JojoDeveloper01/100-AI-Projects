import { templateCompilerOptions } from "@tresjs/core";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
const isSplineElement = (tag) => tag === "spline-viewer";

export default defineConfig({
  plugins: [
    vue({
      ...templateCompilerOptions,
      template: {
        ...templateCompilerOptions.template,
        compilerOptions: {
          ...templateCompilerOptions.template?.compilerOptions,
          isCustomElement: isSplineElement,
        },
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          "vue-vendor": ["vue", "vue-router"],
          "three-vendor": ["three", "@tresjs/core"],
          "hljs-vendor": ["highlight.js", "@highlightjs/vue-plugin"],
          "tradux-vendor": ["tradux"],
        },
      },
    },
  },
});
