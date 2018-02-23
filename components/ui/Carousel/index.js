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
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import { UIComponent } from 'common';

const windowWidth = Dimensions.get('window').width;

export default class Carousel extends UIComponent {
  static defaultProps = {
    mode: 'preload',
    preLoadPageCount: 5,
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
    onShouldChange: (prePage, nextPage) => { console.log(prePage, nextPage); return true; },
    onChange: (currPage) => { console.log(currPage); },
    onScrollBeginDrag: (e) => { console.log(e); },
  }

  static propTypes = {
    // 加载模式
    mode: PropTypes.oneOf(['all', 'preload']),
    // 子view种类
    childrenType: PropTypes.oneOf(['image', 'custom']),
    // 图片尺寸
    size: PropTypes.object,
    // 图片资源
    source: PropTypes.array,
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
    preLoadPageCount: PropTypes.number,
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
    const { defaultPage, preLoadPageCount } = props;
    this._scrollView = null;
    this.state = {
      size: props.size,
      currPage: 0,
      startPage: 0,
      endPage: preLoadPageCount - 1,
    };
  }


  /**
   * life cycle
   *
   * @memberof Carousel
   */
  componentWillMount() {
    super.componentWillMount();
    this._layoutPages(this.state.currPage);
  }

  componentDidMount() {
    this._setTimer(this.props);
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);
    this._setTimer(nextProps);
  }

  componentWillUnmount() {
    this._clearTimer();
  }


  /**
   * methods
   *
   * @param {any} props
   * @returns
   * @memberof Carousel
   */

  _onPress = () => {
    const { onPress } = this.props;
    const { currPage } = this.state;
    if (onPress) {
      onPress(currPage);
    }
  }

  /**
   * timer管理
   */
  _setTimer = (props) => {
    const {
      childrenType, source, autoPlay, children, interval,
    } = props;

    let childrenCount;
    if (childrenType === 'image') {
      childrenCount = source.length;
    } else {
      childrenCount = children.length;
    }

    if (autoPlay && childrenCount > 1) {
      this._clearTimer();
      this._timer = setInterval(this._animateToNextPage, interval);
    }
  }

  _clearTimer = () => {
    this._timer && clearInterval(this._timer);
  }

  /**
   * 页面管理
   */
  _layoutPages = (currPage) => {
    const {
      mode, childrenType, source, children, preLoadPageCount, infinite,
    } = this.props;

    let childrenCount;
    if (childrenType === 'image') {
      childrenCount = source.length;
    } else {
      childrenCount = children.length;
    }

    let actualLoadPageCount;
    if (mode === 'preload') {
      actualLoadPageCount = preLoadPageCount;
      if (childrenCount < actualLoadPageCount) {
        actualLoadPageCount = childrenCount;
        if (childrenCount < 3) {
          if (infinite && childrenCount === 2) {
            actualLoadPageCount = 3;
          }
        }
      }
    } else if (childrenCount <= 1) {
      actualLoadPageCount = 1;
    } else if (infinite) {
      actualLoadPageCount = childrenCount + 2;
    } else {
      actualLoadPageCount = childrenCount;
    }

    let startPage = 0;
    let endPage = actualLoadPageCount - 1;
    if (mode === 'preload') {
      const halfCount = Math.floor(actualLoadPageCount / 2);
      const remainCount = actualLoadPageCount % 2 ? halfCount : halfCount - 1;
      if (infinite) {
        if (childrenCount > 1) {
          startPage = currPage - halfCount;
          endPage = startPage + actualLoadPageCount - 1;
        }
      } else if (childrenCount > actualLoadPageCount) {
        if (currPage - halfCount > 0) {
          if (currPage + halfCount >= childrenCount - 1) {
            endPage = childrenCount - 1;
            startPage = endPage - actualLoadPageCount + 1;
          } else {
            startPage = currPage - remainCount;
            endPage = currPage + halfCount;
          }
        } else {
          startPage = 0;
          endPage = startPage + actualLoadPageCount - 1;
        }
      }
      if (endPage < 0) {
        endPage = 0;
      }
    } else {
      startPage = actualLoadPageCount === 1 ? 0 : -1;
      if (actualLoadPageCount === 1) {
        endPage = 0;
      } else if (infinite) {
        endPage = childrenCount;
      } else {
        endPage = childrenCount - 1;
      }
    }
    this.setState({
      startPage,
      endPage,
      currPage,
    }, () => {
      const { onChange } = this.props;
      onChange && onChange(currPage);
      if (mode === 'preload') {
        this._placeCritical(currPage, startPage);
      }
    });
  }

  /**
   * 轮播图切换管理
   */
  _animateToNextPage = () => {
    const { currPage } = this.state;
    const {
      childrenType, source, infinite, children,
    } = this.props;
    const nextPage = currPage + 1;
    let childrenCount = 0;
    if (childrenType === 'image') {
      childrenCount = source.length;
    } else {
      childrenCount = children.length;
    }
    /**
       * “无限循环播放” 或是 “不无限循环播放，但是当前还未播放到最后一张”，需要继续播放下一张
       */
    if (infinite || (!infinite && nextPage < childrenCount)) {
      this._animateToPage(this._getFixedPageIdx(nextPage));
    } else {
      this._clearTimer();
    }
  }

  _animateToPage = (targetPage) => {
    if (!this._onShouldChange(targetPage)) {
      return;
    }
    const { size, startPage, currPage } = this.state;
    const { width, height } = size;
    const {
      direction, mode, childrenType, children, source,
    } = this.props;
    if (mode === 'preload') {
      let scrollTargetPage;

      if (targetPage) {
        scrollTargetPage = targetPage;
      } else {
        scrollTargetPage = currPage + 1;
      }

      if (direction === 'horizontal') {
        this._scrollTo((scrollTargetPage - startPage) * width, 0, true);
      } else {
        this._scrollTo(0, (scrollTargetPage - startPage) * height, true);
      }
      setTimeout(() => {
        this._layoutPages(targetPage);
      }, 400);
    } else {
      let childrenCount;
      if (childrenType === 'image') {
        childrenCount = source.length;
      } else {
        childrenCount = children.length;
      }
      if (direction === 'horizontal') {
        if (currPage === 0 && targetPage === childrenCount - 1) {
          if (childrenCount !== 2) {
            this._scrollTo((childrenCount + 1) * width, 0, false);
          }
        } else if (currPage === childrenCount - 1 && targetPage === 0) {
          this._scrollTo(0, 0, false);
        }
        this._scrollTo((targetPage + 1) * width, 0, true);
      } else {
        if (currPage === 0 && targetPage === childrenCount - 1) {
          this._scrollTo(0, childrenCount * height, false);
        } else if (currPage === childrenCount - 1 && targetPage === 0) {
          this._scrollTo(0, 0, false);
        }
        this._scrollTo(0, (targetPage + 1) * height, true);
      }
      this._layoutPages(targetPage);
    }
  }

  _onShouldChange(targetPage) {
    const { currPage } = this.state;
    const fromPage = currPage;
    return this.props.onShouldChange(fromPage, targetPage);
  }

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

  _calculateCurrentPage = (offset) => {
    const { size, currPage, startPage } = this.state;
    const { width, height } = size;
    const { direction } = this.props;
    const denominator = direction === 'horizontal' ? width : height;
    const result = offset / denominator;
    const nextPage = (result % 1) >= 0.5 ? Math.ceil(result) : Math.floor(result);
    const diff = nextPage + startPage - this._prePage;
    const newCurrPage = currPage + diff;
    return this._getFixedPageIdx(newCurrPage);
  }

  /**
   * scrollview滚动控制
   */
  _scrollTo = (offsetX, offsetY, animated) => {
    if (this.scrollView) {
      this.scrollView.scrollTo({ y: offsetY, x: offsetX, animated });
    }
  }

  /**
   * scrollview事件回调
   */
  _onScrollBeginDrag = (event) => {
    this._clearTimer();
    this.props.onScrollBeginDrag(event);
    this._prePage = this.state.currPage;
  }

  _onScrollEndDrag = (event) => {
    const { direction } = this.props;
    const { contentOffset } = event.nativeEvent;
    const offset = direction === 'horizontal' ? contentOffset.x : contentOffset.y;
    const page = this._calculateCurrentPage(offset);
    this._layoutPages(page);
    this._setTimer(this.props);
  }

  _placeCritical = (currPage, startPage) => {
    const {
      mode, direction, children, source, childrenType,
    } = this.props;
    const { size } = this.state;
    const { width, height } = size;
    let childrenCount;
    if (childrenType === 'image') {
      childrenCount = source.length;
    } else {
      childrenCount = children.length;
    }

    if (mode === 'preload') {
      if (direction === 'horizontal') {
        this._scrollTo((currPage - startPage) * width, 0, false);
      } else {
        this._scrollTo(0, (currPage - startPage) * height, false);
      }
    } else if (currPage === 0) {
      if (direction === 'horizontal') {
        if (childrenCount <= 1) {
          this._scrollTo(0, 0, false);
        } else {
          this._scrollTo(width, 0, false);
        }
      } else if (childrenCount <= 1) {
        this._scrollTo(0, 0, false);
      } else {
        this._scrollTo(0, height, false);
      }
    } else if (currPage === childrenCount - 1) {
      if (direction === 'horizontal') {
        this._scrollTo(childrenCount * width, 0, false);
      } else {
        this._scrollTo(0, childrenCount * height, false);
      }
    }
  }

  /**
   * 渲染区
   *
   * @returns
   * @memberof Carousel
   */
  render() {
    const { style } = this;
    const {
      childrenType, showArrows, showDot, showPagination, direction, children, source,
    } = this.props;
    const horizontal = direction === 'horizontal';
    let childrenCount;
    if (childrenType === 'image') {
      childrenCount = source.length;
    } else {
      childrenCount = children.length;
    }


    return (
      <View
        ref={(ref) => { this.container = ref; }}
        style={[style.container, { ...this.state.size }]}
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
      size, currPage, startPage, endPage,
    } = this.state;
    const {
      mode, childrenType, direction, children, preLoadPageCount, infinite, source,
    } = this.props;
    const horizontal = direction === 'horizontal';

    let actualLoadPageCount;
    if (mode === 'preload') {
      actualLoadPageCount = preLoadPageCount;
      if (childrenCount < actualLoadPageCount) {
        actualLoadPageCount = childrenCount;
        if (childrenCount < 3) {
          if (infinite && childrenCount === 2) {
            actualLoadPageCount = 3;
          }
        }
      }
      if (actualLoadPageCount === 0) {
        actualLoadPageCount = 1;
      }
    } else {
      actualLoadPageCount = childrenCount + 2;
      if (childrenCount <= 1) {
        actualLoadPageCount = 1;
      }
    }

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
          let key = `image${fixedIdx + 100}`;
          if (childrenCount === 2) {
            key = `image${idx + 100}`;
          }
          page = (
            <Image key={key} source={source[fixedIdx]} style={size} />
          );
        } else {
          page = children[fixedIdx];
        }
      } else {
        page = (
          <View style={style.noChild}>
            <Text style={{ color: '#333' }}>您未添加任何轮播内容</Text>
          </View>
        );
      }
      let key = `page${fixedIdx + 100}`;
      if (childrenCount === 2) {
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
              this._placeCritical(currPage, startPage);
            }
          }
        }
      >
        {scrollChildren}
      </ScrollView >
    );
  }

  _renderDots = (childrenCount) => {
    const { direction, dotType } = this.props;
    const { currPage } = this.state;
    const { style } = this;

    const dotStyle = direction === 'horizontal' ? 'dotHorizontal' : 'dotVertical';
    const isRectType = dotType === 'rect';
    const dotArray = [];

    const activeDotStyle = [style.dot, style.activeDot, isRectType && style[dotStyle]];
    const normalDotStyle = [style.dot, isRectType && style[dotStyle]];

    for (let idx = 0; idx < childrenCount; idx++) {
      const dot = (
        <TouchableWithoutFeedback key={`dot${idx}`} onPress={() => this._layoutPages(idx)} >
          <View
            style={idx === currPage ? activeDotStyle : normalDotStyle}
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
    const { currPage } = this.state;
    const { leftArrow } = this.props;

    const isText = typeof leftArrow === 'string';
    const leftArrowView = isText ? (
      <Text style={style.arrowText}>{leftArrow}</Text>
    ) : leftArrow;
    return (
      <View style={style.leftArrowContainer}>
        <TouchableOpacity
          style={[style.arrowWrapper, style.leftArrowWrapper]}
          onPress={() => this._animateToPage(this._getFixedPageIdx(currPage - 1))}
        >
          {leftArrowView}
        </TouchableOpacity>
      </View>
    );
  }

  _renderRightArrows = (childrenCount) => {
    if (!childrenCount) return null;

    const { style } = this;
    const { currPage } = this.state;
    const { rightArrow } = this.props;

    const isText = typeof leftArrow === 'string';
    const rightArrowView = isText ? (
      <Text style={style.arrowText}>{rightArrow}</Text>
    ) : rightArrow;

    return (
      <View style={style.rightArrowContainer}>
        <TouchableOpacity
          style={[style.arrowWrapper, style.rightArrowWrapper]}
          onPress={() => this._animateToPage(this._getFixedPageIdx(currPage + 1))}
        >
          {rightArrowView}
        </TouchableOpacity>
      </View>
    );
  }

  _renderPagination = (childrenCount) => {
    if (!childrenCount) return null;

    const { style } = this;
    const { currPage } = this.state;
    const { paginationSeparator } = this.props;

    return (
      <View style={style.paginationContainer} pointerEvents="none">
        <View
          style={style.paginationWrapper}
        >
          <Text style={style.paginationText} >
            {`${currPage + 1}${paginationSeparator}${childrenCount}`}
          </Text>
        </View>
      </View>
    );
  }
}

Carousel.baseStyle = {
  noChild: {
    width: windowWidth,
    height: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
