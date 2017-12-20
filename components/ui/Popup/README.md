---
title: Popup
subTitle: 弹出层
---

# 弹出层 Popup

### 组件描述
- 从顶部或底部浮出的模态，提供标题和关闭按钮，展示和当前内容相关的信息或提供相关操作。
提供基础的标题头，内容区则使用children指定。


### 示例代码

```html
// 使用 api 方式调用 popup
let SelfView = (
	<View style={{ padding: 10 }} >
		<Text>Api命令方式调用，Popup将处于顶层View，遮盖导航条</Text>
		<Button type="primary" title="点我关闭" onPress={() => Popup.hide()} />
		<Button type="primary" title="下一个Popup" onPress={() => this._popShow()} />
	</View>
)
Popup.show(SelfView, {
	title: `Popup example`,
	headerLeft: true,
	aniFrom: 'bottom',
	onClose: () => {
	},
	onAniEnd: (visible) => {
	}
})

// 使用组件方式调用 Popup
<Popup
	title={title}
	visible={this.state.visible}
	location={location}
	aniFrom={aniFrom}
	onClose={() => this.setState({ visible: false })} 
>
	<View>
		<Text>从顶部或底部浮出的模态，提供标题和关闭按钮，展示和当前内容相关的信息或提供相关操作。</Text>
		<Text>提供基础的标题头，内容区则使用children指定。</Text>
		<Button type="primary" title="点我关闭" onPress={() => this.setState({ visible: false })}/>
	</View>
</Popup>
```

## API

### api 接口：
### static show(el, opt)
显示一个Popup，位于顶层View，key可以由opt覆盖来指定

- el 【必须】需要在 Popup 里显示的内容元素
- opt 配置对象同 Popup 的 props，**可使用key唯一标记**

### static hide(key, hasAni)
关闭一个 Popup，默认关闭最上层 Popup 

- key 若指定 key，则关闭对应 key 的 Popup
- hasAni 关闭时是否动画，默认 true

### static hideAll(hasAni)
隐藏所有  **此时不再响应onClose，否则请使用hide**

- hasAni 关闭时是否动画，默认true

### props列表

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| visible | 受控属性：是否可见 | boolean | false |
| aniIn | 动画进入方向 'left', 'right', 'top', 'bottom' | string | bottom |
| aniOut | 动画推出方向，默认取aniIn的值 | string | |
| aniOutFn | 动画推出方向，自定义函数，需返回值参考 aniOut；aniOutFn(closeType, this) | function |  |
| location | 内容区位置 'top', 'bottom' | string |'bottom' |
| title | header标题，不传则不显示标题栏 | string,node,element| |
| headerLeft | 头部左侧区，false为关闭，也可传入自定义元素，字符串 | any | false |
| headerRight | 头部右侧区，false为关闭，也可可传入自定义元素，字符串 | any | true |
| iconFamily | 图标字体库名称 | string | |
| iconTypes | 图标配置 | object | { 'headerLeft': 'angle-left', 'headerRight': 'times-circle' }|
| offsetHeight | 高度偏移量，整体高度会减掉该高度。一般是导航栏的高度。 | number | |
| aniTime | 动画时间，毫秒 | number | 300 |
| maskOpacity | 遮罩透明度 | number | 0.7 |
| onClose | 组件关闭的回调| function | |
| onAniEnd | 组件动画结束的回调| function | |


### 样式对象styles

属性 | 说明 | 适用类型
----|-----|------
| container | 按钮容器样式 | View |
| mask | 遮罩 | View |
| absolute | 绝对定位样式 | View |
| body | 主体区域 | View |
| header | 头部容器 | View |
| headerTitle | 头部标题 | Text |
| headerLeft | 头部左侧区域容器 | View |
| headerRight | 头部右侧区域容器 | View |
| headerLeftCtn | 头部左侧内容 | Text |
| headerRightCtn | 头部右侧内容 | Text |

