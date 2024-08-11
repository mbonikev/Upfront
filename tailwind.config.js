/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "main-color" : "#0066ff",
        "main-color-hover" : "#0662d1",
        "text-color" : "#00112b",
        "body-color" : "#fcfdff",
        "container-color" : "#f0f2f7",
        "border-line-color" : "#d1d6e3",
      },
      fontFamily: {
        'LeagueSpartan' : ['League Spartan', 'sans-serif'],
      }

    },
  },
  plugins: [],
}

