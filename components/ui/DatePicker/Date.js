/**
 * 日期选择器 DatePicker - 日期模式 组件
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

		this._initDate(props)
		let { year, month, date } = this._handleInitialValue(props);
		this.state = {
			data: this._getInitialStateData(year, month, date),
			year, month, date
		}
	}
	_handleInitialValue(props) {
		let { initialValue, minDate, maxDate } = props;
		let _initialValue = initialValue,
			year = _initialValue.getFullYear(),
			month = _initialValue.getMonth(),
			date = _initialValue.getDate();

		// 有最小时最大时，需判断初始值是否合法
		if (minDate || maxDate){
			let mYear, mMonth, mDate;
			if (minDate) {
				mYear = minDate.getFullYear(),
				mMonth = minDate.getMonth(),
				mDate = minDate.getDate();
			}
			
			// 保证在比较的时候只比较年月日，时间相同
			let iniT = new Date(year, month, date).getTime(),
				minT = minDate && (new Date(mYear, mMonth, mDate).getTime()),
				maxT = maxDate && (new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()).getTime());
			/**
			 * 初始值不在可选值范围内，直接设最小值为初始值
			 * 若无最小值 minDate，则最小值取1970.01.01
			 */
			if ((minDate && (iniT < minT)) || (maxDate && (iniT > maxT))) {
				if (minDate) {
					year = mYear;
					month = mMonth;
					date = mDate;
				} else {
					year = 1970;
					month = 0;
					date = 1;
				}
			}
		}
		return {
			year,
			month,
			date
		}
	}
	_getInitialStateData(year, month, date) {
		return this._getDatePickerData(year, month, date)
	}
	_initDate(props) {
		let { minDate, maxDate } = props,
			minYear, minMonth, _minDate, maxYear, maxMonth, _maxDate;

		if (minDate) {
			minYear = minDate.getFullYear();
			minMonth = minDate.getMonth();
			_minDate = minDate.getDate();
		}
		if (maxDate) {
			maxYear = maxDate.getFullYear();
			maxMonth = maxDate.getMonth();
			_maxDate = maxDate.getDate();
		}

		this.minYear = minYear || 1970;
		this.minMonth = minMonth || 0;
		this.minDate = _minDate || 1;
		this.maxYear = maxYear || 2050;
		this.maxMonth = maxMonth || 11;
		this.maxDate = _maxDate;

		let yearArray = [], monthArray = [], dateArray = [];
		for (let i=this.minYear; i<=this.maxYear; i++) {
			yearArray.push({
				label: i+'年',
				value: i+''
			})
		}
		for (let i=0; i<12; i++) {
			monthArray.push({
				label: (i+1)+'月',
				value: i+''
			})
		}
		for (let i=1; i<=31; i++) {
			dateArray.push({
				label: i+'日',
				value: i+''
			})
		}
		this.yearArray = yearArray
		this.monthArray = monthArray
		this.dateArray = dateArray
	}
	_onClose = () => {
		this.props.onClose();
	}
	_onConfirm = (val, idx, label) => {
		let { valueArr, indexArr, labelArr } = this._updateData(val, idx, label);
		this.props.onConfirm(valueArr, indexArr, labelArr, 'date');
	}
	_onChange = (val, idx, label) => {
		let { valueArr, indexArr, labelArr } = this._updateData(val, idx, label);
		this.props.onChange(valueArr, indexArr, labelArr, 'date');
	}
	_updateData(val, idx, label) {
		let [year, month, date] = val,
			[yearIdx, monthIdx, dateIdx] = idx,
			[yearLabel, monthLabel, dateLabel] = label;
		let newD = this._getDatePickerData(year, month, date);
		
		newD.forEach((data, i) => {
			let item = data.filter(d => d.value === val[i]);
			if (!item.length) {
				/**
				 * 可选值范围的变化，导致picker数据发生了变化
				 * 导致此前选中的那一项在新数据里没有了
				 * 此时默认选中新数据的第一项
				 */
				if (i === 0) {
					year = data[0].value
					yearIdx = 0
					yearLabel = data[0].label
				} else if (i === 1) {
					month = data[0].value
					monthIdx = 0
					monthLabel = data[0].label
				} else if (i === 2) {
					date = data[0].value
					dateIdx = 0
					dateLabel = data[0].label
				}
			}
		})
		this.setState({
			data: newD,
			year: parseInt(year),
			month: parseInt(month),
			date: parseInt(date)
		})

		return {
			valueArr: [year, month, date],
			indexArr: [yearIdx, monthIdx, dateIdx],
			labelArr: [yearLabel, monthLabel, dateLabel]
		};
	}
	_getDaysInMonth (year, month) {
		return new Date(year, month, 0).getDate();
	}
	_getDatePickerData(year, month, date) {
		let valueYear = parseInt(year),
			valueMonth = parseInt(month),
			valueDate = parseInt(date),
			monthArr, dateArr,
			maxDateThisMonth = this._getDaysInMonth(valueYear, valueMonth+1),
			monthStart, // slice 方法第一个参数，表示起始位置
			monthEnd, // slice 方法第二个参数，表示结束位置的下一个位置
			dateStart, // slice 方法第一个参数，表示起始位置
			dateEnd; // slice 方法第二个参数，表示结束位置的下一个位置

		if (valueYear === this.minYear && valueYear === this.maxYear) {
			// 选中的年份 === 最小年份 === 最大年份，则月份的范围只能是 [minDate.minMonth, this.maxMonth]
			monthStart = this.minMonth;
			monthEnd = this.maxMonth+1;

			if (valueMonth === this.minMonth && valueMonth === this.maxMonth) {
				// 选中的月份 === 最小月份 === 最大月份，则日期的范围只能是 [minDate.minDate, this.maxDate]
				dateStart = this.minDate - 1;
				dateEnd = this.maxDate || maxDateThisMonth;
			} else if (valueMonth === this.minMonth) {
				// 选中的月份 === 最小月份，则日期的范围只能是 [minDate.minDate, 月底]
				dateStart = this.minDate - 1;
				dateEnd = maxDateThisMonth;
			} else if (valueMonth === this.maxMonth) {
				// 选中的月份 === 最大月份，则日期的范围只能是 [1号, this.maxDate]
				dateStart = 0;
				dateEnd = this.maxDate || maxDateThisMonth;
			} else {
				// 其他情况 日期的范围只能是 [1号, 月底]
				dateStart = 0;
				dateEnd = maxDateThisMonth;
			}
		} else if (valueYear === this.minYear) {
			// 选中的年份 === 最小年份，则月份的范围只能是 [minDate.minMonth, 11] // month 范围是0-11
			monthStart = this.minMonth;
			monthEnd = 12;

			if (valueMonth === this.minMonth) {
				// 选中的月份 === 最小月份，则日期的范围只能是 [minDate.minDate, 月底]
				dateStart = this.minDate-1;
				dateEnd = maxDateThisMonth;
			} else {
				// 其他情况 日期的范围只能是 [1号, 月底]
				dateStart = 0;
				dateEnd = maxDateThisMonth;
			}
			
		} else if (valueYear === this.maxYear) {
			// 选中的年份 === 最大年份，则月份的范围只能是 [1, maxDate.maxMonth]
			monthStart = 0;
			monthEnd = this.maxMonth+1;

			if (valueMonth === this.maxMonth) {
				// 选中的月份 === 最大月份，则日期的范围只能是 [0, maxDate.maxDate]
				dateStart = 0;
				dateEnd = this.maxDate || maxDateThisMonth;
			} else {
				// 其他情况 日期的范围只能是 [1号, 月底]
				dateStart = 0;
				dateEnd = maxDateThisMonth;
			}
		} else {
			monthStart = 0;
			monthEnd = 12;
			dateStart = 0;
			dateEnd = maxDateThisMonth;
		}

		monthArr = this.monthArray.slice(monthStart, monthEnd);
		dateArr  = this.dateArray.slice(dateStart, dateEnd);

		return [this.yearArray, monthArr, dateArr]
	}

	render() {
		let { maskClosable, visible, showInModal } = this.props,
			{ year, month, date} = this.state;
		let Ele = showInModal ? Picker : PickerView;
		return (
			<Ele
				data={this.state.data}
				visible={visible}
				value={[year.toString(), month.toString(), date.toString()]}
				maskClosable={maskClosable}
				onClose={this._onClose}
				onConfirm={this._onConfirm}
				onChange={this._onChange}
			/>
		)
	}
}