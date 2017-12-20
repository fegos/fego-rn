---
title: Slider
subTitle: 滑动条
---

# 滑动输入条

### 组件描述
- 根据滑块的位置返回相应的值
- 左边为最小值，右边为最大值

### 示例代码

```html
<Slider disabled={true}/>
<Slider style={{width:100}}/>
<Slider min = {5}
		max = {25}
		step = {5}/>
<Slider value = {20}/>
```

## API

### props列表

 属性 | 说明 | 类型 | 默认值
------|------|--------|------
|minimumValue|最小值|number|0|
|maximumValue|最大值|number|100|
|value|当前值|number|0|
|type|类型, 支持 `default`, `circle`, `square`|string|default|
|size|尺寸, 支持 `default`, `small`, `large`|string|default|
|step|步长|number|1|
|disabled|是否被禁用|bool|false|
|onSlidingStart|滑块开始滑动时候回调|func|-|
|onValueChange|滑块滑动时候回调|func|-|
|onSlidingComplete|滑块停下来后回调|func|-|


### 样式对象styles

属性| 说明 | 适用类型
---|---|---
container|容器样式|View|
track|所有track的样式|View|
minTrack|选中部分track样式|View|
maxTrack|未选中部分track样式|View|
thumb|滑块样式|View|
