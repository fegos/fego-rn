/**
 * 日历组件 头部 子组件
 * @author asyxu 
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
	View,
	Text,
	TouchableOpacity
} from 'react-native'

import MonthPicker from "../MonthPicker"
import Popup from "../Popup"

//纯受控组件，通过calendar index里面的setState更新
export default class Header extends Component {
	static defaultProps = {
		mode: "year-month",
		disabled: false,
	}

	static propTypes = {
		// 组件提供的日历范围最大日期
		maxDate: PropTypes.instanceOf(Date),
		// 组件提供的日历范围最小日期
		minDate: PropTypes.instanceOf(Date),
		// 年月变化的回调
		onChange: PropTypes.func.isRequired,
		// 当前月
		month: PropTypes.number.isRequired,
		// 当前年
		year: PropTypes.number.isRequired,
		// 日历显示的月份文案
		months: PropTypes.array.isRequired,
		// 上月翻页
		prev: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.string
		]).isRequired,
		// 下月翻页
		next: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.string
		]).isRequired,
		// 快速翻页模式
		mode: PropTypes.oneOfType(["year-month", "year-only"]),
		//禁用快速翻页
		disabled: PropTypes.bool
	}

	constructor(props) {
		super(props)


		switch (this.props.mode) {
			case "year-month":
				this.monthsData = this._monthPickerData()
				this.scanCallback = this._changeMonths
				break;
			case "year-only":
				this.yearData = this._yearPickerData()
				this.scanCallback = this._changeYears
				break;
		}
	}

	_getNext = () => {
		let next = this.props.month + 1,
			{ year, onChange } = this.props;

		if (next > 11) {
			next = 0;
			year = year + 1;
		}

		onChange(year, next);
	}

	_getPrevious = () => {
		let prev = this.props.month - 1,
			{ year, onChange } = this.props;

		if (prev < 0) {
			prev = 11;
			year = year - 1;

		}
		this.props.onChange(year, prev);
	}

	_previousMonthDisabled() {
		let { minDate, year, month } = this.props

		return (minDate &&
			(year < minDate.getFullYear() ||
				(year == minDate.getFullYear() && month <= minDate.getMonth())
			)
		)
	}

	_nextMonthDisabled() {
		let { maxDate, year, month } = this.props

		return (maxDate &&
			(year > maxDate.getFullYear() ||
				(year == maxDate.getFullYear() && month >= maxDate.getMonth())
			)
		)
	}

	//年月选择的形式
	_monthPickerData = () => {
		let { maxDate, minDate } = this.props
		let current = new Date()
		//默认前后一年
		if (!minDate) {
			minDate = new Date(current.getFullYear() - 1, current.getMonth())
		}
		if (!maxDate) {
			maxDate = new Date(current.getFullYear() + 1, current.getMonth())
		}
		let start = minDate
		let data = []
		while (start <= maxDate) {
			let year = start.getFullYear()
			let month = start.getMonth()
			let yearLabel = year + "年"
			let monthValue = month < 10 ? '0' + month : month
			let monthLabel = (month + 1) + '月'
			console.log("月：  " + monthLabel)
			data.push({ value: `${year}${monthValue}`, label: `${yearLabel}${monthLabel}` })
			start = new Date(year, month + 1)
		}
		return data
	}
	_changeMonths = () => {
		let { year, month } = this.props
		let initialValue = month < 10 ? `${year}0${1}` : `${year}${month}`
		Popup.show(
			<MonthPicker
				initialValue={initialValue}//month需要加上0几
				onClose={() => { Popup.hide() }}
				data={this.monthsData}
				onSelect={(obj, i) => {
					let year = obj.value.substring(0, 4)
					let month = obj.value.substring(4, 6)
					month = month.indexOf("0") == -1 ? month : month.substring(0, 1)
					this.props.onChange(parseInt(year), parseInt(month))
					Popup.hide()
				}}
			/>, {
				title: false,
				location: 'bottom',
				aniFrom: 'bottom',
			}
		)
	}

	//年选择的形式
	_yearPickerData = () => {
		let { maxDate, minDate } = this.props
		let current = new Date()
		//默认前后15年
		if (!minDate) {
			minDate = new Date(current.getFullYear() - 15, current.getMonth())
		}
		if (!maxDate) {
			maxDate = new Date(current.getFullYear() + 15, current.getMonth())
		}
		let start = minDate
		let data = []
		while (start <= maxDate) {
			let year = start.getFullYear()
			let month = start.getMonth()
			let yearLabel = year + "年"
			data.push({ value: `${year}`, label: `${yearLabel}` })
			start = new Date(year + 1, month)
		}
		return data
	}

	_changeYears = () => {

		let initialValue = this.props.year + ""
		Popup.show(
			<MonthPicker
				initialValue={initialValue}//month需要加上0几
				onClose={() => { Popup.hide() }}
				data={this.yearData}
				onSelect={(obj, i) => {
					let year = obj.value
					this.props.onChange(parseInt(year), this.props.month)
					Popup.hide()
				}}
			/>, {
				title: false,
				location: 'bottom',
				aniFrom: 'bottom',
			}
		)
	}


	render() {
		let { prev, next, year, month, months, styles, disabled } = this.props

		let previousBtn, nextBtn;
		if (this._previousMonthDisabled()) {
			previousBtn = (
				<Text style={[styles.prev, styles.disabledText]}>{prev}</Text>
			)
		} else {
			previousBtn = (
				<TouchableOpacity onPress={this._getPrevious}>
					<Text style={[styles.prev]}>{prev}</Text>
				</TouchableOpacity>
			)
		}

		if (this._nextMonthDisabled()) {
			nextBtn = (
				<Text style={[styles.next, styles.disabledText]}>{next}</Text>
			)
		} else {
			nextBtn = (
				<TouchableOpacity onPress={this._getNext}>
					<Text style={[styles.next]}>{next}</Text>
				</TouchableOpacity>
			)
		}

		return (
			<View style={styles.headerWrapper}>
				<View style={styles.monthOperator}>
					{previousBtn}
				</View>
				{
					disabled ?
						<Text style={[styles.title]}>
							{year}年{months[month]}
						</Text>
						: <TouchableOpacity onPress={this.scanCallback}>
							<Text style={[styles.title]}>
								{year}年{months[month]}
							</Text>
						</TouchableOpacity>
				}

				<View style={styles.monthOperator}>
					{nextBtn}
				</View>
			</View>
		)
	}
}