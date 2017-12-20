---
title: Input
subTitle: 输入框
---

# 输入框

### 组件描述
- 文本输入框


### 示例代码

```html
<Input label='错误状态' autoFocus error defaultValue='使用非受控属性，带错误状态，且自动聚焦'/>
<Input label='使用非受控属性' clear placeholder='带删除按钮的输入框'/>
<Input label='使用受控属性' clear value={this.state.inputValue} onChange={v => {
	this.setState({
		inputValue: v
	})
}}/>
<Input last defaultValue='最后一个，无底边框'/>
```

## API

### props列表

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| last | 是否是一组输入框里的最后一个输入框, 默认输入框有 borderBottom, 但最后一个没有 | boolean | false |
| label | 输入框label | string or element | - |
| type | 输入框类型 | string | text |
| keyboardType | 键盘类型，不传则参考type自动判断键盘类型 | string | - |
| placeholder | 无输入文字时显示的提示文案 | string | - |
| clear | 是否显示清楚按钮 | boolean | false |
| value | 受控属性：需配合 onChange 使用更新数据 value | string | - |
| defaultValue | 非控属性 | string | '' |
| editable | 输入框是否可编辑 | boolean | true |
| maxLength | 最大字符数 | number | - |
| autoFormat | 是否自动格式化字符串 | boolean | true |
| format | 格式化字符串函数，在 autoFormat 为 true 时生效，不传则按照组件默认的方式格式化字符串，目前默认提供了‘银行卡’和‘手机号’两种字符串的格式化| function | - |
| autoFocus | 初始化时输入框是否获得焦点 | boolean | false |
| focused | 输入框存在期是否获得焦点的受控属性 | boolean | false |
| onChange | 文本变化回调，参数为输入框值和Input组件对象 | function(value, comp){} | - |
| onBlur | 输入框失去焦点回调，参数为输入框值 | function(value){} | - |
| onFocus | 输入框获得焦点回调，参数为输入框值 | function(value){} | - |
| extra | 输入框后缀信息 | string or element | - |
| onExtraClick | 后缀点击回调 | function(){} | - |
| error | 是否显示错误提示信息 | boolean | false |
| errorColor | 错误提示信息颜色 | string | '#f50'|
| errorIconFamily | 错误提示信息图标库 | string | - |
| errorIconName | 错误提示信息图标 | string | exclamation-circle |
| onErrorClick | 错误提示信息点击回调 | function(){} | - |

### 样式对象styles

属性 | 说明 | 适用类型
----|-----|------
| container | 容器样式 | View |
| label | label 类型为字符串时样式 | Text |
| input | 输入框样式 | TextInput |
| extra | 后缀信息为 string 时的样式 | Text |
| error | 错误信息容器的样式 | View |
| errorIcon | 错误图标的样式 | Icon |