/**
 * 月份选择控件
 * @author asy
 */
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { UIComponent } from 'common';

import Button from '../Button';

const itemHeight = 50;

export default class MonthPicker extends UIComponent {
  static defaultProps = {
    data: [],
    initialValue: '',
    onClose: () => { },
    onSelect: () => { }, // obj, index 参数
  }
  static propTypes = {
    // 内容，设置此属性可覆盖 MonthPicker 默认的选项
    data: PropTypes.arrayOf(PropTypes.any),
    // 初始选中的值，默认选中最后一个
    initialValue: PropTypes.string,
    // 关闭回调
    onClose: PropTypes.func,
    // 选中回调
    onSelect: PropTypes.func,
  }
  static months = []
  static startMonth = '201609'
  static setStartMonths(value) {
    MonthPicker.startMonth = value;
  }
  static getMonths() {
    const months = [];
    const now = new Date();
    const nowYear = now.getFullYear();
    const nowMonth = now.getMonth() + 1;
    const sm = MonthPicker.startMonth;
    const startYear = parseInt(sm.slice(0, 4), 10);
    const startMonth = parseInt(sm.slice(4), 10);

    for (let i = startYear; i <= nowYear; i++) {
      for (let j = 1; j <= 12; j++) {
        if (i === startYear && j < startMonth) {
          // continue
        } else if (i === nowYear && j > nowMonth) {
          // continue
        } else {
          // 格式化月份数据
          j = (j < 10 ? '0' : '') + j;
          const label = MonthPicker.format(i, j);
          months.push({
            label,
            value: `${i}${j}`,
          });
        }
      }
    }
    MonthPicker.months = months;
    return months;
  }
  static format(year, month) {
    return `${year}年${month}月`;
  }

  constructor(props) {
    super(props);

    this._init(props);
    this.state = this._getInitialState(props);
  }

  _init(props) {
    const { data } = props;
    this.months = data.length === 0 ? MonthPicker.months : data;
    this.totalCount = this.months.length;
    this.viewCount = this.totalCount < 4 ? this.totalCount : 4;

    const pickerHeight = this.totalCount < 4 ? (this.totalCount * itemHeight) : (4 * itemHeight);
    this.containerHeight = pickerHeight + 54;
    this.listHeight = pickerHeight;
  }

  _getInitialState(props) {
    const { months } = this;
    const { initialValue } = props;
    let valueV = '';
    let index = 0;
    if (initialValue) {
      months.forEach((m, i) => {
        if (m.value === initialValue) {
          valueV = m.value;
          index = i;
        }
      });
    } else {
      const lastMonthIndex = months.length - 1;
      valueV = months[lastMonthIndex].value;
      index = lastMonthIndex;
    }

    return {
      value: valueV,
      index,

    };
  }

  _onClose = () => {
    this.props.onClose();
  }

  _onSelect = (obj, index) => {
    this.props.onSelect(obj, index);
    this.setState({
      value: obj.value,
      index,
    });
  }

  _onLayout = () => {
    const { index } = this.state;
    if (this.scrollView && index > (this.viewCount - 1)) {
      const offsetY = (index - (this.viewCount - 1)) * itemHeight;
      this.scrollView.scrollTo({ x: 0, y: offsetY, animated: false });
    }
  }

  _onScrollEndDrag = (e) => {
    const offset = e.nativeEvent.contentOffset.y;
    const t = offset / itemHeight;
    let count = (offset % itemHeight) > (itemHeight / 2) ? Math.ceil(t) : Math.floor(t);

    if (count < 0) {
      count = 0;
    }
    if (count > (this.totalCount - this.viewCount)) {
      count = this.totalCount - this.viewCount;
    }
    if (this.scrollView) {
      this.scrollView.scrollTo({ x: 0, y: count * itemHeight, animated: true });
    }
  }

  render() {
    const { value } = this.state;
    const { style } = this;
    return (
      <View style={[style.container, { height: this.containerHeight }]}>
        <View style={[style.list, { height: this.listHeight }]} onLayout={this._onLayout}>
          <ScrollView
            ref={(c) => {
              this.scrollView = c;
            }}
            bounce={false}
            alwaysBounceHorizontal={false}
            alwaysBounceVertical={false}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            onScrollEndDrag={this._onScrollEndDrag}
          >

            {this.months.map((m, i) => (
              <TouchableOpacity
                onPress={
                  () => {
                    this._onSelect(m, i);
                  }
                }
                key={m.value}
              >
                <View style={style.item}>
                  <Text style={[style.text, m.value === value && style.selectedText]}>{m.label}</Text>
                </View>
              </TouchableOpacity>
            ))}

          </ScrollView>
        </View>
        <Button title="取消" onPress={this._onClose} style={style.btn} textColor="#858DA0" />
      </View>
    );
  }
}

MonthPicker.baseStyle = {
  container: {
    // height: pickerHeight + 54,
    backgroundColor: '#F1F1F3',
    justifyContent: 'flex-start',
  },
  list: {
    // height: pickerHeight,
  },
  item: {
    marginLeft: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 16,
    paddingTop: 16,
    height: itemHeight,
    backgroundColor: '#F1F1F3',
    borderBottomColor: '#ededed',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    color: '#858DA0',
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedText: {
    color: '#333333',
  },
  btn: {
    height: 44,
    borderWidth: 0,
    marginTop: 10,
    backgroundColor: '#ffffff',
  },
};
