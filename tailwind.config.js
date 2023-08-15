module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
    borderRadius: {
      '4xl': '2rem',
    }
  },
  plugins: [],
};
