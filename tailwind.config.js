/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'sparkles': "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none'/%3e%3ccircle fill='%23FFFFFF' cx='600' cy='400' r='1'/%3e%3ccircle fill='%23FFFFFF' cx='100' cy='100' r='1'/%3e%3ccircle fill='%23FFFFFF' cx='200' cy='500' r='0'/%3e%3ccircle fill='%23FFFFFF' cx='900' cy='200' r='1'/%3e%3ccircle fill='%23FFFFFF' cx='1300' cy='300' r='1'/%3e%3ccircle fill='%23FFFFFF' cx='1100' cy='50' r='1'/%3e%3c/svg%3e\")"
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      },
      colors: {
        // We are replacing your 'brand' object with this 'primary' object.
        // It's built around your specific brand color: #00B67A.
        primary: {
          '50': '#f0fdf8',
          '100': '#dcfceb',
          '200': '#bbf7d6',
          '300': '#86efb9',
          '400': '#4ade94',
          '500': '#22c57a',
          '600': '#00b67a', // Your brand color
          '700': '#059669',
          '800': '#067655',
          '900': '#065f46',
          '950': '#022c22',
        },
        // You can keep your old 'brand' colors if you use them elsewhere,
        // but the component specifically needs 'primary'.
        brand: {
          green: '#00B67A',
          black: '#000000',
          white: '#ffffff',
        },
      },
    },
  },
  plugins: [],
};