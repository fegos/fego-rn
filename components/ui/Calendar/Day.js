/**
 * 日历组件的单子日期子组件
 * @author asyxu 
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
	View,
	Text,
	TouchableOpacity
} from 'react-native'

export default class Day extends Component {
	static defaultProps = {
	}
	static propTypes = {
		// 组件提供的日历范围最大日期
		maxDate: PropTypes.instanceOf(Date),
		// 组件提供的日历范围最小日期
		minDate: PropTypes.instanceOf(Date),
		// 选中的日期
		selectedDate: PropTypes.instanceOf(Date).isRequired,
		// 选中某个日期的回调
		onChange: PropTypes.func,
		// 日
		date: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string
		]).isRequired,
		// 月
		month: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string
		]).isRequired,
		// 年
		year: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string
		]).isRequired,
		// 星期几
		day: PropTypes.number.isRequired,
		// 是否是本月的日期
		notThisMonth: PropTypes.bool,
	}
	static today = new Date()

	constructor (props) {
		super(props)
	}

	_isToday () {
		let today = Day.today,
			todayDate = today.getDate(),
			todayMonth = today.getMonth(),
			todayYear = today.getFullYear(),
			{ date, month, year } = this.props;
		
		return todayDate === date && todayMonth === month && todayYear === year
	}

	_isSelectedDay() {
		let { selectedDate, year, month, date} = this.props
		return (selectedDate.getFullYear() === year) 
			&& (selectedDate.getMonth() === month) 
			&& (selectedDate.getDate() === date)
	}

	_isDisabled() {
		let { year, month, date, minDate, maxDate } = this.props;
		if (!minDate && !maxDate) return false;

		let minYear, minMonth, _minDate, maxYear, maxMonth, _maxDate;
		if (minDate) {
			minYear = minDate.getFullYear()
			minMonth = minDate.getMonth()
			_minDate = minDate.getDate()
		}
		if (maxDate) {
			maxYear = maxDate.getFullYear()
			maxMonth = maxDate.getMonth()
			_maxDate = maxDate.getDate()
		}

		// date < this.props.minDate || date > this.props.maxDate 
		if ((year < minYear)
			|| (year === minYear && month < minMonth) 
			|| (year === minYear && month === minMonth && date < _minDate)
			|| (year > maxYear)
			|| (year === maxYear && month > maxMonth) 
			|| (year === maxYear && month === maxMonth && date > _maxDate)
		) {
			return true;
		} else {
			return false;
		}
		
	}

	onPress = () => {
		let { onChange, year, month, date } = this.props;
		onChange instanceof Function && onChange(year, month, date) 
	}

	render() {
		let { styles } = this.props
		let { day, date } = this.props,
			_day = day % 7, // 星期几
			isToday = this._isToday(), // 是不是今天
			isSelected = this._isSelectedDay(), // 是不是选中的日期
			isDisabled = this._isDisabled(), // 是否是不可选的日期
			dayTextGray = {}

		if ((_day === 6 || _day === 0) || this.props.notThisMonth) { // 周六日，不是本月的日期，显示灰色
			dayTextGray = styles.dayTextGray
		}

		return (
			<View style={styles.dayWrapper}>
			{
				isDisabled ? (
					<View style={[styles.dayInnerWrapper]}>
						<Text style={[styles.dayText, styles.disabledText]}>{date}</Text>
					</View>
				) : (
					<TouchableOpacity onPress={this.onPress}>
						<View style={[styles.dayInnerWrapper, isToday && styles.todayWrapper, isSelected && styles.selectedDayWrapper]}>
							<Text style={[styles.dayText, dayTextGray, isToday && styles.today, isSelected && styles.selectedDay]}>{date}</Text>
						</View>
					</TouchableOpacity>
				)
			}
			{isToday ? <Text style={[styles.todayText]}>今天</Text> : null}
			</View>
		)
	}
}
