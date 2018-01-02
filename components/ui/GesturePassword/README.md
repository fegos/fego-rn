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
	pointBackgroundColor={'#F4F4F4'}
	isWarning={this.state.isWarning}
	color={'#577695'}
	activeColor={'#00AAEF'}
	warningColor={'red'}
	warningDuration={1500}
	allowCross={true}
	topComponent={this._renderDescription()}
	bottomComponent={this._renderActions()}
	onFinish={this._onFinish}
	onReset={this._onReset}
	lineWidth={2}
	showArrow={false}
	isPointNoChange={false}
	isCutOut={true}
/>

~~~

## API
### props列表

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| lineWidth | 连接线的宽度 | number | 10|
| pointBackgroundColor | 连接点的背景颜色 | string |'transparent' |
| gestureAreaLength | 手势的区域宽度 | number | 222|
| color | 连接点的默认颜色 | string | '#A9A9A9'|
| lineColor | 连接线的颜色，未设置则使用color | string |  |
| activeColor | 连接点激活状态的颜色 | string | '#00AAEF'|
| warningColor | 连接点错误状态的颜色 | string | 'red'|
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
| isCutOut | 手势线是从原点画还是从收拾圆圈边缘画 | bool | false|


### 样式对象styles