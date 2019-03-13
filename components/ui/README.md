## UI类组件
> 继承 Component 的纯RN组件

### 基本要求

1. 组件的样式可配
2. 组件props类型检查
3. 遵守组件API字典约束
4. 遵守受控/非控组件的定义 参见https://facebook.github.io/react/docs/forms.html

### 受控/非控组件

+ 受控属性 需配合onChange使用以保证props传入数据流的一致性 例如 value，visible等
+ 非控属性 以default开头，此时只影响初始状态，该状态之后将不受外部props的控制，组件自己更新状态。例如 defaultValue,defaultVisible等

### 样式优先级

下面优先级由低到高
> 优先级：baseStyle < themeStyle < styles < style < propStyle < simpleStyle

1. baseStyle 组件基础样式【必须】,可以通过setBaseStyle进行全局变更,格式:
```
{
	styleName1:{
		stylePropsName:stylePropsValue,
			...
	},
	styleName2:{
		stylePropsName:stylePropsValue,
		...
	}
}
```
2. themeStyle 自定义主题样式，如字体种类1、2、3，按钮种类1、2、3,可以通过setThemeStyle进行全局变更,是对baseStyle的一种组合,格式:
```
   {
	   themeName:{
		   styleName1:{
			   stylePropsName:stylePropsValue,
			   ...
			},
		   styleName2:{
			   stylePropsName:stylePropsValue,
			   ...
		   },
		   ...
		},
		...
	}
```

3. props.styles 开发者自定义样式类,是对props.style的一种组合
   格式:
   {
	   container:{
		   stylePropsName:stylePropsValue,
	   },
	   styleName:{
		   stylePropsName:stylePropsValue,
	   },
	   ...
	}

4. props.style 容器样式等效于styles.container,默认样式属性

5. propStyle 以Style为后缀的prop，例如 props.contentStyle

6. simpleStyle 简易样式 例如 props.tipColor,
   需要在组件定义的时候预先声明好simpleStyleProps
   由prop.styles引申的一种写法

#### 注意

1. 组件静态属性propTypes中不需要声明样式相关的props
2. 简易样式simpleStyle 由静态属性simpleStyleProps定义


### 基本模板
~~~js
/**
 * 组件名称
 * @author 姓名
 */
import React from 'react'
import { View, Text } from 'react-native'
import { UIComponent } from '../../common'

export default class SelfMod extends UIComponent {
	static defaultProps = {
	}
	static propTypes = {
	}
	// 初始化属性
	state = {}

	render() {
		let style = this.style;

	}
}
// 基础样式
SelfMod.baseStyle = {
	container: {
	},
};
~~~

### 继承UIComponent的组件

#### props列表

| 名称 | 类型 | 描述 |
|------|------|-------------|
| `style` | object | 容器样式对象等效于styles.container |
| `styles` | object | 自定义样式对象 |
| prop`Style` | object | 以Style为后缀的prop，例如 props.contentStyle |
| simpleStyle | any | 简易样式因组件声明而不同 例如 props.tipColor |
