const path = require('path');

const home = './template/Home';
const componentIndex = './template/ComponentIndex';
const component = './template/Component'

module.exports = {
	lazyLoad: true,
	pick: {
		ui(markdownData) {
			let { filename, title, subTitle } = markdownData.meta;
			if (!/^components\/ui\//.test(filename)) return;
			return {
				filename,
				title,
				subTitle
			};
		},
		util(markdownData) {
			let { filename, title, subTitle } = markdownData.meta;
			if (!/^components\/util\//.test(filename)) return;
			return {
				filename: filename,
				title,
				subTitle
			};
		},
	},
	plugins: [
		'bisheng-plugin-description',
		'bisheng-plugin-toc',
		'bisheng-plugin-react'
	],
	routes: [{
		path: '/',
		component: './template/layout',
		childRoutes: [{
			path: '/index',
			dataPath: '/components',
			component: home,
		}, {
			path: '/components/ui',
			component: componentIndex
		}, {
			path: '/components/ui/:children',
			component: component
		}, {
			path: '/components/ui/form/:children',
			component: component
		}, {
			path: '/components/ui/picker/:children',
			component: component
		}, {
			path: '/components/ui/modal/:children',
			component: component
		}, {
			path: '/components/util',
			component: componentIndex
		}, {
			path: '/components/util/:children',
			component: component
		}] 
	}]
};
