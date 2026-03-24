/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#18181b",
        secondary: "#27272a",
        muted: "#f4f4f5",
        background: "#ffffff",
      }
    },
  },
  plugins: [],
}
