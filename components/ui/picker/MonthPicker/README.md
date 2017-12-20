---
title: MonthPicker
subTitle: 月份选择器
---

# 月份选择控件 MonthPicker

### 组件描述
- 月份选择器，交互需求同官网 app 里交互需求


### 示例代码

```html
import Popup from 'somewhere'
import MonthPicker from 'somewhere'
Popup.show(
	<MonthPicker
		initialValue={this.state.MonthPicker1Value}
		onClose={()=>{Popup.hide()}}
	/>, someOpt
)
```

** 按照交互需求，统一由 Popup 来充当 MonthPicker 的容器 **

## API

### props列表

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| data | 选择器的数据源 | array | [] |
| initialValue | 初始值 | array | [] |
| onClose | 关闭回调 | func | - |
| onSelect | 选中回调 | func | - |

### 样式对象styles

属性 | 说明 | 适用类型
----|-----|------

### 静态方法

方法名 | 用途 | 类型 | 默认值
----|-----|------|----
| format | 格式化数据的函数 | `function (year, month) { }` | `YYYY年MM月`
| getMonths | 获取选择器的数据 | `function () { return months }` | -
| setStartMonths | 设置初始月份 | `function (newStartMonth) { }` |  201609


### props data 说明
+ MonthPicker 内置了数据，为从交易所 app 上线到昨天所在月份的月份范围
+ 也可通过 data 属性传给选择器数据，基本格式同 Picker 的数据格式

```html
[{
	label: '2011年09月',
	value: '201109'
}, {
	label: '2011年10月',
	value: '201110'
}]
```