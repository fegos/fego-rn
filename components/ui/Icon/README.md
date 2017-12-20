---
title: Icon
subTitle: 图标
---

# 图标字体组件

### 组件描述
字体图标库

* [FontAwesome](http://fontawesome.io/icons/), 默认字体
* [entypo](http://entypo.com/)


### 示例代码

```html
<Icon name='user' />
<Icon name='glass' color="#398812" />
<Icon name='music' style={{ color: "#EE0000" }} />
<Icon name='heart' color="#000" style={{ color: "#E00", fontSize: 20 }}  />
<Icon name='search' style = {{
	color: '#993311',
	fontSize: 30,
	padding: 10
}} />
<Icon name='check' size={40} family='entypo'>
	<Text style={{ fontSize: 38, paddingLeft: 10 }}>checkbox</Text>
</Icon>
<Icon name='angle-right' size={40} />
```

## API

### props列表

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| name | 字体名称代码，例如：user | string | - |
| size | 字体尺寸 | number | 16 |
| color | 字体颜色 | string | #333 |
| family | 字体库名称 | string | FontAwesome |

### 样式对象styles

属性 | 说明 | 适用类型
----|-----|------
| container | 容器样式 | View |