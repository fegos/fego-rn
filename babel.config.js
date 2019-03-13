module.exports = {
  plugins: [
    '@babel/plugin-transform-flow-strip-types',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        root: [
          './',
        ],
        alias: {
          'fego-rn': './components',
        },
      },
    ],
  ],
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-env',
  ],
};
