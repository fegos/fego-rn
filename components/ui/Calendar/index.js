/**
 * 日历组件
 * @author asyxu 
 */
import React from 'react'
import PropTypes from 'prop-types'
import {
	View,
	Text,
	Dimensions
} from 'react-native'
import UIComponent from '../../common/UIComponent'
import Header from './Header'
import WeekdayBar from './WeekdayBar'
import Days from './Days'

/**
 * @class CalendarPicker
 * 维护的 state 有：
 * month、year、selectedDate
 */
export default class CalendarPicker extends UIComponent {
	static defaultProps = {
		// 默认选中的日期，非受控属性
		defaultSelectedDate: new Date(),
		// 日历显示的星期文案
		weekdays: [ '周日', '周一', '周二', '周三', '周四', '周五', '周六' ],
		// 日历显示的月份文案
		months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
		// 是否从周一开始显示，默认周日开始，需搭配 weekdays 使用
		startFromMonday: false,
		// 上月翻页
		prev: '<',
		// 下月翻页
		next: '>',
		// 选中某个日期的回调
		onChange: () => {},
		// 组件的主题色
		theme: 'default',
		// 组件是否固定显示六行
		rowFixed: false
	}

	static propTypes = {
		// 组件提供的日历范围最大日期
		maxDate: PropTypes.instanceOf(Date),
		// 组件提供的日历范围最小日期
		minDate: PropTypes.instanceOf(Date),
		// 选中的日期，受控属性，需配合 onChange 使用
		selectedDate: PropTypes.instanceOf(Date),
		// 默认选中的日期，非受控属性
		defaultSelectedDate: PropTypes.instanceOf(Date),
		// 选中某个日期的回调, 参数为选中的日期的时间戳毫秒数
		onChange: PropTypes.func,
		// 是否从周一开始显示，默认周日开始，需搭配 weekdays 使用
		startFromMonday: PropTypes.bool,
		// 日历显示的星期文案
		weekdays: PropTypes.array,
		// 日历显示的月份文案
		months: PropTypes.array,
		// 上月翻页
		prev: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.string
		]),
		// 下月翻页
		next: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.string
		]),
		// 组件的主题色
		theme: PropTypes.string,
		// 组件是否固定显示六行
		rowFixed: PropTypes.bool
	}

	constructor(props, context) {
		super(props, context)

		let selectedDate = 'selectedDate' in props ? props.selectedDate : props.defaultSelectedDate;
		this.state = {
			selectedDate: selectedDate,
			month: selectedDate.getMonth(),
			year: selectedDate.getFullYear()
		}

		this.handleMinAndManDate(props)
	}

	componentWillReceiveProps(nextProps) {
		/**
		 * 子组件调用 componentWillReceiveProps 和 componentWillMount 两个钩子
		 * 需先使用 super.func() 调父类的同名方法，进行覆盖
		 */
		super.componentWillReceiveProps(nextProps);
		if ('selectedDate' in nextProps && nextProps.selectedDate.getTime() !== this.props.selectedDate.getTime()) {
			this.setState({
				month: nextProps.selectedDate.getMonth(),
				year: nextProps.selectedDate.getFullYear(),
				selectedDate: nextProps.selectedDate
			})
		}
	}

	handleMinAndManDate(props) {
		/**
		 * 处理 minDate 和 maxDate
		 * 因为传给组件的 minDate 和 maxDate 可能不是一天的零点或 24 点，而是期间的某一个时间点，比如: Thu Mar 23 2017 17:43:15 GMT+0800 (CST)
		 * 遇到这种时间，若是 minDate 处理成 00:00:00，而若是 maxDate 则应该处理成 23:59:59
		 * 这样才能在需要将不能选的日期至灰时（ disabledText ）做到正确的判断
		 */
		let minDate = props.minDate,
			maxDate = props.maxDate

		if ( minDate ) {
			minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())
		}
		if ( maxDate ) {
			let tmp = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()+1) // 下一天的零点
			maxDate = new Date( tmp.getTime() - 1 ) // 减一毫秒，成为当前的最后一个时刻点
		}

		try {
			if ( minDate && maxDate && minDate >= maxDate ) {
				throw '日历可选最小日期应小于可选最大日期'
			} else {
				this._formedMinDate = minDate
				this._formedMaxDate = maxDate
			}
		} catch (err) {
			console.error('Calendar Picker error : ', err)
		}
	}
	
	// 选中某个日期的回调
	onDayChange = (year, month, date) => {
		let _date = new Date(year, month, date);

		if (!('selectedDate' in this.props)) {
			this.setState({
				month: month,
				year: year,
				selectedDate: _date
			})
		}

		this.props.onChange(_date, _date.getTime()) // 调用选择改变后的 api，方便用户在选择日期后进行某些操作
	}

	// header的年月发生变化
	onHeaderChange = (year, month) => {
		this.setState({
			year,
			month
		})
	}

	render() {
		let { year, month, selectedDate } = this.state,
			{ weekdays, startFromMonday, rowFixed } = this.props,
			style = this.style;

		return (
			<View style={style.container}>
				<Header
					year={year}
					month={month}
					maxDate={this._formedMaxDate}
					minDate={this._formedMinDate}
					onChange={this.onHeaderChange}
					months={this.props.months}
					prev={this.props.prev}
					next={this.props.next}
					styles={style}
				/>
				<WeekdayBar
					startFromMonday={startFromMonday}
					weekdays={weekdays}
					styles={style}
				/>
				<Days
					maxDate={this._formedMaxDate}
					minDate={this._formedMinDate}
					year={year}
					month={month}
					selectedDate={selectedDate}
					rowFixed={rowFixed}
					onChange={this.onDayChange}
					startFromMonday={startFromMonday}
					styles={style}
				/>
			</View>
		)
	}
}

