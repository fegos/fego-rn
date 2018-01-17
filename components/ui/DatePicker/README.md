---
title: DatePicker
subTitle: 日期选择器
---

# 日期选择器 DatePicker

### 组件描述
- 日期选择器，可用于选择日期(date模式)，也可用于选择时间(time模式)
- 日期为year,month(1-12),day,hour,minute格式
- mode为time时，日期间隔最好不能超过一天

### 示例代码

```html
	<DatePicker 
		mode='date' 
		minDate={new Date(2014,6,10)}
		maxDate={new Date(2027,10,20)}
		initialValue={new Date(2017,11,16)}
		title='日期模式'
		visible={this.state.visible1}
		onClose={()=>{this.setState({visible1: false})}}
		onConfirm={(val, idx, label, pickerType) => {
			console.log(val, idx, label)
			this.setState({
			picker1Str: label.join('')
			})
		}}
		onChange={(v, i, l)=>{
		console.log(v, i, l)
		}}
	/>
	<DatePicker 
		mode='time' 
		okText='fine'
		minDate={new Date(2017,8,14, 15, 40)}
		maxDate={new Date(2017,8,14, 18, 3)}
		initialValue={new Date(2017,8,14, 20, 20)}
		minuteStep={5} 
		visible={this.state.visible2}
		onClose={()=>{this.setState({visible2: false})}}
			onConfirm={(val, idx, label, pickerType) => this.setState({
				picker2Str: label.join('')
		})}
	/>
```

## API

### props列表

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| showInModal | 是否在模态中显示选择器 | bool | true |
| visible | showInModal 为 true 时控制选择器是否可见，受控属性，需配合 onClose 使用 | bool | false |
| mode | 选择器模式, 目前支持 'date' 和 'time' | string | 'date' |
| initialValue | picker 初始值，格式为[v1, v2, v3]，对应数据源的相应级层value | array | [ ] |
| minDate | 可选的最小日期 | Date |  |
| maxDate | 可选的最大日期 | Date |  |
| minuteStep | 'time' 模式下时间分钟的间隔 | Date |  |
| title | showInModal 为 true 时模态内标题 | string | 请选择 |
| okText | showInModal 为 true 时确定的文案 | string | 确定 |
| cancelText | showInModal 为 true 时取消的文案 | string | 取消 |
| maskClosable | showInModal 为 true 时点击蒙层是否允许关闭 | string | true |
| onClose | showInModal 为 true 时关闭弹框的回调函数 | Function(){} | - |
| onConfirm | showInModal 为 true 时确定按钮的回调函数 | Function(selectedValue, selectedIndex, selectedLabel){} | - |
| onChange | 每列数据选择变化后的回调函数 | Function(selectedValue, selectedIndex, selectedLabel){} | - |



