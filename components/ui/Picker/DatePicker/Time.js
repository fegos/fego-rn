/**
 * 日期选择器 TimePicker - 时间模式 组件
 * @author asyxu
 */
import React from 'react';
import PropTypes from 'prop-types';
import {

} from 'react-native';
import UIComponent from '../../../common/UIComponent';
import PickerView from '../PickerView';

export default class TimePicker extends UIComponent {
  static defaultProps = {
    initialValue: new Date(),
    minuteStep: 1,
    minDate: new Date(),
    maxDate: new Date(new Date().getTime() + (1000 * 60 * 60 * 2)),
  }
  static propTypes = {
    // 初始时间
    initialValue: PropTypes.instanceOf(Date),
    // 最小步长
    minuteStep: PropTypes.number,
    // 最小日期
    minDate: PropTypes.instanceOf(Date),
    // 最大日期
    maxDate: PropTypes.instanceOf(Date),

  }
  constructor(props) {
    super(props);

    this._initDate(props);
    const { hour, minute } = this._handleInitialValue(props);

    this.state = {
      data: this._getInitialStateData(hour, minute),
      hour,
      minute,
    };
  }
  _handleInitialValue(props) {
    const {
      initialValue, minDate, maxDate, minuteStep,
    } = props;
    const _initialValue = initialValue;
    let hour = _initialValue.getHours();
    let minute = _initialValue.getMinutes();
    // 有最小时最大时，因此需判断初始值是否合法
    if (minDate || maxDate) {
      // 保证在比较的时候只比较时间，年月日相同
      const y = initialValue.getFullYear();
      const m = initialValue.getMonth();
      const d = initialValue.getDate();
      const minT = minDate && (new Date(y, m, d, minDate.getHours(), minDate.getMinutes()).getTime());
      const maxT = maxDate && (new Date(y, m, d, maxDate.getHours(), maxDate.getMinutes()).getTime());
      /**
       * 初始值不在可选值范围内，直接设最小值为初始值
       * 若无最小值 minDate，则最小值取0:00
       */
      if ((minDate && (initialValue.getTime() < minT)) || (maxDate && (initialValue.getTime() > maxT))) {
        if (minDate) {
          hour = minDate.getHours();
          minute = minDate.getMinutes();
        } else {
          hour = 0;
          minute = 0;
        }
      }
    }
    minute -= minute % minuteStep;
    return {
      hour,
      minute,
    };
  }
  _getInitialStateData(hour, minute) {
    return this._getTimePickerData(hour, minute);
  }
  _initDate(props) {
    const { minDate, maxDate, minuteStep } = props;
    let minHour;
    let minMinute;
    let maxHour;
    let maxMinute;
    // 最小日期存在，最小日期为最小日期与step内间隔
    if (minDate) {
      minHour = minDate.getHours();
      minMinute = minDate.getMinutes();
      const remainder = minMinute % minuteStep === 0 ? 0 : 1;
      minMinute += remainder;
    }
    // 最大日期存在，最大日期为最小日期与step内间隔
    if (maxDate) {
      maxHour = maxDate.getHours();
      maxMinute = maxDate.getMinutes();
      maxMinute -= maxMinute % minuteStep;
    }

    this.minHour = minHour || 0;
    this.minMinute = minMinute || 0;
    this.maxHour = maxHour || 23;
    this.maxMinute = maxMinute || 59;

    const hourArray = [];
    const minuteArray = [];
    for (let i = this.minHour; i <= this.maxHour; i++) {
      hourArray.push({
        label: `${i}时`,
        value: `${i}`,
      });
    }
    for (let i = 0; i <= 59; i++) {
      minuteArray.push({
        label: `${i}分`,
        value: `${i}`,
      });
    }

    this.hourArray = hourArray;
    this.minuteArray = minuteArray;
  }

  _onChange = (val, idx, label) => {
    const { valueArr, indexArr, labelArr } = this._updateData(val, idx, label);
    this.props.onChange(valueArr, indexArr, labelArr, 'time');
  }
  _updateData(val, idx, label) {
    let [hour, minute] = val;
    let [hourIdx, minuteIdx] = idx;
    let [hourLabel, minuteLabel] = label;
    const newD = this._getTimePickerData(hour, minute);

    newD.forEach((data, i) => {
      const item = data.filter(d => d.value === val[i]);
      if (!item.length) {
        /**
         * 级联数据维护，保证默认选中上一次的hour
         * 不存在的时候默认选择第一个
         */
        if (i === 0) {
          hour = data[0].value;
          hourIdx = 0;
          hourLabel = data[0].label;
        } else if (i === 1) {
          minute = data[0].value;
          minuteIdx = 0;
          minuteLabel = data[0].label;
        }
      }
    });
    this.setState({
      data: newD,
      hour,
      minute,
    });
    return {
      valueArr: [hour, minute],
      indexArr: [hourIdx, minuteIdx],
      labelArr: [hourLabel, minuteLabel],
    };
  }
  _getTimePickerData(hour) {
    const valueHour = parseInt(hour, 10);
    let minuteStart; // slice 方法第一个参数，表示起始位置
    let minuteEnd; // slice 方法第二个参数，表示结束位置的下一个位置

    // 分下标从0开始的，minuteEnd要表示下一个位置，所以有一个加1操作
    if (valueHour === this.minHour && valueHour === this.maxHour) {
      // 选中的时 === 最小时 === 最大时(即只有hour只有一个，那么minute决定minuteArr长度)，则分的范围只能是 [this.minMinute, this.maxMinute]
      minuteStart = this.minMinute;
      minuteEnd = this.maxMinute + 1;
    } else if (valueHour === this.minHour) {
      // 选中的时 === 最小时(即hour不止一个，那么minminute决定minuteArr长度)，则分的范围只能是 [this.minMinute, 60]
      minuteStart = this.minMinute;
      minuteEnd = 60;
    } else if (valueHour === this.maxHour) {
      // 选中的时 === 最大时(即hour不止一个，那么maxminute决定minuteArr长度)，则分的范围只能是 [0, this.maxMinute]
      minuteStart = 0;
      minuteEnd = this.maxMinute + 1;
    } else {
      // 中间时刻，默认所有minutes
      minuteStart = 0;
      minuteEnd = 60;
    }

    const minuteArr = this.minuteArray.slice(minuteStart, minuteEnd);

    return [this.hourArray, minuteArr];
  }

  render() {
    const {
      maskClosable, visible, minuteStep, initialValue, mode, minDate, maxDate, timeRef, ...rest
    } = this.props;
    const { hour, minute, data } = this.state;
    const _data1 = data[1].filter((d, i) => (i % minuteStep) === 0);
    return (
      <PickerView
        ref={timeRef}
        {...rest}
        data={[data[0], _data1]}
        visible={visible}
        value={[hour.toString(), minute.toString()]}
        maskClosable={maskClosable}
        onChange={this._onChange}
      />
    );
  }
}
