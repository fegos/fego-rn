module.exports = {
  plugins: [
    '@babel/plugin-transform-flow-strip-types',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-env',
  ],
};
