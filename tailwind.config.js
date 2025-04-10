const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}", "./src/**/*.{html,js}"], // Adjust according to your project structure
  theme: {
    extend: {
      colors: {
        'brand-purple-highlight': '#cdb9f4', // Example: Light Violet
        'brand-purple-light': '#8a3ffc', // Example: Light Violet
        'brand-purple-medium': '#6511EB',  // Example: Dark Violet
        'brand-purple-dark': '#2a0050',  // Example: Dark Violet
        'brand-purple-middark': '#140039', // Example: Slightly darker
        'brand-purple-darkest': '#020008', // Example: Very Dark Violet
        'brand-cyan': '#22D3EE',         // Example: Cyan
        'brand-gray-full': '#fff',   // Example: Cool Gray 300
        'brand-gray-light': '#e0e0e0',   // Example: Cool Gray 300
        'brand-gray-medium': '#a0a0a0',  // Example: Cool Gray 500
        'brand-gray-dark': '#1a1a1a',    // Example: Cool Gray 800
      },
      fontFamily: {
        // Set Roboto Flex as the default sans-serif font
        sans: ['"Roboto Flex"', ...defaultTheme.fontFamily.sans],
        // Define Parkinsans as a separate font family for headings or specific use
        heading: ['"Parkinsans"', ...defaultTheme.fontFamily.sans], // Fallback to sans

      },
      fontSize: {
        regxl: ['1.375rem', { lineHeight: '1.364em' }],
      },
      fontWeight: {
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
        'gradient-linear-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))', // If you need specific named linear gradients
      },
      container: {
        center: true,
        padding: '1rem', // Default padding for containers
      },
      borderRadius: { // Example: Add custom border radius if needed
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
} 