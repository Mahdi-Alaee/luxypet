import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mainPurple: "#D500F9",
        darkestPurple: "#4A148C",
        bgColor: '#BDBDBD'
      },
      fontFamily: {
        sans: ["vazir", "sans-serif"],
        vazirBold: ["vazir-bold", "sans-serif"],
        vazirLight: ["vazir-light", "sans-serif"],
        vazirMedium: ["vazir-medium", "sans-serif"],
        vazirThin: ["vazir-thin", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
