---
title: Toast
subTitle: 提示框
---

# Toast

### 组件描述
- 轻量级的反馈提示，可以用来显示不会打断用户操作的内容

### 示例代码

```html
Toast.info( '提示信息');
Toast.success( '加载成功!!!', 3, null, false, { backgroundColor: '#3af568' });
Toast.loading();
```

## API
- Toast.info(content, duration, onClose, mask, opt)
- Toast.success(content, duration, onClose, mask, opt)
- Toast.fail(content, duration, onClose, mask, opt)
- Toast.offline(content, duration, onClose, mask, opt)
- Toast.loading(content, duration, onClose, mask, opt)
- Toast.waiting(content, duration, onClose, mask, opt)
- Toast.show(content, opt)

### props列表

属性 | 说明 | 类型 | 默认值
----|-----|------|------
`type` | Toast类型, 由 Toast 调用的 api 决定 | `string` | -
`content` | 提示内容, 由 Toast 调用 api 时的参数 content 决定 | `React.Element or String` | 无
`duration`| 自动关闭的延时，单位秒, 由 Toast 调用 api 时的参数 duration 决定 | `number`  | 2
`onClose` | 关闭后回调, 由 Toast 调用 api 时的参数 onClose 决定  | `Function` | 无
`mask` | 是否显示透明蒙层，防止触摸穿透, 由 Toast 调用 api 时的参数 mask 决定  | `Boolean` | false
`iconFamily ` | 图标字体  | `string` | -
`iconTypes ` | 图标类型对象  | `object` | `{success: 'check-circle', fail: 'times-circle', offline: 'meh-o'}`
`offsetY ` | Y轴偏移量, 因为 Toast 默认显示在屏幕正中，因此此偏移量为相对于屏幕中心位置的Y方向上的偏移量  | `number` | 0


### 注意：
```warning
上述 iconFamily, iconTypes, offsetY 只是列出组件支持的 props，一般情况下，我们在使用时不需要去单独设置相关值，应有项目统一配置
```

### opt 说明
Toast 支持的 props, 除 type, content, duration, onClose, mask 可以在调用 Toast api 时指定外，其余 props 均应包含在 opt 参数内，比如 iconFamily, iconTypes, offsetY, sytles, 以及支持的 simpleStyles 等。


### 样式对象styles

属性 | 说明 | 适用类型
----|-----|------
参见 baseStyle | - | -


### 简单样式 simpleStyle
属性 | 说明 | 适用类型
----|-----|------
`backgroundColor` | 提示框背景色 | string
`borderRadius` | 提示框圆角 | number