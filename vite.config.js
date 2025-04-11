import { defineConfig } from 'vite'
import htmlInject from 'vite-plugin-html-inject' // <-- Change to default import
// import react from '@vitejs/plugin-react' // Or your framework plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    htmlInject() // <-- This should now work
  ],
  // plugins: [react()], // Or your framework plugin
  base: '/', // <--- Updated repository name
  server: {
    open: true, // Automatically open the browser
    port: 3000
  }
}) 