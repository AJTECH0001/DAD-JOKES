/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "person-background":
          "linear-gradient(to bottom, #FEFAF6 0%, #FEFAF6 40%, #8b4513 40%, #8b4513 45%, #DAC8A3 45%, #DAC0A3 100%)",
      },
      colors: {
        primaryDark: "#102057",
        secondaryDark: "#DACBA3",
        secondaryLight: "#EADBC8",
        primaryLight: "#FEFAF6",
      },
      fontFamily: {
        sans: ["Comic Neue", "sans-serif"],
      },
    },
  },
  plugins: [],
};
