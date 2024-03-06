/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-bg": "#121212",
        "dark-secondary": "#1E1E1E",
        "text-primary": "#E0E0E0",
        "text-secondary": "#B3B3B3",
        highlight: "#BB86FC",
        warning: "#CF6679",
        success: "#4CAF50",
        info: "#64B5F6",
        "info-dark": "#42A5F5",
        "border-color": "#292929",
        "success-dark": "#388E3C",
        "warning-dark": "#A64453",
      },
      backgroundImage: {
        'logo': "url('/src/assets/logo-3.jpeg')",
      },
    },
  },
  plugins: [],
};
