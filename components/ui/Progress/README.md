---
title: Progress
subTitle: 进度条
---

# 进度条

### 组件描述
- 显示某个任务的进度

### 示例代码

```html
<Progress/>
<Progress type='border' percent={50}>type='border'</Progress>
<Progress type='retangle' percent={40}></Progress>
<Progress size='large' percent={30}>size='large'</Progress>
<Progress style={{width:300}} percent={50}> 自定义style</Progress>
```

## API

### props列表

 属性|说明 | 类型 | 默认值
------|------|------|-----
|percent|进度，0-100 |number|0|
| type | 主题类型, 支持 `default`, `retangle`, `border`| string| default|
| size | 尺寸, 支持 `default`, `small`, `large`| string |default|
|showUnfill|剩余进度条是否显示|bool|true|
|appearTransition|是否显示进度条变化动画|bool|false|
|position|进度条位置, 支持 `normal`, `fixed`|string|normal|


### 样式对象styles

| 属性 | 适用类型 | 描述 |
|------|------|-------------|
|container|View|剩余进度条样式|
|progressBar|View|进度条样式|

### 简单样式simpleStyle
| 属性 | 类型 | 描述 |
|------|------|-------------|
|progressBarColor|string|进度条颜色|
