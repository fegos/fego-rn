---
title: Carousel
subTitle: 轮播图
---

# Carousel（轮播图）

### 组件描述
- 轮播组件，对于一组内容，可以用走马灯的形式进行轮播展现。

### 示例代码

```html
import Carousel from 'Carousel'

<Carousel {...someProps} >
	{carousel contents}
</Carousel>
```

## API

### props列表

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| `mode` | 加载模式（all、preload）,预加载模式下安卓上会闪，所以安卓机上只能使用全家载模式，而且因为预加载模式下每次轮播滚动触发的操作较多，属于以时间换空间，所以在轮播页数不多的情况下，建议使用全加载模式 | `string` | all |
| `childrenType` | 子view类型（image、custom） | `string` | image |
| `size` | 轮播图大小 | `object` | {width:screenWidth, height:screenWidth* 180/375} |
| `source` | 资源文件，当childrenType为image时，使用该属性中的图片资源作为轮播图内容 | array | [] |
| `defaultPage` | 开始播放的页数 | `number` | 0 |
| `direction` | 显示方向 | `string` | horizontal |
| `autoplay` | 是否自动播放 | `boolean` | true |
| `interval` | 播放间隔的毫秒数 | `number` | 300 |
| `infinite` | 是否无限循环播放 | `boolean` | true |
| `showDot` | 是否显示面板指示点 | `boolean` | true |
| `dotType` | 指示点样式，默认圆形。可选值：'circle', 'rect' | `string` | circle |
| `showPagination` | 是否显示分页信息, 默认不显示 | `boolean` | false |
| `paginationSeparator` |  分隔符 | `string` | / |
| `preLoadPageCount` |  预加载页数，当mode为`preload`时加载的页数，值需要大于2 | `number` | 5 |
| `showArrows` |  左右翻动按钮 | `boolean` | false |
| `leftArrow` | 左按钮 | `string`或`element` | < |
| `rightArrow` | 右按钮 | `string`或`element` | > |





### 样式对象styles

属性 | 说明 | 适用类型
----|-----|------


### 支持的事件

| 属性props | 类型 | 默认值 | 描述 |
|----|----|------|-----------|
| `onPress` | `function(pageIdx)` | - | 点击了第几页 |
| `onShouldChange` | `function(fromPage, toPage)` | - | 切换面板前的回调函数，可以通过返回 false 来阻止轮播 |
| `onChange` | `function(page)` | - | 切换面板后的回调函数，参数为切换后的 index (0 开始计算) |
| `onScrollBeginDrag` | `function(event)` | - | 开始拖拽时的回调，参数为事件对象 |
