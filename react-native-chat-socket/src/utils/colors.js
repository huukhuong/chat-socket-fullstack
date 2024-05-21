const tailwindColors = require('tailwindcss/colors');
delete tailwindColors.lightBlue
delete tailwindColors.warmGray
delete tailwindColors.trueGray
delete tailwindColors.coolGray
delete tailwindColors.blueGray

const colors = {
  ...tailwindColors,
  primary: '#013B71',
  gradientLight: '#3E52A1',
  gradientDark: '#000000',
  tint: tailwindColors.gray[100],
  placeholder: tailwindColors.gray[400],
};
module.exports = colors;
