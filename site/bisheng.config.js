const path = require('path');

module.exports = {
  port: 8003,
  source: {
    components: 'components',
  },
  output: './site/build',
  theme: './site/theme/',
  themeConfig: {
    rootLink: '/',
    siteTitle: 'Fego-RN 组件库',
    copyright: 'Fego',
    navigation: [{
      link: '/components/ui/',
      title: 'UI 组件',
      type: 'ui',
    }, {
      link: '/components/util/',
      title: 'Util 组件',
      type: 'util',
    }],
  },
  htmlTemplate: path.join(__dirname, './theme/static/template.html'),
  devServerConfig: {},
  webpackConfig(config) {
    return config;
  },
  entryName: 'index',
  root: '/sites/fego-rn/',
};
