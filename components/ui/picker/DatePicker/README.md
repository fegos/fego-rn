---
title: DatePicker
subTitle: 日期选择器
---

# 日期选择器 DatePicker

### 组件描述
- 日期选择器，可用于选择日期(date模式)，也可用于选择时间(time模式)

### 示例代码

```html
import DatePicker from 'somewhere'
<DatePicker mode='date'/>
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


### 样式对象styles

属性 | 说明 | 适用类型
----|-----|------
