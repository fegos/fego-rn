---
title: Calendar
subTitle: 日历
---

# 日历组件 Calendar

### 组件描述
- 提供日历选择功能


### 示例代码

```html
<Calendar
	maxDate={new Date(2017,5,8)}
	minDate={new Date(2017,8,17)}
	selectedDate={new Date(2017,6,20)}
	onChange={(date)=>{this.setState({
		date2: date
	})}}
	startFromMonday={true}
	weekdays={[ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ]}
	owFixedSix={true}
 />
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


### 样式对象styles

属性 | 说明 | 适用类型
----|-----|------
| container | 样式容器 | View |
| headerWrapper | 头部样式容器 | View |
| title | 年月字体样式容器 | Text |
| monthOperator | 前后月样式容器 | View |
| pre | 前一个月样式容器 | View |
| next | 下一个月样式容器 | View |
| weekdayBarWrapper | 星期样式容器 | View |
| barWeekday | 每个星期样式容器 | View |
| bodyWrapper | 日期样式容器 | View |
| bodyRow | day样式容器 | View |
| selectedDayWrapper | 选中day样式容器 | View |
| todayWrapper | 今天样式容器 | View |
| todayText | 字体样式容器 | Text |
