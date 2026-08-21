/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#f4f6fa',
        'blue-light': '#bfdbfe',   // biru muda (Tailwind blue-200)
        'blue-medium': '#60a5fa',  // biru sedang (blue-400)
        'blue-dark': '#1e3a8a',    // biru tua (blue-900)
        'purple-light': '#c4b5fd', // ungu muda (purple-200)
        'purple-medium': '#a78bfa',// ungu sedang (purple-400)
        'purple-dark': '#5b21b6',  // ungu tua (purple-700)
        'text-primary': '#1e293b', // slate-800
      }
    },
  },
  plugins: [],
}