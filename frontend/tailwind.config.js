/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom spacing scale that matches our CSS variables
      spacing: {
        xs: "0.25rem", // 4px
        sm: "0.5rem", // 8px
        md: "0.75rem", // 12px
        lg: "1rem", // 16px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
        "3xl": "2rem", // 32px
        "4xl": "2.5rem", // 40px
        "5xl": "3rem", // 48px
        "6xl": "4rem", // 64px
        "7xl": "5rem", // 80px
        "8xl": "6rem", // 96px
        "9xl": "8rem", // 128px
        "10xl": "10rem", // 160px
      },

      // Custom height scale
      height: {
        xs: "1.5rem", // 24px
        sm: "2rem", // 32px
        md: "2.5rem", // 40px
        lg: "3rem", // 48px
        xl: "3.5rem", // 56px
        "2xl": "4rem", // 64px
        "3xl": "5rem", // 80px
        "4xl": "6rem", // 96px
        "5xl": "8rem", // 128px
        "6xl": "10rem", // 160px
        "7xl": "12rem", // 192px
        "8xl": "16rem", // 256px
        "9xl": "20rem", // 320px
        "10xl": "24rem", // 384px
      },

      // Custom width scale
      width: {
        xs: "1.5rem", // 24px
        sm: "2rem", // 32px
        md: "2.5rem", // 40px
        lg: "3rem", // 48px
        xl: "3.5rem", // 56px
        "2xl": "4rem", // 64px
        "3xl": "5rem", // 80px
        "4xl": "6rem", // 96px
        "5xl": "8rem", // 128px
        "6xl": "10rem", // 160px
        "7xl": "12rem", // 192px
        "8xl": "16rem", // 256px
        "9xl": "20rem", // 320px
        "10xl": "24rem", // 384px
      },

      // Custom container sizes
      maxWidth: {
        xs: "20rem", // 320px
        sm: "24rem", // 384px
        md: "28rem", // 448px
        lg: "32rem", // 512px
        xl: "36rem", // 576px
        "2xl": "42rem", // 672px
        "3xl": "48rem", // 768px
        "4xl": "56rem", // 896px
        "5xl": "64rem", // 1024px
        "6xl": "72rem", // 1152px
        "7xl": "80rem", // 1280px
        "8xl": "90rem", // 1440px
        "9xl": "100rem", // 1600px
      },

      // Custom breakpoints for better responsive design
      screens: {
        xs: "340px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
      },

      // Custom colors that match the existing design system
      colors: {
        "txt-green": "#0d6536",
        "txt-orange": "#f37521",
        "bg-green": "#4cba9b",
        "bg-green-light": "#e4fff0",
        "heading-txt": "#1d2f33",
        "txt-dark": "#1d2f33",
      },

      // Custom border radius
      borderRadius: {
        xs: "0.25rem",
        sm: "0.375rem",
        md: "0.5rem",
        lg: "0.625rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },

      // Custom font sizes for consistency
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],
      },

      // Custom box shadows
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        header: "0 8px 60px 0px #1d2f331a",
      },
    },
  },
  plugins: [],
};
