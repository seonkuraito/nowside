const defaultTheme = require('tailwindcss/defaultTheme')
const svgToDataUri = require('mini-svg-data-uri')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // false, 'class', 'media'
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Noto Sans TC', ...defaultTheme.fontFamily.sans], // 載入 Noto Sans TC
        'chillax': ['Chillax', ...defaultTheme.fontFamily.sans], // 載入 Chillax
      },
      colors: {
        white: '#FFFFFF',
        C_black: '#202020',
        C_red: '#F75147',
        C_gray: {
          100: '#F9F9F9',
          200: '#EFEFEF',
          300: '#E5E5E5',
          400: '#D8D8D8',
          500: '#BBBBBB',
          600: '#ADADAD',
          700: '#949494',
          800: '#808080',
          900: '#616161',
        },
        C_blue: {
          100: '#F4FAFF',
          200: '#E6F3FF',
          300: '#89AECD',
          400: '#6E92AF',
          500: '#567792',
          600: '#3B5B77',
          700: '#2C4458',
          800: '#1D2C3A',
          900: '#15202A',
        },
        C_green: {
          100: '#DFF5F1',
          200: '#C0EBE3',
          300: '#A1E2D5',
          400: '#63CEB9',
          500: '#40C3A9',
          600: '#33A28C',
          700: '#287F6E',
          800: '#236E5F',
          900: '#1D5C50',
        },
      },
      fontSize: {
        '2xs': '0.25rem',
        'xs': '0.5rem',
        'sm': '0.75rem',
        'md': '1rem',
        'lg': '1.25rem',
        'xl': '1.5rem',
        '2xl': '1.75rem',
        '3xl': '2rem',
        '4xl': '3rem',
      },
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        bold: '700',
      },
      screens: {
        'limit': { 'min': '320px' },
        // => @media (min-width: 320px) { ... }
        'mobile': { 'min': '321px', 'max': '768px', },
        // => @media (min-width: 321px and max-width: 768px) { ... }
        'desktop': { 'min': '769px' },
        // => @media (min-width: 769px) { ... }
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px', // rounded 預設 8px
        lg: '16px',
        full: '9999px',
      },
      backgroundImage: (theme) => ({
        'multiselect-caret': `url("${svgToDataUri(
          `<svg viewBox="0 0 320 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg>`,
        )}")`,
        'multiselect-spinner': `url("${svgToDataUri(
          `<svg viewBox="0 0 512 512" fill="${theme('colors.green.500')}" xmlns="http://www.w3.org/2000/svg"><path d="M456.433 371.72l-27.79-16.045c-7.192-4.152-10.052-13.136-6.487-20.636 25.82-54.328 23.566-118.602-6.768-171.03-30.265-52.529-84.802-86.621-144.76-91.424C262.35 71.922 256 64.953 256 56.649V24.56c0-9.31 7.916-16.609 17.204-15.96 81.795 5.717 156.412 51.902 197.611 123.408 41.301 71.385 43.99 159.096 8.042 232.792-4.082 8.369-14.361 11.575-22.424 6.92z"></path></svg>`,
        )}")`,
        'multiselect-remove': `url("${svgToDataUri(
          `<svg viewBox="0 0 320 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path></svg>`,
        )}")`,
      })
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'class',
    }),
  ],
}
