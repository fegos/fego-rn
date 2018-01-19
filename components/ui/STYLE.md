# fego-rn 组件库
## UI 组件样式设计规则

### 组件样式
- 组件样式统一由 UIComponent 处理组件样式，所有 UI 类组件均继承至 UIComponent

UI 类组件共有以下几种途径修改样式某一组件的样式：

1. 作为开发者，在开发时可设置的样式：
	- baseStyle ：组件提供的基础样式【必须】
	- themeStyle ：组件提供的主题样式(部分组件提供)

2. 作为使用者，在使用时可设置的样式：
	- baseStyle ：需通过静态方法 `setBaseStyle` 统一设置产品项目自定义的组件基础样式
	- themeStyle ：需通过静态方法 `setThemeStyle` 统一设置产品项目自定义的组件主题样式
	- styles ：使用者自定义样式对象，通过传递 styles prop 属性进行设置
	- style ：容器样式，等效于 baseStyle.container，通过传递 style prop 属性进行设置
	- propStyle ：以 Style 为后缀的 prop
	- simpleStyle ：使用组件提供的简易样式 api (部分组件提供)


当通过各个方式设置同一样式时，样式生效的规则参照以下优先级
> baseStyle < themeStyle < styles < style < propStyle < simpleStyle


#### 样式说明示例：

- 以 Button 为例

```js
// Button/index.js
class Button extends Component {
	// 通过静态属性 simpleStyleProps 为组件定义简易样式 simpleStyle api
	static simpleStyleProps = {
		textSize: { name: 'text', attr: 'fontSize' }
	}
	// other codes
	functionA() {
		// 通过 this.style 可以引用样式
		let style = this.style;
	}
}

// 由开发者提供组件的基础样式
Button.baseStyle = {
	container: {
		backgroundColor: 'white'
	}
	text {
		color: 'black',
		fontSize: 16
	}
}
```

使用者在使用 Button 组件时，可通过以下方式自定义 Button 的样式：

1. setBaseStyle:
	
	```jsx
	Button.setBaseStyle(Button, {
		text: {
			color: 'red' // 则按钮的颜色默认都会显示的成红色
		}
	})
	```
2. themeStyle 同理
2. styles
	
	```jsx
	let styleObj = {
		container: {
			backgroundColor: 'blue'  // 则按钮的颜色会显示的成蓝色
		},
		text: {
			fontSize: 14  // 则按钮的文字会显示的成14号字体大小
		}
	}
	<Button styles={styleObj} />
	```
3. style

	```jsx
	<Button style={{
		backgroundColor: 'green'  // 等同于设置 container，则按钮的颜色会显示的成蓝色
	}} />
	```
4. propStyle
	
	```jsx
	<Button textStyle={{
		color: 'yellow'  // 等同于设置 text，则按钮的颜色会显示的成黄色
	}} />
	```
5. simpleStyle
	
	```jsx
	<Button textSize={24} />  // 则按钮的文字会显示的成24号字体大小
	```

### simpleStyleProps 
- 规定了可以便捷的修改哪些样式
	
	```js
	for(key in simpleStyleProps) {
		// 简易样式的 api 名称
		let oneSimpleStyleApi = key;
		let oneSimpleStyle = simpleStyleProps[key];
		// 该 api 对应 baseStyle 里的哪个属性
		let whichObj = baseStyle[oneSimpleStyle.name];
		// baseStyle 里的那个属性的哪个值
		let whichAttr = whichObj[oneSimpleStyle.attr];
	}
	```

例如上面定义的 Button 组件，通过： 

```js
	static simpleStyleProps = {
		textSize: { name: 'text', attr: 'fontSize' }
	}
```

定义了简易样式api ：textSize

那么使用者就可以使用 textSize 作为 Button 的 props，当使用 `<Button textSize={32} />` 时，意味着样式里的text样式(由simpleStyleProps.textSize.name指定)中的fontSize属性(simpleStyleProps.textSize.attr)被设置成了 32

