---
title: List
subTitle: 清单
---

# 清单组件

### 组件描述
- 单个连续模块垂直排列，显示当前的内容、状态和可进行的操作。eg：联系人列表。


### 示例代码
```html
<List>
	<ListItem title='默认的' />
	<ListItem iconName='user' title='带图标, 右箭头' hasRightArrow={true}/>
	<ListItem >
		<Text style={{color:'red', fontSize:18 }}>自定义内容</Text>
		<Button style={{ width: 80 }}>Button</Button>
	</ListItem>
</List>
```

## List API

### props列表

属性 | 说明 | 类型 | 默认值
----|-----|------|------

### 样式对象styles

属性 | 说明 | 适用类型
----|-----|------
| container | 容器样式 | View |


## ListItem API

### props列表

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| title | 清单项文案 | node | - |
| children | 子元素 | node | - |
| iconName| 左侧图标名称 | string | - |
| iconFamily | 左侧图标字体库 | string | - |
| hasRightArrow | 是否显示右箭头 | boolean | false |
| rightArrowIconFamily | 右侧箭头图标字体库 | string | - |
| rightArrowIconName | 右侧箭头图标名称 | string | angle-right |
| underlayColor | 触摸操作时底层的颜色 | 颜色值 | ‘#F9F9F9’ |
| onPress | 单击 | function | - |
| onLongPress | 长按 | function | - |

### 样式对象styles

属性 | 说明 | 适用类型
----|-----|------
| container | 清单项容器样式 | View |
| content | 清单项内容容器样式 | View |
| icon | 显示图标的样式 | Icon |
| title | 清单项文案的样式 | Text |
| rightArrow | 右侧箭头图标样式 | Icon |
