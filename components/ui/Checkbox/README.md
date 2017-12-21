---
title: Checkbox
subTitle: 多选框
---

# 多选

### 组件描述
- 多选选择框


### 示例代码

```html
<Checkbox disabled={true}>disabled</Checkbox>

<Checkbox defaultChecked={true}>非受控组件：使用defaultChecked</Checkbox>

<Checkbox checked={this.state.checked1} onChange={(checked)=>{
	this.setState({
		checked1: checked
	})
}}>
	受控组件：使用checked，必须同时使用onChange更新，保证选中数据的一致性
</Checkbox>
```

## API

### props列表

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| checked | 受控属性：需配合 onChange 使用更新数据 checked | boolean | - |
| defaultChecked | 非控属性：默认选中状态 | boolean | false |
| disabled | 是否禁止选择框 | boolean | false |
| iconFamily | 图标字体名 | string | - |
| iconCheckName | 选中图标名称 | string | check-square-o |
| iconUncheckName | 未选中图标名称 | string | square-o |
| onChange | 选择框变化回调，当使用 checked 属性时需配合 onChange 更新数据checked 属性 | function | - |
| children | 选择框对应的文字 | string or element | - |

### 样式对象styles

属性 | 说明 | 适用类型
----|-----|------
| container | 容器样式 | View |
| icon | 图标样式 | Icon |
| text | 选择框文字样式 | Text |
| checked | 选中时的样式 | Icon |
| disabled | 禁止时的样式 | Icon，Text |


### CheckboxGroup

### 示例代码

```js
// Checkbox 需有 value 属性用于匹配选中非选中的值
<Checkbox.Group>
	<Checkbox value='english'>英语</Checkbox>
	<Checkbox value='chinese'>语文</Checkbox>
	<Checkbox value='math'>数学</Checkbox>
</Checkbox.Group>

<Checkbox.Group value={this.state.checkboxGroupValue} onChange={(values)=>{
	console.log(values)
	this.setState({
		checkboxGroupValue: values
	})
}}>
	<Checkbox value='english'>英语</Checkbox>
	<Checkbox value='chinese'>语文</Checkbox>
	<Checkbox value='math'>数学</Checkbox>
</Checkbox.Group>
```

## API

### props列表

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| value | 受控属性，选中的值，需配合 onChange 使用 | array[string] | - |
| defaultValue | 非控属性，默认选中的值 | array[string] | [] |
| onChange | 选择框变化回调 | function(checkedValues) | - |
| children | 选择框 | Checkbox | - |
