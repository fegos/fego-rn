---
title: AnimateModal
subTitle: 模态对话框
---

# 模态对话框

### 组件描述
- 对官方Modal进行了进一步封装，对Modal包裹的子视图提供了丰富的显示/消失动画（none|slide|slide-down|fade|scale|fade-scale|alert），除此之外提供了额外的配置项，以及动画执行结束回调。

### 示例代码
```html
<AnimateModal
	animationType='fade'
	visible={this.state.visible}
	animateWhenMount={true}
	maskClosable={true}
	onClose={() => this.setState({ visible: false })}
	springEffect={false}
>
	<View>
		<Text style={{ color: '#333' }}>AnimateModal</Text>
		<Button onPress={() => this.setState({ visible: false })}>关闭</Button>
	</View>
</AnimateModal>
```

## AnimateModal API

### props列表

| 名称 | 描述 | 类型 | 默认值 |
|------|------|------|-------------|
| visible | 是否可见 | bool | false |
| maskStyle | 遮罩样式 | View.style |  |
| contentStyle | 内容区样式 | View.style |  |
| animationType | 动画类型：none fade slide slide-down scale fade-scale alert | string | alert |
| animationDuration | 动画时长 | number | 200 |
| maskClosable | 点击遮罩是否可以关闭 | bool | true |
| animateWhenMount | 进入页面就显示AnimateModal的情况下是否执行动画 | bool | false|
| springEffect | 动画是否有弹簧效果 | bool | false|
| onClose | 关闭回调 | func | ()=>{}|
| onAnimationEnd | 动画结束回调 | func | visible => {}|

### 样式对象styles

属性 | 说明 | 适用类型
----|-----|------
| container | 容器样式 | View |
| mask | 遮罩样式 | View |
| content | 内容容器样式 | View |
