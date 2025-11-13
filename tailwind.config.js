/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui"],
      },
      colors: {
        brand: {
          DEFAULT: "#10b981",
          foreground: "#064e3b",
        },
        primary: "#10b981",
        secondary: "#06b6d4",
        accent: "#f59e0b",
      },
      backgroundImage: {
        "app-gradient":
          "radial-gradient(1200px 600px at 10% -10%, rgba(16,185,129,0.15), transparent 70%), radial-gradient(800px 400px at 100% 10%, rgba(59,130,246,0.15), transparent 60%), linear-gradient(to bottom, #ffffff 0%, #ecfdf5 100%)",
        "gradient-primary": "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
        "gradient-secondary":
          "linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)",
        "gradient-dark": "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        "gradient-card":
          "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(240,253,250,0.6) 100%)",
      },
      backgroundClip: {
        text: "background-clip: text",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(2,6,23,0.08)",
        glass: "0 8px 30px rgba(0,0,0,0.08)",
        glow: "0 0 30px rgba(16,185,129,0.3)",
        "glow-blue": "0 0 30px rgba(59,130,246,0.3)",
        "glow-purple": "0 0 30px rgba(168,85,247,0.3)",
        premium: "0 20px 50px rgba(16,185,129,0.15)",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-in",
        "slide-up": "slideUp 0.8s ease-out",
        "slide-down": "slideDown 0.6s ease-out",
        float: "float 3s ease-in-out infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "scale-in": "scaleIn 0.5s ease-out",
        shimmer: "shimmer 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      spacing: {
        "safe-top": "max(1rem, env(safe-area-inset-top))",
        "safe-bottom": "max(1rem, env(safe-area-inset-bottom))",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["emerald", "dark"],
    darkTheme: "dark",
  },
};
