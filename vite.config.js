import { defineConfig } from 'vite'
import htmlInject from 'vite-plugin-html-inject' // <-- Change to default import
import { resolve } from 'path'
// import react from '@vitejs/plugin-react' // Or your framework plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    htmlInject() // <-- This should now work
  ],
  // plugins: [react()], // Or your framework plugin
  base: '/<repository-name>/', // <--- UPDATE THIS LINE
  server: {
    open: true, // Automatically open the browser
    port: 3000
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        installation: resolve(__dirname, 'installation.html'),
        imprint: resolve(__dirname, 'imprint.html'),
        // Add other HTML files here if needed
      },
    },
  // outDir defaults to 'dist', which matches your workflow
  // outDir: 'dist',
  }
}) 