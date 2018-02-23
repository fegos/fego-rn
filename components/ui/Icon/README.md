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
<Icon name='star' />
<Icon name='star' color="#D8B080" />
<Icon name='music' style={{ color: "#D8B080" }} />
<Icon name='star' size={20} />
<Icon name='music' style={{ fontSize: 20 }} />
<Icon name='star' color="#D8B080" size={20} />
<Icon name='music' style={{ color: '#D8B080', fontSize: 20 }} />
```

### 使用说明

添加自己的字体库名字与unicode码对应的文件，只需增加字体json文件或者js文件，内容格式如下：

```
// 图标名字：unicode码
{
	"aircraft-take-off": 61705,
	"align-bottom": 61706,
	"align-horizontal-middle": 61707,
	...
}
```
Icon的使用之前需要添加字体库（可以设置多个字体库，并可设置默认的字体库）：

```
Icon.setFamily({
	entypo: require('./entypo.json'),
	FontAwesome: require('./FontAwesome.json')
})
Icon.defaultProps.family = 'FontAwesome';
```
之后像示例一样使用即可。

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