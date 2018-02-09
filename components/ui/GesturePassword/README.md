---
title: GesturePassword
subTitle: 手势密码
---

# 手势密码

### 组件描述
提供手势密码能力

### 代码示例
~~~js

<GesturePassword
	isWarning={this.state.isWarning}
	normalcolor={'#577695'}
	activeColor={'#00AAEF'}
	warningDuration={1500}
	allowCross={true}
	topComponent={this._renderDescription()}
	bottomComponent={this._renderActions()}
	onFinish={this._onFinish}
	onReset={this._onReset}
	showArrow={false}
	isPointNoChange={false}
	isShowBorder={true}
/>

~~~

## API
### props列表

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| gestureAreaLength | 手势的区域宽度 | number | 222|
| warningDuration | 显示错误状态的时间 | number | 0 |
| topComponent | 手势密码上方位置的view | element | |
| bottomComponent | 手势密码下方的view | element | |
| isWarning | 是否错误 | bool | false|
| isPointNoChange | 连接点是否不会改变 | bool | false|
| showArrow | 是否显示箭头 | bool | true|
| allowCross | 是否允许越过连接点 | bool | true|
| onStart | 手势密码开始回调 | func | |
| onReset | 手势密码重置回调 | func | |
| onFinish | 手势密码结束回调 | func | |
| isShowBorder | 是否显示连接点外圈 | bool | true|
| isHideLine| 是否隐藏连接点内的线| bool | true|


### 样式对象styles

属性 | 说明 | 适用类型
----|-----|------
| container | 容器样式 | View |
| normal | 连接点样式 | View |
| active | 激活时连接点和连接线样式 | View |
| warning | 警告时连接点和连接线样式| View |

### 参考
该组件大部分参考自网上开源组件[react-native-smart-gesture-password](https://github.com/react-native-component/react-native-smart-gesture-password)

作出重要改进的地方为：
支持透明背景下，隐藏连接点内的线

