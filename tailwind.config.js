/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
      extend: {
        fontFamily: {
          glacial: ["Glacial_Indifference", "sans-serif"],
          sans: ["Glacial_Indifference", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
        },
      },
    },
    plugins: [],
  }
  