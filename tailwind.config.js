/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'), 
  ],
  // Optional: daisyUI config
  daisyui: {
    themes: ["light", "dark", "cupcake"], 
  },
}