const IPHONE6_WIDTH = 375;
const scaler = Dimensions.get('window').width / IPHONE6_WIDTH

CalendarPicker.baseStyle = {
	// 容器
	container: {
		backgroundColor: '#fff',
		paddingBottom: 10 * scaler
	},
	// 头部 Header.js，包含 年、月、prev、next
	headerWrapper: { // 容器
		alignItems: 'center',
		flexDirection: 'row',
		alignSelf: 'center',
		marginBottom: 10 * scaler,
		padding: 5 * scaler,
		paddingBottom: 3 * scaler,
		backgroundColor: 'transparent'
	},
	title: { // 头部显示的年月
		fontSize: 16 * scaler,
		width: 180 * scaler,
		textAlign: 'center'
	},
	monthOperator: { // prev & next wrapper
		width: 80 * scaler
	},
	prev: {
		textAlign: 'left',
		fontSize: 14 * scaler,
	},
	next: {
		textAlign: 'right',
		fontSize: 14 * scaler,
	},
	// WeekdayBar.js 包含‘周一’，‘周二’...
	weekdayBarWrapper: { // 容器
		flexDirection: 'row',
		marginBottom: 10 * scaler,
		borderBottomWidth: 0.8,
		borderBottomColor: '#e6e6e6',
		paddingTop: 10 * scaler,
		paddingBottom: 10 * scaler,
		alignSelf: 'center'
	},
	barWeekday: { // 每一项
		width: 50 * scaler,
		fontSize: 12 * scaler,
		textAlign: 'center'
	},
	// 日历主体部分 days.js
	bodyWrapper: { // 容器
		alignItems: 'center'
	},
	bodyRow: { // 每一行
		flexDirection: 'row'
	},
	// 单独每个日期 day.js 
	dayWrapper: {
		width: 50 * scaler,
		height: 50 * scaler,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	dayInnerWrapper: {
		width: 30 * scaler,
		height: 30 * scaler,
		borderRadius: 15 * scaler,
		borderWidth: 1,
		borderColor: '#fff',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	dayText: {
		fontSize: 14 * scaler,
		backgroundColor: 'transparent'
	},
	selectedDayWrapper: {
		backgroundColor: '#1188e9',
		borderColor: '#1188e9'
	},
	selectedDay: {
	},
	todayWrapper: {
		borderColor: '#1188e9',
		backgroundColor: '#ecf6ff',
	},
	today: {
	},
	todayText: {
		backgroundColor: 'transparent',
		textAlign: 'center',
		marginTop: 5 * scaler,
		fontSize: 12 * scaler
	},
}

CalendarPicker.themeStyle = {
	theme: {
		default: {
			title: {
				color: '#1188e9'
			},
			prev: {
				color: '#1188e9'
			},
			next: {
				color: '#1188e9'
			},
			barWeekday: {
				color: '#000'
			},
			dayText: {
				color: '#000'
			},
			selectedDay: {
				color: '#fff'
			},
			today: {
				color: '#1188e9'
			},
			todayText: {
				color: '#1188e9'
			},
			disabledText: {
				color: '#bbbbbb'
			},
			dayTextGray: {
				color: '#666'
			}
		}
	}
}