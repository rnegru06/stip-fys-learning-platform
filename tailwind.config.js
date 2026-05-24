/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Source Serif 4"', "ui-serif", "Georgia", "serif"],
        sans: ['"IBM Plex Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        paper: {
          DEFAULT: "#faf8f3",
          2: "#f3efe5",
          3: "#ebe6d8",
        },
        ink: {
          DEFAULT: "#1a1d22",
          2: "#4b4e55",
          3: "#8a8d93",
        },
        rule: {
          DEFAULT: "#e1ddd2",
          2: "#d3cebe",
        },
        amber: {
          DEFAULT: "#c08418",
          2: "#a86c0a",
          tint: "#fbedc6",
          "tint-2": "#f6e3a8",
          surface: "#fdf6e2",
          border: "#e8c878",
        },
        brick: {
          DEFAULT: "#b04c34",
          2: "#8c3a25",
          tint: "#fadfd3",
          surface: "#fceee7",
          border: "#d99578",
        },
        lit: {
          DEFAULT: "#5a8a3a",
          2: "#3f6627",
          bg: "#dff3d8",
          surface: "#eff7e8",
        },
      },
      keyframes: {
        "cell-light": {
          "0%":   { transform: "scale(0.92)", opacity: "0", filter: "blur(4px)" },
          "60%":  { transform: "scale(1.03)", opacity: "1", filter: "blur(0)" },
          "100%": { transform: "scale(1)",    opacity: "1", filter: "blur(0)" },
        },
        "cell-glow": {
          "0%":   { boxShadow: "0 0 0 0 rgba(192,132,24,0.18)" },
          "40%":  { boxShadow: "0 0 24px 6px rgba(192,132,24,0.18)" },
          "100%": { boxShadow: "0 0 0 0 transparent" },
        },
        "outcome-fill": {
          "0%":   { transform: "translateY(4px)", opacity: "0" },
          "100%": { transform: "translateY(0)",   opacity: "1" },
        },
        "story-in": {
          "0%":   { transform: "translateY(-6px)", opacity: "0" },
          "100%": { transform: "translateY(0)",    opacity: "1" },
        },
        "frame-reveal": {
          "0%":   { transform: "translateY(4px) scale(0.96)", opacity: "0" },
          "100%": { transform: "translateY(0)    scale(1)",   opacity: "1" },
        },
      },
      animation: {
        "cell-light":   "cell-light 460ms cubic-bezier(.22,1,.36,1) both",
        "cell-glow":    "cell-glow 900ms ease-out both",
        "outcome":      "outcome-fill 380ms cubic-bezier(.22,1,.36,1) both",
        "story":        "story-in 380ms cubic-bezier(.22,1,.36,1) both",
        "frame-reveal": "frame-reveal 420ms cubic-bezier(.22,1,.36,1) both",
      },
    },
  },
  plugins: [],
};
