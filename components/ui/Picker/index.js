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
	TouchableOpacity,
	Dimensions
} from 'react-native'
import UIComponent from '../../common/UIComponent'
import Modal from '../Modal'
import PickerView from '../PickerView'
import DatePicker from '../DatePicker'

const width = Dimensions.get('window').width

class Picker extends UIComponent {
	static defaultProps = {
		//模式默认为datapicker
		mode: "datePicker",
		//datePicker mode
		datePickerMode: "date",
		// datePicker date 显示模式
		dateShowMode: "year-month",
		// 传递的数据
		data: [],
		// 非受控属性: picker 初始值
		defaultValue: [],
		// 受控属性: 是否可见
		visible: false,
		/*		modal		*/
		modal: false,//是否为模态
		maskClosable: true,// 点击蒙层是否允许关闭
		/*		header 		*/
		// 标题文案,
		title: '请选择',
		// 确定的文案
		okText: '确定',
		// 取消的文案
		cancelText: '取消',
		/*		footer 		*/
		//cancelText:'取消',同上接口
		// 关闭弹框的回调函数
		onClose: () => { },
		// 确定按钮的回调函数
		onConfirm: (indexArr, valueArr, labelArr) => { },
		// 每列数据选择变化后的回调函数
		onChange: (selectedIndex, selectedValue, selectedLabel) => { },
	}

	static propTypes = {
		//picker模式，默认为dataPicker
		mode: PropTypes.oneOf(['dataPicker', 'datePicker']),
		//datePicker mode
		datePickerMode: PropTypes.oneOf(['date', 'time']),
		// datePicker date 显示模式
		dateShowMode: PropTypes.oneOf(['year-only', 'month-only', 'day-only', 'year-month', 'year-month-day', 'month-day']),
		// 非受控属性：
		defaultDateValue:PropTypes.instanceOf(Date),
		// 可选的最小日期
		minDate: PropTypes.instanceOf(Date),
		// 可选的最大日期
		maxDate: PropTypes.instanceOf(Date),
		// 'time' 模式下的时间间隔
		minuteStep: PropTypes.number,
		// 传递的数据
		data: PropTypes.array,
		// 非受控属性: picker 初始值
		defaultValue: PropTypes.array,
		// 受控属性: picker 的值，作为受控属性使用，一般情况不建议使用，主要用于解决datePicker里data和selectedValue不匹配的情况
		value: PropTypes.array,
		// 受控属性: 是否可见，受控属性，需配合 onClose 使用
		visible: PropTypes.bool,
		/*		modal		*/
		modal: PropTypes.bool,//是否为模态
		maskClosable: PropTypes.bool,// 点击蒙层是否允许关闭
		/*		header 		*/
		// 标题文案
		title: PropTypes.string,
		// 取消的文案
		cancelText: PropTypes.string,
		// 确定的文案
		okText: PropTypes.string,
		/*		footer 		*/
		//cancelText:'取消',同上接口
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
			selectedValue: props.value === undefined ? props.defaultValue : props.value,
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
		// 从pickerview取出选择的值
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

	_renderPickerContents = () => {
		let style = this.style,
			{ cancelText, title, okText, data } = this.props

		return (
			<View style={[style.container, Platform.OS === 'android' && { paddingBottom: StatusBar.currentHeight }]}>
				{/* header */}
				{this.props.header ? <View style={style.headerView}>
					<TouchableOpacity style={[style.btn, style.cancelBtn]} onPress={this._onClose}>
						<Text style={[style.btnText, style.cancelText]} >{cancelText}</Text>
					</TouchableOpacity>
					<Text style={style.title}>{title}</Text>
					<TouchableOpacity style={[style.btn, style.okBtn]} onPress={(e) => { this._onConfirm() }}>
						<Text style={[style.btnText, style.okText]} >{okText}</Text>
					</TouchableOpacity>
				</View> : null}

				{/* middle */}
				{
					this.props.mode === "dataPicker" ?
						<PickerView ref={(pw) => { this._pickerView = pw }}
							data={data}
							value={this.state.selectedValue}
							onChange={this._onChange}
							onReady={this._onPickerViewReady}
						/> :
						<DatePicker ref={(pw) => {
							if (pw) {
								this._pickerView = pw.refs.pw1.refs.pw2
							}
						}}
						mode={this.props.datePickerMode}
						minDate={this.props.minDate}
						maxDate={this.props.maxDate}
						initialValue={this.props.defaultDateValue}
						minuteStep={this.props.minuteStep} 
						onChange={this._onChange}
						/>
				}


				{/* footer */}
				{this.props.footer ? <View style={style.footerView}>
					<TouchableOpacity style={[style.footerOKBtn]} onPress={this._onConfirm}>
						<Text style={[style.btnText, style.footerOKText]} >{okText}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[style.footerCancelBtn]} onPress={this._onClose}>
						<Text style={[style.btnText, style.footerCancelText]} >{cancelText}</Text>
					</TouchableOpacity>
				</View> : null}

			</View>
		)
	}
	_renderViews = () => {
		if (this.props.modal) {
			return (<Modal
				visible={this.state.visible}
				maskClosable={this.props.maskClosable}
				animationType='slide-up'
				onClose={this._onClose}
				styles={{ container: { justifyContent: 'flex-end' } }}>
				{this._renderPickerContents()}
			</Modal>)
		} else {

			return (<View>
				{this._renderPickerContents()}
			</View>)

		}
	}

	render() {
		return (
			this._renderViews()
		)
	}
}

Picker.baseStyle = {
	container: {

	},
	// header Toolbar
	headerView: {
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
	},
	// footer Toolbar
	footerView: {
		flex: 0,
		justifyContent: 'center',
		alignItems: 'center',
		height: 35
	},
	footerOKBtn: {
		paddingVertical: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderTopWidth: 1,
		borderTopColor: '#ccc',
		width: width,
	},
	footerCancelBtn: {
		paddingVertical: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		borderTopWidth: 1,
		borderTopColor: '#ccc',
		width: width,
	},
	footerOKText: {
		color: '#108ee9'
	},
	footerCancelText: {
		color: '#108ee9'
	}
}

export default Picker