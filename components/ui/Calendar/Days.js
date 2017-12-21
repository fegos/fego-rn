/**
 * 日历组件的‘日历主体’子组件
 * @author asyxu 
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
	View,
	Text,
} from 'react-native'
import Day from './Day'

export default class Days extends Component {
	static defaultProps = {
	}
	static propTypes = {
		// 组件提供的日历范围最大日期
		maxDate: PropTypes.instanceOf(Date),
		// 组件提供的日历范围最小日期
		minDate: PropTypes.instanceOf(Date),
		// 当前选中的日期
		selectedDate: PropTypes.instanceOf(Date),
		// 当前展示年
		year: PropTypes.number.isRequired,
		// 当前展示月
		month: PropTypes.number.isRequired,
		// 组件是否固定显示六行
		rowFixed: PropTypes.bool.isRequired,
		// 选中某个日期的回调
		onChange: PropTypes.func.isRequired,
		// 是否从周一开始显示，默认周日开始，需搭配 weekdays 使用
		startFromMonday: PropTypes.bool.isRequired
	}

	constructor(props) {
		super(props)
	}

	_getDaysInMonth(month, year) {
		return new Date(year, month + 1, 0).getDate();
	}

	onPressDay = (year, month, date) => {
		let { onChange } = this.props;
		onChange instanceof Function && onChange(year, month, date);
	}
	
	_renderCalendarDay() {
		let { styles } = this.props,
			{ maxDate, minDate, selectedDate, year, month, startFromMonday } = this.props,
			columns = [], matrix = [], currentDay = 0, slotsAccumulator = 0,
			daysInMonth = this._getDaysInMonth(month, year); // 这个月有多少天

		/**
		 * 若是从周一开始，算是星期几时，应该减1
		 * eg: 加入今天是周五，那么 today.getDay() 为 5，但是周五在 [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ] 里的 index 是 4
		 * 所以，若是从周一开始，在算所处的列时需要-1
		 */
		let prevMonthLastDayDateObj = new Date(year, month, 0), // 上个月最后一天的Date对象
			firstDayIndex = startFromMonday ? prevMonthLastDayDateObj.getDay() : new Date(year, month, 1).getDay(), // 这个月的第一天在列中处于第几列的列下标
			prevMonthLastDay = prevMonthLastDayDateObj.getDate(), // 上个月最后一天的号数，eg: 31号？30号？
			prevMonthDayCount = firstDayIndex; // 需要显示的上个月的天数
		
		let prevMonthDay = prevMonthLastDay - prevMonthDayCount + 1,
			nextMonthDay = 1;

		for (let i = 0; i < 6; i++) { // rows
			columns = []

			for (let j = 0; j < 7; j++) { // columns
				let tmpDate, tmpMonth, tmpYear, tmpNotThisMonth;
				
				if (slotsAccumulator < prevMonthDayCount) { // 上个月的最后几天
					tmpDate = prevMonthDay
					tmpMonth = month - 1
					tmpYear = year
					tmpNotThisMonth = true
					if ( tmpMonth < 0 ) {
						tmpMonth = (tmpMonth+12) % 12
						tmpYear--
					}
					prevMonthDay++
				} else if (currentDay < daysInMonth) { // 本月的日期
					tmpDate = currentDay + 1
					tmpMonth = month
					tmpYear = year
					tmpNotThisMonth = false
					currentDay++
				} else { // 下个月的头几天
					tmpDate = nextMonthDay
					tmpMonth = month + 1
					tmpYear = year
					tmpNotThisMonth = true
					if ( tmpMonth >= 12 ) {
						tmpMonth = tmpMonth % 12
						tmpYear++
					}
					nextMonthDay++
				}

				columns.push(<Day
					key={`${i}-${j}`}
					maxDate={maxDate}
					minDate={minDate}
					selectedDate={selectedDate}
					date={tmpDate}
					month={tmpMonth}
					year={tmpYear}
					notThisMonth={tmpNotThisMonth}
					onChange={this.onPressDay}
					day={startFromMonday ? (j+1) : j}
					styles={styles}
				/>)

				slotsAccumulator++
			}
			matrix[i] = []
			matrix[i].push(<View key={i} style={styles.bodyRow}>{columns}</View>)

			// 组件是固定显示 6 行，还是显示到有下月的那行结束就不显示了
			if ( this.props.rowFixed === false && currentDay === daysInMonth ) break
		}

		return matrix;
	}

	render() {
		let { styles } = this.props;
		return <View style={styles.bodyWrapper}>{this._renderCalendarDay()}</View>
	}
}