---
title: Button
subTitle: 按钮
---

# 按钮组件

### 组件描述
- title和children等效
- 按钮内容文案会用于事件统计

### 示例代码

```html
<Button title="default" />
<Button type="primary">type="primary"</Button>
<Button type="primary" size="small">type="primary" size="small"</Button>
<Button type="primary" size="large">type="primary" size="large"</Button>
<Button type="danger">type="danger"</Button>
<Button disabled={true}>disabled</Button>
<Button 
	styles={ { container: { backgroundColor: '#E9E' }, text: { fontSize: 24, color: '#5E1' } }} 
	onPress={}
	title="自定义样式" />
<Button style={ { backgroundColor: '#568976' } } >
	<Text style={{ color: '#EFE', fontSize: 18 }}>自定义元素</Text>
</Button>
```

## API

### props列表

| 属性 | 说明 | 类型 | 默认值 |
|----|-----|------|------|
| type | 按钮类型(default primary danger ) ,可使用`setThemeStyle`自定义| string |default|
| size | 尺寸 small default large,可使用`setThemeStyle`自定义 | string |  |
| title | 按钮内容(文本，元素，数组等) | string, React.Element, array ||
| children | 同title，但使用children则title无效 | string, React.Element, array ||
| loading | 处理中状态，此时按钮不可点击 | boolean ||
| loadingText | 处理中时按钮文案，默认显示原文案 | string ||
| disabled | 禁止状态 | boolean ||
| allowFontScaling | 控制字体是否根据iOS的设置进行自动缩放-iOS平台,Android平台不适用 | boolean ||

**下面prop同RN TouchableHighlight**
- accessibilityLabel
- onPress
- onPressIn
- onPressOut
- onLongPress
- activeOpacity
- delayLongPress
- delayPressIn
- delayPressOut
- background 安卓适用

### 样式对象styles

属性 | 说明 | 适用类型
----|-----|------
| container | 按钮容器样式 | View |
| text | 按钮文本样式 | Text |
| textDisabled | 按钮禁止时的文本样式 | Text |
| disabled | 按钮禁止时的容器样式 | View |