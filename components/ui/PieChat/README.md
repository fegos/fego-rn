---
title: PieChat
subTitle: 饼图
---

### 动画扇形图
### 注意事项
```warning
使用的页面必须有`state`初始化，可以为空，用来触发动画的绘制。
若从外部传入参数，则建议使用

componentWillReceiveProps(nextProps) {
	if (nextProps) {
		this.setState({
			percent: nextProps.percent,
		})
		setTimeout(() => {
			this.setState({
				percent: nextProps.percent,
			})
		}, 0);

	}
}

来设定传入参数，触发动画。
```

### example
```
<PieChat
	percentArray={[0.4, 0.6]}
	colorArray={['#4d84eb', '#fca63e']}
	outerRadius={40}
	innerRadius={25}
	duration={1000}
/>
```
### 属性
```
PieChat.propTypes = {
	percentArray: PropTypes.array.isRequired,
	colorArray: PropTypes.array.isRequired,
	innerRadius: PropTypes.number,
	outerRadius: PropTypes.number.isRequired,
	duration: PropTypes.number,
};
PieChat.defaultProps = {
	innerRadius: 0,
	duration: 1500,
}
```
### 属性定义

| 名称 | 类型 | 描述 |
|------|------|-------------|
| `percentArray` | `array` | 扇形各段的百分比，需自行计算，1为整个圆形图案 ，必填|
| `colorArray` | `array` | 扇形各段的颜色，按顺序，与percentArray数量须相同 ，必填|
| `innerRadius` | `number` | 扇形内环半径，默认为0（圆形），扇形效果需设置，需小于外环半径|
| `outerRadius` | `number` | 扇形外环半径，必填|
| `duration` | `number` | 每段动画时长，默认1500毫秒 |
