/**
 * 选择器 Picker 组件
 * @author asyxu 
 */
import React from 'react'
import PropTypes from 'prop-types'
import {
	View,
	Text,
	Platform,
	StatusBar,
	TouchableOpacity
} from 'react-native'
import UIComponent from '../../common/UIComponent'
import Modal from '../Modal'
import PickerView from '../PickerView'

class Picker extends UIComponent {
	static defaultProps = {
		// 传递的数据
		data: [],
		// 是否级联
		cascade: false,
		// 列数，级联时有效
		cols: 0,
		// picker 初始值
		initialValue: [],
		// 受控属性是否可见
		visible: false,
		// 大标题文案,
		title: '请选择',
		// 确定的文案
		okText: '确定',
		// 取消的文案
		cancelText: '取消',
		// 点击蒙层是否允许关闭
		maskClosable: true,
		// 关闭弹框的回调函数
		onClose: ()=>{},
		// 确定按钮的回调函数
		onConfirm: (indexArr, valueArr, labelArr)=>{},
		// 每列数据选择变化后的回调函数
		onChange: (selectedIndex, selectedValue, selectedLabel)=>{},
	}

	static propTypes = {
		// 传递的数据
		data: PropTypes.array,
		// 是否级联
		cascade: PropTypes.bool,
		// 列数
		cols: PropTypes.number,
		// picker 初始值
		initialValue: PropTypes.array,
		// picker 的值，作为受控属性使用，一般情况不建议使用，主要用于解决datePicker里data和selectedValue不匹配的情况
		value: PropTypes.array,
		// 是否可见，受控属性，需配合 onClose 使用
		visible: PropTypes.bool,
		// 大标题文案
		title: PropTypes.string,
		// 取消的文案
		cancelText: PropTypes.string,
		// 确定的文案
		okText: PropTypes.string,
		// 点击蒙层是否允许关闭
		maskClosable: PropTypes.bool,
		// 关闭弹框的回调函数
		onClose: PropTypes.func,
		// 确定按钮的回调函数
		onConfirm: PropTypes.func,
		// 每列数据选择变化后的回调函数
		onChange: PropTypes.func,
	}

	constructor(props, context) {
		super(props, context)

		this.state = {
			visible: props.visible,
			selectedValue: props.value === undefined ? props.initialValue : props.value,
		}
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps();
		if ('visible' in nextProps && nextProps.visible !== this.props.visible) {
			this.setState({
				visible: nextProps.visible
			})
		}
		if (nextProps.value !== undefined && nextProps.value.toString() !== this.props.value.toString()) {
			this.setState({
				selectedValue: nextProps.value,
			})
		}
	}

	// 确认按钮
	_onConfirm = () => {
		// Picker 自己不处理数据，也不维护index,label, 所以先从pickerview取吧，以后可以优化
		this.props.onConfirm(this.state.selectedValue, this._pickerView.state.selectedIndex, this._pickerView.state.selectedLabel)
		this.props.onClose()
	}
	// 取消按钮、关闭弹框
	_onClose = () => {
		this.props.onClose()
	}
	// 滚轮滚动导致的选中值的变化回调
	_onChange = (selectedValue, selectedIndex, selectedLabel) => {
		if (this.props.value === undefined) {
			this.setState({
				selectedValue,
			})
		}
		this.props.onChange(selectedValue, selectedIndex, selectedLabel)
	}
	_onPickerViewReady = (selectedValue, selectedIndex, selectedLabel) => {
		this.setState({
			selectedValue, 
		})
	}

	render() {
		let style = this.style,
			{ cancelText, title, okText, data, cascade, cols, maskClosable } = this.props

		return (
			<Modal
				visible={this.state.visible}
				maskClosable={maskClosable}
				animationType='slide-up'
				onClose={this._onClose}
				styles={{container: {justifyContent: 'flex-end'}}}
			>
				<View style={[style.container, Platform.OS === 'android' && {paddingBottom: StatusBar.currentHeight}]}>
					<View style={style.toolbarContainer}>
						<TouchableOpacity style={[style.btn, style.cancelBtn]} onPress={this._onClose}>
							<Text style={[style.btnText, style.cancelText]} >{cancelText}</Text>
						</TouchableOpacity>
						<Text style={style.title}>{title}</Text>
						<TouchableOpacity style={[style.btn, style.okBtn]} onPress={this._onConfirm}>
							<Text style={[style.btnText, style.okText]} >{okText}</Text>
						</TouchableOpacity>
					</View>
					<PickerView ref={(pw)=>{this._pickerView = pw}}
						data={data}
						cascade={cascade}
						cols={cols}
						value={this.state.selectedValue}
						onChange={this._onChange}
						onReady={this._onPickerViewReady}
					/>
				</View>
			</Modal>
		)
	}
}

Picker.baseStyle = {
	container: {

	},
	// Toolbar
	toolbarContainer: {
		flex: 0,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		height: 40
	},
	btn: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		justifyContent: 'center',
	},
	cancelBtn: {
		alignItems: 'flex-start',
	},
	cancelText: {
	},
	okBtn: {
		alignItems: 'flex-end'
	},
	btnText: {
		fontSize: 16,
		color: '#108ee9'
	},
	okText: {
	},
	title: {
		textAlign: 'center',
		fontSize: 16,
		color: '#333'
	}
}

export default Picker