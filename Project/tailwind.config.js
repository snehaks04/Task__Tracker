/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        shade:'#c6ac8f',
        ishade:'#eae0d5',
        gg:"#8c8b90",
        oo:"#e79925",
        g:'#42a81e',
        bb:'#353976',
        p:'#f68871',
        btn:"#25689c",
        grayy:"#5c5866",
        nutrall:"#dfdbfe",
        lightgray:"#dadada"
      }
    },
  },
  plugins: [],
}

