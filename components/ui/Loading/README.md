---
title: Loading
subTitle: 加载提示
---

# Loading

### 组件描述
- 显示类似于加载中样式，表示等待状态

### 示例代码

```html
Loading.start();
```

## API
- Loading.start(content, duration,  opt)
- Loading.startModal(content, duration,mask, opt)
- Loading.stop()

### props列表

属性 | 说明 | 类型 | 默认值
----|-----|------|------
`type` | Toast类型, 由 Toast 调用的 api 决定 | `string` | -
`content` | 提示内容, 由 Toast 调用 api 时的参数 content 决定 | `React.Element or String` | 无
`duration`| 自动关闭的延时，单位秒, 由 Toast 调用 api 时的参数 duration 决定 | `number`  | 2
`onClose` | 关闭后回调，opt中指定 | `Function` | 无
`mask` | 是否显示透明蒙层，| `Boolean` | true
`modal`| 是否阻止用户操作| `Boolean`|true
`iconFamily ` | 图标字体，opt中指定  | `string` | -
`iconTypes ` | 图标类型对象，opt中指定  | `object` | `{success: 'check-circle', fail: 'times-circle', offline: 'meh-o'}`
`offsetY ` | Y轴偏移量, 因为 Toast 默认显示在屏幕正中，因此此偏移量为相对于屏幕中心位置的Y方向上的偏移量，opt中指定  | `number` | 0
`loadingColor`| loading动画的颜色，opt中指定| `string`|white


### 注意：
```warning
上述 iconFamily, iconTypes, offsetY 只是列出组件支持的 props，一般情况下，我们在使用时不需要去单独设置相关值，应有项目统一配置
```

### opt 说明
Loading 支持的 props, 除 type, content, duration 可以在调用 Toast api 时指定外，其余 props 均应包含在 opt 参数内，比如 onClose,mask,iconFamily, iconTypes, offsetY, sytles, 以及支持的 simpleStyles 等。


### 样式对象styles

属性 | 说明 | 适用类型
----|-----|------
参见 baseStyle | - | -


### 简单样式 simpleStyle
属性 | 说明 | 适用类型
----|-----|------
`backgroundColor` | 提示框背景色 | string
`borderRadius` | 提示框圆角 | number