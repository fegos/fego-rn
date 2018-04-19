/**
 * Checkbox
 * @author esky
 */
import React from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, View, Text } from 'react-native';
import { UIComponent } from 'common';
import Icon from '../Icon';

export default class GroupItem extends UIComponent {
  static defaultProps = {
    // 禁止操作
    disabled: false,
    // 非控属性：默认选中状态
    defaultChecked: false,
    // 选中态图标
    iconCheckName: 'check-square-o',
    // 未选中态图标
    iconUncheckName: 'square-o',
    // 图标位置
    left: true,
  }

  static propsType = {
    // 受控属性：需配合onChange使用更新数据checked
    checked: PropTypes.bool,
    // 非控属性：默认选中状态，需使用this.refs.checkbox.state.checked获取选中状态
    defaultChecked: PropTypes.bool,
    // 禁止操作
    disabled: PropTypes.bool,
    // 图标字体名
    iconFamily: PropTypes.string,
    // 选中图标名称
    iconCheckName: PropTypes.string,
    // 未选中图标名称
    iconUncheckName: PropTypes.string,
    // 状态改变回调
    onChange: PropTypes.func,
    // 图标位置
    left: PropTypes.bool,
  }

  static autoStyleSheet = false

  static getDerivedStateFromProps(nextProps) {
    if (typeof nextProps.checked === 'boolean') {
      return ({
        checked: nextProps.checked,
      });
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      checked: typeof props.checked === 'boolean' ? props.checked : props.defaultChecked,
    };
  }

  _handleClick = () => {
    const { disabled, checked, onChange } = this.props;
    if (disabled) return;
    const _checked = !this.state.checked;
    // 如果props未传入checked,则组件自己切换选中状态
    if (typeof checked !== 'boolean') {
      this.setState({
        checked: _checked,
      });
    }
    // 若组件使用props.checked则必须使用onChange维护checked
    if (typeof onChange === 'function') {
      onChange(_checked, this);
    }
  }

  _renderChildren() {
    const { children, disabled } = this.props;
    if (typeof children === 'string') {
      return <Text style={[this.style.text, disabled ? this.style.disabled : null]}>{children}</Text>;
    }
    return children;
  }

  render() {
    const { style } = this;
    const {
      disabled, iconFamily, iconCheckName, iconUncheckName, left,
    } = this.props;
    const { checked } = this.state;
    const children = this._renderChildren();
    return (
      <TouchableWithoutFeedback onPress={this._handleClick}>
        <View style={style.container}>
          {left ? <Icon
            style={[style.icon, checked ? style.checked : null, disabled ? style.disabled : null]}
            family={iconFamily}
            name={checked ? iconCheckName : iconUncheckName}
          /> : null}
          {children}
          {left ? null : <Icon
            style={[style.icon, checked ? style.checked : null, disabled ? style.disabled : null]}
            family={iconFamily}
            name={checked ? iconCheckName : iconUncheckName}
          />}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

GroupItem.baseStyle = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // 图标默认样式，未选中
  icon: {
    width: 20,
    fontSize: 16,
    color: '#333',
    paddingRight: 0,
  },
  // 选中样式
  checked: {
    color: '#333',
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
  disabled: {
    color: '#CCC',
  },
};
