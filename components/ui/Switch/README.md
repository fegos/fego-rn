---
title: Switch
subTitle: 开关
---

# 开关组件

### 组件描述
- 在两个互斥对象进行选择，eg：选择开或关


### 示例代码

```html
<Switch defaultActive={true} disabled={true} /> 

	<Switch defaultActive={true} /> 
	<Text>使用defaultActive则属于非控组件</Text>
	
	<Switch active={this.state.active} onChange={active=>this.setState({ active: active })}/> 
	<Text>使用active则属于受控组件，组件状态由外部props控制</Text>
```

## API

### props列表

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| active | 受控属性：激活状态，需配合onChange使用 | bool | 无 |
| defaultActive | 非控属性：默认激活状态，获取状态使用 this.refs.switch.state.active | bool | false |
| onChange | 状态改变回调 | func | 无
| disabled | 是否禁用 | bool | false
| switchAniTime | 切换动画时间，单位毫秒 | number | 200

### 样式对象styles

属性 | 说明 | 适用类型
----|-----|------
| container | 容器样式 | View |
| button | 切换按钮样式 | Animated.View |
| buttonActive | 切换按钮active背景颜色 | Animated.View |
| buttonInactive | 切换按inactive背景颜色 | Animated.View |
| buttonPressActive | 切换按钮PressActive背景颜色 | Animated.View |
| buttonPressInactive | 切换按钮PressInactive背景颜色 | Animated.View |
| buttonDisabled | 切换按钮禁用背景颜色 | Animated.View |
| bar | 底部条样式 | View |
| barActive | 底部条active背景颜色 | View |
| barInactive | 底部条inactive背景颜色 | View |
| barDisabled | 底部条禁用背景颜色 | View |