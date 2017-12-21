/**
 * 日期选择器 TimePicker - 时间模式 组件
 * @author asyxu 
 */
import React from 'react'
import PropTypes from 'prop-types'
import {

} from 'react-native'
import UIComponent from '../../common/UIComponent'
import Picker from '../Picker'
import PickerView from '../PickerView'

export default class DatePicker extends UIComponent {
	static defaultProps = {
		initialValue: new Date()
	}
	constructor(props) {
		super(props)

		this._initDate(props);
		let { hour, minute } = this._handleInitialValue(props);

		this.state = {
			data: this._getInitialStateData(hour, minute),
			hour,
			minute
		}
	}
	_handleInitialValue(props) {
		let { initialValue, minDate, maxDate, minuteStep } = props;
		let _initialValue = initialValue,
			hour = _initialValue.getHours(),
			minute = _initialValue.getMinutes();
		// 有最小时最大时，因此需判断初始值是否合法
		if (minDate || maxDate){
			// 保证在比较的时候只比较时间，年月日相同
			let h = initialValue.getFullYear(),
				m = initialValue.getMonth(),
				d = initialValue.getDate(),
				minT = minDate && (new Date(h, m, d, minDate.getHours(), minDate.getMinutes()).getTime()),
				maxT = maxDate && (new Date(h, m, d, maxDate.getHours(), maxDate.getMinutes()).getTime());
			/**
			 * 初始值不在可选值范围内，直接设最小值为初始值
			 * 若无最小值 minDate，则最小值取0:00
			 */
			if ((minDate && (initialValue.getTime() < minT)) || (maxDate && (initialValue.getTime() > maxT))) {
				// _initialValue = minDate;
				if (minDate) {
					hour = minDate.getHours();
					minute = minDate.getMinutes();
				} else {
					hour = 0;
					minute = 0;
				}
			}
		}
		minute = minute - minute % minuteStep;
		return {
			hour,
			minute
		}
	}
	_getInitialStateData(hour, minute) {
		return this._getTimePickerData(hour, minute)
	}
	_initDate(props) {
		let { minDate, maxDate, minuteStep } = props,
			minHour, minMinute, maxHour, maxMinute;

		if (minDate) {
			minHour = minDate.getHours();
			minMinute = minDate.getMinutes();
			minMinute = minMinute - minMinute % minuteStep;
		}
		if (maxDate) {
			maxHour = maxDate.getHours();
			maxMinute = maxDate.getMinutes();
			maxMinute = maxMinute - maxMinute % minuteStep;
		}

		this.minHour = minHour || 0;
		this.minMinute = minMinute || 0;
		this.maxHour = maxHour || 23;
		this.maxMinute = maxMinute || 59;

		let hourArray = [], minuteArray = [];
		for (let i=this.minHour; i<=this.maxHour; i++) {
			hourArray.push({
				label: i+'时',
				value: i+''
			})
		}
		for (let i=0; i<=59; i++) {
			minuteArray.push({
				label: i+'分',
				value: i+''
			})
		}

		this.hourArray = hourArray
		this.minuteArray = minuteArray
	}
	_onClose = () => {
		this.props.onClose();
	}
	_onConfirm = (val, idx, label) => {
		let { valueArr, indexArr, labelArr } = this._updateData(val, idx, label);
		this.props.onConfirm(valueArr, indexArr, labelArr, 'time');
	}
	_onChange = (val, idx, label) => {
		let { valueArr, indexArr, labelArr } = this._updateData(val, idx, label);
		this.props.onChange(valueArr, indexArr, labelArr, 'time');
	}
	_updateData(val, idx, label) {
		let [hour, minute] = val,
			[hourIdx, minuteIdx] = idx,
			[hourLabel, minuteLabel] = label,
			newD = this._getTimePickerData(hour, minute);
		
		newD.forEach((data, i) => {
			let item = data.filter(d => d.value === val[i]);
			if (!item.length) {
				/**
				 * 可选值范围的变化，导致picker数据发生了变化
				 * 导致此前选中的那一项在新数据里没有了
				 * 此时默认选中新数据的第一项
				 */
				if (i === 0) {
					hour = data[0].value
					hourIdx = 0
					hourLabel = data[0].label
				} else if (i === 1) {
					minute = data[0].value
					minuteIdx = 0
					minuteLabel = data[0].label
				}
			}
		})
		this.setState({
			data: newD,
			hour,
			minute,
		})
		return {
			valueArr: [hour, minute],
			indexArr: [hourIdx, minuteIdx],
			labelArr: [hourLabel, minuteLabel]
		};
	}
	_getTimePickerData(hour, minute) {
		let valueHour = parseInt(hour),
			valueMimute = parseInt(minute),
			minuteArr,
			minuteStart, // slice 方法第一个参数，表示起始位置
			minuteEnd; // slice 方法第二个参数，表示结束位置的下一个位置

		// 分下标从0开始的，minuteEnd要表示下一个位置，所以有一个加1操作
		if (valueHour === this.minHour && valueHour === this.maxHour) {
			// 选中的时 === 最小时 === 最大时，则分的范围只能是 [this.minMinute, this.maxMinute]
			minuteStart = this.minMinute;
			minuteEnd = this.maxMinute+1;
		} else if (valueHour === this.minHour) {
			// 选中的时 === 最小时，则分的范围只能是 [this.minMinute, 60]
			minuteStart = this.minMinute;
			minuteEnd = 60;
		} else if (valueHour === this.maxHour) {
			// 选中的时 === 最大时，则分的范围只能是 [0, this.maxMinute]
			minuteStart = 0;
			minuteEnd = this.maxMinute+1;
		} else {
			minuteStart = 0;
			minuteEnd = 60;
		}

		minuteArr = this.minuteArray.slice(minuteStart, minuteEnd);

		return [this.hourArray, minuteArr]
	}

	render() {
		let { maskClosable, visible, minuteStep, showInModal } = this.props,
			{ hour, minute, data } = this.state,
			_data1 = data[1].filter((d, i) => (i % minuteStep) === 0);
		let Ele = showInModal ? Picker : PickerView;
		return (
			<Ele
				data={[data[0], _data1]}
				visible={visible}
				value={[hour.toString(), minute.toString()]}
				maskClosable={maskClosable}
				onClose={this._onClose}
				onConfirm={this._onConfirm}
				onChange={this._onChange}
			/>
		)
	}
}