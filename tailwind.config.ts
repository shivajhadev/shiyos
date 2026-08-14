import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand accent
        amber: {
          DEFAULT: "#F5B92E",
          light: "#F9D06C",
          dark: "#C48A00",
        },
        // Light mode
        "light-bg": "#FAFAF8",
        "light-surface": "#F4F4F2",
        "light-card": "#EEEEEC",
        "light-text": "#111214",
        "light-text-muted": "#4F4534",
        "light-border": "rgba(17,18,20,0.10)",
        // Dark mode (deep forest green)
        "dark-bg": "#0B1F16",
        "dark-surface": "#0E241A",
        "dark-card": "#12291F",
        "dark-card-high": "#162E23",
        "dark-text": "#E8F0EA",
        "dark-text-muted": "#9DB8A4",
        "dark-border": "rgba(232,240,234,0.10)",
        // Stitch palette
        primary: "#7A5900",
        "primary-container": "#F5B92E",
        "on-surface": "#1A1C1B",
        outline: "#827561",
      },
      fontFamily: {
        serif: ['"Libre Caslon Text"', "Georgia", "serif"],
        sans: ['"Hanken Grotesk"', "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["64px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-lg-mobile": ["40px", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
        "headline-md": ["32px", { lineHeight: "1.3", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "1.6" }],
        "body-md": ["16px", { lineHeight: "1.5" }],
        "label-sm": ["12px", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "600" }],
      },
      spacing: {
        "container-max": "1280px",
        "section-y": "120px",
        "section-y-sm": "80px",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.04), 0 1px 8px rgba(0,0,0,0.04)",
        "card-hover": "0 4px 20px rgba(0,0,0,0.08)",
        amber: "0 0 24px rgba(245,185,46,0.25)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "counter-up": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "fade-in-up": "fade-in-up 0.5s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
