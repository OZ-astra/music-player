/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: { max: "639px" },
        md: { min: "640px" },
        lg: { min: "1024px" },
      },
      fontFamily: {
        redBold: ["bold", "sans-serif"],
        redSemiBold: ["semiBold", "sans-serif"],
        redRegular: ["regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
