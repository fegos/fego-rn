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

export default class Header extends Component {
	static defaultProps = {
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
	}

	constructor(props) {
		super(props)
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

	render() {
		let { prev, next, year, month, months, styles } = this.props
		
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
				<Text style={[styles.title]}>
					{year}年{months[month]}
				</Text>
				<View style={styles.monthOperator}>
					{nextBtn}
				</View>
			</View>
		)
	}
}