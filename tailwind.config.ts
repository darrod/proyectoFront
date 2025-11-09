import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f7ff",
          100: "#e0efff",
          200: "#badaff",
          300: "#8ac5ff",
          400: "#52a8ff",
          500: "#1b8aff",
          600: "#006ee6",
          700: "#0053ad",
          800: "#003b7a",
          900: "#00284f"
        },
        secondary: {
          50: "#fff5ed",
          100: "#ffe8d6",
          200: "#ffcfac",
          300: "#ffb27d",
          400: "#ff9654",
          500: "#ff7a2b",
          600: "#e05c13",
          700: "#a8420d",
          800: "#6f2a06",
          900: "#381503"
        }
      },
      fontFamily: {
        sans: ["'Inter'", "system-ui", "sans-serif"],
        display: ["'Playfair Display'", "Georgia", "serif"]
      }
    }
  },
  plugins: []
};

export default config;

