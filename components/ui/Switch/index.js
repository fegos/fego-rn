/**
 * 开关组件
 * 受控/非控组件含义 参见https://facebook.github.io/react/docs/forms.html
 * @author esky 史晓霞
 */
import React from 'react';
import PropTypes from 'prop-types';
import { PanResponder, View, TouchableHighlight, Animated } from 'react-native';
import { UIComponent } from 'common';

export default class NPSwitch extends UIComponent {
  static defaultProps = {
    defaultActive: false,
    disabled: false,
    switchAniTime: 200,
  }

  static propTypes = {
    // 受控属性：激活状态，需配合onChange使用
    active: PropTypes.bool,
    // 非控属性：默认激活状态，获取状态使用 this.refs.switch.state.active
    defaultActive: PropTypes.bool,
    // 是否禁止
    disabled: PropTypes.bool,
    // 切换动画时间
    switchAniTime: PropTypes.number,
    // 状态改变回调
    onChange: PropTypes.func,
  }

  static autoStyleSheet = false

  static getDerivedStateFromProps(nextProps, prevState) {
    // 若使用受控组件属性
    if (typeof nextProps.active === 'boolean' && nextProps.active !== prevState.active) {
      return ({
        active: nextProps.active,
      });
    }
    return null;
  }

  constructor(props) {
    super(props);

    // 使用了active则defaultActive无效
    let { active } = this.props;
    const { defaultActive, disabled } = this.props;

    if (typeof active !== 'boolean') {
      active = defaultActive;
    }
    this.start = {};

    // 动画起始位置
    const { style } = this;
    this.w = style.bar.width - Math.min(style.bar.height, style.button.borderRadius * 2);
    this.state = {
      width: this.w,
      active,
      position: new Animated.Value(active ? this.w : 0),
    };

    this._panResponder = PanResponder.create({
      // 在开始触摸时的捕获期，是否成为响应者
      onStartShouldSetPanResponder: () => true,
      // 在用户开始触摸的时候，是否成为响应者
      onStartShouldSetPanResponderCapture: () => true,
      // 确定是否处理移动事件
      onMoveShouldSetPanResponder: () => true,
      // 在捕获期确定是否捕获移动时间
      onMoveShouldSetPanResponderCapture: () => true,

      // 监视器发出通知开始操作
      onPanResponderStart: (evt, gestureState) => {
        if (disabled) return;

        this.setState({
          pressed: true,
        });
        this.start.x0 = gestureState.x0;
        this.start.pos = this.state.position._value;
        this.start.moved = false;
        this.start.active = this.state.active;
        this.start.distance = 0;
      },
      // 当触摸移动调用
      onPanResponderMove: (evt, gestureState) => {
        if (disabled) return;
        this.start.moved = true;
        if (this.start.pos === 0) {
          if (gestureState.dx <= this.state.width && gestureState.dx >= 0) {
            this.state.position.setValue(gestureState.dx);
          }
          if (gestureState.dx > this.state.width) {
            this.state.position.setValue(this.state.width);
          }
          if (gestureState.dx < 0) {
            this.state.position.setValue(0);
          }
        }
        if (this.start.pos === this.state.width) {
          if (gestureState.dx >= -this.state.width && gestureState.dx <= 0) {
            this.state.position.setValue(this.state.width + gestureState.dx);
          }
          if (gestureState.dx > 0) {
            this.state.position.setValue(this.state.width);
          }
          if (gestureState.dx < -this.state.width) {
            this.state.position.setValue(0);
          }
        }
        // let currentPos = this.state.position._value;
        this.start.distance += Math.abs(gestureState.moveX);
      },
      // 监视器被要求终止
      onPanResponderTerminationRequest: () => true,
      // 监视器被释放
      onPanResponderRelease: () => {
        this.setState({
          pressed: false,
        });
        const currentPos = this.state.position._value;
        if (this.start.distance < 5) {
          this.toggle();
          return;
        }
        this._swipe(currentPos, this.start.pos, this._changeActiveOn, this._changeActiveOff);
      },
      // 响应被终止
      onPanResponderTerminate: () => {
        const currentPos = this.state.position._value;
        this.setState({
          pressed: false,
        });
        this._swipe(currentPos, this.start.pos, this._changeActiveOn, this._changeActiveOff);
      },
      onShouldBlockNativeResponder: () => true,
    });
  }

  componentDidUpdate(prevProps) {
    super.componentDidUpdate(prevProps);
    if (typeof this.props.active === 'boolean' && prevProps.active !== this.props.active) {
      this._changeActive(this.props.active, true);
    }
  }

