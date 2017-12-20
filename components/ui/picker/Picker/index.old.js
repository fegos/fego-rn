/**
 * 选择器 Picker 组件
 * @author asyxu 
 */
import React from 'react'
import PropTypes from 'prop-types'
import {
	View,
	Text,
	ScrollView,
	Dimensions,
	Animated,
	Platform,
	PickerIOS,
	StatusBar,
	Modal,
	TouchableOpacity,
	TouchableWithoutFeedback
} from 'react-native'
import UIComponent from '../../../common/UIComponent'
import PickerView from '../PickerView'

const width = Dimensions.get('window').width
const pickerHeight = 220

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
		onValueChange: (selectedIndex, selectedValue, selectedLabel)=>{},
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
		// 是否可见
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
		onValueChange: PropTypes.func,
	}

	static pickerCntHeight = Platform.OS === 'ios' ? pickerHeight : (StatusBar.currentHeight + pickerHeight)
	
	constructor(props, context) {
		super(props, context)

		this.windowHeight = Dimensions.get('window').height

		this.state = {
			modalVisible: props.visible,
			animatedHeight: new Animated.Value(this.windowHeight),
			animatedOpacity: new Animated.Value(0), 
			selectedValue: props.initialValue, 
		}
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps)
		
		if (this.shouldComponentUpdate(nextProps)) {
			this.setState({
				modalVisible: true
			})
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		let { visible } = this.props
		
		if (visible || visible !== nextProps.visible) {
			return true
		}
		if (nextState) {
			if (nextState.modalVisible !== this.state.modalVisible) {
				return true
			}
		}
		return false
	}

	componentDidUpdate(prevProps) {
		let { visible } = this.props
		if (prevProps.visible !== visible) {
			this._animated(visible)
		}
	}

	// 确认按钮
	_onConfirm = () => {
		this.props.onConfirm(this.state.selectedIndex, this.state.selectedValue, this.state.selectedLabel)
		this.props.onClose()
	}
	
	// 取消按钮、关闭弹框
	_onClose = () => {
		this.props.onClose()
	}

	_onMaskPress = () => {
		let { maskClosable, onClose } = this.props
		if ( maskClosable ) {
			onClose()
		}
	}

	_animated = (visible) => {
		// 模拟内容区高度
		if (this._aniHeightHandler) {
			this._aniHeightHandler.stop()
			this._aniHeightHandler = null
		}
		this._aniHeightHandler = Animated.timing(
			this.state.animatedHeight,
			{
				toValue: visible ? this.windowHeight - Picker.pickerCntHeight : this.windowHeight,
				duration: 200
			}
		).start( () => {
			this._aniHeightHandler = null
			!visible && this.setState({ modalVisible: false })
		})

		// 模拟 mask 透明度
		if (this._aniOpacityHandler) {
			this._aniOpacityHandler.stop()
			this._aniOpacityHandler = null
		}
		this._aniOpacityHandler = Animated.timing(
			this.state.animatedOpacity,
			{
				toValue: visible ? 1 : 0,
				duration: 200
			}
		).start( () => {
			this._aniOpacityHandler = null
			!visible && this.setState({ modalVisible: false })
		} )
	}

	_onValueChange = (selectedIndex, selectedValue, selectedLabel) => {
		this.props.onValueChange(selectedIndex, selectedValue, selectedLabel)

		this.setState({
			selectedIndex, 
			selectedValue, 
			selectedLabel
		})
	}

	_onPickerViewReady = (selectedIndex, selectedValue, selectedLabel) => {
		this.setState({
			selectedIndex, 
			selectedValue, 
			selectedLabel
		})
	}

	render() {
		let style = this.style,
			{ cancelText, title, okText, data, cascade, cols } = this.props

		return (
			<View style={style.container}>
				<Modal
					animationType='none'
					transparent={true}
					visible={this.state.modalVisible}
					onRequestClose={()=>{}}
				>
					{/* 遮罩层 */}
					<TouchableWithoutFeedback onPress={this._onMaskPress}>
						<Animated.View style={[style.modalMask, {opacity: this.state.animatedOpacity}]}/>
					</TouchableWithoutFeedback>
					{/* 内容区 */}
					<Animated.View style={[style.pickerAnimatedView, {top: this.state.animatedHeight}]}>
						<View style={style.toolbarContainer}>
							<TouchableOpacity style={[style.btn, style.cancelBtn]} onPress={this._onClose}>
								<Text style={[style.btnText, style.cancelText]} >{cancelText}</Text>
							</TouchableOpacity>
							<Text style={style.title}>{title}</Text>
							<TouchableOpacity style={[style.btn, style.okBtn]} onPress={this._onConfirm}>
								<Text style={[style.btnText, style.okText]} >{okText}</Text>
							</TouchableOpacity>
						</View>
						<PickerView 
							data={data}
							cascade={cascade}
							cols={cols}
							initialValue={this.state.selectedValue}
							onValueChange={this._onValueChange}
							onReady={this._onPickerViewReady}
						/>
					</Animated.View>
				</Modal>
			</View>
		)
	}
}

Picker.baseStyle = {
	// 整体
	container: {
	},
	modalMask: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
	},
	pickerAnimatedView: {
		position: 'absolute',
		height: pickerHeight,
		width: width,
		backgroundColor: '#fff',
	},
	// 滚轮
	wheelContainer: {
		flex: 1,
		position: 'relative'
	},
	selectedLine: {
		position: 'absolute',
		top: 36*2,
		left: 0,
		right: 0,
		height: 36, 
		borderTopWidth: 1, 
		borderBottomWidth: 1, 
		borderColor: '#ccc', 
	},
	wheelMask: {
		position: 'absolute',
		backgroundColor: 'rgba(255, 255, 255, 0.6)',
		left: 0,
		right: 0,
		height: 36*2,
		zIndex: 1,
	},
	wheelMaskBottom: {
		marginTop: 36*3
	},
	wheelBody: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	wheelItem: {
		height: 36,
		alignItems: 'center',
		justifyContent: 'center',
	},
	wheelText: {
		color: '#000',
		fontSize: 16,
		backgroundColor: 'transparent'
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
	},
}

export default Picker