---
title: Calendar
subTitle: 日历
---

# 日历组件 CalendarPicker

### 组件描述
- 提供日历选择功能


### 示例代码

```html
import CalendarPicker from 'CalendarPicker'

<CalendarPicker />

<CalendarPicker 
	next='>'
	prev='<'
	{...otherProps} />
```

## API

### props列表

属性 | 说明 | 类型 | 默认值
----|------|-----|-----------
| `minDate` | 组件提供的日历范围最小日期 | `Date` | - |
| `maxDate` | 组件提供的日历范围最大日期 | `Date ` | - |
| `selectedDate` | 选中的日期，受控属性，需配合 onChange 使用 | `Date` | - |
| `defaultSelectedDate` | 默认选中的日期，非受控属 | `Date` | new Date() |
| `onChange` | 选中某个日期的回调, 参数为选中的日期的时间戳  | `function(date, timestamp)` | - |
| `startFromMonday` | 是否从周一开始显示，默认周日开始，需搭配 `weekdays` 使用 | `boolean` | `false` |
| `weekdays` | 日历显示的星期文案 | `array` | `[周日，周一 ...]` |
| `months` | 日历显示的月份文案 | `array` | `[1月，2月 ...]` |
| `prev` | 上月翻页，可以是 `image` 这样的元素 | `string` or `element` | `<` |
| `next` | 下月翻页，可以是 `image` 这样的元素  | `string` or `element` | `>`|
| `theme` | 组件的主题色, 目前暂只有 default | `string` | 'default' |
| `rowFixed` | 日历是否固定显示6行 | `boolean` | `false` |
