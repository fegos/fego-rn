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

# Group.Item

### 组件描述

- Group下的item的基础view
- 可被继承实现自己的样式，如Radio、Checkbox

### 示例代码

```html
<Group.Item disabled={true}>disabled</Group.Item>

<Group.Item defaultChecked={true}>非受控组件：使用defaultChecked</Group.Item>

<Group.Item checked={this.state.checked} onChange={(checked)=>{
	this.setState({
		checked: checked
	})
}}>受控组件：使用checked，必须同时使用onChange更新，保证选中数据的一致性
</Group.Item>
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
| left | 图标位置 | boolean | true |

### 样式对象styles

属性 | 说明 | 适用类型
----|-----|------
| container | 容器样式 | View |
| icon | 图标样式 | Icon |
| text | 选择框文字样式 | Text |
| checked | 选中时的样式 | Icon |
| disabled | 禁止时的样式 | Icon，Text |
