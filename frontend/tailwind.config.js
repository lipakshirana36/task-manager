/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#f5f4f2",
        ink: "#22252a",
        accent: "#3b5bfd",
        done: "#2f9e5a",
        warn: "#e0a72e",
        danger: "#e0552e",
      },
    },
  },
  plugins: [],
};
