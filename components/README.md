# RN组件库

## 组件API字典

### 普通单词
| 名称 | 类型 | 含义 |
|------|------|-------------|
|`id`|String|唯一标识|
|`name`|String|名称|
|`type`|String Number|类型|
|`size`|Number|尺寸|
|`title`|String|标题|
|`container`|-|容器|

### 状态类
1. 形容词表明状态(Boolean)，禁止使用动词
2. 无合适状态单词，则使用前缀 has, 表明是否启用(拥有)某功能，如 hasTitle是否使用标题栏。

| 名称 | 类型 | 含义 |
|------|------|-------------|
|`disabled`|Boolean|禁用的|
|`selected`|Boolean|选中的（下列选择类）|
|`checked`|Boolean|选中的(checkbox类)|
|`visible`|Boolean|显示的|
|`loading`|Boolean|加载中|
|`autoplay`|Boolean|自动播放的|
|------|------|------|
|`hasMask`|Boolean|是否使用遮罩|

### 事件监听类
1. on开头命名，表示事件完成执行回调
2. onBefore开头，表示事件触发前执行回调，返回false可以阻止事件

| 名称 | 类型 | 含义 |
|------|------|-------------|
|`onPress`|Function|单击|
|`onPressIn`|Function|单击进入|
|`onPressOut`|Function|单击释放|
|`onChange`|Function|变化后|
|`onBeforeChange`|Function|变化前|
|`onSelect`|Function|选中后|

### 缩写类
1. 适用于配置属性的值(value)
2. 原则上组件API不建议使用缩写

| 简写 | 全称 | 含义 |
|------|------|-------------|
|`lg`|`large`|大号|
|`md`|`middle`|中号|
|`sm`|`small`|小号|
|`xs`|`-`|超小号|
|`ctn`|`content`|内容|
|`dis`|`disable`|禁止|
|`tit`|`title`|标题|
|`ani`|`animate`|动画|
