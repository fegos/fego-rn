---
title: Segment
subTitle: 分段器
---

# 分段器

### 组件描述
提供分组

### 代码示例
~~~js
<List>
	<ListItem styles={listItemStyle}>
		<Text style={{ padding: 10 }}>禁止的</Text>
		<Segment values={this.state.values} disabled={true} /> 
	</ListItem>
	<ListItem styles={listItemStyle}>
		<Text style={{ padding: 10 }}>非控组件: 使用非控属性defaultIndex，默认0</Text>
		<Segment values={this.state.values} onChange={i=>{}}/> 
	</ListItem>
	<ListItem styles={listItemStyle}>
		<Text style={{ padding: 10 }}>受控组件：使用受控属性index，配合onChange更新</Text>
		<Segment index={this.state.segmentIndex} values={this.state.values} onChange={i=>{
			this.setState({segmentIndex: i})
		}}/>
	</ListItem>
	<ListItem styles={listItemStyle}>
		<Text style={{ padding: 10 }}>主题色调：themeColor</Text>
		<Segment values={this.state.values} themeColor='#981231'/> 
	</ListItem>
</List>
~~~


## API

### props列表

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| disabled | 禁止状态 | boolean | false |
| index | 受控属性：当前选中的下标，配合onChange使用 | number | |
| defaultIndex | 非控属性：默认被选中的下标 | number | 0 |
| values | 按顺序每一个段落的标题文字 | array | [] |
| themeColor | 主题色调，若使用则会覆盖所有颜色相关的style | string | |
| onChange | 选中改变时触发 | function | |

### 样式对象styles

属性 | 说明 | 适用类型
----|-----|------
| container | 容器整体 | View |
| item | 分段项的容器 | View |
| itemActive | 激活项 | View |
| itemText | 分段项文本 | Text |
| itemTextActive | 激活项文本 | Text |