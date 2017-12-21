const path = require('path');

module.exports = {
	port: 8003,
	source: {
		components: 'components'
	},
	output: './site/output',
	theme: './site/theme/',
	themeConfig: {
		rootLink: '/index',
		siteTitle: 'Fego-RN 组件库',
		copyright: 'Fego',
		navigation: [{
			link: '/components/ui',
			title: 'UI 组件'
		}, {
			link: '/components/util',
			title: 'Util 组件'
		}]
	},
	htmlTemplate: path.join(__dirname, './theme/static/template.html'),
	devServerConfig: {},
	webpackConfig(config) {
		return config;
	},
	entryName: 'index',
	root: '/',
};