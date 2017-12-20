import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import UIComponent from '../../common/UIComponent'
import Icon from '../Icon'

export default class Item extends UIComponent {
	static defaultProps = {
		underlayColor: "#F9F9F9",
		onPress: () => {}
	}
	static propTypes = {
		// 文案
		text: PropTypes.node,
		// 子元素集，若使用则其他的内容相关props, eg: text 将失效
		children: PropTypes.node,
		// 图标的名称
		iconName: PropTypes.string,
		// 图标使的字体
		iconFamily: PropTypes.string,
		// 触摸操作时底层的颜色
		underlayColor: TouchableHighlight.propTypes.underlayColor,
		// 单击
		onPress: PropTypes.func,
	}
	static autoStyleSheet = false

	_renderChildren(){
		let style = this.style;
		let { children, text, iconName, iconFamily, last } = this.props;
		
		if(!children){
			children = (text && (typeof text === 'string' || typeof text === 'number')) ? (
				<Text style={style.text}>{text}</Text>
			) : ({text})
		}
		return (
			<View style={[style.container, last && style.noLine]}>
				{iconName ? <Icon name={iconName} family={iconFamily} style={style.icon} /> : null}
				{children}
			</View>
		)
	}
	_onPress = () => {
		this.props.onPress()
		this.props.onAfterItemPress()
	}
	render(){
		let children = this._renderChildren();
		let { onPress, underlayColor } = this.props;
		if (onPress) {
			return (
				<TouchableHighlight 
					underlayColor={underlayColor} 
					onPress={this._onPress}
				>
					{children}
				</TouchableHighlight>
			)
		}
		return children;
	}
}

// 默认基础样式 
Item.baseStyle = {
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		borderBottomColor: '#ededed',
		borderBottomWidth: StyleSheet.hairlineWidth,
		backgroundColor: 'transparent',
		width: 120
	},
	noLine: {
		borderBottomWidth: 0
	},
	icon: {
		fontSize: 15,
		width: 26,
		color: '#43484d'
	},
	text: {
		flex: 1,
		fontSize: 14,
		color: '#43484d'
	},
}
