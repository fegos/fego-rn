import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Image,
  StyleSheet,
  PanResponder,
  View,
  Easing,
} from 'react-native';
import UIComponent from '../../common/UIComponent';

const TRACK_SIZE = 4;
const THUMB_SIZE = 20;
const CONTAINER_HEIGHT = 40;

const DEFAULT_ANIMATION_CONFIGS = {
  spring: {
    friction: 7,
    tension: 100,
  },
  timing: {
    duration: 150,
    easing: Easing.inOut(Easing.ease),
    delay: 0,
  },
};

class Rect {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  containsPoint(x, y) {
    return (x >= this.x && y >= this.y && x <= this.x + this.width && y <= this.y + this.height);
  }
}

export default class Slider extends UIComponent {
  static propTypes = {
    minimumValue: PropTypes.number,
    maximumValue: PropTypes.number,
    // 主题类型 default circle square
    type: PropTypes.string,
    // 尺寸 small default large
    size: PropTypes.string,
    // 受控属性：需配合onValueChange使用更新数据value
    value: PropTypes.number,
    // 非控属性：需使用this.refs.Slider.state.value获取选中状态
    defaultValue: PropTypes.number,
    step: PropTypes.number,
    disabled: PropTypes.bool,
    onValueChange: PropTypes.func,
    onSlidingStart: PropTypes.func,
    onSlidingComplete: PropTypes.func,
    thumbTouchSize: PropTypes.shape({ width: PropTypes.number, height: PropTypes.number }),
    thumbImage: Image.propTypes.source,
    animateTransitions: PropTypes.bool,
  }
  static defaultProps = {
    disabled: false,
    minimumValue: 0,
    step: 1,
    maximumValue: 100,
    defaultValue: 0,
    thumbTouchSize: {
      width: 40,
      height: 40,
    },
    debugTouchArea: false,
    animationType: 'timing',
  };

  static autoStyleSheet = false;

  constructor(props) {
    super(props);
    this.state = {
      containerSize: {
        width: 0,
        height: 0,
      },
      trackSize: {
        width: 0,
        height: 0,
      },
      thumbSize: {
        width: 0,
        height: 0,
      },
      allMeasured: false,
      value: new Animated.Value(typeof this.props.value === 'number' ? this.props.value : this.props.defaultValue),
    };
  }
  render() {
    const {
      minimumValue,
      maximumValue,
      thumbImage,
      debugTouchArea,
      ...other
    } = this.props;
    const mainStyles = this.style;
    const {
      value, containerSize, trackSize, thumbSize, allMeasured,
    } = this.state;
    const thumbLeft = value.interpolate({
      inputRange: [
        minimumValue, maximumValue,
      ],
      outputRange: [
        0, containerSize.width - thumbSize.width,
      ],
    });
    const valueVisibleStyle = {};
    if (!allMeasured) {
      valueVisibleStyle.opacity = 0;
    }

    const minimumTrackStyle = {
      position: 'absolute',
      width: Animated.add(thumbLeft, thumbSize.width / 2),
      // marginTop: -trackSize.height,
      ...valueVisibleStyle,
    };

    const touchOverflowStyle = this._getTouchOverflowStyle();

    return (
      <View {...other} style={[mainStyles.container]} onLayout={this._measureContainer}>
        <View
          style={[
            mainStyles.track,
            mainStyles.maxTrack,
          ]}
          onLayout={this._measureTrack}
        />
        <Animated.View style={[mainStyles.track, minimumTrackStyle, mainStyles.minTrack]} />
        <Animated.View
          onLayout={this._measureThumb}
          style={[
            {
              // marginTop: -(trackSize.height + thumbSize.height) / 2
              marginTop: -(thumbSize.height - trackSize.height) / 2,
            },
            mainStyles.thumb,
            {
              transform: [
                {
                  translateX: thumbLeft,
                },
              ],
              ...valueVisibleStyle,
            },
          ]}
        >
          {this._renderThumbImage()}
        </Animated.View>
        <View
          style={[mainStyles.touchArea, touchOverflowStyle]}
          {...this._panResponder.panHandlers}
        >
          {debugTouchArea === true && this._renderDebugThumbTouchRect(thumbLeft)}
        </View>
      </View>
    );
  }

