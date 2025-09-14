export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        background: "#0A0A12",
        "accent-blue": "#29A8FF",
        "accent-purple": "#6C63FF",
        "card-bg": "#14141F",
        "card-border": "#2A2A3A",
        critical: "#FF4757",
        warning: "#FFAB2D",
        success: "#2ED47A",
        info: "#29A8FF",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      gradientColorStops: {
        'accent-start': '#29A8FF',
        'accent-end': '#6C63FF',
      },
    },
  },
  plugins: [],
}