import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
    borderRadius: {
      none: "0",
      DEFAULT: "0",
    },
    boxShadow: {
      none: "none",
    },
    extend: {
      colors: {
        water: "var(--water)",
        shallows: "var(--shallows)",
        land: "var(--land)",
        ink: "var(--ink)",
        steel: "var(--steel)",
        slate: "var(--slate)",
        light: "var(--light)",
        white: "var(--white)",
        signal: "var(--signal)",
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "Arial", "sans-serif"],
      },
      transitionTimingFunction: {
        arrive: "var(--ease-arrive)",
        move: "var(--ease-move)",
        standard: "var(--ease-standard)",
        exit: "var(--ease-exit)",
        drift: "var(--ease-drift)",
      },
      transitionDuration: {
        instant: "var(--dur-instant)",
        quick: "var(--dur-quick)",
        base: "var(--dur-base)",
        slow: "var(--dur-slow)",
        reveal: "var(--dur-reveal)",
        opening: "var(--dur-opening)",
      },
      spacing: {
        18: "72px",
        30: "120px",
        40: "160px",
        48: "192px",
        64: "256px",
      },
      maxWidth: {
        container: "var(--container)",
        measure: "66ch",
        legal: "68ch",
      },
    },
  },
  plugins: [],
};

export default config;
