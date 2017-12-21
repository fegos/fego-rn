/**
 * 日期选择器 DatePicker 组件
 * @author asyxu 
 */
import React from 'react'
import PropTypes from 'prop-types'
import {

} from 'react-native'
import UIComponent from '../../common/UIComponent'
import Picker from '../Picker'
import DateMode from './Date'
import TimeMode from './Time'

export default class DatePicker extends UIComponent {
	static defaultProps = {
		visible: false,
		mode: 'date',
		minuteStep: 1,
		title: '请选择',
		okText: '确定',
		cancelText: '取消',
		showInModal: true,
		maskClosable: true,
		onClose: ()=>{},
		onConfirm: ()=>{},
		format: ()=>{},
	}
	static propTypes = {
		// 是否可见，受控属性，需配合 onClose 使用
		visible: PropTypes.bool,
		// 日期选择器模式，目前支持 'date', 'datetime', 'time'
		mode: PropTypes.oneOf(['date', 'datetime', 'time']),
		// picker 初始值
		initialValue: PropTypes.instanceOf(Date),
		// 可选的最小日期
		minDate: PropTypes.instanceOf(Date),
		// 可选的最大日期
		maxDate: PropTypes.instanceOf(Date),
		// 'datetime', 'time' 模式下的时间间隔
		minuteStep: PropTypes.number,
		// 模态框标题
		title: PropTypes.string,
		// 确定的文案
		okText: PropTypes.string,
		// 取消的文案
		cancelText: PropTypes.string,
		// 是否在弹层中显示，false 则直接展示在视图中，因此设为 false 时也可以通过 popup.show 来进行展示
		showInModal: PropTypes.bool,
		// 点击蒙层是否允许关闭
		maskClosable: PropTypes.bool,
		// 关闭弹框的回调函数
		onClose: PropTypes.func,
		// 确定按钮的回调函数
		onConfirm: PropTypes.func,
		// 每列数据选择变化后的回调函数
		onChange: PropTypes.func,
	}

	constructor(props) {
		super(props)
	}

	_onClose = () => {
		this.props.onClose();
	}
	_onConfirm = (val, idx, label, pickerType) => {
		this.props.onConfirm(val, idx, label, pickerType);
	}
	_onChange = (val, idx, label, pickerType) => {
		let { onChange } = this.props;
		onChange instanceof Function && onChange(val, idx, label, pickerType);
	}

	render() {
		let { mode, onChange } = this.props,
			callbacks = {
				onClose: this._onClose,
				onConfirm: this._onConfirm,
				onChange: this._onChange
			};

		switch (mode) {
			case 'date': 
				return <DateMode {...this.props} {...callbacks}/>;
			case 'datetime': 
				break;
			case 'time': 
				return <TimeMode {...this.props} {...callbacks}/>;
			default: 
				return null;
		}
	}
}