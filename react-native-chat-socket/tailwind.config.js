const colors = require('./src/utils/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors,
    },
    // fontFamily: {
    //   bold: ['signika_bold'],
    //   light: ['signika_light'],
    //   medium: ['signika_medium'],
    //   regular: ['signika_regular'],
    //   semiBold: ['signika_semi_bold'],
    // },
  },
  plugins: [],
};
