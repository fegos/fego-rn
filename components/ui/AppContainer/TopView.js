/**
 * 顶层view
 * @author esky
 * 负责管理与导航器平级的View，适用于顶层弹窗，消息等
 */
import React, { Component } from 'react'
import { View, AppRegistry, StyleSheet } from 'react-native'
import { RNMessage } from '../../util'

export default class TopView extends Component {
	state = {
		views: []
	}
	componentWillMount() {
		RNMessage.on("topView.add", this.add);
		RNMessage.on("topView.remove", this.remove);
		RNMessage.on("topView.removeAll", this.removeAll);
	}
	componentWillUnmount() {
		RNMessage.off("topView.add");
		RNMessage.off("topView.remove");
		RNMessage.off("topView.removeAll");
	}
	/**
	 * 新增
	 * finish是视图更新完成后的回调
	 */
	add = (el, finish) => {
		if (!React.isValidElement(el)) {
			console.warn('TopView:必须是合法的ReactElement!');
			return;
		}
		let key = el.key;
		if (!key) {
			console.warn('TopView:元素props缺少合法的key!');
			return;
		}
		// 移除已存在相同key的元素
		let views = this.state.views.filter(view => {
			if (view.key === key) {
				return false;
			}
			return true;
		})
		views.push(el);
		this.setState({ views: views }, finish);
		return key;
	}
	/**
	 * 移除指定key的view
	 * @param {String/Function} key 若为函数则作为filtr的判断条件
	 */
	remove = (key) => {
		if (!key) {
			console.warn('TopView.remove:缺少参数key');
			return;
		}
		let views;
		if(typeof key === 'function'){
			// 移除条件参照key函数返回值，false则移除
			views = this.state.views.filter(key);
		}else{
			// 移除相同key的元素
			views = this.state.views.filter(view => view.key !== key)
		}
		this.setState({ views: views })
	}
	removeAll = () => {
		this.setState({ views: [] })
	}
	render() {
		if (!this.state.views.length) return null;
		return (<View style={styles.container} pointerEvents='box-none'>
			{this.state.views}
		</View>)
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		// 解决安卓端问题：无内容但界面不可点击
		backgroundColor: 'rgba(0,0,0,0)',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	}
})