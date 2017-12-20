---
title: Tabs
subTitle: 标签页
---

# Tab 标签页
---
### 组件描述
用于让用户在不同的视图中进行切换。

### 示例代码
```js
const TabPane = Tabs.TabPane;

// 使用 defaultActiveKey
<Tabs defaultActiveKey="tab1">
	<TabPane tab="tab1" key="tab1">
		<View>
			<Text>tab1</Text>
		</View>
	</TabPane>
	<TabPane tab="tab2" key="tab2">
		<View>
			<Text>tab2</Text>
		</View>
	</TabPane>
	<TabPane tab="tab3" key="tab3">
		<View>
			<Text>tab3</Text>
		</View>
	</TabPane>
</Tabs>

// 使用 activeKey, 需配合 onChange 使用
<Tabs activeKey={this.state.activeKey} onChange={key=>this.setSatte({activeKey: key})}>
	<TabPane tab="tab1" key="tab1">
		<View>
			<Text>tab1</Text>
		</View>
	</TabPane>
	<TabPane tab="tab2" key="tab2">
		<View>
			<Text>tab2</Text>
		</View>
	</TabPane>
	<TabPane tab="tab3" key="tab3">
		<View>
			<Text>tab3</Text>
		</View>
	</TabPane>
</Tabs>
```

## API

###  props列表

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| activeKey | 受控属性，当前激活 tab 面板的 key，需配合 onChange 维护 activeKey 值 | string/number | 无 |
| defaultActiveKey | 非受控属性，默认激活的 tab 面板的 key | string/number | 第一个面板 |
| renderTabBar | 是否渲染 tabBar | bool | true |
| tabBarPosition | tab 位置, 取值范围为：top, bottom | string | top |
| onChange | 切换面板的回调，参数为点击的面板的 key, tab 值 | function(key, tab){} | 无 |
| onTabClick | 点击 tab 的回调，参数为点击的面板的 key, tab 值 | function(key, tab){} | 无 |
| animated | 是否显示切换动画 | bool | true |
| swipeable | 是否可以滑动 tab 内容进行切换 | bool| true |
| compose | 是否对内容进行压缩, 为 true 的话，当前未激活过的面板内容将以 <View /> 的形式存在。请谨慎使用，因为为 true 时，可能导致 tab 切换时存在视觉上的断层现象 | bool | false |
| preRenderNum | 预加载的数量，默认值 0，及当 props 或 state 变化时，会更新重绘当前显示的面板内容，设为值 n 后，当 props 或 state 变化时，会重新渲染当前面板以及当前面板左右 n 范围内的面板 | number | 0 |

### 样式对象styles

属性 | 说明 | 适用类型
----|-----|------
| tab | 单个 tab 标签样式 | View |
| text | tab 标签内文字样式 | Text |
| activeText | 激活态 tab 标签内文字样式 | Text |
| bar | 标签栏样式，tab 的容器 | View |
| barTop | 标签栏在 top 时的样式 | View |
| barBottom | 标签栏在 bottom 时的样式 | View |
| activeUnderline | 激活态的 tab 下划线的样式，注意，下划线的颜色实际是通过 View 的 backgroundColor 属性来进行填充的 | View |

### 简单样式 simpleStyle

属性 | 说明 | 适用类型
----|-----|------
| textColor | tab 标签内文字颜色 | Text |
| activeTextColor | 激活态 tab 标签内文字颜色 | Text |
| underlineColor | 标签栏整体下划线的颜色 | View |
| activeUnderlineColor | 激活态的 tab 下划线的颜色，注意，下划线的颜色实际是通过 View 的 backgroundColor 属性来进行填充的 | View |


### Tabs.TabPane

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| key  | tabPane key | string/number  | 无 |
| tab  | 选项卡头显示文字 | string | 无 |

### tabbar 宽度说明
+ tabBar 默认撑满屏幕宽，各个 tab 的宽度则是对屏幕宽的均分
+ 可以通过指定 tabBar 的宽度来改变默认占满屏幕宽的规则，此时
	+ 若 tabBar 宽 < 屏幕宽，则其宽度不会撑满屏幕宽
	+ 若 tabBar 宽 > 屏幕宽，则其宽度会超过屏幕宽而导致生成滚动的 tabBar 