/**
 * 按钮
 * @author esky
 * 原型参考：https://github.com/APSL/react-native-button
 */
import React from 'react'
import PropTypes from 'prop-types'
import {
	View,
	TouchableOpacity,
	Text,
	StyleSheet,
	TouchableNativeFeedback,
	Platform
} from 'react-native'
import merge from 'lodash/merge'
import ActivityIndicator from '../ActivityIndicator'
import UIComponent from '../../common/UIComponent'

export default class Button extends UIComponent {
	static defaultProps = {
		type: 'default',
		size: 'default',
		loadingText: '',
		activeOpacity: 0.9
	}
	static propTypes = {
		// 主题类型 default primary danger 
		type: PropTypes.string,
		// 尺寸 small default large 
		size: PropTypes.string,
		// 组件内容， 此时title无效
		children: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.node,
			PropTypes.element
		]),
		// title 按钮文案 (兼顾习惯用法)
		title: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.node,
			PropTypes.element
		]),
		loading: PropTypes.bool,
		loadingText: PropTypes.string,
		disabled: PropTypes.bool,
		delayLongPress: PropTypes.number,
		delayPressIn: PropTypes.number,
		delayPressOut: PropTypes.number,
		onPress: PropTypes.func,
		onLongPress: PropTypes.func,
		onPressIn: PropTypes.func,
		onPressOut: PropTypes.func,
		background: (TouchableNativeFeedback.propTypes) ? TouchableNativeFeedback.propTypes.background : PropTypes.any,
		accessibilityLabel: PropTypes.string,
		activeOpacity: PropTypes.number,
		allowFontScaling: PropTypes.bool,
	}
	static simpleStyleProps = {
		textColor: { name: 'text', attr: 'color' }
	}
	static isAndroid = (Platform.OS === 'android')
	static autoStyleSheet = false

	_renderChildren() {
		let style = this.style;
		let childElements = [];
		let { children, title } = this.props;
		React.Children.forEach(children || title, (item) => {
			if (typeof item === 'string' || typeof item === 'number') {
				const element = (
					<Text
						style={[style.text, (this.props.disabled ? style.textDisabled : {})]}
						allowFontScaling={this.props.allowFontScaling}
						key={item}>
						{item}
					</Text>
				);
				childElements.push(element);
			} else if (React.isValidElement(item)) {
				childElements.push(item);
			}
		});
		return (childElements);
	}
	_renderInnerText() {
		let style = this.style;
		if (this.props.loading) {
			return (
				<ActivityIndicator
					visible={true}
					size='small'
					styles={{ text: { color: style.text.color } }}
					color={style.text.color}
					text={this.props.loadingText || this.props.children || this.props.title}
				/>
			);
		}
		return this._renderChildren();
	}
	render() {
		let style = this.style;
		if (this.props.size === 'small' && typeof (this.props.title) === 'string' && this.props.title.length < 3 ||
			typeof (this.props.children) === 'string' && this.props.children.length < 3) {
			style = merge({}, style, { container: { paddingHorizontal: 16 } });
		}
		if (this.props.loading === true) {
			return (
				<View style={style.container}>
					{this._renderInnerText()}
				</View>
			);
		}
		if (this.props.disabled === true) {
			return (
				<View style={[style.container, style.disabled]}>
					{this._renderInnerText()}
				</View>
			);
		}
		// Extract Touchable props
		let touchableProps = {
			accessibilityLabel: this.props.accessibilityLabel,
			onPress: this.props.onPress,
			onPressIn: this.props.onPressIn,
			onPressOut: this.props.onPressOut,
			onLongPress: this.props.onLongPress,
			activeOpacity: this.props.activeOpacity,
			delayLongPress: this.props.delayLongPress,
			delayPressIn: this.props.delayPressIn,
			delayPressOut: this.props.delayPressOut,
		};
		if (Button.isAndroid) {
			touchableProps = Object.assign(touchableProps, {
				background: this.props.background || TouchableNativeFeedback.SelectableBackground()
			});
			return (
				<TouchableNativeFeedback {...touchableProps}>
					<View style={style.container}>
						{this._renderInnerText()}
					</View>
				</TouchableNativeFeedback>
			)
		} else {
			/**
			 * TouchableOpacity
			 * 当按下的时候，封装的视图的不透明度会降低。这个过程并不会真正改变视图层级，大部分情况下很容易添加到应用中而不会带来一些奇怪的副作用。
			 * 问题： IOS里style的marginVertical不生效
			 */
			return (
				<TouchableOpacity style={style.container} {...touchableProps}>
					<View>
						{this._renderInnerText()}
					</View>
				</TouchableOpacity>
			);
		}
	}
}

// 默认基础样式 
Button.baseStyle = {
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: StyleSheet.hairlineWidth,
		borderRadius: 3,
		paddingHorizontal: 13,
	},
	text: {
		textAlign: 'center',
		backgroundColor: 'transparent',
		color: '#FFF'
	},
	textDisabled: {
		color: '#999'
	},
	disabled: {
		opacity: 0.8,
		borderColor: '#CCC',
		backgroundColor: '#EEE'
	}
}

// 默认主题样式 default必须，其他类别可自定义
Button.themeStyle = {
	type: {
		default: {
			container: {
				borderColor: '#999',
				backgroundColor: 'transparent'
			},
			text: {
				color: '#333'
			}
		},
		primary: {
			container: {
				borderColor: '#2e6da4',
				backgroundColor: '#337ab7'
			}
		},
		danger: {
			container: {
				borderColor: '#d43f3a',
				backgroundColor: '#d9534f'
			}
		}
	},
	size: {
		default: {
			container: {
				height: 40
			},
			text: {
				fontSize: 16
			}
		},
		small: {
			container: {
				height: 28
			},
			text: {
				fontSize: 12
			}
		},
		large: {
			container: {
				height: 54
			},
			text: {
				fontSize: 18
			}
		}
	}
}