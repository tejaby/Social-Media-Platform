/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8511fa",
      },
      backgroundColor: {
        "black-rgba": "rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
