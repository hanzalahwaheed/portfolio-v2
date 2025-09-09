import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "instrument-serif-regular": ["InstrumentSerifRegular", "serif"],
        "instrument-serif-italic": ["InstrumentSerifItalic", "serif"],
        sans: ["var(--font-geist-sans)", "Arial", "Helvetica", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      textShadow: {
        glow: "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6), 0 0 30px rgba(255,255,255,0.4)",
        "glow-sm":
          "0 0 8px rgba(255,255,255,0.7), 0 0 16px rgba(255,255,255,0.5), 0 0 24px rgba(255,255,255,0.3)",
        "glow-xs":
          "0 0 6px rgba(255,255,255,0.6), 0 0 12px rgba(255,255,255,0.4), 0 0 18px rgba(255,255,255,0.2)",
      },
      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        glow: {
          "0%": {
            textShadow: "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff",
          },
          "50%": {
            textShadow: "0 0 20px #fff, 0 0 40px #fff, 0 0 60px #fff",
          },
          "100%": {
            textShadow: "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff",
          },
        },
      },
    },
  },
};

export default config;
