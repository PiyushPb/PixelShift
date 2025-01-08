const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light Mode Colors
        primary: "#0077ff",
        secondary: "#0099ff",
        "primary-text": "#1c1e21",
        "secondary-text": "#616161",
        accent: "#ff6f61", // Updated Accent Color
        background: "#ffffff",
        "secondary-background": "#f5f5f5",
        borders: "#d1d9e6",

        // Dark Mode Colors
        "primary-dark": "#1e3a8a",
        "secondary-dark": "#0066cc",
        "primary-text-dark": "#e0e0e0",
        "secondary-text-dark": "#a0a0a0",
        "accent-dark": "#ff6f61", // Updated Dark Mode Accent Color
        "background-dark": "#0a0a0a",
        "secondary-background-dark": "#1a1a1a",
        "borders-dark": "#4b5364",
      },
    },
  },
  darkMode: "class",
  plugins: [],
});
