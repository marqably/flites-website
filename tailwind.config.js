const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'brand-purple-highlight': '#cdb9f4',
        'brand-purple-light': '#8a3ffc',
        'brand-purple-medium': '#6511EB',
        'brand-purple-dark': '#2a0050',
        'brand-purple-middark': '#140039',
        'brand-purple-darkest': '#020008',
        'brand-cyan': '#22D3EE',
        'brand-gray-full': '#fff',
        'brand-gray-light': '#e0e0e0',
        'brand-gray-medium': '#a0a0a0',
        'brand-gray-dark': '#1a1a1a',  
      },
      fontFamily: {
        sans: ['"Roboto Flex"', ...defaultTheme.fontFamily.sans],
        heading: ['"Parkinsans"', ...defaultTheme.fontFamily.sans],

      },
      fontSize: {
        regxl: ['1.375rem', { lineHeight: '1.364em' }],
      },
      fontWeight: {
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
        'gradient-linear-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
      },
      container: {
        center: true,
        padding: '1rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
} 