---
title: Picker
subTitle: 选择器
---

# 选择器 Picker

### 组件描述
- 模态里的选择器


### 示例代码

```html
<Picker
		data={pickerData3}
		visible={this.state.picker3Visible}
		onClose={()=>{this.setState({picker3Visible:false})}}
		initialValue={['chuancai','jiachang','yu']}
		onConfirm={(selectedValue, selectedIndex, selectedLabel) => {
			console.log('onConfirm: ', selectedValue, selectedIndex, selectedLabel)
			this.setState({ picker3Value: selectedLabel.join('') })
		}}
		onChange={(selectedValue, selectedIndex, selectedLabel) => {
			console.log('onChange: ', selectedValue, selectedIndex, selectedLabel)
		}}
/>
```

### 说明
> Picker 的实现依赖于 PickerView, 将 PickerView 放在模态里面，因此其部分 props (eg:initialValue, onChange) 以及数据源 data 的含义都与 PickerView 一致


## API

### props列表

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| modal | 是否模态 | boolean | false |
| mode | 选择器的模式,支持'dataPicker，datePicker' | string | dataPicker |
| datePickerMode | datePicker的模式，支持'date，time' | string | date |
| dateShowMode | date的显示模式 支持 'year-only','month-only','day-only','year-month','year-month-day','month-day'  | string | 'year-month-day' |
| data | 选择器的数据源 | array | [ ] |
| minDate | 选择器的数据源 | 最小日期 | [ ] |
| maxDate | 选择器的数据源 | 最大日期 | [ ] |
| minuteStep | time模式下的步长 | integer | 1 |
| defaultDateValue | date模式下默认选中的时间 | Date |  |
| defaultValue | picker 初始值，格式为[v1, v2, v3]，对应数据源的相应级层value | array | [ ] |
| onChange | 每列数据选择变化后的回调函数 | Function(selectedValue, selectedIndex, selectedLabel){} | - |
| visible | 是否可见 | bool | false |
| title | 标题 | string | 请选择 |
| okText | 确定的文案 | string | 确定 |
| cancelText | 取消的文案 | string | 取消 |
| maskClosable | 点击蒙层是否允许关闭 | string | true |
| onClose | 关闭弹框的回调函数 | Function(){} | - |
| onConfirm | 确定按钮的回调函数 | Function(selectedValue, selectedIndex, selectedLabel){} | - |

### 样式对象styles

属性 | 说明 | 适用类型
----|-----|------
| container | picker容器样式 | View |
| toolbarContainer | 工具条容器样式 | View |
| btn | 工具条按钮基础容器样式 | View |
| okBtn | 确认按钮容器样式 | View |
| cancelBtn | 取消按钮容器样式 | View |
| btnText | 按钮字体基础样式 | Text |
| okText | 确定按钮字体样式 | Text |
| cancelText | 取消按钮字体样式 | Text |
| title | 标题字体样式 | Text |

### props data 说明

#### 非级联时，每个数组表示一列数据
data 的数据格式为 `Array<{value, label}>` 或 `Array<Array<{value, label}>>` 

+ PivkerView 只含一列数据
```html
[{
	label: '2011年',
	value: '2011'
}, {
	label: '2012年',
	value: '2012'
}]
```
+ PivkerView 含两列数据
```html
[
	[{
		label: '2011年',
		value: '2011'
	}, {
		label: '2012年',
		value: '2012'
	}],

	[{
		label: '1月',
		value: '1'
	}, {
		label: '2月',
		value: '2'
	}]
]
```

#### 级联时，children表示下一列数据
每项数据除了 label 和 value 两个属性外，还有第三个属性：children，表示级联时该项值下一级的数据
```html
[{
	label: '川菜',
	value: 'chuancai',
	children: [{
		label: '川菜-火锅',
		value: 'huoguo',
		children: [{
			label: '川菜-火锅-毛肚',
			value: 'maodu'
		}, {
			label: '川菜-火锅-鸭肠',
			value: 'jiachang'
		}]
	}, {
		label: '川菜-家常',
		value: 'jiachang',
		children: [{
			label: '川菜-家常-宫保鸡丁',
			value: 'jiding'
		}, {
			label: '川菜-家常-水煮鱼',
			value: 'yu'
		}]
	}]
}, {
	label: '台湾',
	value: 'taiwan',
	children: [{
		label: '台湾-小吃',
		value: 'xiaochi',
		children: [{
			label: '台湾-小吃-卤肉饭',
			value: 'lurou'
		}, {
			label: '台湾-小吃-肥肉饭',
			value: 'feirou'
		}]
	}, {
		label: '台湾-烧烤',
		value: 'shao',
		children: []
	}]
}]
```
	