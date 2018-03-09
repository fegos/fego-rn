/**
 * 日历组件 ‘周一’，‘周二’ 栏 子组件
 * @author asyxu
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'react-native';

export default class WeekdayBar extends Component {
  static defaultProps = {
  }
  static propTypes = {
    // 是否从周一开始显示，默认周日开始，需搭配 weekdays 使用
    startFromMonday: PropTypes.bool.isRequired,
    // 日历显示的星期文案
    weekdays: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  _getViews() {
    const { startFromMonday, weekdays, styles } = this.props;
    return (
      <View style={styles.weekdayBarWrapper}>
        {weekdays.map((day, i) => {
            if (((!startFromMonday) && (i === 0 || i === 6)) || // 周日开始，则周日周六的 index 分别为 0，6
              (startFromMonday && (i === 5 || i === 6)) // 周一开始，则周六周日的 index 分别为 5，6
            ) {
              return <Text key={day} style={[styles.barWeekday, styles.dayTextGray]}>{day}</Text>;
            }
            return <Text key={day} style={[styles.barWeekday]}>{day}</Text>;
          })}
      </View>
    );
  }

  render() {
    return this._getViews();
  }
}
