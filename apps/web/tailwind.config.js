const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");
const { join } = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      "{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}"
    ),
    ...createGlobPatternsForDependencies(__dirname)
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2a9d8f",
          hover: "#24897f"
        },
        secondary: {
          DEFAULT: "#f4a261",
          hover: "#f3954e"
        },
        accent: {
          DEFAULT: "#e76f51",
          hover: "#e56040"
        },
        neutral: {
          text: "#264653", // Charcoal
          100: "#F9FAFB",
          200: "#F3F4F6",
          300: "#E5E7EB",
          400: "#D1D5DB",
          500: "#9CA3AF",
          600: "#6B7280",
          700: "#4B5563",
          800: "#374151",
          900: "#1F2937"
        },
        warning: "#e9c46a", // Saffron
        success: "#22c55e",
        error: "#ef4444"
      },
      fontFamily: {
        sans: [
          "Inter",
          "Hind Siliguri",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji"
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace"
        ],
        display: ["Montserrat", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
};
