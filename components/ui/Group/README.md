---
title: Group
subTitle: 组，可配和Checkbox、Radio、Tag组件使用，实现多选、单选功能
---

# 组

### 组件描述
- 一组组件
- 可搭配其他组件实现单选、多选功能

### 示例代码

```js
// 以Checkbox为例
<Group defaultValue={['chinese']} type="multi">
	<Checkbox value='english'>英语</Checkbox>
	<Checkbox value='chinese'>语文</Checkbox>
	<Checkbox value='math'>数学</Checkbox>
</Group>
<Group value={this.state.checkboxGroupValue} type="multi" onChange={(values) => {
	console.log(values)
	this.setState({
		checkboxGroupValue: values
	})
}}>
	<Checkbox value='english'>英语</Checkbox>
	<Checkbox value='chinese'>语文</Checkbox>
	<Checkbox value='math'>数学</Checkbox>
</Group>
```

## API

### props列表

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| value | 受控属性，选中的值，需配合 onChange 使用 | array[string]（多选）或string（单选） | - |
| defaultValue | 非控属性，默认选中的值 | array[string]（多选）或string（单选） | [] |
| onChange | 选择框变化回调 | function(checkedValues) | - |
| isSingle | 是否是单选 | bool | true |
