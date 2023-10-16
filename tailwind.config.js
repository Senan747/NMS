/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      keyframes: {
        pulse: {
          "0%": { opacity: 0 },
          "50%": { opacity: 0.5 },
          "100%": { opacity: 1 },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        new: {
          from: { top: "384px" },
          to: { top: "0px" },
        },
        height: {
          from: {height: "0px"},
          to: {height: "100%"}
        },
        fadeIn: {
          "0%": {
            transform: "translate(-1px, -1px)",
          },
          "100%": {
            transform: "translate(0, 0, 0, 0)",
          },
        },
      },
      animation: {
        pulse: "pulse 0.5s linear",
        wiggle: "wiggle 10s linear",
        fadeIn: "fadeIn 0.25s infinite ease-in-out",
        height: "height 0.7s ease-in-out"
      },
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
        Fira: ["Fira Sans", "sans-serif"],
        Pacifico: ["Pacifico", "cursive"],
        Josefin: ['Josefin Sans', 'sans-serif'],
        Cairo: ['Cairo', 'sans-serif']
      },
      backgroundImage: {
        "eye-makeup": "url('/eye-makeup.jpg')",
        image: "url('/bg.jpg')",
      },
      borderRadius: {
        75: "75%",
        50: "50%",
        30: "30%",
      },
      borderWidth: {
        1: "1px",
        0.5: "0.5px",
      },
      colors: {
        "gega-red": "#bc1a45",
        "gega-melon": "#ffd369",
        "gega-grey": "#dddddd",
        "gega-white": "#f7f7f7",
        "gega-black": "#1F1F1F",
        "gega-light": "#999999",
        "gega-green": "#28E98C",
        "gega-dark": "#191919",
        "gega-soft": "#EFD1CE",
        "gega-pink": "#D9A6A0",
        "gega-rose": "#B45965",
        "gega-cameo": "#DBA8B7",
        "gega-earth-red": "#95414E",
        "gega-star": "#FFC000",
        "gega-bg": "#B59677",
        "gega-light-grey": "#DBDBDB",
        "gega-museum": "#E3D4AE",
        "gega-earth": "#852505",
        "gega-orange": "#DA9500",
        "gega-bg": "#FBF6EE",
        "gega-green": "#908951",
        "gega-navbar": "#DDCAB9",
        "gega-dark-red": "#9B3727"
      },
    },
  },
  plugins: [],
};