/**
 * 轮播图组件
 * @author asyxu
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  Platform,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import { UIComponent } from 'common';

const windowWidth = Dimensions.get('window').width;

export default class Carousel extends UIComponent {
  static defaultProps = {
    mode: 'all',
    preloadPageCount: 5,
    childrenType: 'image',
    size: { width: windowWidth, height: windowWidth * 180 / 375 },
    source: [],
    defaultPage: 0,
    direction: 'horizontal',
    autoPlay: true,
    interval: 3000,
    infinite: true,
    showDot: true,
    dotType: 'circle',
    showPagination: false,
    paginationSeparator: ' / ',
    showArrows: false,
    leftArrow: '<',
    rightArrow: '>',
    onShouldChange: (prePage, nextPage) => {
      if (__DEV__) {
        console.log(prePage, nextPage);
      }
      return true;
    },
    onChange: (curPage) => {
      if (__DEV__) {
        console.log(curPage);
      }
    },
    onScrollBeginDrag: () => { },
  }

  static propTypes = {
    // 加载模式
    mode: PropTypes.oneOf(['all', 'preload']),
    // 子view种类
    childrenType: PropTypes.oneOf(['image', 'custom']),
    // 图片尺寸
    size: PropTypes.objectOf(PropTypes.number),
    // 图片资源
    source: PropTypes.arrayOf(PropTypes.any),
    // 非受控属性，初始从第几张开始显示
    defaultPage: PropTypes.number,
    // 显示方向
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    // 是否自动播放
    autoPlay: PropTypes.bool,
    // 轮播切换时间间隔（ms）
    interval: PropTypes.number,
    // 是否无限循环
    infinite: PropTypes.bool,
    // 是否显示面板指示点
    showDot: PropTypes.bool,
    // 指示点样式
    dotType: PropTypes.oneOf(['circle', 'rect']),
    // 是否显示分页信息
    showPagination: PropTypes.bool,
    // 分隔符
    paginationSeparator: PropTypes.string,
    // 预加载数量
    preloadPageCount: PropTypes.number,
    // 左右翻动按钮
    showArrows: PropTypes.bool,
    // 左按钮
    leftArrow: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
    ]),
    // 右按钮
    rightArrow: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
    ]),
    // 点击了第几页
    onPress: PropTypes.func,
    // 切换面板前的回调函数，可以通过返回 false 来阻止轮播
    onShouldChange: PropTypes.func,
    // 切换面板后的回调函数，参数为切换后的 index (0 开始计算)
    onChange: PropTypes.func,
    // onScrollBeginDrag 事件：开始拖拽时的回调，参数为事件对象
    onScrollBeginDrag: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this._prePage = 0;
    this._hasUpdatedDisplayRegion = false;
    const { defaultPage, preloadPageCount } = props;
    this._scrollView = null;
    this.state = {
      curPage: defaultPage,
      startPage: 0,
      endPage: preloadPageCount - 1,
    };
  }

  /**
   * life cycle
   *
   * @memberof Carousel
   */
  componentWillMount() {
    super.componentWillMount();
    this._updateChildrenCount(this.props);
    if (this.state.curPage >= this._childrenCount) {
      this.state.curPage = 0;
    }
    this._updateActualLoadPageCount(this.props);
    this._updateLoadPageRegion(this.props, this.state.curPage);
  }

  componentDidMount() {
    this._setTimerIfNeed(this.props, this.state.curPage);
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);
    this._updateChildrenCount(nextProps);
    this._updateActualLoadPageCount(nextProps);
    this._updateLoadPageRegion(nextProps, this.state.curPage);
    this._setTimerIfNeed(nextProps, this.state.curPage);
  }

  componentWillUnmount() {
    this._clearTimer();
  }

  /**
   * methods
   *
   * @memberof Carousel
   */

  _onPress = () => {
    const { onPress } = this.props;
    const { curPage } = this.state;
    if (onPress) {
      onPress(curPage);
    }
  }


  /**
   * Timer管理
   *
   * @memberof Carousel
   */
  _setTimerIfNeed = (props, curPage) => {
    const { autoPlay, infinite } = props;
    if (autoPlay) {
      let reachEnd = false;
      if (this._childrenCount < 2) {
        reachEnd = true;
      } else if (!infinite && curPage >= this._childrenCount - 1) {
        reachEnd = true;
      }
      if (!reachEnd) {
        this._setTimer(props);
        return;
      }
    }
    this._clearTimer();
  }

  _setTimer = (props) => {
    const { interval } = props;
    this._clearTimer();
    this._timer = setInterval(this._animateToNextPage, interval);
  }

  _clearTimer = () => {
    if (this._timer) {
      clearInterval(this._timer);
    }
  }

  /**
   * 更新子view的数量
   *
   * @memberof Carousel
   */
  _updateChildrenCount = (props) => {
    this._childrenCount = this._getChildrenCount(props);
  }

  _getChildrenCount = (props) => {
    const { childrenType, source, children } = props;
    let childrenCount;
    if (childrenType === 'image') {
      childrenCount = source.length;
    } else {
      childrenCount = children.length;
    }
    return childrenCount;
  }

  /**
   * 更新实际加载的页面数量
   *
   * @memberof Carousel
   */
  _updateActualLoadPageCount = (props) => {
    const {
      mode, preloadPageCount, infinite,
    } = props;
    const childrenCount = this._childrenCount;
    let actualLoadPageCount;
    if (childrenCount <= 1) {
      actualLoadPageCount = 1;
    } else if (mode === 'all') {
      if (infinite) {
        actualLoadPageCount = childrenCount + 2;
      } else {
        actualLoadPageCount = childrenCount;
      }
    } else if (mode === 'preload') {
      if (childrenCount >= preloadPageCount) {
        actualLoadPageCount = preloadPageCount;
      } else if (childrenCount === 2 && infinite) {
        actualLoadPageCount = 3;
      } else {
        actualLoadPageCount = childrenCount;
      }
    }
    this._actualLoadPageCount = actualLoadPageCount;
  }

  /**
   * 是否需要更新页面加载区间
   *
   * @memberof Carousel
   */
  _shouldUpdateLoadPageRegion = (props, nextProps) => {
    const { mode: preMode, preloadPageCount: prePreloadPageCount, infinite: preInfinite } = props;
    const { mode, preloadPageCount, infinite } = nextProps;
    const preChildrenCount = this._getChildrenCount(props);
    const childrenCount = this._getChildrenCount(nextProps);
    let shouldUpdate = false;
    if (preChildrenCount !== childrenCount ||
      preMode !== mode ||
      prePreloadPageCount !== preloadPageCount ||
      preInfinite !== infinite) {
      shouldUpdate = true;
    }
    return shouldUpdate;
  }

  /**
   * 更新页面加载区间
   *
   * @memberof Carousel
   */
  _updateLoadPageRegion = (props, curPage) => {
    const { mode, infinite } = props;
    const childrenCount = this._childrenCount;
    const actualLoadPageCount = this._actualLoadPageCount;

    let startPage;
    let endPage;
    if (actualLoadPageCount === 1) {
      startPage = 0;
      endPage = 0;
    } else {
      if (mode === 'all') {
        if (infinite) {
          startPage = -1;
          endPage = actualLoadPageCount - 2;
        } else {
          startPage = 0;
          endPage = actualLoadPageCount - 1;
        }
      } else if (mode === 'preload') {
        const halfCount = Math.floor(actualLoadPageCount / 2);
        if (infinite) {
          startPage = curPage - halfCount;
          endPage = startPage + actualLoadPageCount - 1;
        } else if (actualLoadPageCount === childrenCount) {
          startPage = 0;
          endPage = actualLoadPageCount - 1;
        } else if (curPage - halfCount > 0) {
          if (curPage + halfCount >= childrenCount - 1) {
            endPage = childrenCount - 1;
            startPage = endPage - actualLoadPageCount + 1;
          } else {
            startPage = curPage - halfCount;
            endPage = startPage + actualLoadPageCount - 1;
          }
        } else {
          startPage = 0;
          endPage = startPage + actualLoadPageCount - 1;
        }
      } else {
        console.warn(`不支持的mode:${mode}`);
      }
      this.setState({
        startPage,
        endPage,
      }, () => {
        this._placeCritical(curPage, startPage);
      });
    }
    this._hasUpdatedDisplayRegion = true;
  }

  /**
   * 更新当前页
   *
   * @memberof Carousel
   */
  _updateCurPage = (curPage) => {
    this.setState({
      curPage,
    }, () => {
      const { onChange, mode } = this.props;
      const { startPage } = this.state;
      onChange && onChange(curPage);
      if (mode === 'preload') {
        this._placeCritical(curPage, startPage);
      }
    });
  }

  _updateDisplay = () => {
    if (Platform.OS === 'ios' && this.props.mode === 'preload') {
      this._updateLoadPageRegion(this.props, this._targetPage);
      this._updateCurPage(this._targetPage);
    }
  }

  /**
   * 页面切换
   *
   * @memberof Carousel
   */
  _changeToPage = (targetPage, animated, forward) => {
    if (!this._onShouldChange(targetPage)) {
      return;
    }

    const childrenCount = this._childrenCount;
    const actualLoadPageCount = this._actualLoadPageCount;
    if (targetPage >= childrenCount) {
      console.warn(`目标页超出显示范围！！${targetPage}`);
      return;
    }

    const {
      mode, size, direction, infinite,
    } = this.props;
    const { curPage, startPage } = this.state;
    const { width, height } = size;

    // 在非无限播放的情况下，到了最后一张则停掉timer
    if (!infinite && targetPage >= childrenCount - 1) {
      this._clearTimer();
    }

    if (childrenCount < 2) {
      return;
    }


    if (mode === 'all') {
      let actualTargetPage = targetPage;
      if (infinite) {
        actualTargetPage = targetPage + 1;
        let tempTargetPage;
        if (childrenCount === 2) {
          if (forward && targetPage === 0) {
            tempTargetPage = 0;
          } else if (!forward && targetPage === 1) {
            tempTargetPage = childrenCount + 1;
          }
        } else if (curPage === 0 && targetPage === childrenCount - 1) {
          tempTargetPage = actualLoadPageCount - 1;
        } else if (curPage === childrenCount - 1 && targetPage === 0) {
          tempTargetPage = 0;
        }

        if (tempTargetPage !== undefined) {
          if (direction === 'horizontal') {
            this._scrollTo(tempTargetPage * width, 0, false);
          } else {
            this._scrollTo(0, tempTargetPage * height, false);
          }
        }
      }

      if (direction === 'horizontal') {
        this._scrollTo(actualTargetPage * width, 0, animated);
      } else {
        this._scrollTo(0, actualTargetPage * height, animated);
      }

      this._updateCurPage(targetPage);
    } else if (mode === 'preload') {
      const actualTargetPage = targetPage === 0 ? curPage + 1 : targetPage;
      if (direction === 'horizontal') {
        this._scrollTo((actualTargetPage - startPage) * width, 0, animated);
      } else {
        this._scrollTo(0, (actualTargetPage - startPage) * height, animated);
      }
      if (Platform.OS === 'ios') {
        this._targetPage = targetPage;
      } else {
        setTimeout(() => {
          this._updateLoadPageRegion(this.props, targetPage);
          this._updateCurPage(targetPage);
        }, 300);
      }
    }
  }

  /**
   * 是否应该切换页面
   */
  _onShouldChange(targetPage) {
    const { curPage } = this.state;
    const fromPage = curPage;
    return this.props.onShouldChange(fromPage, targetPage);
  }

  /**
   * 动画滚动到下一页
   */
  _animateToNextPage = () => {
    const { curPage } = this.state;
    const targetPage = this._getFixedPageIdx(curPage + 1);
    this._changeToPage(targetPage, true, true);
  }

  /**
   * 计算模块
   *
   * @memberof Carousel
   */
  _getFixedPageIdx = (index) => {
    const { childrenType, children, source } = this.props;
    let childrenCount;
    if (childrenType === 'image') {
      childrenCount = source.length;
    } else {
      childrenCount = children.length;
    }
    if (!childrenCount) {
      childrenCount = 1;
    }
    const fixedPageIdx = (index + childrenCount) % childrenCount;
    return fixedPageIdx;
  }

  /**
   * 通过偏移量计算当前页
   */
  _calculateCurrentPage = (offset) => {
    const { curPage } = this.state;
    let newCurPage = curPage;
    if (this._beginOffset > offset && this._beginOffset - offset > windowWidth / 3) {
      newCurPage -= 1;
    } else if (this._beginOffset < offset && offset - this._beginOffset > windowWidth / 3) {
      newCurPage += 1;
    }
    return newCurPage;
  }

  /**
   * scrollview滚动控制模块
   *
   * @memberof Carousel
   */
  _scrollTo = (offsetX, offsetY, animated) => {
    if (this.scrollView) {
      this.scrollView.scrollTo({ y: offsetY, x: offsetX, animated });
    }
  }

  /**
   * 将scrollview滚动到正确位置
   */
  _placeCritical = (curPage, startPage) => {
    const {
      mode, direction, size, infinite,
    } = this.props;
    const { width, height } = size;
    const childrenCount = this._childrenCount;

    if (childrenCount === 1) {
      this._scrollTo(0, 0, false);
    } else if (mode === 'all') {
      let actualCurPage = curPage;
      if (infinite) {
        actualCurPage = curPage + 1;
      }
      if (direction === 'horizontal') {
        this._scrollTo(actualCurPage * width, 0, false);
      } else {
        this._scrollTo(0, actualCurPage * height, false);
      }
    } else if (mode === 'preload') {
      if (direction === 'horizontal') {
        this._scrollTo((curPage - startPage) * width, 0, false);
      } else {
        this._scrollTo(0, (curPage - startPage) * height, false);
      }
    }
  }

  /**
   * scrollview事件回调
   */
  _onScrollBeginDrag = (event) => {
    const { direction } = this.props;
    const { contentOffset } = event.nativeEvent;
    this._beginOffset = direction === 'horizontal' ? contentOffset.x : contentOffset.y;
    this._clearTimer();
    this.props.onScrollBeginDrag();
    this._prePage = this.state.curPage;
  }

  _onScrollEndDrag = (event) => {
    const { direction, infinite } = this.props;
    const { curPage } = this.state;
    const { contentOffset } = event.nativeEvent;
    let newCurPage = curPage;
    if (event.nativeEvent) {
      const { velocity } = event.nativeEvent;
      const { x: vX } = velocity;
      if (Math.abs(vX) > 0.1) {
        if (vX > 0) {
          newCurPage = curPage + 1;
        } else {
          newCurPage = curPage - 1;
        }
      } else {
        const offset = direction === 'horizontal' ? contentOffset.x : contentOffset.y;
        newCurPage = this._calculateCurrentPage(offset);
      }
    }
    if (!infinite &&
      ((curPage === this._childrenCount - 1 && newCurPage > curPage) ||
        (curPage === 0 && newCurPage < 0))) {
      return;
    }
    const fixedPage = this._getFixedPageIdx(newCurPage);
    this._setTimerIfNeed(this.props, fixedPage);
    this._changeToPage(fixedPage, false);
  }

  /**
   * 渲染区
   *
   * @memberof Carousel
   */
  render() {
    const { style } = this;
    const {
      showArrows, showDot, showPagination, direction, size, preloadPageCount, mode,
    } = this.props;
    const horizontal = direction === 'horizontal';
    const childrenCount = this._childrenCount;
    if (mode === 'preload' && preloadPageCount < 3) {
      return (
        <View style={[style.container, {
          ...size, backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center',
        }]}
        >
          <Text style={{ fontSize: 15, color: 'white' }}>预加载页数需要大于2张！</Text>
        </View>
      );
    }

    if (!this._hasUpdatedDisplayRegion) {
      return (
        <View
          ref={(ref) => { this.container = ref; }}
          style={[style.container, { ...size }]}
        />
      );
    }

    return (
      <View
        ref={(ref) => { this.container = ref; }}
        style={[style.container, { ...size }]}
      >
        {this._renderContent(childrenCount)}
        {/* 水平才提供 arrow */}
        {horizontal && showArrows && this._renderLeftArrows(childrenCount)}
        {horizontal && showArrows && this._renderRightArrows(childrenCount)}
        {showDot && childrenCount > 1 && this._renderDots(childrenCount)}
        {showPagination && this._renderPagination(childrenCount)}
      </View>
    );
  }

  _renderContent = (childrenCount) => {
    const { style } = this;
    const {
      curPage, startPage, endPage,
    } = this.state;
    const {
      childrenType, direction, children, source, size, mode,
    } = this.props;
    const horizontal = direction === 'horizontal';
    const actualLoadPageCount = this._actualLoadPageCount;

    const contentSize = {
      width: horizontal ? size.width * actualLoadPageCount : size.width,
      height: horizontal ? size.height : size.height * actualLoadPageCount,
    };
    const scrollChildren = [];
    for (let idx = startPage; idx <= endPage; idx++) {
      let page;
      const fixedIdx = this._getFixedPageIdx(idx);
      if (childrenCount) {
        if (childrenType === 'image') {
          let key = `image${fixedIdx + 10}`;
          if (childrenCount === 2 || mode === 'all') {
            key = `image${idx + 10}`;
          }
          const sourceEl = source[fixedIdx];
          if (typeof sourceEl === 'number') {
            page = (
              <Image key={key} resizeMode="stretch" source={sourceEl} style={size} />
            );
          } else {
            page = (
              <Image key={key} resizeMode="stretch" source={{ uri: sourceEl, ...size }} />
            );
          }
        } else {
          page = children[fixedIdx];
        }
      } else {
        page = (
          <View style={style.noChild} />
        );
      }
      let key = `page${fixedIdx + 100}`;
      if (childrenCount === 2 || mode === 'all') {
        key = `page${idx + 100}`;
      }
      const touchablePage = (
        <TouchableWithoutFeedback
          key={key}
          style={{ ...size }}
          onPress={this._onPress}
        >
          {page}
        </TouchableWithoutFeedback>
      );
      scrollChildren.push(touchablePage);
    }

    return (
      <ScrollView
        ref={(c) => { this.scrollView = c; }}
        onScrollBeginDrag={this._onScrollBeginDrag}
        onScrollEndDrag={this._onScrollEndDrag}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        contentInset={{ top: 0 }}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={horizontal}
        pagingEnabled
        bounces={false}
        contentContainerStyle={
          [
            {
              position: 'relative',
            },
            contentSize,
          ]}
        onLayout={
          (e) => {
            if (e) {
              this._placeCritical(curPage, startPage);
            }
          }
        }
        onMomentumScrollEnd={this._updateDisplay}
      >
        {scrollChildren}
      </ScrollView >
    );
  }

  _renderDots = (childrenCount) => {
    const { direction, dotType } = this.props;
    const { curPage } = this.state;
    const { style } = this;

    const dotStyle = direction === 'horizontal' ? 'dotHorizontal' : 'dotVertical';
    const isRectType = dotType === 'rect';
    const dotArray = [];

    const activeDotStyle = [style.dot, style.activeDot, isRectType && style[dotStyle]];
    const normalDotStyle = [style.dot, isRectType && style[dotStyle]];

    for (let idx = 0; idx < childrenCount; idx++) {
      const dot = (
        <TouchableWithoutFeedback
          key={`dot${idx}`}
          onPress={() => {
            let forward = true;
            if (idx < this.state.curPage) {
              forward = false;
            }
            this._changeToPage(idx, false, forward);
          }}
        >
          <View
            style={idx === curPage ? activeDotStyle : normalDotStyle}
          />
        </TouchableWithoutFeedback >
      );

      dotArray.push(dot);
    }
    return (
      <View style={style.dotsWrapper} >{dotArray}</View>
    );
  }

  _renderLeftArrows = (childrenCount) => {
    if (!childrenCount) return null;

    const { style } = this;
    const { curPage } = this.state;
    const { leftArrow, infinite } = this.props;

    const isText = typeof leftArrow === 'string';
    const leftArrowView = isText ? (
      <Text style={style.arrowText}>{leftArrow}</Text>
    ) : leftArrow;
    return (
      <View style={style.leftArrowContainer}>
        <TouchableOpacity
          style={[style.arrowWrapper, style.leftArrowWrapper]}
          onPress={() => {
            if (!infinite && curPage === 0) {
              return;
            }
            this._changeToPage(this._getFixedPageIdx(curPage - 1), true, false);
          }}
        >
          {leftArrowView}
        </TouchableOpacity>
      </View >
    );
  }

  _renderRightArrows = (childrenCount) => {
    if (!childrenCount) return null;

    const { style } = this;
    const { curPage } = this.state;
    const { rightArrow, infinite } = this.props;

    const isText = typeof rightArrow === 'string';
    const rightArrowView = isText ? (
      <Text style={style.arrowText}>{rightArrow}</Text>
    ) : rightArrow;

    return (
      <View style={style.rightArrowContainer}>
        <TouchableOpacity
          style={[style.arrowWrapper, style.rightArrowWrapper]}
          onPress={() => {
            if (!infinite && curPage === childrenCount - 1) {
              return;
            }
            this._changeToPage(this._getFixedPageIdx(curPage + 1), true, true);
          }}
        >
          {rightArrowView}
        </TouchableOpacity>
      </View >
    );
  }

  _renderPagination = (childrenCount) => {
    if (!childrenCount) return null;

    const { style } = this;
    const { curPage } = this.state;
    const { paginationSeparator } = this.props;

    return (
      <View style={style.paginationContainer} pointerEvents="none">
        <View
          style={style.paginationWrapper}
        >
          <Text style={style.paginationText} >
            {`${curPage + 1}${paginationSeparator}${childrenCount}`}
          </Text>
        </View>
      </View>
    );
  }
}

