/**
 * Badge组件: 用于显示有新消息的视觉元素，可以显示为红点或是数字
 * 目前只实现绘制红点的功能，位置需要通过额外style设置
 */
import React from 'react'
import { 
	View,
	StyleSheet
} from 'react-native'
import UIComponent from '../../common/UIComponent'

export default class Badge extends UIComponent {
	static defaultProps = {
	}

	static propTypes = {
	}

	constructor(props){
		super(props)
	}

	render(){
		let style = this.style
		let { children } = this.props;

		return (
			<View style={style.container}>
				{children}
			</View>
		)
	}
}

const dotSize = 3
Badge.baseStyle = {
	container: {
		width: 2 * dotSize,
		height: 2* dotSize,
		borderRadius: dotSize,
		backgroundColor: '#F05B48',
	}
}