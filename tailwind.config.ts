import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#EAE9E5",
        "bg-soft": "#DFDDD7",
        surface: "#F5F4F1",
        ink: "#141310",
        "ink-muted": "#57544D",
        line: "#CFCCC4",
        night: "#131211",
        "night-soft": "#1D1B18",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      maxWidth: {
        content: "1180px",
      },
      keyframes: {
        blink: {
          "0%, 88%, 100%": { transform: "scaleY(1)" },
          "92%": { transform: "scaleY(0.1)" },
        },
        drift: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
          "100%": { transform: "translateY(0px)" },
        },
      },
      animation: {
        blink: "blink 4.5s ease-in-out infinite",
        drift: "drift 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
