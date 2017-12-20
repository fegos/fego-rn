---
title: Modal
subTitle: 模态对话框
---

# 模态对话框
`同一时间只允许弹出一个模态`

Modal视图在iOS原生开发中熟称:"模态视图",Modal进行封装之后，可以弹出来覆盖包含React Native跟视图的原生界面(例如:UiViewControllView,Activity)。在使用React Native开发的混合应用中使用Modal组件，该可以让你使用RN开发的内功呈现在原生视图的上面。

如果你使用React Native开发的应用，从跟视图就开始开发起来了，那么你应该是Navigator导航器进行控制页面弹出，而不是使用Modal模态视图。通过顶层的Navigator，你可以使用configureScene属性进行控制如何在你开发的App中呈现一个Modal视图。

## API
### props列表

| 名称 | 描述 | 类型 | 默认值 |
|------|------|------|-------------|
| visible | 是否可见 | bool | false |
| maskStyle | 遮罩样式 | View.style |  |
| contentStyle | 内容区样式 | View.style |  |
| animationType | 动画类型：none fade slide-up slide-down | string | slide-up |
| animateAppear | 仅首次动画 | bool | false|
| onClose | 关闭回调 | func | ()=>{}|
| onAnimationEnd | 动画结束回调 | func | visible => {}|
| visible| 是否可见 | bool | false |