  /**
   * 判断状态是否改变
   * @param {number} currentPosition 当前位置
   * @param {number} startingPosition 起始位置
   * @param {func} onActive 状态变为active回调
   * @param {func} onInActive 状态变为inactive回调
   */
  _swipe = (currentPosition, startingPosition, onActive, onInActive) => {
    if (currentPosition - startingPosition >= 0) { // 向右滑动
      if (currentPosition - startingPosition > this.state.width / 2 || startingPosition === this.state.width) {
        onActive();
      } else {
        onInActive();
      }
    } else if (currentPosition - startingPosition < -this.state.width / 2) {
      onInActive();
    } else {
      onActive();
    }
  }

  /**
   * 滑动到active位置
   */
  _activateAni = () => {
    Animated.timing(this.state.position, {
      toValue: this.state.width,
      duration: this.props.switchAniTime,
    }).start();
  }

  /**
   * 滑动到inactive位置
   */
  _deactivateAni = () => {
    Animated.timing(this.state.position, {
      toValue: 0,
      duration: this.props.switchAniTime,
    }).start();
  }

  _performAnim = (active) => {
    if (active) {
      this._activateAni();
    } else {
      this._deactivateAni();
    }
  }

  /**
   * 改变状态值
   */
  _changeActive = (newActive, propsUpdate = false) => {
    const {
      onChange,
      active,
    } = this.props;
    if (propsUpdate) {
      this._performAnim(newActive);
      return;
    }
    if (typeof active !== 'boolean') {
      // 未使用受控props则自己控制状态
      this.setState({
        active: newActive,
      });
      this._performAnim(newActive);
    } else if (active === newActive) {
      this._performAnim(newActive);
    }
    if (onChange) {
      onChange(newActive, this);
    }
  }
  _changeActiveOn = () => {
    this._changeActive(true);
  }
  _changeActiveOff = () => {
    this._changeActive(false);
  }
  /**
   * 修改当前状态
   */
  toggle = () => {
    if (this.props.disabled) return;
    if (this.state.active) {
      this._changeActiveOff();
    } else {
      this._changeActiveOn();
    }
  }

  render() {
    const { style } = this;
    const { borderRadius } = style.button;
    const padding = borderRadius - style.bar.height / 2 + 1;
    const doublePadding = padding * 2 - 2;
    const halfPadding = doublePadding / 2;
    let barStyle;
    let btnStyle;
    if (this.props.disabled) {
      barStyle = style.barDisabled;
      btnStyle = style.buttonDisabled;
    } else if (this.state.active) {
      barStyle = style.barActive;
      btnStyle = this.state.pressed ? style.buttonPressActive : style.buttonActive;
    } else {
      barStyle = style.barInactive;
      btnStyle = this.state.pressed ? style.buttonPressInactive : style.buttonInactive;
    }
    return (
      <View
        {...this._panResponder.panHandlers}
        style={
          {
            ...style.container,
            padding,
          }
        }
      >
        <View style={[
          style.bar,
          barStyle,
          { borderRadius: style.bar.height / 2 },
        ]}
        />
        <TouchableHighlight
          underlayColor="transparent"
          activeOpacity={1}
          style={{
            height: Math.max(borderRadius * 2 + doublePadding, style.bar.height + doublePadding),
            width: style.bar.width + doublePadding,
            position: 'absolute',
            top: 1,
            left: 1,
          }}
        >
          <Animated.View style={[
            style.button,
            btnStyle,
            {
              height: borderRadius * 2,
              width: borderRadius * 2,
              top: halfPadding + style.bar.height / 2 - borderRadius,
              left: style.bar.height / 2 > borderRadius ? halfPadding : halfPadding + style.bar.height / 2 - borderRadius,
              transform: [{
                translateX: this.state.position,
              }],
            },
          ]}
          />
        </TouchableHighlight>
      </View>
    );
  }
}
NPSwitch.baseStyle = {
  container: {
    position: 'relative',
  },
  // 切换按钮样式
  button: {
    position: 'absolute',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  buttonActive: {
    backgroundColor: '#2196F3',
  },
  buttonInactive: {
    backgroundColor: '#FAFAFA',
  },
  buttonPressActive: {
    backgroundColor: '#42A5F5',
  },
  buttonPressInactive: {
    backgroundColor: '#F5F5F5',
  },
  buttonDisabled: {
    backgroundColor: '#DDD',
  },
  // 底部状态条
  bar: {
    height: 30,
    width: 50,
    borderRadius: 25,
  },
  barActive: {
    backgroundColor: 'rgba(211,211,211,.5)',
  },
  barInactive: {
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  barDisabled: {
    backgroundColor: '#DDD',
  },
};
