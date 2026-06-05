import type { Config } from "tailwindcss";

/**
 * Tailwind theme for "Polski World".
 *
 * The palette is intentionally moody and premium: deep midnight backgrounds
 * offset by two signature neon accents — `neon` (hot pink, used to mark the
 * *changing suffix* in declensions) and `cyan` (electric cyan, used for the
 * stable word base and interactive chrome). These two colors are the heart of
 * the "syntax highlighting" learning mechanic.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep, sophisticated background tones.
        ink: {
          900: "#070512", // deepest backdrop
          800: "#0c0a1f",
          700: "#13102b",
          600: "#1b1638",
          500: "#241d49",
        },
        // Signature accents.
        neon: {
          DEFAULT: "#ff3d9a", // hot pink — marks the changing suffix
          soft: "#ff7ac0",
        },
        cyber: {
          DEFAULT: "#22d3ee", // electric cyan — base words & chrome
          soft: "#7defee",
        },
        gold: "#ffd166", // streak / completion accent
        lime: "#a3e635", // "correct" feedback
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(34,211,238,0.25), 0 0 40px -8px rgba(34,211,238,0.55)",
        "glow-neon":
          "0 0 0 1px rgba(255,61,154,0.35), 0 0 45px -8px rgba(255,61,154,0.6)",
        "glow-gold":
          "0 0 0 1px rgba(255,209,102,0.45), 0 0 50px -10px rgba(255,209,102,0.7)",
        card: "0 20px 60px -25px rgba(0,0,0,0.85)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "aurora":
          "radial-gradient(1200px 600px at 15% -10%, rgba(255,61,154,0.18), transparent 60%), radial-gradient(1000px 500px at 90% 10%, rgba(34,211,238,0.16), transparent 55%), radial-gradient(900px 700px at 50% 120%, rgba(124,58,237,0.18), transparent 60%)",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
