/**
 * 输入域Input
 * @author esky
 */
import React from 'react';
import PropTypes from 'prop-types'
import { View, Image, Text, TextInput, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import UIComponent from '../../common/UIComponent'
import Icon from '../Icon'
export default class Input extends UIComponent {
	static defaultProps = {
		last: false,
		type: 'text',
		clear: false,
		defaultValue: '',
		editable: true,
		autoFormat: true,
		focused: false,
		autoFocus: false,
		error: false,
		errorColor: '#f50',
		errorIconName: 'exclamation-circle',
		onExtraClick: () => {},
		onErrorClick: () => {}
	}
	static propsType = {
		// 是否是一组输入框里的最后一个输入框
		last: PropTypes.bool,
		// label
		label: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.string
		]),
		// 输入类型
		type: PropTypes.string,
		// 键盘类型，不传则参考type自动判断键盘类型
		// http://reactnative.cn/docs/next/textinput.html#content
		keyboardType: PropTypes.string,
		// 无输入文字时显示的提示文案
		placeholder: PropTypes.string,
		// 是否显示清楚按钮
		clear: PropTypes.bool,
		// 受控属性：需配合onChange使用更新数据value
		value: PropTypes.any,
		// 非控属性：需使用this.refs.input.value获取
		defaultValue: PropTypes.bool,
		// 编辑状态
		editable: PropTypes.bool,
		// 最大字符数
		maxLength: PropTypes.number,
		// 格式化字符串函数
		format: PropTypes.func,
		// 是否自动格式化字符串
		autoFormat: PropTypes.bool,
		// 输入框是否获得焦点
		focused: PropTypes.bool,
		// 初始化时输入框是否获得焦点
		autoFocus: PropTypes.bool,
		// 文本变化回调
		onChange: PropTypes.func,
		// 输入框失去焦点回调
		onBlur: PropTypes.func,
		// 输入框获得焦点回调
		onFocus: PropTypes.func,
		// 输入框后缀信息
		extra: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.string
		]),
		// 点击回调
		onExtraClick: PropTypes.func,
		// 是否显示错误提示信息
		error: PropTypes.bool,
		// 错误提示信息颜色
		errorColor: PropTypes.string,
		// 错误提示信息图标库
		errorIconFamily: PropTypes.string,
		// 错误提示信息图标
		errorIconName: PropTypes.string,
		// 错误提示信息点击回调
		onErrorClick: PropTypes.func,
	}
	static autoStyleSheet = false
	value = ''
	inited = false // 用于控制只在初始化时使用 defaultValue 或 value 对 this.value 进行赋值
	componentDidMount() {
		if (this.props.autoFocus || this.props.focused) {
			this.refs.input.focus();
		}
	}
	componentDidUpdate() {
		if (this.props.focused) {
			this.refs.input.focus();
		}
	}
	_format(text){
		const {type, maxLength, autoFormat, format} = this.props;
		if(typeof text === 'undefined') return '';
		// 转成字符串
		text += '';
		if(!autoFormat) return text;
		if(typeof format === 'function') return format(text, this);
		switch (type) {
			case 'bankCard':
				text = text.replace(/\D/g, '');
				if (maxLength > 0) {
					text = text.substring(0, maxLength);
				}
				text = text.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
				break;
			case 'phone':
				text = text.replace(/\D/g, '');
				text = text.substring(0, maxLength || 11);
				const valueLen = text.length;
				if (valueLen > 3 && valueLen < 8) {
					text = `${text.substr(0, 3)} ${text.substr(3)}`;
				} else if (valueLen >= 8) {
					text = `${text.substr(0, 3)} ${text.substr(3, 4)} ${text.substr(7)}`;
				}
				break;
			default:
				break;
		}
		return text;
	}
	_onChange = (text) => {
		const { onChange } = this.props;
		text = this._format(text)
		this.value = text;
		if (onChange) {
			onChange(text, this);
		}
	}

	_onInputBlur = () => {
		if (this.props.onBlur) {
			// this.props.onBlur(this.props.value);
			/**
			 * this.value 才是维护的输入框的最新的输入内容，不应该是 this.props.value
			 * this.props.value 的话在使用受控属性 value 时是对的，
			 * 而在使用非受控属性 defaultValue 时，一般是不会传 value 这个属性的，此时this.props.value 为 undefined
			 */
			this.props.onBlur(this.value);
		}
	}

	_onInputFocus = () => {
		if (this.props.onFocus) {
			// this.props.onFocus(this.props.value);
			// 同 _onInputBlur
			this.props.onFocus(this.value);
		}
	}

	_getKeyboardType() {
		const { type, keyboardType } = this.props;
		if(keyboardType) return keyboardType;
		const keyboardTypeArray = ['default', 'email-address',
			'numeric', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation',
			'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search'];
		switch (type) {
			case 'number':
				return 'numeric'
			case 'bankCard':
				return 'number-pad'
			case 'phone':
				return 'phone-pad'
			default:
				if (type && keyboardTypeArray.indexOf(type) > -1) {
					return type
				}
				return 'default'
		}
	}
	_renderLabel() {
		const style = this.style;
		const { label } = this.props;
		if (React.isValidElement(label)) {
			return label
		}
		if (typeof label === 'string') {
			return <Text style={ style.label }>{label}</Text>
		}
		return null
	}
	_renderExtra() {
		const style = this.style;
		const { extra, onExtraClick } = this.props;
		let extraChildren;
		if (typeof extra === 'undefined') return null;
		if (typeof extra === 'string') {
			extraChildren = <Text style={style.extra}>{extra}</Text>
		} else if (React.isValidElement(extra)) {
			extraChildren = extra
		}

		if (extraChildren) {
			return (<TouchableWithoutFeedback onPress={onExtraClick}>
				<View>{extraChildren}</View>
			</TouchableWithoutFeedback>)
		}
		return null;
	}
	_renderErr() {
		const style = this.style;
		const { error, errorColor, onErrorClick, errorIconFamily, errorIconName } = this.props;
		if (error) {
			return (<TouchableWithoutFeedback onPress={onErrorClick}>
				<View style={style.error}>
					<Icon family={errorIconFamily} name={errorIconName} style={[style.errorIcon, { color: errorColor }]} />
				</View>
			</TouchableWithoutFeedback>)
		}
		return null
	}
	_renderInput() {
		const style = this.style;
		const { value, defaultValue, type, clear, placeholder, editable, error, errorColor } = this.props;
		const keyboardType = this._getKeyboardType();
		let valueProps;
		// 若使用value
		if ('value' in this.props) {
			valueProps = {
				value: (typeof value === 'undefined' || value === null) ? '' : this._format(value)
			}
		} else {
			valueProps = {
				defaultValue: this._format(defaultValue)
			}
		}
		// this.value = valueProps.defaultValue || valueProps.value;
		/**
		 * this.value 在初始时值改为 undefined，
		 * 初始化组件时 this.value 的值改变为 defaultValue 或 value
		 * 此后，this.value 的值随着输入框 onChange 事件内更新
		 * 因此，在组件存在期，如果触发了组件的重新渲染，
		 * 此时，再通过 this.value = valueProps.defaultValue || valueProps.value; 来对 this.value 进行赋值
		 * 将导致发生组件维护的 this.value 值不对的情况
		 */
		if ( !this.inited ) {
			this.value = valueProps.defaultValue || valueProps.value;
			this.inited = true
		}
		
		return <TextInput
			ref="input"
			clearButtonMode={clear ? 'while-editing' : 'never'}
			underlineColorAndroid="transparent"
			{...valueProps}
			style={ [style.input, error ? { color: errorColor } : {}] }
			placeholder={placeholder}
			editable={editable}
			keyboardType={keyboardType}
			secureTextEntry={type === 'password'}
			onChange={(e) => this._onChange(e.nativeEvent.text)}
			onBlur={this._onInputBlur}
			onFocus={this._onInputFocus}
		/>
	}
	render() {
		const style = this.style;
		const { last } = this.props;
		const InputEl = this._renderInput();
		const LabelEl = this._renderLabel();
		const ExtraEl = this._renderExtra();
		const ErrEl = this._renderErr();
		return (
			<View style={[style.container, {
				borderBottomWidth: last ? 0 : StyleSheet.hairlineWidth
			}]}>
				{LabelEl}
				{InputEl}
				{ExtraEl}
				{ErrEl}
			</View>
		);
	}
}
Input.baseStyle = {
	container: {
		flex: 1,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: '#999',
		marginLeft: 10,
		paddingRight: 10,
		marginTop: 0,
		marginBottom: 0,
		flexDirection: 'row',
		alignItems: 'center',
	},
	label: {
		width: 60,
		marginRight: 5,
		textAlignVertical: 'center',
		fontSize: 14,
		color: '#333',
	},
	input: {
		flex: 1,
		height: 48,
		backgroundColor: '#FFF',
		fontSize: 14,
	},
	extra: {
		marginLeft: 4,
		fontSize: 14,
		color: '#333',
	},
	error: {
		marginLeft: 4
	},
	errorIcon: {
		fontSize: 16,
	}
}
