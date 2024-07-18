/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#7F4F24',
        secondary:'#A68A64',
        accent:'#C2C5AA',
        white:'#FFFFFF',
        black:'#1E1E1E',
        gray:'#717171'
      },
      fontFamily:{
        poppins:['Poppins','sans-serif']
      }
    },
  },
  plugins: [],
}