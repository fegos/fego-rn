/**
 * Group
 * @author sxiaoxia
 */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { UIComponent } from 'common';

export default class Group extends UIComponent {
  static defaultProps = {
    isSingle: true,
  }
  static propTypes = {
    // 受控属性，选中的项对应的value，需配合onChange使用
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    // 非受控属性，默认选中的项对应的value
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    // 状态改变回调
    onChange: PropTypes.func,
    // 是否是单选
    isSingle: PropTypes.bool,
  }
  constructor(props) {
    super(props);

    this.state = {
      value: 'value' in props ? props.value : props.defaultValue,
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps && nextProps.value.toString() !== this.props.value.toString()) {
      this.setState({
        value: nextProps.value,
      });
    }
  }
  updateSelectValue(value, checked) {
    const valueArr = this.state.value.concat();

    if (checked) {
      valueArr.push(value);
    } else {
      const index = valueArr.indexOf(value);
      valueArr.splice(index, 1);
    }
    return valueArr;
  }
  onChange = (checked, ele) => {
    const { onChange, isSingle } = this.props;
    let _value;
    if (isSingle) {
      _value = ele.props.value;
    } else {
      _value = this.updateSelectValue(ele.props.value, checked);
    }
    if (!('value' in this.props)) {
      this.setState({
        value: _value,
      });
    }
    onChange instanceof Function && onChange(_value, this);
  }
  render() {
    const { isSingle } = this.props;
    const { value } = this.state;
    console.log(isSingle, value);
    return (
      <View style={this.style.container}>{
        React.Children.map(
          this.props.children,
          (child) => {
            if (child.props.type === 'container') {
              return React.cloneElement(
                child, child.props,
                React.Children.map(
                  child.props.children,
                  childEl => React.cloneElement(childEl, {
                    checked: isSingle ? childEl.props.value === value : value.indexOf(childEl.props.value) >= 0,
                    onChange: this.onChange,
                  }, childEl.props.children),
                ),
              );
            } else {
              return React.cloneElement(child, {
                checked: isSingle ? child.props.value === value : value.indexOf(child.props.value) >= 0,
                onChange: this.onChange,
              }, child.props.children);
            }
          },
        )
      }
      </View>
    );
  }
}

Group.baseStyle = {
  container: {
    flex: 1,
    flexDirection: 'row',
  },
};
