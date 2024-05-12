/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8511fa",
        darkColor: "#2C2C2C",
        darkHoverColor: "#1c1c1c",
      },
      backgroundColor: {
        "black-rgba": "rgba(0, 0, 0, .6)",
        darkModeColor: "#202020",
        darkModeHoverColor: "#1c1c1c",
      },
      screens: {
        xs: "425px",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
