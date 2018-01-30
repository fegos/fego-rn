---
title: Modal
subTitle: 模态对话框
---

# 模态对话框

### 组件描述
- ios`同一时间只允许弹出一个模态`

Modal视图在iOS原生开发中熟称:"模态视图"，Modal进行封装之后，可以弹出来覆盖包含React Native跟视图的原生界面(例如:UiViewControllView,Activity)。在使用React Native开发的混合应用中使用Modal组件，可以让你使用RN开发的内容呈现在原生视图的上面。

如果你使用React Native开发的应用，从根视图就开始开发起来了，那么你应该是Navigator导航器进行控制页面弹出，而不是使用Modal模态视图。通过顶层的Navigator，你可以使用configureScene属性进行控制如何在你开发的App中呈现一个Modal视图。

### 示例代码
```html
<Modal
	animationType='slide-down'
	visible={this.state.simpleVisible}
	animateAppear={true}
	maskClosable={true}
	onClose={() => this.setState({ simpleVisible: false })}
	scale={false}>
	<View>
		<Text style={{ color: '#333' }}>简单模态框容器</Text>
		<Button onPress={() => this.setState({ simpleVisible: false })}>关闭</Button>
	</View>
</Modal>
```

## Modal API

### props列表

| 名称 | 描述 | 类型 | 默认值 |
|------|------|------|-------------|
| visible | 是否可见 | bool | false |
| maskStyle | 遮罩样式 | View.style |  |
| contentStyle | 内容区样式 | View.style |  |
| animationType | 动画类型：none fade slide-up slide-down | string | slide-up |
| animateAppear | 仅首次动画（只适用于进入页面就显示modal的情况，此时需要visible和该属性均为true） | bool | false|
| onClose | 关闭回调 | func | ()=>{}|
| onAnimationEnd | 动画结束回调 | func | visible => {}|
| scale | 规模（是否有缩放操作）| bool | true |

### 样式对象styles

属性 | 说明 | 适用类型
----|-----|------
| container | 容器样式 | View |
| mask | 遮罩样式 | View |
| content | 内容容器样式 | View |