Carousel.baseStyle = {
  // 容器
  container: {},
  // 指示点
  dotsWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDot: {
    backgroundColor: '#fff',
  },
  // 分页
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationWrapper: {
    width: 80,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(234, 234, 234, 0.5)',
  },
  paginationText: {
    textAlign: 'center',
    color: '#2b2b2b',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 左右箭头
  leftArrowContainer: {
    position: 'absolute',
    left: 10,
    bottom: 0,
    top: 0,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rightArrowContainer: {
    position: 'absolute',
    right: 10,
    bottom: 0,
    top: 0,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  arrowWrapper: {
    width: 34,
    height: 34,
    borderRadius: 3,
    backgroundColor: 'rgba(51, 51, 51, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftArrowWrapper: {
  },
  rightArrowWrapper: {
  },
  arrowText: {
    color: '#fafafa',
  },
};

Carousel.themeStyle = {
  direction: {
    horizontal: {
      dotsWrapper: {
        left: 0,
        right: 0,
        bottom: 10,
        flexDirection: 'row',
      },
    },
    vertical: {
      dotsWrapper: {
        top: 0,
        right: 10,
        bottom: 0,
        flexDirection: 'column',
      },
    },
  },
  dotType: {
    circle: {
      dot: {
        margin: 5,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(31, 31, 31, 0.2)',
        borderColor: '#fff',
        borderWidth: 1,
      },
    },
    rect: {
      dot: {
        margin: 5,
        borderRadius: 2,
        backgroundColor: 'rgba(231, 231, 231, 0.4)',
      },
      dotHorizontal: {
        width: 18,
        height: 4,
      },
      dotVertical: {
        width: 4,
        height: 18,
      },
    },
  },
};
