# fego-rn
- React Native 组件库

### 项目介绍
- 基于 React Native 的移动开发库
- 提供 ios 和 android 两端的平台支持
- 仅限 UI 组件和 Util 组件, 不涉及原生组件

### 支持平台
- ios
- android

### 设计原则
- 组件命名以使用驼峰形式且首字母大写，例如：`ActivityIndicator`
- 若无特殊情况组件不区分 ios 和 android 平台，统一为 `SomeComponent/index.js`, 不带 ios 或 android 后缀
- API 设计规范[详见](components/README.md)
- 组件样式[详见](components/ui/STYLE.MD)


### 目录结构
```
|—— __tests__                   # 组件单元测试目录
|	|—— enzyme.setup.js         # enzyme 启动配置文件
|—— components                  # 组件源码
| 	|—— common                  # 通用类
|	|—— util                    # util 组件
|	|—— ui                      # ui 组件
|		|—— STYLE.md            # 关于样式的说明
|	|—— index.js 
|	|—— patch.js
|	|—— README.md
|—— demo                        # demo 示例
|	|—— android                 # android 工程
|	|—— app                     # demo 源码
|	|—— ios                     # ios 工程
|—— site                        # 组件文档站点的目录
| 	|—— build                   # bisheng 输出文件夹
|	|—— theme                   # bisheng 主题文件夹
|	|—— bisheng.config.js       # bisheng 配置文件
|—— .babelrc                    # babel 配置
|—— jest.config.js              # 测试配置文件
|—— package.json                # 项目描述文件
```

### 开发

1. 安装依赖

	```bash
	$ npm run init
	```

2. 运行 demo

	```bash
	$ npm run start
	
	# 随后在 xcode 或 Android Studio 中点击 `RUN` 运行项目即可
	```

3. 也可以执行：

	```bash
	# ios 端
	$ npm run ios
	
	# Android 端
	$ npm run android
	```

4. 启动假数据服务
	```bash
	$ npm run mock
	```

5. 进行单元测试

	```bash
	$ npm run test
	
	# 更新 snapshot
	$ npm run test -- -u
	```

6. 启动站点服务

	```bash
	$ npm run site
	```

### 使用
1. 安装

```bash
$ npm install fego-rn --save
```

2. 应用
```js
// MyPage.js
import { Button } from 'fego-rn'

class MyPage extends React.Component {
	render(){
		return(
			<View>
				{/* your code */}
				<Button type='primary' title='我是一个button' />
			</View>
		)
	}
} 
```

#### *注意*
- 组件，如 `Popup`, `Toast` 等都是依赖 `AppContainer` 设计的，因此在使用 fego-rn 时请使用 `AppContainer` 对应用进行包装
	```js
	import { AppContainer } from 'fego-rn'
	AppRegistry.registerComponent('App', () => AppContainer.setApp(App) )
	```


### 欢迎贡献
有任何疑问或问题欢迎在[github issues](https://github.com/fegos/fego-rn/issues)里提问