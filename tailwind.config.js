/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Custom colors that match our design tokens
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#1968b3", // Our custom primary
          600: "#1557a0",
          700: "#11468d",
          800: "#0d357a",
          900: "#0c2d5a",
        },
        // Keep Tailwind's default grays but add our custom mappings
        neutral: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
      // Custom font families
      fontFamily: {
        primary: ['"IBM Plex Sans"', "sans-serif"],
        heading: ['"Hedvig Letters Serif"', "serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      // Custom spacing that matches our design tokens
      spacing: {
        18: "4.5rem", // 72px
        21: "5.25rem", // 84px - for h-21 class
        22: "5.5rem", // 88px - for h-22 class
        88: "22rem", // 352px
        128: "32rem", // 512px
      },
      // Custom container sizes
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
          xl: "2.5rem",
          "2xl": "3rem",
        },
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1200px", // Our custom max-width
        },
      },
      // Custom border radius
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      // Custom shadows
      boxShadow: {
        soft: "0 2px 10px rgba(0, 0, 0, 0.1)",
        medium: "0 4px 20px rgba(0, 0, 0, 0.15)",
        strong: "0 10px 40px rgba(0, 0, 0, 0.2)",
      },
      // Custom transitions
      transitionDuration: {
        150: "150ms",
        250: "250ms",
      },
      // Custom z-index values - Fixed for Tailwind v4
      zIndex: {
        dropdown: "1000",
        sticky: "1020",
        fixed: "1030", // This creates z-fixed class
        "modal-backdrop": "1040",
        modal: "1050",
        popover: "1060",
        tooltip: "1070",
      },
    },
  },
  plugins: [],
};
