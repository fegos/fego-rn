# demo
- 使用 fego-rn 的示例 demo
- 兼容 ios 和 android 两端


## 目录结构

```
|—— android                   # android 原生工程
|—— ios                       # ios 原生工程
|—— app                       # demo 源代码
|	|- common                 # 通用的组件或工具
|	|- config                 # demo 配置相关信息
|	|- mock                   # 假数据设置
|	|- src                    # 源码
|—— app.json                  # appjson
|—— index.js                  # 入口文件
```

### *注意*
- 组件，如 `Popup`, `Toast` 等都是依赖 `AppContainer` 设计的，因此在使用 fego-rn 时请使用 `AppContainer` 对应用进行包装
	```js
	import { AppContainer } from 'fego-rn'
	AppRegistry.registerComponent('App', () => AppContainer.setApp(App) )
	```
