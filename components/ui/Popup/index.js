/**
 * 弹出层
 * @author esky, bjzhaosong
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions, Text, View,
  TouchableWithoutFeedback,
  Animated, Platform, StatusBar,
  StyleSheet,
} from 'react-native';
import { UIComponent } from '../../common';
import Icon from '../Icon';
import Api from './Api';

const { height, width } = Dimensions.get('window');

export default class Popup extends UIComponent {
  static defaultProps = {
    visible: false,
    aniIn: 'bottom',
    location: 'bottom',
    aniTime: 300,
    // 由项目自己配置合适的值
    offsetHeight: Platform.select({
      ios: 44 + 20,
      android: 56 + StatusBar.currentHeight,
    }),
    headerLeft: false,
    headerRight: true,
    maskOpacity: 0.7,
    headerLeftIconName: 'angle-left',
    headerRightIconName: 'times-circle',
  }
  static propTypes = {
    // 受控属性：是否可见
    visible: PropTypes.bool,
    // 进场动画方向
    aniIn: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    // 出场动画方向，默认同aniIn（即哪里来就回哪里去）
    aniOut: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    // 出场动画方向，可以动态修改
    aniOutFn: PropTypes.func,
    // 内容区位置，屏幕上方(吸顶)或下方显示（默认置底）
    location: PropTypes.oneOf(['top', 'bottom']),
    // header标题，不传则不显示标题栏
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.element,
    ]),
    iconFamily: PropTypes.string,
    // header左上角图标
    headerLeftIconName: PropTypes.string,
    // header右上角图标
    headerRightIconName: PropTypes.string,
    // 头部左侧区，false为关闭，也可传入自定义元素，字符串
    headerLeft: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.bool,
    ]),
    // 头部右侧区，false为关闭，也可可传入自定义元素，字符串
    headerRight: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.bool,
    ]),
    // 高度偏移量，整体高度会减掉该高度。一般是导航栏的高度。
    offsetHeight: PropTypes.number,
    // 动画时间
    aniTime: PropTypes.number,
    // 遮罩透明度
    maskOpacity: PropTypes.number,
    // 组件关闭的回调
    onClose: PropTypes.func,
    // 组件动画结束的回调
    onAniEnd: PropTypes.func,
  }
  static show = Api.show
  static hide = Api.hide
  static hideAll = Api.hideAll

  constructor(props) {
    super(props);
    const { visible } = props;
    this.state = {
      closeType: null,
      position: new Animated.Value(Popup.getPosition(props, null)),
      modalVisible: visible,
      opacity: new Animated.Value(this._getOpacity(visible)),
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.visible !== prevState.modalVisible) {
      const props = Object.assign({}, nextProps, { visible: prevState.modalVisible });
      return ({
        position: new Animated.Value(Popup.getPosition(props, prevState.closeType)),
        modalVisible: true,
      });
    }
    return null;
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

  componentDidUpdate(prevProps) {
    const { visible } = this.props;
    if (prevProps.visible !== visible) {
      this._aniPosition(visible);
      this._aniOpacity(visible);
    }
  }

  // aniOut取值优先级 aniOutFn>aniOut>aniIn
  static getAniOut(props, closeType) {
    const { aniIn, aniOut, aniOutFn } = props;
    let _aniOut;
    if (aniOutFn && closeType) _aniOut = aniOutFn(closeType);
    _aniOut = _aniOut || aniOut || aniIn;
    return _aniOut;
  }

  static getPosition(props, closeType) {
    const { visible, aniIn } = props;
    const tempAniOut = Popup.getAniOut(props, closeType);
    switch (visible ? aniIn : tempAniOut) {
      case 'bottom':
        return visible ? 0 : height;
      case 'top':
        return visible ? 0 : -height;
      case 'left':
        return visible ? 0 : -width;
      case 'right':
        return visible ? 0 : width;
      default:
        return 0;
    }
  }
  _getOpacity(visible) {
    return visible ? this.props.maskOpacity : 0;
  }

  _aniPosition(visible) {
    this._stopAniPosition();
    this.aniPosition = Animated.timing(
      this.state.position,
      {
        toValue: Popup.getPosition(this.props, this.state.closeType),
        duration: this.props.aniTime,
      },
    ).start(() => {
      this.aniPosition = null;
      if (this.props.onAniEnd) {
        this.props.onAniEnd(visible);
      }
      if (!visible) {
        this.setState({
          modalVisible: false,
          closeType: null,
        });
      }
    });
  }

  _stopAniPosition() {
    if (this.aniPosition) {
      this.aniPosition.stop();
      this.aniPosition = null;
    }
  }

  _aniOpacity(visible) {
    this._stopAniOpacity();
    this.aniOpacity = Animated.timing(this.state.opacity, {
      toValue: this._getOpacity(visible),
      duration: this.props.aniTime,
    }).start(() => {
      this.aniOpacity = null;
    });
  }

  _stopAniOpacity() {
    if (this.aniOpacity) {
      this.aniOpacity.stop();
      this.aniOpacity = null;
    }
  }
  _dissmiss = (type) => {
    this.setState({ closeType: type });
    if (this.props.onClose) {
      this.props.onClose(type);
    }
  }

  _renderHeaderType(type) {
    const { style } = this;
    let headerEl = this.props[type];
    const { iconFamily, headerLeftIconName, headerRightIconName } = this.props;
    if (!headerEl) return null;
    if (typeof headerEl === 'string') {
      headerEl = <Text style={style[`${type}Ctn`]} >{headerEl}</Text>;
    }
    // 缺省内容
    if (headerEl === true) {
      headerEl = <Icon style={style[`${type}Ctn`]} family={iconFamily} name={type === 'headerLeft' ? headerLeftIconName : headerRightIconName} />;
    }
    if (!React.isValidElement(headerEl)) return null;
    return (
      <TouchableWithoutFeedback onPress={() => this._dissmiss(type)}>
        <View style={style[type]} >
          {headerEl}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _renderHeader() {
    const { style } = this;
    let { title } = this.props;
    const leftEl = this._renderHeaderType('headerLeft');
    const rightEl = this._renderHeaderType('headerRight');
    if (typeof title === 'string') {
      title = <Text style={style.headerTitle}>{title}</Text>;
    }
    return !title ? null : <View style={style.header}>{leftEl}{title}{rightEl}</View>;
  }

  render() {
    if (!this.state.modalVisible) return null;
    const { style } = this;
    const {
      children, aniIn, location, offsetHeight, visible,
    } = this.props;
    const { position, opacity } = this.state;
    const headerEl = this._renderHeader();
    const aniFrom = visible ? aniIn : Popup.getAniOut(this.props, this.state.closeType);
    const locationMap = {
      top: 'flex-start',
      bottom: 'flex-end',
    };
    const transformMap = {
      top: { translateY: position },
      bottom: { translateY: position },
      left: { translateX: position },
      right: { translateX: position },
    };
    return (
      <View style={[style.absolute, { height: height - offsetHeight }, style.container, { justifyContent: locationMap[location] }]}>
        <TouchableWithoutFeedback onPress={() => this._dissmiss('mask')}>
          <Animated.View style={[style.absolute, style.mask, { opacity }]} />
        </TouchableWithoutFeedback>
        <Animated.View style={[style.body, { transform: [transformMap[aniFrom]] }]}>
          {headerEl}
          {children}
        </Animated.View>
      </View>
    );
  }
}
Popup.baseStyle = {
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  mask: {
    backgroundColor: '#000',
    zIndex: 0,
  },
  absolute: {
    position: 'absolute',
    zIndex: 100,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  body: {
    flexDirection: 'column',
    backgroundColor: '#FFF',
    zIndex: 1,
  },
  header: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#EEE',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerTitle: {
    flex: 1,
    color: '#333',
    fontSize: 17,
    paddingLeft: 60,
    paddingRight: 60,
    textAlign: 'center',
  },
  headerLeft: {
    position: 'absolute',
    zIndex: 2,
    left: 0,
    top: 0,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    position: 'absolute',
    zIndex: 2,
    right: 0,
    top: 0,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeftCtn: {
    paddingHorizontal: 10,
    fontSize: 18,
    color: '#858DA0',
  },
  headerRightCtn: {
    paddingHorizontal: 10,
    fontSize: 18,
    color: '#858DA0',
  },
};
