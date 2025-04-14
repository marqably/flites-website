import { defineConfig } from 'vite'
import htmlInject from 'vite-plugin-html-inject'
import { resolve } from 'path'

// Define a custom plugin for injecting head scripts
const injectHeadScriptsPlugin = () => {
  return {
    name: 'vite-plugin-inject-head-scripts',
    // This hook allows transforming the index.html file
    transformIndexHtml(html) {
      const headScripts = process.env.FLITES_HEAD_SCRIPTS;

      if (headScripts) {
        // Inject the scripts just before the closing </head> tag
        return html.replace(
          /<\/head>/,
          `${headScripts}\n</head>`
        );
      }
      // Return the original HTML if the variable is not set
      return html;
    }
  };
};

export default defineConfig({
  plugins: [
    htmlInject(),
    injectHeadScriptsPlugin()
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