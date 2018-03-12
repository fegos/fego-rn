/**
 * 图标组件
 * @author esky Henry
 */
import React, { PurComponent } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const baseStyle = {
  container: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'normal',
    fontStyle: 'normal',
  },
};
/**
 * 字体数据
 * 示例：
 * {
 * entypo: {},
 * FontAwesome: {}
 * }
 */
let FAMILY_MAP = {};
export default class Icon extends PurComponent {
  /**
   * 产品项目可设置默认字体
   * Icon.defaultProps.family = 'self'
   */
  static defaultProps = {
    // 默认字体为FontAwesome
    // http://www.fontawesome.com.cn/faicons/
    family: 'FontAwesome',
  }
  static propTypes = {
    ...Text.propTypes,
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
    color: PropTypes.string,
    // 字体库名称
    family: PropTypes.string,
  }
  /**
  * 设置字体数据
  */
  static setFamily = function setFamily(map = {}) {
    FAMILY_MAP = {
      ...FAMILY_MAP,
      ...map,
    };
  }
  render() {
    const {
      name, size, color, family, style, ...props
    } = this.props;

    const glyphMap = FAMILY_MAP[family] || {};
    let glyph = glyphMap[name] || name;
    const simpleStyle = {};
    if (typeof glyph === 'number') {
      glyph = String.fromCharCode(glyph);
    }
    if (typeof size === 'number') {
      simpleStyle.fontSize = size;
    }
    if (typeof color === 'string') {
      simpleStyle.color = color;
    }
    // 样式优先级 baseStyle < style < simpleStyle
    props.style = [baseStyle.container, style, simpleStyle, { fontFamily: family }];
    return <Text {...props}>{glyph}</Text>;
  }
}
