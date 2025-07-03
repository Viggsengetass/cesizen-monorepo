/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Composants
    "./app/**/*.{js,ts,jsx,tsx}", // Pages app-dir
  ],
  theme: {
    extend: {
      fontSize: {
        base: "16px",
        sm: "14px",
        h1: "32px",
        h2: "24px",
      },
      colors: {
        sage: "#A8D5BA",
        skyblue: "#A3D2CA",
        lavender: "#D5CFE1",
        cloud: "#F6F9FC",
        graphite: "#2E2E2E",
        softpink: "#FADADD",
      },
      animationDelay: {
        200: '0.2s',
        400: '0.4s',
      },
    },
  },
  plugins: [],
};
