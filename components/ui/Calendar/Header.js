/**
 * 日历组件 头部 子组件
 * @author asyxu
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';

import MonthPicker from '../MonthPicker';
import Popup from '../Popup';
import Picker from '../Picker';


// 纯受控组件，通过calendar index里面的setState更新
export default class Header extends Component {
  static defaultProps = {
    scanMode: 'cascade',
    mode: 'year-month',
    disabled: false,
  }

  static propTypes = {
    // 快速翻页模式
    scanMode: PropTypes.oneOfType(['cascade', 'non-cascade']),
    // 组件提供的日历范围最大日期
    maxDate: PropTypes.instanceOf(Date).isRequired,
    // 组件提供的日历范围最小日期
    minDate: PropTypes.instanceOf(Date).isRequired,
    // 年月变化的回调
    onChange: PropTypes.func.isRequired,
    // 当前月
    month: PropTypes.number.isRequired,
    // 当前年
    year: PropTypes.number.isRequired,
    // 日历显示的月份文案
    months: PropTypes.arrayOf(PropTypes.string).isRequired,
    // 上月翻页
    prev: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
    ]).isRequired,
    // 下月翻页
    next: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
    ]).isRequired,
    // 快速翻页模式
    mode: PropTypes.oneOfType(['year-month', 'year-only']),
    // 禁用快速翻页
    disabled: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.state = {
      scanVisible: false,
    };

    if (this.props.scanMode === 'cascade') {
      this.dateData = this._dateDate();
      this.scanCallback = this._changeDate;
    } else {
      switch (this.props.mode) {
        case 'year-month':
          this.monthsData = this._monthPickerData();
          this.scanCallback = this._changeMonths;
          break;
        case 'year-only':
          this.yearData = this._yearPickerData();
          this.scanCallback = this._changeYears;
          break;
        default:
          break;
      }
    }
  }

  _getNext = () => {
    let next = this.props.month + 1;
    let { year } = this.props;
    const { onChange } = this.props;

    if (next > 11) {
      next = 0;
      year += 1;
    }

    onChange(year, next);
  }

  _getPrevious = () => {
    let prev = this.props.month - 1;
    let { year } = this.props;
    const { onChange } = this.props;

    if (prev < 0) {
      prev = 11;
      year -= 1;
    }
    onChange(year, prev);
  }

  _previousMonthDisabled() {
    const { minDate, year, month } = this.props;

    return (minDate &&
      (year < minDate.getFullYear() ||
        (year === minDate.getFullYear() && month <= minDate.getMonth())
      )
    );
  }

  _nextMonthDisabled() {
    const { maxDate, year, month } = this.props;

    return (maxDate &&
      (year > maxDate.getFullYear() ||
        (year === maxDate.getFullYear() && month >= maxDate.getMonth())
      )
    );
  }
  // 级联模式date数据
  _dateDate = () => {
    const { maxDate, minDate } = this.props;
    return { minDate, maxDate };
  }
  _changeDate = () => {
    this.setState({ scanVisible: true });
  }
  // 年月选择的形式
  _monthPickerData = () => {
    const { maxDate, minDate } = this.props;
    let start = minDate;
    const data = [];
    while (start <= maxDate) {
      const year = start.getFullYear();
      const month = start.getMonth();
      const yearLabel = `${year}年`;
      const monthValue = month < 10 ? `0${month}` : month;
      const monthLabel = `${month + 1}月`;
      // console.log('月：  ' + monthLabel);
      data.push({ value: `${year}${monthValue}`, label: `${yearLabel}${monthLabel}` });
      start = new Date(year, month + 1);
    }
    return data;
  }
  _changeMonths = () => {
    const { year, month } = this.props;
    const initialValue = month < 10 ? `${year}0${1}` : `${year}${month}`;
    Popup.show(<MonthPicker
      initialValue={initialValue}// month需要加上0几
      onClose={() => { Popup.hide(); }}
      data={this.monthsData}
      onSelect={(obj) => {
        const y = obj.value.substring(0, 4);
        let m = obj.value.substring(4, 6);
        m = m.indexOf('0') === -1 ? m : m.substring(0, 1);
        this.props.onChange(parseInt(y, 10), parseInt(m, 10));
        Popup.hide();
      }}
    />, {
      title: false,
      location: 'bottom',
      aniFrom: 'bottom',
    });
  }

  // 年选择的形式
  _yearPickerData = () => {
    const { maxDate, minDate } = this.props;
    let start = minDate;
    const data = [];
    while (start <= maxDate) {
      const year = start.getFullYear();
      const month = start.getMonth();
      const yearLabel = `${year}年`;
      data.push({ value: `${year}`, label: `${yearLabel}` });
      start = new Date(year + 1, month);
    }
    return data;
  }

  _changeYears = () => {
    const initialValue = `${this.props.year}`;
    Popup.show(<MonthPicker
      initialValue={initialValue}// month需要加上0几
      onClose={() => { Popup.hide(); }}
      data={this.yearData}
      onSelect={(obj) => {
        const year = obj.value;
        this.props.onChange(parseInt(year, 10), this.props.month);
        Popup.hide();
      }}
    />, {
      title: false,
      location: 'bottom',
      aniFrom: 'bottom',
    });
  }


  render() {
    const {
      prev, next, year, month, months, styles, disabled,
    } = this.props;

    let previousBtn;
    let nextBtn;
    if (this._previousMonthDisabled()) {
      previousBtn = (
        <Text style={[styles.prev, styles.disabledText]}>{prev}</Text>
      );
    } else {
      previousBtn = (
        <TouchableOpacity onPress={this._getPrevious}>
          <Text style={[styles.prev]}>{prev}</Text>
        </TouchableOpacity>
      );
    }

    if (this._nextMonthDisabled()) {
      nextBtn = (
        <Text style={[styles.next, styles.disabledText]}>{next}</Text>
      );
    } else {
      nextBtn = (
        <TouchableOpacity onPress={this._getNext}>
          <Text style={[styles.next]}>{next}</Text>
        </TouchableOpacity>
      );
    }
    const { mode } = this.props;
    const initialValue = new Date(year, month);
    return (
      <View>
        <View style={styles.headerWrapper}>
          <View style={styles.monthOperator}>
            {previousBtn}
          </View>
          {
            disabled ? (
              <Text style={[styles.title]}>
                {year}年{months[month]}
              </Text>
            ) : (
              <TouchableOpacity onPress={this.scanCallback}>
                <Text style={[styles.title]}>
                  {year}年{months[month]}
                </Text>
              </TouchableOpacity>
              )
          }

          <View style={styles.monthOperator}>
            {nextBtn}
          </View>
        </View>

        <Picker
          visible={this.state.scanVisible}
          mode="datePicker"
          datePickerMode="date"
          dateMode={mode}
          defaultDateValue={initialValue}
          minDate={this.dateData.minDate}
          maxDate={this.dateData.maxDate}
          maskClosable
          onClose={() => { }}
          onConfirm={(selectedValue) => {
            this.props.onChange(parseInt(selectedValue[0], 10), mode === 'year-only' ? this.props.month : parseInt(selectedValue[1], 10));
            this.setState({ scanVisible: false });
          }}
        />
      </View>
    );
  }
}
