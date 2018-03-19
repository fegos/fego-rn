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
<Icon
  name="music"
  style={{ color: '#D8B080', fontSize: 20 }}
  onPress={() => {
    Toast.info('我被点击了');
  }}
/>
```

### 使用说明

添加自己的字体库名字与unicode码对应的文件，只需增加字体json文件或者js文件，内容格式如下：

```
// 图标名字：unicode码，支持下面几种格式
{
	"aircraft-take-off": 61705, // 十进制数
  "glass": "f000",            // 十六进制字符串
  "music": "/f001",           // 十六进制字符串含/（直接从阿里库下载下来的iconfont.css文件中拷贝出来的）
  "search":"&#xf002;"         // 图标代码，unicode码（直接复制图标代码）
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
| onPress | 点击回调 | function | |

### 样式对象styles

属性 | 说明 | 适用类型
----|-----|------
| container | 容器样式 | View |
