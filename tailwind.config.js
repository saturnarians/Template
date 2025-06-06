/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],  // Avoid Google Fonts
      },
      colors: {
        // You can add custom colors here
      },
      spacing: {
        // You can add custom spacing here
      },
    },
  },
  plugins: [],
}
