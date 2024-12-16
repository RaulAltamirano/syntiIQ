/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",        // Si usas Vite o archivos HTML en la raíz
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Escanea todos los archivos Vue, JS, TS, JSX, y TSX en `src`
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

