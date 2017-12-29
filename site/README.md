# 文档站点

- 使用 [bisheng](https://github.com/benjycui/bisheng) 进行构建
- bisheng 是用于构建文档站点的工具，通过读取并解析 md 文件生成 html 元素
- 关于 bisheng 的详细说明和介绍，请参见[官方文档](https://github.com/benjycui/bisheng/tree/master/docs)

## 目录结构
```
|—— build                   # bisheng build 产生的文件夹
|—— theme                   # bisheng 主题文件夹
|—— bisheng.config.js       # bisheng 配置文件
```

## config.js
```js
module.exports = {
	// 端口
	port: 8003,
	// 源文件
	source: {
		components: 'components'
	},
	// 编译输出目录
	output: './site/build',
	// 主题目录
	theme: './site/theme/',
	// 其他自定义主题配置，可在模板中通过 this.props.themeConfig 获取
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
	// 静态文件
	htmlTemplate: path.join(__dirname, './theme/static/template.html'),
	devServerConfig: {},
	// webpack 配置，此处可以修改 webpack 配置
	webpackConfig(config) {
		return config;
	},
	// build 生成的入口文件名
	entryName: 'index',
	// 网站根路径
	root: '/',
};
```

## 主题 theme
[详见](theme/README.md)