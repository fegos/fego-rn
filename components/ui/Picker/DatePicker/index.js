/**
 * 日期选择器 DatePicker 组件
 * @author asyxu
 */
import React from 'react';
import PropTypes from 'prop-types';
import {

} from 'react-native';
import { UIComponent } from '../../../common';
import DateModePicker from './Date';
import TimeModePicker from './Time';

// 非受控组件
export default class DatePicker extends UIComponent {
  static defaultProps = {
    visible: false,
    mode: 'date',
    minuteStep: 1,
    title: '请选择',
    okText: '确定',
    cancelText: '取消',
    showInModal: true,
    maskClosable: true,
    dateMode: 'year-month-day',
    format: () => { },
  }
  static propTypes = {
    // 是否可见，受控属性
    visible: PropTypes.bool,
    // 日期选择器模式，目前支持 'date', 'time'
    mode: PropTypes.oneOf(['date', 'time']),
    // 日期模式
    dateMode: PropTypes.oneOf(['year-only', 'month-only', 'day-only', 'year-month', 'year-month-day', 'month-day']),
    // picker 初始值
    initialValue: PropTypes.instanceOf(Date),
    // 可选的最小日期
    minDate: PropTypes.instanceOf(Date),
    // 可选的最大日期
    maxDate: PropTypes.instanceOf(Date),
    // 'time' 模式下的时间间隔
    minuteStep: PropTypes.number,
    // 模态框标题
    title: PropTypes.string,
    // 确定的文案
    okText: PropTypes.string,
    // 取消的文案
    cancelText: PropTypes.string,
    // 是否在弹层中显示，false 则直接展示在视图中，因此设为 false 时也可以通过 popup.show 来进行展示
    showInModal: PropTypes.bool,
    // 点击蒙层是否允许关闭
    maskClosable: PropTypes.bool,
    // 每列数据选择变化后的回调函数
    onChange: PropTypes.func,
  }


  _onChange = (val, idx, label, pickerType) => {
    const { onChange } = this.props;
    if (onChange instanceof Function) {
      onChange(val, idx, label, pickerType);
    }
  }

  render() {
    const { mode, dataPickRef } = this.props;
    const callbacks = {
      onChange: this._onChange,
    };

    switch (mode) {
      case 'date':
        return <DateModePicker pickRef={dataPickRef} {...this.props} {...callbacks} />;
      case 'time':
        return <TimeModePicker timeRef={dataPickRef} {...this.props} {...callbacks} />;
      default:
        return null;
    }
  }
}
