module.exports = {
  // preset: 'react-native',
  setupFiles: [
    './__tests__/enzyme.setup.js',
  ],
  moduleFileExtensions: [
    'js',
    'jsx',
  ],
  testPathIgnorePatterns: [
    'node_modules',
    'example',
  ],
  testRegex: '(/components/.*test)\\.js?$',
};
