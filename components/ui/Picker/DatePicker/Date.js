/**
 * 日期选择器 DatePicker - 日期模式 组件
 * @author asyxu
 */
import React from 'react';
import PropTypes from 'prop-types';
import {

} from 'react-native';
import { UIComponent } from '../../../common';
import PickerView from '../PickerView';


export default class DatePicker extends UIComponent {
  static defaultProps = {
    initialValue: new Date(),
    minDate: new Date(),
    maxDate: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 31 * 30)), // 默认多一年
    dateMode: 'year-month-day',
  }

  static propTypes = {
    // 初始时间
    initialValue: PropTypes.instanceOf(Date),
    // 最小日期
    minDate: PropTypes.instanceOf(Date),
    // 最大日期
    maxDate: PropTypes.instanceOf(Date),
    // 日期模式
    dateMode: PropTypes.oneOf(['year-only', 'month-only', 'day-only', 'year-month', 'year-month-day', 'month-day']),

  }
  constructor(props) {
    super(props);

    this._initDate(props);
    const { year, month, date } = this._handleInitialValue(props);
    this.state = {
      data: this._getInitialStateData(year, month, date),
      year,
      month,
      date,
    };
  }
  _handleInitialValue(props) {
    const { initialValue, minDate, maxDate } = props;
    const _initialValue = initialValue;
    // 解决日期输入格式
    let year = _initialValue.getFullYear();
    let month = _initialValue.getMonth();
    let date = _initialValue.getDate();

    // 有最小时最大时，需判断初始值是否合法
    if (minDate || maxDate) {
      let mYear;
      let mMonth;
      let mDate;
      if (minDate) {
        mYear = minDate.getFullYear();
        mMonth = minDate.getMonth();
        mDate = minDate.getDate();
      }

      // 保证在比较的时候只比较年月日，时间相同
      const iniT = new Date(year, month, date).getTime();
      const minT = minDate && (new Date(mYear, mMonth, mDate).getTime());
      const maxT = maxDate && (new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()).getTime());
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
      date,
    };
  }
  _getInitialStateData(year, month, date) {
    return this._getDatePickerData(year, month, date);
  }
  _initDate(props) {
    const { minDate, maxDate } = props;
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

    this.minYear = minYear || 1970;
    this.minMonth = minMonth || 0;
    this.minDate = _minDate || 1;
    this.maxYear = maxYear || 2050;
    this.maxMonth = maxMonth || 11;
    this.maxDate = _maxDate;

    const yearArray = [];
    const monthArray = [];
    const dateArray = [];
    for (let i = this.minYear; i <= this.maxYear; i++) {
      yearArray.push({
        label: `${i}年`,
        value: `${i}`,
      });
    }
    for (let i = 0; i < 12; i++) {
      monthArray.push({
        label: `${i + 1}月`,
        value: `${i}`,
      });
    }
    for (let i = 1; i <= 31; i++) {
      dateArray.push({
        label: `${i}日`,
        value: `${i}`,
      });
    }
    this.yearArray = yearArray;
    this.monthArray = monthArray;
    this.dateArray = dateArray;
  }


  _onChange = (val, idx, label) => {
    const { valueArr, indexArr, labelArr } = this._updateData(val, idx, label);
    this.props.onChange(valueArr, indexArr, labelArr, 'date');
  }
  _updateData(val, idx, label) {
    let { year, month, date } = this.state;
    let yearIdx;
    let yearLabel;
    let monthIdx;
    let monthLabel;
    let dateIdx;
    let dateLabel;
    switch (this.props.dateMode) {
      case 'year-only':
        [year] = val;
        [yearIdx] = idx;
        [yearLabel] = label;
        break;
      case 'month-only':
        [month] = val;
        [monthIdx] = idx;
        [monthLabel] = label;
        break;
      case 'day-only':
        [date] = val;
        [dateIdx] = idx;
        [dateLabel] = label;
        break;
      case 'year-month':
        [year, month] = val;
        [yearIdx, monthIdx] = idx;
        [yearLabel, monthLabel] = label;
        break;
      case 'year-month-day':
        [year, month, date] = val;
        [yearIdx, monthIdx, dateIdx] = idx;
        [yearLabel, monthLabel, dateLabel] = label;
        break;
      case 'month-day':
        [month, date] = val;
        [monthIdx, dateIdx] = idx;
        [monthLabel, dateLabel] = label;
        break;
      default:
        break;
    }

    const newD = this._getDatePickerData(year, month, date);
    const v = [year, month, date];
    newD.forEach((data, i) => {
      const item = data.filter(d => d.value === v[i]);
      if (!item.length) {
        /**
        * 可选值范围的变化，导致picker数据发生了变化
        * 导致此前选中的那一项在新数据里没有了
         * 此时默认选中新数据的第一项
        */
        if (i === 0) {
          year = data[0].value;
          yearIdx = 0;
          yearLabel = data[0].label;
        } else if (i === 1) {
          month = data[0].value;
          monthIdx = 0;
          monthLabel = data[0].label;
        } else if (i === 2) {
          date = data[0].value;
          dateIdx = 0;
          dateLabel = data[0].label;
        }
      }
    });
    this.setState({
      data: newD,
      year: parseInt(year, 10),
      month: parseInt(month, 10),
      date: parseInt(date, 10),
    });

    return {
      valueArr: [year, month, date],
      indexArr: [yearIdx, monthIdx, dateIdx],
      labelArr: [yearLabel, monthLabel, dateLabel],
    };
  }
  _getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }
  _getDatePickerData(year, month) {
    const valueYear = parseInt(year, 10);
    const valueMonth = parseInt(month, 10);
    const maxDateThisMonth = this._getDaysInMonth(valueYear, valueMonth + 1);
    let monthStart; // slice 方法第一个参数，表示起始位置
    let monthEnd; // slice 方法第二个参数，表示结束位置的下一个位置
    let dateStart; // slice 方法第一个参数，表示起始位置
    let dateEnd; // slice 方法第二个参数，表示结束位置的下一个位置

    if (valueYear === this.minYear && valueYear === this.maxYear) {
      // 选中的年份 === 最小年份 === 最大年份，则月份的范围只能是 [minDate.minMonth, this.maxMonth]
      monthStart = this.minMonth;
      monthEnd = this.maxMonth + 1;

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
        dateStart = this.minDate - 1;
        dateEnd = maxDateThisMonth;
      } else {
        // 其他情况 日期的范围只能是 [1号, 月底]
        dateStart = 0;
        dateEnd = maxDateThisMonth;
      }
    } else if (valueYear === this.maxYear) {
      // 选中的年份 === 最大年份，则月份的范围只能是 [1, maxDate.maxMonth]
      monthStart = 0;
      monthEnd = this.maxMonth + 1;

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

    const monthArr = this.monthArray.slice(monthStart, monthEnd);
    const dateArr = this.dateArray.slice(dateStart, dateEnd);

    return [this.yearArray, monthArr, dateArr];
  }

  _dateModeData() {
    const { data } = this.state;
    let res = [];
    const { year, month, date } = this.state;
    switch (this.props.dateMode) {
      case 'year-only':
        res = data.slice(0, 1);
        this.renderValue = [year.toString()];
        break;
      case 'month-only':
        res = data.slice(1, 2);
        this.renderValue = [month.toString()];
        break;
      case 'day-only':
        res = data.slice(2, 3);
        this.renderValue = [date.toString()];
        break;
      case 'year-month':
        res = data.slice(0, 2);
        this.renderValue = [year.toString(), month.toString()];
        break;
      case 'year-month-day':
        res = data.slice(0, 3);
        this.renderValue = [year.toString(), month.toString(), date.toString()];
        break;
      case 'month-day':
        res = data.slice(1, 3);
        this.renderValue = [month.toString(), date.toString()];
        break;
      default:
        break;
    }
    this.renderData = res;
  }

  render() {
    // 在constructor里面处理了initialValue，这里取出initialValue防止传递给下面
    const {
      maskClosable, visible, initialValue, mode, minDate, maxDate, minuteStep, pickRef, ...rest
    } = this.props;
    this._dateModeData();
    return (
      <PickerView
        ref={pickRef}
        {...rest}
        data={this.renderData}
        visible={visible}
        value={this.renderValue}
        maskClosable={maskClosable}
        onChange={this._onChange}
      />
    );
  }
}
