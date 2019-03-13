/**
 * 分段器
 * @author esky
 */
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { UIComponent } from '../../common';

export default class Segment extends UIComponent {
  static defaultProps = {
    disabled: false,
    defaultIndex: 0,
    values: [],
  }
  static propTypes = {
    disabled: PropTypes.bool,
    // 受控属性：当前选中的下标，配合onChange使用
    index: PropTypes.number,
    // 非控属性：默认被选中的下标
    defaultIndex: PropTypes.number,
    // 按顺序每一个段落的标题文字
    values: PropTypes.arrayOf(PropTypes.string),
    // 主题色调，若使用则会覆盖所有颜色相关的style
    themeColor: PropTypes.string,
    onChange: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      index: typeof props.index === 'number' ? props.index : props.defaultIndex,
    };
  }
  static autoStyleSheet = false

  static getDerivedStateFromProps(nextProps, prevState) {
    if (typeof nextProps.index === 'number' && nextProps.index !== prevState.index) {
      return ({
        index: nextProps.index,
      });
    }
    return null;
  }

  _onPress(i, value, e) {
    const { disabled, onChange, index } = this.props;
    if (disabled) return;
    // 如果props未传入合法的受控属性index, 则属于非控组件
    if (typeof index !== 'number') {
      this.setState({
        index: i,
      });
    }
    if (typeof onChange === 'function') {
      onChange(i, value, e);
    }
  }
  _renderItems() {
    const { style } = this;
    const { values, themeColor } = this.props;
    const { index } = this.state;
    const { container } = style;
    return values.map((val, i) => {
      let distinctItemStyle = null;
      const isActive = (i === index);
      if (i === 0) {
        distinctItemStyle = {
          borderLeftWidth: 0,
          borderTopLeftRadius: container.borderRadius ? container.borderRadius : 5,
          borderBottomLeftRadius: container.borderRadius ? container.borderRadius : 5,
        };
      } else if (i === values.length - 1) {
        distinctItemStyle = {
          borderTopRightRadius: container.borderRadius ? container.borderRadius : 5,
          borderBottomRightRadius: container.borderRadius ? container.borderRadius : 5,
        };
      }
      const themeStyle = {};
      const themeTextStyle = {};
      if (themeColor) {
        themeStyle.borderColor = themeColor;
        isActive && (themeStyle.backgroundColor = themeColor);
        themeTextStyle.color = themeColor;
      }
      const itemStyle = [
        style.item, distinctItemStyle,
        isActive ? style.itemActive : {},
        themeStyle,
      ];
      const indexKey = i;
      return (
        <TouchableWithoutFeedback key={indexKey} onPress={e => this._onPress(i, val, e)}>
          <View style={{
            flexDirection: 'row',
            flex: 1,
            borderWidth: 0,
          }}
          >
            {this._renderDivideLine(i)}
            <View style={itemStyle} >
              <Text style={[style.itemText, isActive ? style.itemTextActive : themeTextStyle]}>
                {val}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    });
  }
  _renderDivideLine(index) {
    const { style } = this;
    let { borderColor } = style.item;
    const { themeColor } = this.props;
    if (themeColor) {
      borderColor = themeColor;
    }
    if (index > 0) {
      return (
        <View style={{ backgroundColor: borderColor, width: StyleSheet.hairlineWidth }} />
      );
    }
    return null;
  }
  render() {
    const { style } = this;
    const { disabled, themeColor } = this.props;
    const items = this._renderItems();
    const segmentStyle = { opacity: disabled ? 0.5 : 1 };
    if (themeColor) {
      segmentStyle.borderColor = themeColor;
    }
    return (
      <View style={[style.container, segmentStyle]}>
        {items}
      </View>
    );
  }
}
// 基础样式
Segment.baseStyle = {
  container: {
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#108ee9',
    borderRadius: 5,
  },
  item: {
    flex: 1,
    paddingVertical: 5,
    // borderLeftWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderColor: '#108ee9',
  },
  // 激活项
  itemActive: {
    backgroundColor: '#108ee9',
    borderColor: '#108ee9',
  },
  itemText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#108ee9',
  },
  // 激活项文本
  itemTextActive: {
    color: '#FFF',
  },
};
