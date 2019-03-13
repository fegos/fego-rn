/**
 * PopMenu
 *  author asyxu
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  Text,
  ART,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';
import { UIComponent } from '../../common';
import AnimateModal from '../AnimateModal';
import Item from '../Item';

const window = Dimensions.get('window');
const screenWidth = window.width;
const screenHeight = window.height;
const { Shape, Path, Surface } = ART;

export default class PopMenu extends UIComponent {
  static defaultProps = {
    // PopMenu 标题
    title: '',
    // PopMenu 的内容
    content: [],
    // 是否显示 PopMenu 的三角
    showTriangle: true,
    // 三角形的高
    triangleHeight: 8,
    // 三角形的宽
    triangleWidth: 10,
    // PopMenu 出现的位置
    placement: 'bottom',
    // PopMenu 距离 trigger 的边距
    offset: 5,
    // 是否能点击遮罩关闭 PopMenu
    maskClosable: true,
    // 动画时间
    animateTime: 300,
  }
  static propTypes = {
    // PopMenu 标题
    title: PropTypes.node,
    // PopMenu 的内容
    content: PropTypes.arrayOf(PropTypes.any),
    // 控制PopMenu的三角形是否显示
    showTriangle: PropTypes.bool,
    // 三角形的高
    triangleHeight: PropTypes.number,
    // 三角形的宽
    triangleWidth: PropTypes.number,
    // PopMenu 出现的位置
    placement: PropTypes.oneOf(['top', 'topLeft', 'topRight', 'bottom', 'bottomLeft', 'bottomRight', 'left', 'leftTop', 'leftBottom', 'right', 'rightTop', 'rightBottom']),
    // PopMenu 距离 trigger 的边距
    offset: PropTypes.number,
    // 是否能点击遮罩关闭 PopMenu
    maskClosable: PropTypes.bool,
    // 动画时间
    animateTime: PropTypes.number,
  }
  static autoStyleSheet = false

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      original: { X: 0, Y: 0 },
      triggerSize: { tWidth: 0, tHeight: 0 },
      overlaySize: { oWidth: 0, oHeight: 0 },
    };

    const child = React.Children.map(this.props.children, childElem => childElem);
    this.hasOneChild = child.length === 1;
    if (!this.hasOneChild) {
      console.warn('PopMenu 接收且仅接收一个子元素');
    }
  }
  _measureContainer = (visible = false) => {
    this.container.measure((x, y, w, h, pageX, pageY) => {
      const _state = {
        // 容器左上角点在屏幕中的位置
        original: {
          X: pageX % screenWidth,
          Y: pageY % screenHeight,
        },
        // 容器的宽高
        triggerSize: {
          tWidth: w,
          tHeight: h,
        },
      };
      if (visible) _state.visible = true;

      this.setState(_state);
    });
  }
  _onShowPopMenu = () => {
    this._measureContainer(true);
  }
  _onOverlayLayout = () => {
    this.overlay.measure((x, y, width, height) => {
      // 记录泡泡内容的宽高
      this.setState({
        overlaySize: {
          oWidth: width,
          oHeight: height,
        },
      });
    });
  }
  _getOverlayPosition() {
    const {
      showTriangle, triangleHeight, offset, placement,
    } = this.props;
    const { original, triggerSize, overlaySize } = this.state;
    const { X, Y } = original;
    const { tWidth, tHeight } = triggerSize;
    const { oWidth, oHeight } = overlaySize;

    const placementMap = {
      // 上
      topLeft: {
        top: Y - oHeight - offset - (showTriangle ? triangleHeight : 0),
        left: X,
      },
      top: {
        top: Y - oHeight - offset - (showTriangle ? triangleHeight : 0),
        left: X + tWidth / 2 - oWidth / 2,
      },
      topRight: {
        top: Y - oHeight - offset - (showTriangle ? triangleHeight : 0),
        left: X + tWidth - oWidth,
      },
      // 下
      bottomLeft: {
        top: Y + tHeight + offset + (showTriangle ? triangleHeight : 0),
        left: X,
      },
      bottom: {
        top: Y + tHeight + offset + (showTriangle ? triangleHeight : 0),
        left: X + tWidth / 2 - oWidth / 2,
      },
      bottomRight: {
        top: Y + tHeight + offset + (showTriangle ? triangleHeight : 0),
        left: X + tWidth - oWidth,
      },
      // 左
      leftTop: {
        top: Y,
        left: X - oWidth - offset - (showTriangle ? triangleHeight : 0),
      },
      left: {
        top: Y + tHeight / 2 - oHeight / 2,
        left: X - oWidth - offset - (showTriangle ? triangleHeight : 0),
      },
      leftBottom: {
        top: Y + tHeight - oHeight,
        left: X - oWidth - offset - (showTriangle ? triangleHeight : 0),
      },
      // 右
      rightTop: {
        top: Y,
        left: X + tWidth + offset + (showTriangle ? triangleHeight : 0),
      },
      right: {
        top: Y + tHeight / 2 - oHeight / 2,
        left: X + tWidth + offset + (showTriangle ? triangleHeight : 0),
      },
      rightBottom: {
        top: Y + tHeight - oHeight,
        left: X + tWidth + offset + (showTriangle ? triangleHeight : 0),
      },
    };

    return placementMap[placement];
  }
  _getTrianglePosition() {
    const { triangleHeight, triangleWidth, placement } = this.props;
    const { overlaySize } = this.state;
    const { oWidth, oHeight } = overlaySize;


    const triangleMap = {
      // 上
      topLeft: {
        top: oHeight,
        left: 15,
      },
      top: {
        top: oHeight,
        left: oWidth / 2 - triangleWidth / 2,
      },
      topRight: {
        top: oHeight,
        left: oWidth - 15 - triangleWidth,
      },
      // 下
      bottomLeft: {
        top: 0 - triangleHeight,
        left: 15,
      },
      bottom: {
        top: 0 - triangleHeight,
        left: oWidth / 2 - triangleWidth / 2,
      },
      bottomRight: {
        top: 0 - triangleHeight,
        left: oWidth - 15 - triangleWidth,
      },
      // 左
      leftTop: {
        top: 15,
        left: oWidth,
      },
      left: {
        top: oHeight / 2 - triangleWidth / 2,
        left: oWidth,
      },
      leftBottom: {
        top: oHeight - 15 - triangleWidth,
        left: oWidth,
      },
      // 右
      rightTop: {
        top: 15,
        left: 0 - triangleHeight,
      },
      right: {
        top: oHeight / 2 - triangleWidth / 2,
        left: 0 - triangleHeight,
      },
      rightBottom: {
        top: oHeight - 15 - triangleWidth,
        left: 0 - triangleHeight,
      },
    };

    return triangleMap[placement];
  }
  _getPath() {
    const { triangleHeight, triangleWidth, placement } = this.props;
    let path;

    if (placement.indexOf('top') === 0) {
      path = new Path()
        .moveTo(0, 0)
        .lineTo(triangleWidth / 2, triangleHeight)
        .lineTo(triangleWidth, 0)
        .close();
    } else if (placement.indexOf('bottom') === 0) {
      path = new Path()
        .moveTo(0, triangleHeight)
        .lineTo(triangleWidth, triangleHeight)
        .lineTo(triangleWidth / 2, 0)
        .close();
    } else if (placement.indexOf('left') === 0) {
      path = new Path()
        .moveTo(0, 0)
        .lineTo(0, triangleWidth)
        .lineTo(triangleHeight, triangleWidth / 2)
        .close();
    } else if (placement.indexOf('right') === 0) {
      path = new Path()
        .moveTo(triangleHeight, 0)
        .lineTo(0, triangleWidth / 2)
        .lineTo(triangleHeight, triangleWidth)
        .close();
    }

    return path;
  }
  _getSurfaceSize = () => {
    const { triangleHeight, triangleWidth, placement } = this.props;

    if (placement.indexOf('top') === 0 || placement.indexOf('bottom') === 0) {
      return {
        width: triangleWidth,
        height: triangleHeight,
      };
    } else if (placement.indexOf('left') === 0 || placement.indexOf('right') === 0) {
      return {
        width: triangleHeight,
        height: triangleWidth,
      };
    } else {
      return {
        width: 0,
        height: 0,
      };
    }
  }
  _renderOverlayaTitle() {
    const { title } = this.props;
    const { style } = this;
    let titleEl;

    if (!title) return null;

    if (typeof title === 'string' || typeof title === 'number') {
      titleEl = (
        <Text style={style.title}>{title}</Text>
      );
    } else if (React.isValidElement(title)) {
      titleEl = title;
    }

    return (
      <View style={style.overlayTitle}>
        {titleEl}
      </View>
    );
  }
  _renderOverlay() {
    const { style } = this;
    const {
      showTriangle, content,
    } = this.props;
    const cntLen = content.length;
    let path;
    let surfaceSize;
    let trianglePos;

    if (showTriangle) {
      trianglePos = this._getTrianglePosition();
      path = this._getPath();
      surfaceSize = this._getSurfaceSize();
    }

    const cnt = content.map((c, i) => {
      const newProps = {
        key: i,
        last: i === (cntLen - 1),
      };

      if (c.props.onPress) {
        newProps.onAfterItemPress = this._onHidePopMenu.bind(this);
      }

      return React.cloneElement(c, newProps);
    });

    return (
      <View
        style={[style.overlayContainer, { overflow: 'visible' }]}
        ref={(o) => { this.overlay = o; }}
        onLayout={this._onOverlayLayout}
      >
        {this._renderOverlayaTitle()}
        <View style={style.overlayContent}>
          {cnt}
        </View>
        {showTriangle ? (
          <View style={[{ position: 'absolute', backgroundColor: 'transparent' }, trianglePos]}>
            <Surface {...surfaceSize}>
              <Shape d={path} fill={style.overlayContainer.backgroundColor} />
            </Surface>
          </View>
        ) : null}
      </View>
    );
  }

  _renderTrigger() {
    const { children } = this.props;
    const { style } = this;
    let trigger;

    if (typeof children === 'string') {
      trigger = (
        <Text style={style.triggerText}>{children}</Text>
      );
    } else if (React.isValidElement(children)) {
      trigger = children;
    }

    return (
      <TouchableWithoutFeedback onPress={this._onShowPopMenu}>
        <View style={style.triggerContainer}>{trigger}</View>
      </TouchableWithoutFeedback>
    );
  }
  _onHidePopMenu = () => {
    // 直接设置 visible 属性为 false 即可，
    /**
     * 直接设置 visible 属性为 false 即可
     * modal 组件会根据 maskClosable 属性决定是否调用 onClose 回调
     */
    this.setState({
      visible: false,
    });
  }

  render() {
    if (!this.hasOneChild) return <view />;

    const { style } = this;
    const { maskClosable, animateTime } = this.props;
    const { visible } = this.state;
    const contentOffset = this._getOverlayPosition();

    return (
      <View
        ref={(c) => { this.container = c; }}
        style={style.container}
      >
        {this._renderTrigger()}
        <AnimateModal
          scale={false}
          visible={visible}
          maskClosable={maskClosable}
          animateWhenMount={false}
          animationDuration={animateTime}
          onClose={this._onHidePopMenu}
          // ios 端能把这个样式下放到 _renderOverlay 方法返回的顶层元素上，但是 android 端不行，下放后整个PopMenu 的 overlay 都不会显示
          contentStyle={{
            overflow: 'visible',
            position: 'absolute',
            backgroundColor: 'transparent',
            ...contentOffset,
          }}
        >
          {this._renderOverlay()}
        </AnimateModal>
      </View>

    );
  }
}

PopMenu.Item = Item;

PopMenu.baseStyle = {
  container: {
  },
  triggerContainer: {
  },
  triggerText: {},
  overlayContainer: {
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  overlayTitle: {
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#bdbdbd',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 16,
    color: '#333',
  },
  overlayContent: {
    paddingHorizontal: 5,
  },
};
