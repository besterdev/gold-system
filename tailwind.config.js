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
        primary: {
          100: "#C8FACD",
          200: "#5BE584",
          300: "#00AB55",
          400: "#007B55",
          500: "#005249"
        },
        secondary: {
          100: "#D6E4FF",
          200: "#84A9FF",
          300: "#3366FF",
          400: "#1939B7",
          500: "#091A7A"
        },
        grey: {
          100: "#F9FAFB",
          200: "#F4F6F8",
          300: "#DFE3E8",
          400: "#C4CDD5",
          500: "#919EAB",
          600: "#637381",
          700: "#454F5B",
          800: "#212B36",
          900: "#161C24"
        },
        info: {
          100: "#CAFDF5",
          200: "#61F3F3",
          300: "#00B8D9",
          400: "#006C9C",
          500: "#003768"
        },
        success: {
          100: "#D8FBDE",
          200: "#86E8AB",
          300: "#36B37E",
          400: "#1B806A",
          500: "#0A5554"
        },
        warning: {
          100: "#FFF5CC",
          200: "#FFD666",
          300: "#FFAB00",
          400: "#B76E00",
          500: "#7A4100"
        },
        error: {
          100: "#FFE9D5",
          200: "#FFAC82",
          300: "#FF5630",
          400: "#B71D18",
          500: "#7A0916"
        },
      },
      boxShadow: {
        'card': 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px'
      },
      keyframes: {
        'ripple-effect': {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(10)', opacity: 0.375 },
          '100%': { transform: 'scale(35)', opacity: 0 },
        },
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
        'fade-in-effect': {
          '0%': { transform: 'scale(0) block', opacity: 0 },
          '100%': { transform: 'scale(1) ', opacity: 1 }
        },
        'fade-out-effect': {
          '100%': { transform: 'scale(1)', opacity: 1 },
          '0%': { transform: 'scale(0) hidden', opacity: 0 }

        }
      },
      animation: {
        'ripple': '1.2s ease 1 forwards ripple-effect',
        'waving-hand': 'wave 2s linear infinite',
        'fade-in': 'fade-in-effect  0.4s',
        'fade-out': 'fade-in-effect  0.4s'
      },
    },
  },
  plugins: [require('tailwind-scrollbar'),],
  variants: {
    scrollbar: ['rounded']
  }
}
