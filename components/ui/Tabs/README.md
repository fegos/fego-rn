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
	<TabPane title="tab1" key="tab1">
		<View>
			<Text>tab1</Text>
		</View>
	</TabPane>
	<TabPane title="tab2" key="tab2">
		<View>
			<Text>tab2</Text>
		</View>
	</TabPane>
	<TabPane title="tab3" key="tab3">
		<View>
			<Text>tab3</Text>
		</View>
	</TabPane>
</Tabs>

// 使用 activeKey, 需配合 onChange 使用
<Tabs activeKey={this.state.activeKey} onChange={key=>this.setSatte({activeKey: key})}>
	<TabPane title="tab1" key="tab1">
		<View>
			<Text>tab1</Text>
		</View>
	</TabPane>
	<TabPane title="tab2" key="tab2">
		<View>
			<Text>tab2</Text>
		</View>
	</TabPane>
	<TabPane title="tab3" key="tab3">
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
| activeKey | 受控属性，当前激活Tab面板的key，需配合`onChange`维护`activeKey`值 | `string`/`number` | 无 |
| defaultActiveKey | 非受控属性，默认激活的Tab面板的key | `string`/`number` | 第一个面板 |
| animated | 是否显示切换动画 | `bool` | true |
| showTabBar | 是否显示tabBar | `bool` | true |
| showUnderline | 是否显示tabBar里的选中下滑线 | `bool` | true |
| tabBarPosition | tab 位置, 取值范围为：top, bottom | `string` | top |
| swipeable | 是否可以滑动 tab 内容进行切换 | `bool`| true |
| usePreload | 是否使用预加载 | `bool`| true |
| singleSidePreloadCount | 当前页两侧需要预加载的数量 | `number`| 1 |
| onChange | 切换面板的回调，参数为点击的面板的 key, tab 值 | function(key, tab){} | 无 |
| onTabClick | 点击 tab 的回调，参数为点击的面板的 key, tab 值 | function(key, tab){} | 无 |

### 样式对象styles

属性 | 说明 | 适用类型
----|-----|------
| tabBarItem | 单个 tabBarItem 标签样式 | View |
| text | tab 标签内文字样式 | Text |
| activeText | 激活态 tab 标签内文字样式 | Text |
| tabBar | 标签栏样式，tabBarItem 的容器 | View |
| barTop | 标签栏在 top 时的样式 | View |
| barBottom | 标签栏在 bottom 时的样式 | View |
| activeUnderline | 激活态的 tab 下划线的样式，注意，下划线的颜色实际是通过 View 的 backgroundColor 属性来进行填充的 | View |
| activeItem | 激活态的tabBarItem的样式 | View |

### 简单样式 simpleStyle

属性 | 说明 | 适用类型
----|-----|------
| textColor | tabBar 标签内文字颜色 | Text |
| activeTextColor | 激活态 tabBar 标签内文字颜色 | Text |
| underlineColor | 标签栏整体下划线的颜色 | View |
| activeUnderlineColor | 激活态的 tabBarItem 下划线的颜色，注意，下划线的颜色实际是通过 View 的 backgroundColor 属性来进行填充的 | View |
| activeBgColor | 激活态的 tabBarItem 的背景色 | View |


### Tabs.TabPane

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| key  | tabPane key | `string`/`number`  | 无 |
| title  | 选项卡头显示文字 | `string` | 无 |

### tabbar 宽度说明
+ tabBarItem 默认撑满屏幕宽，各个 tab 的宽度则是对屏幕宽的均分
+ 可以通过指定 tabBarItem 的宽度来改变默认占满屏幕宽的规则，此时
	+ 若 tabBar 宽 < 屏幕宽，则其宽度不会撑满屏幕宽
	+ 若 tabBar 宽 > 屏幕宽，则其宽度会超过屏幕宽而导致生成滚动的 tabBar
