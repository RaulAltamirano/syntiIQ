/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",   
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8",
        success: "#4ADE80",
        warning: "#FBBF24",
        error: "#F87171",
      },
    },
  },
  plugins: [],

}

