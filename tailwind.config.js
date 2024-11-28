/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "main-color" : "#0166ff",
        "main-color-hover" : "#0662d1",
        "text-color" : "#2e394a",
        "body-color" : "#fcfdff",
        "container-color" : "#f0f2f7",
        "border-line-color" : "#d1d6e3",
        "sidebar-color": "#f9fafc",

        // dark
        "dark-body": "#1f2020",
      },
      fontFamily: {
        'LeagueSpartan' : ['League Spartan', 'sans-serif'],
      },
      animation: {
        spinLoader: "spin .4s linear infinite",
        spinSlow: "spin 1.3s linear infinite",
      },

    },
  },
  plugins: [],
}

