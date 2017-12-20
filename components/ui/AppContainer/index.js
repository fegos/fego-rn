/**
 * 应用容器
 * @author esky
 * 示例：
 * AppRegistry.registerComponent('App', () => AppContainer.setApp(App) )
 */
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import TopView from './TopView'
import { RNMessage } from '../../util'
let App;
class AppContainer extends Component {
	/**
	 * 设置应用入口
	 * @param {func/Element} AppCls React类或React实例
	 */
	static setApp(AppCls) {
		App = AppCls;
		return AppContainer;
	}
	/**
	 * 新增TopView
	 * @param {Element} el 
	 */
	static add(el, finish) {
		RNMessage.emit("topView.add", el, finish);
	}
	/**
	 * 清除key对应的顶层View
	 * key可以是函数，函数返回true的保留，否则移除
	 * @param {String/Function} key 
	 */
	static remove(key) { RNMessage.emit("topView.remove", key) }
	/**
	 * 清除所有顶层View
	 */
	static removeAll() { RNMessage.emit("topView.removeAll") }

	render() {
		if (!App) {
			let tip = '请提供App主入口类，示例：AppContainer.setApp(App)';
			console.warn(tip)
			return <View><Text style={{ paddingTop: 50, color: '#881111' }}>错误：{tip}</Text></View>
		}
		if(!React.isValidElement(App)){
			App = <App {...this.props}/>
		}
		return (
			<View style={{ flex: 1 }}>
				{App}
				<TopView />
			</View>
		);
	}
}

export default AppContainer;