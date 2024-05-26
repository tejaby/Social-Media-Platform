/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        colorHover: "#e7e7e8",
        DarkColor: "#15202B",
        darkColorHover: "#2C3640",

        PrimaryColor: "#7856FF",
        PrimaryColorHover: "#6C4DE6",
        SecondaryColor: "#463B95",

        lightOverlayColor: "rgba(153, 153, 153, 0.6)",
        darkOverlayColor: "rgba(49, 64, 78, 0.6)",

        secondaryText: "#677682",
        secondaryTextDark: "#8B98A5",

        colorError: "#F4212E",
      },
      screens: {
        xs: "425px",
      },
      flexBasis: {
        "1/10": "10%",
        30: "30%",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
