/**
 * 清单
 * @author esky
 */
import React from 'react'
import { View, StyleSheet } from 'react-native'
import UIComponent from '../../common/UIComponent'
import ListItem from './ListItem'
export default class List extends UIComponent{
	render(){
		let style = this.style;
		let {children} = this.props;
		return (<View style={style.container}>
			{children}
		</View>)
	}
}
List.ListItem = ListItem;
// 默认基础样式 
List.baseStyle = {
	container: {
		borderTopWidth: StyleSheet.hairlineWidth,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: '#cbd2d9',
		backgroundColor: '#FFF',
	}
}
