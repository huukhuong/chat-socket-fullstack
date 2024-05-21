module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'nativewind/babel',
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@languages': './src/languages',
          '@models': './src/models',
          '@pages': './src/pages',
          '@routers': './src/routers',
          '@services': './src/services',
          '@stores': './src/stores',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
