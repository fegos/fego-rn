import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { UIComponent } from 'common';
import Icon from '../Icon';

export default class Item extends UIComponent {
  static defaultProps = {
    underlayColor: '#eeeeee',
    hasRightArrow: false,
    rightArrowIconName: 'angle-right',
    isLast: false,
  }

  static propTypes = {
    // 标题
    title: PropTypes.node,
    // 子元素集，若使用则其他的内容相关props, eg: title 将失效
    children: PropTypes.node,
    // 左侧图标的名称
    iconName: PropTypes.string,
    // 左侧图标使的字体
    iconFamily: PropTypes.string,
    // 是否显示右箭头
    hasRightArrow: PropTypes.bool,
    // 右箭头图标名称
    rightArrowIconName: PropTypes.string,
    // 右箭头图标的字体
    rightArrowIconFamily: PropTypes.string,
    // 触摸操作时底层的颜色
    underlayColor: TouchableHighlight.propTypes.underlayColor,
    // 是否是最后一个
    isLast: PropTypes.bool,
    // 单击
    onPress: PropTypes.func,
    // 长按
    onLongPress: PropTypes.func,
  }

  static autoStyleSheet = false;

  render() {
    const { style } = this;
    let { children } = this.props;
    const {
      onPress, onLongPress, underlayColor, title, iconName, iconFamily, hasRightArrow, rightArrowIconName, rightArrowIconFamily, isLast,
    } = this.props;

    if (!children) {
      children = (title && (typeof title === 'string' || typeof title === 'number')) ? (
        <Text style={style.title}>{title}</Text>
      ) : ({ title });
    }

    if (onPress || onLongPress) {
      return (
        <View style={style.container}>
          <TouchableHighlight
            style={{ flex: 1 }}
            underlayColor={underlayColor}
            onPress={(e) => { onPress && onPress(e); }}
            onLongPress={(e) => { onLongPress && onLongPress(e); }}
          >
            <View style={[style.content, isLast && style.noLine]}>
              {iconName ? <Icon name={iconName} family={iconFamily} style={style.icon} /> : null}
              {children}
              {hasRightArrow ? <Icon name={rightArrowIconName} family={rightArrowIconFamily} style={style.rightArrow} /> : null}
            </View>
          </TouchableHighlight>
        </View>
      );
    }

    return (
      <View style={[style.container, isLast && style.noLine]}>
        <View style={style.content}>
          {iconName ? <Icon name={iconName} family={iconFamily} style={style.icon} /> : null}
          {children}
        </View>
        {hasRightArrow ? <Icon name={rightArrowIconName} family={rightArrowIconFamily} style={style.rightArrow} /> : null}
      </View>
    );
  }
}

// 默认基础样式
Item.baseStyle = {
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    marginLeft: 20,
    borderBottomColor: '#eeeeee',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  icon: {
    fontSize: 15,
    width: 26,
    color: '#43484d',
  },
  title: {
    flex: 1,
    fontSize: 14,
    color: '#43484d',
  },
  rightArrow: {
    fontSize: 16,
    color: '#43484d',
    paddingRight: 10,
  },
  noLine: {
    borderBottomWidth: 0,
  },
};