  componentWillMount() {
    super.componentWillMount();
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminationRequest: this._handlePanResponderRequestEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);
    const newValue = nextProps.value;
    if (this.props.value !== newValue) {
      if (this.props.animateTransitions) {
        this._setCurrentValueAnimated(newValue);
      } else {
        this.state.value.setValue(newValue);
      }
    }
  }

  _handleStartShouldSetPanResponder = (e) => {
    const result = this._thumbHitTest(e);
    return result;
  }

  _handleMoveShouldSetPanResponder = () => false

  _handlePanResponderGrant = (e, gestureState) => {
    this._previousLeft = this._getThumbLeft(this._getCurrentValue());
    this._fireChangeEvent('onSlidingStart', this._getValue(gestureState));
  }
  _handlePanResponderMove = (e, gestureState) => {
    if (this.props.disabled) {
      return;
    }
    this._setCurrentValue(this._getValue(gestureState));
    this._fireChangeEvent('onValueChange', this._getValue(gestureState));
  }
  _handlePanResponderRequestEnd = () => false
  _handlePanResponderEnd = (e, gestureState) => {
    if (this.props.disabled) {
      return;
    }
    this._setCurrentValue(this._getValue(gestureState));
    if (typeof this.props.value === 'number') {
      this._fireChangeEvent('onSlidingComplete', this._getValue(gestureState));
    }
  }

  _measureContainer = (x) => {
    this._handleMeasure('containerSize', x);
  }

  _measureTrack = (x) => {
    this._handleMeasure('trackSize', x);
  }

  _measureThumb = (x) => {
    this._handleMeasure('thumbSize', x);
  }

  _handleMeasure(name, x) {
    const { width, height } = x.nativeEvent.layout;
    const size = {
      width,
      height,
    };

    const storeName = `_${name}`;
    const currentSize = this[storeName];
    if (currentSize && width === currentSize.width && height === currentSize.height) {
      return;
    }
    this[storeName] = size;

    if (this._containerSize && this._trackSize && this._thumbSize) {
      this.setState({
        containerSize: this._containerSize,
        trackSize: this._trackSize,
        thumbSize: this._thumbSize,
        allMeasured: true,
      });
    }
  }

  _getRatio(value) {
    return (value - this.props.minimumValue) / (this.props.maximumValue - this.props.minimumValue);
  }

  _getThumbLeft(value) {
    const ratio = this._getRatio(value);
    return ratio * (this.state.containerSize.width - this.state.thumbSize.width);
  }

  _getValue(gestureState) {
    const length = this.state.containerSize.width - this.state.thumbSize.width;
    const thumbLeft = this._previousLeft + gestureState.dx;

    const ratio = thumbLeft / length;

    if (this.props.step) {
      return Math.max(
        this.props.minimumValue,
        Math.min(
          this.props.maximumValue,
          this.props.minimumValue +
          (Math.round((ratio * (this.props.maximumValue - this.props.minimumValue)) /
            this.props.step) *
            this.props.step),
        ),
      );
    } else {
      return Math.max(
        this.props.minimumValue,
        Math.min(
          this.props.maximumValue,
          (ratio * (this.props.maximumValue - this.props.minimumValue)) +
          this.props.minimumValue,
        ),
      );
    }
  }

  _getCurrentValue() {
    return this.state.value.__getValue();
  }

  _setCurrentValue(value) {
    if (typeof this.props.value !== 'number') {
      this.state.value.setValue(value);
    }
  }

  _setCurrentValueAnimated(value) {
    const { animationType } = this.props;
    const animationConfig = Object.assign(
      {},
      DEFAULT_ANIMATION_CONFIGS[animationType],
      this.props.animationConfig,
      { toValue: value },
    );

    Animated[animationType](this.state.value, animationConfig).start();
  }

  _fireChangeEvent(event, value) {
    if (this.props[event]) {
      this.props[event](value);
    }
  }

  _getTouchOverflowSize() {
    const { state, props } = this;

    const size = {};
    if (state.allMeasured === true) {
      size.width = Math.max(0, props.thumbTouchSize.width - state.thumbSize.width);
      size.height = Math.max(0, state.containerSize.height - props.thumbTouchSize.height);
    }
    return size;
  }

  _getTouchOverflowStyle() {
    const { width, height } = this._getTouchOverflowSize();

    const touchOverflowStyle = {};
    if (width !== undefined && height !== undefined) {
      const verticalMargin = -height / 2;
      touchOverflowStyle.marginTop = verticalMargin;
      touchOverflowStyle.marginBottom = verticalMargin;

      const horizontalMargin = -width / 2;
      touchOverflowStyle.marginLeft = horizontalMargin;
      touchOverflowStyle.marginRight = horizontalMargin;
    }

    if (this.props.debugTouchArea === true) {
      touchOverflowStyle.backgroundColor = 'black';
      touchOverflowStyle.opacity = 0.5;
    }

    return touchOverflowStyle;
  }

  _thumbHitTest = (e) => {
    const { nativeEvent } = e;
    const thumbTouchRect = this._getThumbTouchRect();
    // console.log('touch react: ', thumbTouchRect);
    return thumbTouchRect.containsPoint(nativeEvent.locationX, nativeEvent.locationY);
  }

  _getThumbTouchRect = () => {
    const { state, props } = this;
    const touchOverflowSize = this._getTouchOverflowSize();
    return new Rect(
      (touchOverflowSize.width / 2) +
      this._getThumbLeft(this._getCurrentValue()) +
      ((state.thumbSize.width - props.thumbTouchSize.width) / 2),
      (touchOverflowSize.height / 2) +
      ((state.containerSize.height - props.thumbTouchSize.height) / 2),
      props.thumbTouchSize.width,
      props.thumbTouchSize.height,
    );
  }

  _renderDebugThumbTouchRect(thumbLeft) {
    const thumbTouchRect = this._getThumbTouchRect();
    const positionStyle = {
      left: thumbLeft,
      top: thumbTouchRect.y,
      width: thumbTouchRect.width,
      height: thumbTouchRect.height,
    };
    return (<Animated.View style={[Slider.baseStyle.debugThumbTouchArea, positionStyle]} pointerEvents="none" />);
  }

  _renderThumbImage = () => {
    const { thumbImage } = this.props;
    if (!thumbImage) { return <Image />; }
    return <Image source={thumbImage} />;
  }
}

