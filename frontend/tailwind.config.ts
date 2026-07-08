import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F4F5F7",
        surface: "#FFFFFF",
        border: "#E2E4E9",
        ink: {
          DEFAULT: "#1A1D29",
          soft: "#6B7280",
        },
        accent: {
          DEFAULT: "#4F46E5",
          light: "#EEF2FF",
          dark: "#3730A3",
        },
        status: {
          todo: "#6B7280",
          progress: "#4F46E5",
          done: "#16A34A",
        },
        priority: {
          high: "#DC2626",
          highBg: "#FEE2E2",
          medium: "#D97706",
          mediumBg: "#FEF3C7",
          low: "#6B7280",
          lowBg: "#F3F4F6",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "monospace"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
