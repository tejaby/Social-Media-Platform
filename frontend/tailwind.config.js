/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Agregar colores personalizados usando extend
        background: "#FFFFFF",
        primary: "#000000",
        backgroundDark: "#000000",
        secondary: "#FFFFFF",
        backgroundSecondary: "#03A9F4",
        hoverEffect: "#03A9F4",
      },
    },
  },
  plugins: [],
};
