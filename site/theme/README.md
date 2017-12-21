# Bisheng 主题模板

- bisheng 是用于构建文档站点的工具，通过读取并解析 md 文件生成 html 元素
- 关于 bisheng 的主题具体可以参见官方的说明 [one theme for bisheng](https://github.com/benjycui/bisheng/tree/master/packages/bisheng-theme-one)

## 目录结构
```bash
theme
├── index.js # 配置文件, 必需
├── static # 样式文件夹
	├── common # 默认基础样式文件夹
	├── component.less # 组件文档页样式
	├── home.less # 首页样式
	├── layout.less # 布局样式
	├── md.less # markdown 文件里涉及到代码的样式
    └── template.html # 模板页
└── template # 用于渲染网页的 jsx 文件
	├── layout # 布局文件
		├── Footer.jsx # 页尾文件
		├── Header.jsx # 页头文件
		└── index.jsx
	├── Component.jsx # 单个组件的页面
	├── ComponentIndex.jsx # 组件索引页
	├── Home.jsx # 首页
	├── NotFound.jsx # 出错页面，必须
	└── index.jsx
```

## `index.js`

`index.js` 包含路由信息 `routes` 和其他一些配置

```js
module.exports = {
	// 懒加载
	lazyLoad: true,
	// 路由信息，必需
	routes: {
		path: '/',
		component: './template/layout',
		childRoutes: [{
			path: '/components/ui',
			component: './template/ComponentIndex'
			dataPath: '/components/ui',
		}],
	},
	pick: {
		archive(markdownData) { ... },
		...
	},
	plugins: ['bisheng-plugin-react', ...],
	...
};
```

## 启动服务
```bash
$ npm run site
```
