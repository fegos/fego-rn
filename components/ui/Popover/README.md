---
title: Popover
subTitle: 气泡层
---

# 气泡组件

### 组件描述
- 在点击控件或者某个区域后，浮出一个气泡区域来放置更多的操作或者信息。

### 示例代码

```html
import Popover from 'somewhere'

const Item=Popover.Item

<Popover
	placement='top'
	title='title' 
	maskClosable={false}
	content={[
		<Item text='添加新朋友' iconName='user'/>,
		<Item text='扫一扫' iconName='user' onPress={()=>{
			this.props.navigation.navigate('ui/Button');
		}} />,
		<Item iconName='user'><Text>帮助</Text></Item>
	]}
>
	<View>
		<Text>Popover 只能有一个孩子</Text>
		<Text>我是第二个孩子</Text>
	</View>
</Popover>

```

#### 注意
```warning
popoverStyle中的宽度应当与Popover.item保持一致
```

## API

### Popover props列表
属性 | 说明 | 类型 | 默认值
----|-----|------|------
| title | Popover 标题 | node | '' |
| content | Popover 的内容 | array | [] |
| showTriangle | 是否显示 Popover 的三角 | bool | true |
| triangleHeight | 三角形的高 | number | 8 |
| triangleWidth | 三角形的宽 | number | 10 |
| placement | Popover 出现的位置, 可选值有：'top', 'topLeft', 'topRight', 'bottom', 'bottomLeft', 'bottomRight', 'left', 'leftTop', 'leftBottom', , 'right', 'rightTop', 'rightBottom' | string | 'bottom' |
| offset | Popover 距离 trigger 的边距 | number | 5 |
| maskClosable | 是否能点击遮罩关闭 Popover | bool | true |
| animateTime | 动画时间 | number | 300 |

### PopoverItem props列表
属性 | 说明 | 类型 | 默认值
----|-----|------|------
| text | 显示的文案 | node | - |
| children | 子元素集，若使用则其他的内容相关props, eg: text 将失效 | node | - |
| iconName | 图标的名称 | string | - |
| iconFamily | 图标使的字体 | string | - |
| underlayColor | 触摸操作时底层的颜色 | color | - |
| onPress | 单击回调 | function | - |




