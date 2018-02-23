/**
 * 日历组件的单子日期子组件
 * @author asyxu
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';

// 纯受控组件，通过calendar index里面的setState更新
export default class Day extends Component {
  static defaultProps = {
  }
  static propTypes = {
    // 组件提供的日历范围最大日期
    maxDate: PropTypes.instanceOf(Date).isRequired,
    // 组件提供的日历范围最小日期
    minDate: PropTypes.instanceOf(Date).isRequired,
    // 选中的日期
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    // 选中某个日期的回调
    onChange: PropTypes.func.isRequired,
    // 日
    date: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    // 月
    month: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    // 年
    year: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    // 星期几
    day: PropTypes.number.isRequired,
    // 是否是本月的日期
    notThisMonth: PropTypes.bool.isRequired,
  }
  static today = new Date()


  _isToday() {
    const { today } = Day;
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    const { date, month, year } = this.props;

    return todayDate === date && todayMonth === month && todayYear === year;
  }

  _isSelectedDay() {
    const {
      selectedDate, year, month, date,
    } = this.props;
    return (selectedDate.getFullYear() === year)
      && (selectedDate.getMonth() === month)
      && (selectedDate.getDate() === date);
  }

  _isDisabled() {
    const {
      year, month, date, minDate, maxDate,
    } = this.props;
    if (!minDate && !maxDate) return false;

    let minYear;
    let minMonth;
    let _minDate;
    let maxYear;
    let maxMonth;
    let _maxDate;
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
    const {
      onChange, year, month, date,
    } = this.props;
    onChange instanceof Function && onChange(year, month, date);
  }

  render() {
    const { styles } = this.props;
    const { day, date } = this.props;
    const _day = day % 7; // 星期几
    const isToday = this._isToday(); // 是不是今天
    const isSelected = this._isSelectedDay(); // 是不是选中的日期
    const isDisabled = this._isDisabled(); // 是否是不可选的日期
    let dayTextGrayG = {};

    if ((_day === 6 || _day === 0) || this.props.notThisMonth) { // 周六日，不是本月的日期，显示灰色
      dayTextGrayG = styles.dayTextGray;
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
                  <Text style={[styles.dayText, dayTextGrayG, isToday && styles.today, isSelected && styles.selectedDay]}>{date}</Text>
                </View>
              </TouchableOpacity>
            )
        }
        {isToday ? <Text style={[styles.todayText]}>今天</Text> : null}
      </View>
    );
  }
}