Slider.themeStyle = {
  type: {
    default: {
      container: {
        height: 40,
      },
    },
    circle: {
      thumb: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: 'white',
        borderColor: 'green',
        borderWidth: 2,
      },
      minTrack: {
        backgroundColor: 'green',
      },
    },
    square: {
      track: {
        height: 14,
        borderRadius: 2,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#9a9a9a',
      },
      thumb: {
        width: 20,
        height: 20,
        borderRadius: 2,
        backgroundColor: '#eaeaea',
        borderColor: '#9a9a9a',
        borderWidth: StyleSheet.hairlineWidth,
      },
    },
  },
  size: {
    default: {
      container: {
        height: CONTAINER_HEIGHT,
      },
      track: {
        height: TRACK_SIZE,
        borderRadius: TRACK_SIZE / 2,
      },
      thumb: {
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        borderRadius: THUMB_SIZE / 2,
      },
    },
    small: {
      container: {
        height: CONTAINER_HEIGHT / 2,
      },
      track: {
        height: TRACK_SIZE / 2,
        borderRadius: TRACK_SIZE / 4,
      },
      thumb: {
        width: THUMB_SIZE / 2,
        height: THUMB_SIZE / 2,
        borderRadius: THUMB_SIZE / 4,
      },
    },
    large: {
      container: {
        height: (CONTAINER_HEIGHT * 3) / 2,
      },
      track: {
        height: (TRACK_SIZE * 3) / 2,
        borderRadius: (TRACK_SIZE * 3) / 4,
      },
      thumb: {
        width: (THUMB_SIZE * 3) / 2,
        height: (THUMB_SIZE * 3) / 2,
        borderRadius: (THUMB_SIZE * 3) / 4,
      },
    },
  },
};

Slider.baseStyle = {
  container: {
    height: CONTAINER_HEIGHT,
    justifyContent: 'center',
  },
  track: {
    height: TRACK_SIZE,
    borderRadius: TRACK_SIZE / 2,
  },
  minTrack: {
    backgroundColor: '#0a60ff',
  },
  maxTrack: {
    backgroundColor: '#a7a7a7',
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: 'white',
  },
  touchArea: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  debugThumbTouchArea: {
    position: 'absolute',
    backgroundColor: 'green',
    opacity: 0.5,
  },
};
