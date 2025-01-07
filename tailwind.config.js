/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-color": "#488ef7",
        // "main-color": "#757575",
        "main-color-hover": "#0662d1",
        "text-color": "#111111",
        "body-color": "#fcfdff",
        "container-color": "#f0f2f7",
        "border-line-color": "#d1d6e3",
        "sidebar-color": "#f9fafc",

        // dark
        "dark-body": "#191919",
        "light-text-color": "#111111",
      },
      fontFamily: {
        LeagueSpartan: ["League Spartan", "sans-serif"],
        Custom_r: ["Custom_Sans_r", "sans-serif"],
        Custom_m: ["Custom_Sans_m", "sans-serif"],
        Custom_b: ["Custom_Sans_b", "sans-serif"],
        Custom_1xb: ["Custom_Sans_1xb", "sans-serif"],
        Custom_2xb: ["Custom_Sans_2xb", "sans-serif"],
      },
      animation: {
        spinLoader: "spin .4s linear infinite",
        spinSlow: "spin 1.3s linear infinite",
        "smooth-pulse": "smooth-pulse 1.5s ease-in-out infinite",
      },
      keyframes: {
        "smooth-pulse": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
      },
    },
  },
  plugins: [],
};
