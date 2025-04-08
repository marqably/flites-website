import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react' // Or your framework plugin

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [react()], // Or your framework plugin
  base: '/flites-website/', // <--- Updated repository name
  server: {
    open: true, // Automatically open the browser
    port: 3000
  }
}) 