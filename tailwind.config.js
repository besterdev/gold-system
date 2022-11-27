/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./core/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        black: {
          100: "#8B8B8B",
          200: "#595959",
          300: "#363636",
          400: "#183153",
          500: "#000000"
        },
        white: {
          100: "#FFFFFF",
          200: "#F8F8F8",
          300: "#F5F5F5",
        },
        grey: {
          100: "#E7E7E7",
          200: "#DBDBDB",
          300: "#A9A9A9",
        },
        primary: {
          100: "#FDCBBD",
          200: "#F04E23",
          300: "#D4421A",
        },
        orange: {
          100: "#FCCE87",
          200: "#F59120",
          300: "#E8741A",
        },
        yellow: {
          100: "#FFE288",
          200: "#FFC627",
          300: "#FE951B",
        },
        green: {
          100: "#9ED498",
          200: "#2A9C21",
          300: "#047A05",
        },
        red: {
          100: "#F89791",
          200: "#D10E0E",
          300: "#C30000",
        },
        blue: {
          100: "#A2EBEB",
          200: "#D10E0E",
          300: "#C30000",
        },
        purple: {
          100: "#B39DDC",
          200: "#673BB8",
          300: "#512EA9",
        },
        pink: {
          100: "#B39DDC",
          200: "#673BB8",
          300: "#512EA9",
        },

      },
    },
  },
  plugins: [],
}
