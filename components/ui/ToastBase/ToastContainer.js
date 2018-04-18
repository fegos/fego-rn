import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ActivityIndicator, Animated } from 'react-native';
import { UIComponent } from 'common';

import Icon from '../Icon';

export default class ToastConatiner extends UIComponent {
  static defaultProps = {
    duration: 2,
    mask: false,
    modal: false,
    iconTypes: {
      success: 'check-circle',
      fail: 'times-circle',
      offline: 'meh-o',
    },
    offsetY: 0,
    loadingColor: 'white',
  }
  anim = '';
  static propTypes = {
    // Toast内容
    content: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.element,
    ]),
    // 延时
    duration: PropTypes.number,
    // 关闭回调
    onClose: PropTypes.func,
    // 是否显示遮罩
    mask: PropTypes.bool,
    // 是否阻止用户点击
    modal: PropTypes.bool,
    // Toast类型
    type: PropTypes.string,
    // 图标字体
    iconFamily: PropTypes.string,
    // 图标类型对象
    iconTypes: PropTypes.objectOf(PropTypes.string),
    // Y轴偏移量
    offsetY: PropTypes.number,
    // 动画结束
    onAnimationEnd: PropTypes.func,
    // loading动画的颜色
    loadingColor: PropTypes.string,
  }
  static simpleStyleProps = {
    backgroundColor: {
      name: 'inner',
      attr: 'backgroundColor',
    },
    borderRadius: {
      name: 'inner',
      attr: 'borderRadius',
    },
  }
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
    };
  }
  componentDidMount() {
    const {
      onClose,
      duration,
      onAnimationEnd,
    } = this.props;
    const { timing } = Animated;
    if (this.anim) {
      this.anim = null;
    }
    const animArr = [
      timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 200,
      }),
      Animated.delay(duration * 1000),
    ];
    if (duration > 0) {
      animArr.push(timing(this.state.fadeAnim, {
        toValue: 0,
        duration: 200,
      }));
    }
    this.anim = Animated.sequence(animArr);
    this.anim.start(() => {
      if (duration > 0) {
        this.anim = null;
        if (onClose) {
          onClose();
        }
        if (onAnimationEnd) {
          onAnimationEnd();
        }
      }
    });
  }
  componentWillUnmount() {
    if (this.anim) {
      this.anim.stop();
      this.anim = null;
    }
  }
  render() {
    const { style } = this;
    const {
      type = '', content, mask, modal, iconFamily, iconTypes, offsetY, loadingColor,
    } = this.props;
    let iconDom = null;
    let contentDom = content;
    if (type === 'loading') {
      iconDom = (
        <ActivityIndicator
          style={[style.centering]}
          color={loadingColor}
          size="large"
        />
      );
    } else if (type === 'info') {
      iconDom = null;
    } else if (type) {
      iconDom = (
        <Icon
          family={iconFamily}
          name={
            iconTypes[type] || type
          }
          style={
            style.icon
          }
        />
      );
    }
    if (typeof contentDom === 'string') {
      contentDom = (
        <Text style={style.text}>
          {contentDom}
        </Text>
      );
    }
    return (
      <Animated.View
        style={
          [style.container, mask ? style.mask : null, {
            top: offsetY,
            opacity: this.state.fadeAnim,
          }]
        }
        pointerEvents={modal ? 'auto' : 'box-none'}
      >
        <View style={[iconDom ? style.innerWithIcon : {}, style.inner]}>
          {iconDom}
          {contentDom}
        </View>
      </Animated.View >
    );
  }
}

// 基础样式
ToastConatiner.baseStyle = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  mask: {
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  text: {
    marginHorizontal: 10,
    color: '#FFF',
    fontSize: 14,
  },
  inner: {
    minWidth: 100,
    alignItems: 'center',
    borderRadius: 5,
    padding: 8,
    backgroundColor: 'rgba(3, 3, 3, 0.7)',
  },
  innerWithIcon: {
    borderRadius: 7,
    padding: 10,
  },
  icon: {
    color: '#FFF',
    fontSize: 34,
    paddingBottom: 6,
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 9,
  },
};
