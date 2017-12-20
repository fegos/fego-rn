import { TabBarTop } from 'react-navigation';


export default {
	tabBarComponent: TabBarTop,
	// tabs 的位置
	tabBarPosition: 'bottom',
	// 切换 tabs 是否显示动画
	animationEnabled: true,
	// 是否允许滑动切换 tabs
	swipeEnabled: true,
	// tab bar 配置
	tabBarOptions: {
		// 是否显示 icon
		showIcon: false,
		// 是否显示 tab 文字 label
		showLabel: true,
		// tab label 是否显示成大写
		upperCaseLabel: false,
		// tab label 的样式
		labelStyle: {
			fontSize: 20,
		},
		// tab bar 的样式
		style: {
			backgroundColor: '#f7f7f7',
			backgroundColor: '#231f1f',
		},
		// 激活态 tab 的 Label 和 icon 样色.
		activeTintColor: '#a8864d',
		// 非激活态 tab 的 Label 和 icon 样色.
		inactiveTintColor: '#ffffff',
		// tab indicator 样式
		indicatorStyle: {
			height: 0
		}
	}
}