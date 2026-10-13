import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          burgundy: "#A20A3A",
          burgundyDark: "#85072F",
          burgundyDeep: "#6B0525",
          burgundyLight: "#FFF0F4",
          burgundyMuted: "#C42555",
          orange: "#FF9933",
          orangeDark: "#F47216",
          orangeLight: "#FFF7ED",
          orangeSoft: "#FFE6D1",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#FAF8F9",
          muted: "#F5F2F4",
          border: "#E8E2E5",
          borderDark: "#D8D0D4",
        },
        neutral: {
          primary: "#292329",
          secondary: "#625B60",
          muted: "#8A8288",
          light: "#B8B0B6",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
        display: ["Outfit", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(41, 35, 41, 0.05), 0 1px 2px rgba(41, 35, 41, 0.03)",
        card: "0 4px 20px -2px rgba(162, 10, 58, 0.05), 0 2px 6px -1px rgba(41, 35, 41, 0.04)",
        cardHover: "0 10px 25px -4px rgba(162, 10, 58, 0.1), 0 4px 10px -2px rgba(41, 35, 41, 0.05)",
        highlight: "0 0 0 3px rgba(255, 153, 51, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
