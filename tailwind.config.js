/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // sans: ['"Open Sans"', 'Helvetica', 'Arial', 'sans-serif'], // Default 'sans' now uses Open Sans
        // // Optionally add custom names:
        // open: ['"Open Sans"', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
