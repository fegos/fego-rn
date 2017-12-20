---
title: Carousel
subTitle: 走马灯
---

# 走马灯组件 Carousel

### 组件描述
- 轮播组件，对于一组内容，可以用走马灯的形式进行轮播展现。

### 示例代码

```html
import Carousel from 'Carousel'

<Carousel {...someProps} >
	{carousel contents}
</Carousel>
```

### 注意
```warning
走马灯渲染时会获取组件最外层容器的宽和高、如果没有，则会用子元素的宽、高最大值来代替。
因此子元素的宽高和容器的宽高必须设置这两者其中之一。
比如：如果播放图片，因为 Image 组件需指定宽、高，因此容器不必再显式设置，
但如果是播放 View，Text 之类的，就需要指定 View，Text 的宽高，或者通过 container 样式来指定容器的宽高，不然会出现渲染不对的情况。
```

## API

### props列表

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| `direction` | 显示方向 | `string` | horizontal |
| `dotType` | 指示点样式，默认圆形。可选值：'circle', 'rect' | `string` | circle |
| `interval` | 播放间隔的毫秒数 | `number` | 3000 |
| `autoplay` | 是否自动播放 | `boolean` | true |
| `infinite` | 是否无限循环播放 | `boolean` | true |
| `indexPage` | 开始播放的索引, 0 开始计算 | `number` | 0 |
| `onBeforeChange` | 切换面板前的回调函数，可以通过返回 false 来阻止轮播 | `function(fromPage, toPage)` | - |
| `onChange` | 切换面板后的回调函数，参数为切换后的 index (0 开始计算) | `function(page)` | - |
| `onScrollBeginDrag` | 开始拖拽时的回调，参数为事件对象 | `function(event)` | - |
| `showDot` | 是否显示面板指示点 | `boolean` | true |
| `showPagination` | 是否显示分页信息, 默认不显示 | `boolean` | false |
| `paginationSeparator` |  分隔符 | `string` | / |
| `showArrows` |  左右翻动按钮 | `boolean` | false |
| `leftArrow` | 左按钮 | `string`或`element` | < |
| `rightArrow` | 右按钮 | `string`或`element` | > |

### 样式对象styles

属性 | 说明 | 适用类型
----|-----|------


### 支持的事件

| 属性props | 类型 | 默认值 | 描述 |
|----|----|------|-----------|
| `onBeforeChange` | `function(fromPage, toPage)` | - | 切换面板前的回调函数，可以通过返回 false 来阻止轮播 |
| `onChange` | `function(page)` | - | 切换面板后的回调函数，参数为切换后的 index (0 开始计算) |
| `onScrollBeginDrag` | `function(event)` | - | 开始拖拽时的回调，参数为事件对象 |
