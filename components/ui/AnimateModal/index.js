/**
 * 模态框组件
 * 模态框是唯一的，多模态框在安卓平台可以，但IOS不行。
 * http://react-component.github.io/
 * @author esky
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Modal,
  Easing,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { UIComponent } from 'common';

const screen = Dimensions.get('window');

export default class AnimateModal extends UIComponent {
  static defaultProps = {
    visible: false,
    animationType: 'alert',
    animationDuration: 200,
    maskClosable: true,
    animateWhenMount: false,
    springEffect: false,
    onClose: () => { },
    onAnimationEnd: (visible) => {
      if (__DEV__) {
        console.log(visible);
      }
    },
  }
  static propTypes = {
    // 是否可见
    visible: PropTypes.bool,
    // 动画类型：none(没有)| fade（渐隐渐显）| slide（从底部出现）| slide-down（从顶部出现）| scale(放缩) | fade_scale(渐隐渐现放缩)|alert(弹窗)
    animationType: PropTypes.oneOf(['none', 'fade', 'slide', 'slide-down', 'scale', 'fade-scale', 'alert']),
    // 动画时长
    animationDuration: PropTypes.number,
    // 点击遮罩是否可关闭
    maskClosable: PropTypes.bool,
    // 首次加载动画
    animateWhenMount: PropTypes.bool,
    // 是否有弹簧效果
    springEffect: PropTypes.bool,
    // 关闭回调
    onClose: PropTypes.func,
    // 动画结束回调
    onAnimationEnd: PropTypes.func,
  }
  constructor(props) {
    super(props);
    const { visible } = this.props;
    this.state = {
      position: new Animated.Value(this._getPosition(visible)),
      scale: new Animated.Value(this._getScale(visible)),
      opacity: new Animated.Value(this._getOpacity(visible)),
      modalVisible: visible,
    };
  }

  /**
   * lifecycle
   */
  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);
    if (this.props.visible !== nextProps.visible) {
      this.setState({
        modalVisible: true,
      });
      this._animateDialog(nextProps.visible);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.visible !== nextProps.visible) {
      return true;
    }
    if (nextState) {
      if (nextState.modalVisible !== this.state.modalVisible) {
        return true;
      }
    }
    return false;
  }
  componentDidMount() {
    const { visible, animateWhenMount, animationType } = this.props;
    if (visible && animateWhenMount && animationType !== 'none') {
      this._animateDialog(visible);
    }
  }

  /**
   * 点击遮罩关闭
   *
   * @memberof AnimateModal
   */
  _maskClose = () => {
    const { maskClosable, onClose } = this.props;
    if (maskClosable && onClose) {
      onClose();
    }
  }

  /**
   * 动画结束回调
   *
   * @memberof AnimateModal
   */
  _onAnimationEnd = (visible) => {
    const { onAnimationEnd } = this.props;
    if (onAnimationEnd) {
      onAnimationEnd(visible);
    }
  }

  /**
   * 数据处理区
   *
   * @memberof AnimateModal
   */
  _getPosition = (visible) => {
    if (visible) {
      return 0;
    }
    return this.props.animationType === 'slide-down' ? -screen.height : screen.height;
  }
  _getAlertScale = visible => (visible ? 1 : 1.2);

  _getScale = visible => (visible ? 1 : 0);

  _getOpacity = visible => (visible ? 1 : 0);

  /**
   * 动画部分
   *
   * @memberof AnimateModal
   */
  _animateDialog(visible) {
    const {
      animationType, animationDuration, springEffect,
    } = this.props;
    const { position, scale, opacity } = this.state;
    this._stopDialogAnim();

    if (animationType === 'none') {
      opacity.setValue(this._getOpacity(visible));
      this.setState({
        modalVisible: visible,
      });
    } else {
      this._animateMask(visible);
      switch (animationType) {
        case 'slide':
        case 'slide-down':
          position.setValue(this._getPosition(!visible));
          this.animDialog = Animated.timing(position, {
            toValue: this._getPosition(visible),
            duration: animationDuration,
            easing: visible && springEffect ? Easing.elastic(0.8) : undefined,
          });
          break;

        case 'fade':
          this.animDialog = Animated.timing(opacity, {
            toValue: this._getOpacity(visible),
            duration: animationDuration,
          });
          break;

        case 'scale':
          scale.setValue(this._getScale(!visible));
          this.animDialog = Animated.timing(scale, {
            toValue: this._getScale(visible),
            duration: animationDuration,
            easing: visible && springEffect ? Easing.elastic(0.8) : undefined,
          });
          break;

        case 'fade-scale':
          scale.setValue(this._getScale(!visible));
          this.animDialog = Animated.parallel([Animated.timing(opacity, {
            toValue: this._getOpacity(visible),
            duration: animationDuration,
          }), Animated.timing(scale, {
            toValue: this._getScale(visible),
            duration: animationDuration,
            easing: visible && springEffect ? Easing.elastic(0.8) : undefined,
          })]);
          break;

        case 'alert':
          if (visible) {
            scale.setValue(this._getAlertScale(!visible));
            this.animDialog = Animated.parallel([Animated.timing(opacity, {
              toValue: this._getOpacity(visible),
              duration: animationDuration,
            }), Animated.timing(scale, {
              toValue: this._getAlertScale(visible),
              duration: animationDuration,
              easing: visible && springEffect ? Easing.elastic(0.8) : undefined,
            })]);
          } else {
            this.animDialog = Animated.timing(opacity, {
              toValue: this._getOpacity(visible),
              duration: animationDuration,
            });
          }
          break;

        default: break;
      }
      this.animDialog.start(() => {
        this.animDialog = null;
        if (!visible) {
          this.setState({
            modalVisible: false,
          });
        }
        this._onAnimationEnd(visible);
      });
    }
  }
  _animateMask(visible) {
    const { animationDuration } = this.props;
    const { opacity } = this.state;
    this._stopMaskAnim();

    opacity.setValue(this._getOpacity(!visible));
    this.animMask = Animated.timing(opacity, {
      toValue: this._getOpacity(visible),
      duration: animationDuration,
    });
    this.animMask.start(() => {
      this.animMask = null;
    });
  }
  _stopDialogAnim() {
    if (this.animDialog) {
      this.animDialog.stop();
      this.animDialog = null;
    }
  }
  _stopMaskAnim() {
    if (this.animMask) {
      this.animMask.stop();
      this.animMask = null;
    }
  }

  /**
   * 渲染区
   *
   * @memberof AnimateModal
   */
  render() {
    const {
      position, scale, opacity, modalVisible,
    } = this.state;
    const { children, animationType } = this.props;
    const { style } = this;

    if (!modalVisible) {
      return null;
    }
    const animationStyleMap = {
      none: {},
      slide: { transform: [{ translateY: position }] },
      'slide-down': { transform: [{ translateY: position }] },
      fade: { opacity },
      scale: { transform: [{ scale }] },
      'fade-scale': { transform: [{ scale }], opacity },
      alert: { transform: [{ scale }], opacity },
    };

    return (
      <Modal
        visible
        transparent
        onRequestClose={this._maskClose}
      >
        <View
          style={style.container}
        >
          <TouchableWithoutFeedback
            onPress={this._maskClose}
          >
            <Animated.View
              style={[style.absolute, { opacity }]}
            >
              <View
                style={[style.absolute, style.mask]}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
          <Animated.View
            style={[style.content, animationStyleMap[animationType]]}
          >
            {children}
          </Animated.View>
        </View>
      </Modal >
    );
  }
}

// 基础样式
AnimateModal.baseStyle = {
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  mask: {
    backgroundColor: 'black',
    opacity: 0.5,
  },
  content: {
    backgroundColor: 'white',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
};
