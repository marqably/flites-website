import { defineConfig } from 'vite'
import htmlInject from 'vite-plugin-html-inject' // <-- Change to default import
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    htmlInject()
  ],
  base: '/',
  server: {
    open: true,
    port: 3000
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        installation: resolve(__dirname, 'installation.html'),
        imprint: resolve(__dirname, 'imprint.html'),
      },
    },
  }
}) 