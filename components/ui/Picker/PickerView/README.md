---
title: PickerView
subTitle: 选择器
---

# 选择器 PickerView

### 组件描述
- 视图内可见的选择器


### 示例代码

```js
<PickerView
	data={pickerData}
	initialValue={['xican','niupai','qi']}
	onChange={(selectedValue, selectedIndex, selectedLabel) => {
			console.log('onValueChange ', selectedValue, selectedIndex, selectedLabel)
	}}
/>

```

## API

### props列表

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| data | 选择器的数据源 | array | [ ] |
| value | 内容值，受控属性，非受控时使用initialValue | array | - |
| initialValue | 初始值，非受控属性，格式为[v1, v2, v3]，受控时使用value | array | [ ] |
| onChange | 每列数据选择变化后的回调函数 | Function(selectedValue, selectedIndex, selectedLabel){} | - |
| onReady | 准备就绪的回调函数 | Function(function(selectedValue, selectedIndex, selectedLabel){}){} | - |

### 样式对象styles

属性 | 说明 | 适用类型
----|-----|------
| container | pickerview容器样式 | View |

### props data 说明

#### 非级联时，每个数组表示一列数据
data 的数据格式为 `Array<{value, label}>` 或 `Array<Array<{value, label}>>`:   


+ PickerView 只含一列数据
```html
[{
	label: '2011年',
	value: '2011'
}, {
	label: '2012年',
	value: '2012'
}]
```

+ PickerView 含两列以上数据
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
每项数据除了 label(用于展示) 和 value(用于标识) 两个属性外，还有第三个属性：children，表示级联式，该项值下一级的数据

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
	
