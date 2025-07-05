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
        sage: "#A8D5BA",            // Vert Sauge
        skyblue: "#A3D2CA",         // Bleu Ciel
        lavender: "#D5CFE1",        // Lavande Douce
        cloud: "#F6F9FC",           // Gris Nuage
        graphite: "#2E2E2E",        // Gris Graphite
        softpink: "#FADADD",        // Rose Pâle
        white: "#FFFFFF",
      },
      animationDelay: {
        200: '0.2s',
        400: '0.4s',
      },
    },
  },
  plugins: [],
}
