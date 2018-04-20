/**
 * Tag组件
 * @author esky 徐达迟 2017/03/30
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { UIComponent } from 'common';
import Icon from '../Icon';

export default class Tag extends UIComponent {
  static defaultProps = {
    defaultChecked: false,
    closeIconName: 'times-circle',
  }
  static propTypes = {
    // 主题类型
    type: PropTypes.string,
    // 尺寸
    size: PropTypes.string,
    // 标签文本，等效于children
    text: PropTypes.node,
    // 标签内容， 此时text无效
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.node,
    ]),
    // 受控属性：选中状态，需配合onChange使用
    checked: PropTypes.bool,
    // 非控属性：默认选中状态
    defaultChecked: PropTypes.bool,
    // 禁止状态
    disabled: PropTypes.bool,
    // 受控属性：关闭状态，需配合onClose使用
    closed: PropTypes.bool,
    // 关闭按钮图标字体
    closeIconFamily: PropTypes.string,
    // 关闭按钮图标名称
    closeIconName: PropTypes.string,
    onChange: PropTypes.func,
    onClose: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      checked: typeof props.checked === 'boolean' ? props.checked : props.defaultChecked,
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.checked !== nextProps.checked) {
      return ({
        checked: nextProps.checked,
      });
    }
    return null;
  }
  _onCloseClick = () => {
    const { onClose } = this.props;
    if (typeof onClose === 'function') {
      onClose(!this.state.closed);
    }
  }
  _onClick = () => {
    const { onChange, checked } = this.props;
    const _checked = !this.state.checked;
    if (typeof checked !== 'boolean') {
      this.setState({
        checked: _checked,
      });
    }
    if (typeof onChange === 'function') {
      onChange(_checked, this);
    }
  }
  _renderCloseBtn = () => {
    const { style } = this;
    const { closed, closeIconFamily, closeIconName } = this.props;
    // 未启用关闭功能
    if (typeof closed !== 'boolean') return null;
    return (
      <TouchableWithoutFeedback onPress={this._onCloseClick}>
        <View style={style.close}>
          <Icon family={closeIconFamily} name={closeIconName} style={style.closeIcon} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
  _renderInner() {
    const { style } = this;
    const { text, children, disabled } = this.props;
    let inner = children || text;
    if (typeof inner === 'string') {
      inner = (
        <Text style={[
          style.text,
          this.state.checked ? style.textChecked : {},
          disabled ? style.textdisabled : {}]}
        >
          {inner}
        </Text>
      );
    }
    return inner;
  }

  render() {
    const { style } = this;
    const { disabled, closed } = this.props;
    const { checked } = this.state;
    const innerEl = this._renderInner();
    const colseEl = this._renderCloseBtn();
    // 已关闭
    if (typeof closed === 'boolean' && closed) {
      return null;
    }
    // 禁止状态
    if (disabled) {
      return (
        <View style={[style.container, style.disabled]}>
          {innerEl}
          {colseEl}
        </View>
      );
    }
    // 正常状态
    return (
      <TouchableWithoutFeedback onPress={this._onClick}>
        <View style={[style.container, checked ? style.checked : {}]}>
          {innerEl}
          {colseEl}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Tag.baseStyle = {
  container: {
    flexDirection: 'row',
    overflow: 'visible',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: 'center',
    borderColor: '#bbb',
    backgroundColor: '#FFF',
  },
  disabled: {
    borderColor: '#ddd',
    backgroundColor: '#ddd',
  },
  checked: {
    borderColor: '#108ee9',
    backgroundColor: '#FFF',
  },
  text: {
    fontSize: 12,
    color: '#888',
  },
  textChecked: {
    color: '#108ee9',
  },
  textDisabled: {
    color: '#ddd',
  },
  close: {
    paddingLeft: 5,
  },
  closeIcon: {
    color: '#bbb',
    fontSize: 14,
  },
};

Tag.themeStyle = {
  size: {
    small: {
      container: {
        paddingVertical: 2,
        paddingHorizontal: 2,
      },
      text: {
        fontSize: 10,
      },
      close: {
        paddingLeft: 2,
      },
      closeIcon: {
        fontSize: 11,
      },
    },
    large: {
      container: {
        paddingVertical: 7,
        paddingHorizontal: 7,
      },
      text: {
        fontSize: 16,
      },
      close: {
        paddingLeft: 7,
      },
      closeIcon: {
        fontSize: 18,
      },
    },
  },
};
