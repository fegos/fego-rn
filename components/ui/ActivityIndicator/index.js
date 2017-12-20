/**
 * 活动指示器
 * @author esky
 */
import React from 'react'
import PropTypes from 'prop-types'
import {
	View,
	Text,
	ActivityIndicator,
	StyleSheet
} from 'react-native'
import UIComponent from '../../common/UIComponent'

export default class NSIPActivityIndicator extends UIComponent {
	static defaultProps = {
		visible: true,
		color: '#999',
		size: 'small',
	};
	static propTypes = {
		// 显示
		visible: PropTypes.bool,
		// 指示器颜色
		color: PropTypes.string,
		// 指示器尺寸
		size: PropTypes.oneOf(['large', 'small']),
		// 指示器文案
		text: PropTypes.string
	}
	static baseStyle = {
		container: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
		},
		text: {
			color: '#999',
			backgroundColor: 'transparent',
			fontSize: 14,
			marginLeft: 8,
		}
	}

	_renderSpinner() {
		let style = this.style;
		return (
			<View style={style.container} >
				<ActivityIndicator
					color={this.props.color}
					size={this.props.size}
				/>
				{this.props.text && (<Text style={style.text}>{this.props.text}</Text>)}
			</View>
		);
	}

	render() {
		if (this.props.visible) {
			return this._renderSpinner();
		}
		return null;
	}
}