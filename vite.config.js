import { defineConfig } from 'vite'
import htmlInject from 'vite-plugin-html-inject'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    htmlInject(),
  ],
  base: '/',
  server: {
    open: true,
    port: 3000
  },
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        installation: resolve(__dirname, 'installation.html'),
      },
    },
  },
  publicDir: 'public',
}) 