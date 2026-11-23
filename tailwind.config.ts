import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        // Escala de grises propia (fría, con contraste AA para texto secundario).
        gray: {
          50: "#f6f8fa",
          100: "#eaeef2",
          200: "#dde3ea",
          300: "#bcc4cd",
          400: "#8b949e",
          500: "#7d8590",
          600: "#545d68",
          700: "#30363d",
          800: "#1c2128",
          900: "#12161c",
          950: "#07090d",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#dc2626", // red-600
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#1f2937", // gray-800
          foreground: "#f9fafb", // gray-50
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#374151", // gray-700
          foreground: "#d1d5db", // gray-300
        },
        accent: {
          DEFAULT: "#ef4444", // red-500
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#111827", // gray-900
          foreground: "#f9fafb", // gray-50
        },
        card: {
          DEFAULT: "#1f2937", // gray-800
          foreground: "#f9fafb", // gray-50
        },
        // Colores personalizados para el tema de ciberseguridad
        cyber: {
          red: {
            50: "#fef2f2",
            100: "#fee2e2",
            200: "#fecaca",
            300: "#fca5a5",
            400: "#f87171",
            500: "#ef4444",
            600: "#dc2626",
            700: "#b91c1c",
            800: "#991b1b",
            900: "#7f1d1d",
          },
          gray: {
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
            950: "#030712",
          },
        },
      },
      // Un solo radio para tarjetas y controles; rounded-full queda para chips.
      borderRadius: {
        sm: "0.25rem",
        md: "0.375rem",
        lg: "0.375rem",
        xl: "0.375rem",
        "2xl": "0.375rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
