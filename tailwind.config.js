/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-purple-highlight': '#cdb9f4', // Example: Light Violet
        'brand-purple-light': '#8a3ffc', // Example: Light Violet
        'brand-purple-dark': '#2a0050',  // Example: Dark Violet
        'brand-purple-middark': '#140039', // Example: Slightly darker
        'brand-purple-darkest': '#020008', // Example: Very Dark Violet
        'brand-cyan': '#22D3EE',         // Example: Cyan
        'brand-gray-light': '#e0e0e0',   // Example: Cool Gray 300
        'brand-gray-medium': '#a0a0a0',  // Example: Cool Gray 500
        'brand-gray-dark': '#1a1a1a',    // Example: Cool Gray 800
      },
      fontFamily: {
        // You might want to add a specific font here if needed
        sans: ['Inter', 'sans-serif'], // Example: Set a default sans-serif font
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
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