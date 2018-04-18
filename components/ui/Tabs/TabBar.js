import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  ViewPropTypes,
  Animated,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import merge from 'lodash/merge';
import { UIComponent } from 'common';

const tabStyle = {
  underline: {
    position: 'absolute',
    height: 4,
    bottom: 0,
  },
};


export default class TabBar extends UIComponent {
  static defaultProps = {
    activeIdx: null,
    duration: 350,
    showUnderline: true,
    style: null,
    tabStyle: null,
    textStyle: null,
    activeTextStyle: null,
    activeUnderlineStyle: null,
    onTabClick: () => { },
    onScrollEnd: () => { },
    onAnimationEnd: () => { },
  }

  static propTypes = {
    // tab 标签
    items: PropTypes.arrayOf(PropTypes.any).isRequired,
    // 当前激活的 tab 在 tabs 数组中的下标
    activeIdx: PropTypes.number,
    // tabBar宽度
    barWidth: PropTypes.number,
    // TabBarItem宽度
    itemWidth: PropTypes.number,
    // 动画持续时间
    duration: PropTypes.number,
    // 是否显示bottomline
    showUnderline: PropTypes.bool,
    // TabBar容器样式
    style: ViewPropTypes.style,
    // TabBarItem样式
    itemStyle: ViewPropTypes.style,
    // TabBarItem高亮样式
    activeItemStyle: ViewPropTypes.style,
    // title文字样式
    textStyle: Text.propTypes.style,
    // 文字高亮样式
    activeTextStyle: Text.propTypes.style,
    // 下划线高亮样式
    activeUnderlineStyle: ViewPropTypes.style,
    // 点击TabBarItem的回调
    onTabClick: PropTypes.func,
    // TabBar可滚动时，滚动后的回调，参数为滚动后的x方向上的偏移
    onScrollEnd: PropTypes.func,
    // TabBar选中变更动画结束回调
    onAnimationEnd: PropTypes.func,
  }

  static autoStyleSheet = false;

  constructor(props) {
    super(props);

    this.state = {
      tabBarWidth: props.barWidth,
      itemWidth: this._getItemWidth(props, props.barWidth),
      left: new Animated.Value(props.activeIdx * this._getItemWidth(props, props.barWidth)),
    };

    this._contentOffsetX = 0;
  }

  componentDidMount() {
    setTimeout(() => {
      this._animatedToIndex(this.props.activeIdx);
    }, 0);
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);
    const index = nextProps.activeIdx;
    const { itemWidth, tabBarWidth } = this.state;
    const newItemWidth = this._getItemWidth(nextProps, tabBarWidth);
    if (itemWidth !== newItemWidth) {
      this.setState({
        itemWidth: newItemWidth,
      }, () => {
        this._animatedToIndex(index);
      });
    } else if (index !== this.props.activeIdx) {
      this._animatedToIndex(index, nextProps);
    }
  }

  /**
   * 更新item宽度
   *
   * @param {any} props
   * @returns
   * @memberof TabBar
   */
  _getItemWidth(props, tabBarWidth) {
    const { itemWidth, items } = props;
    if (itemWidth) {
      return itemWidth;
    } else {
      return items.length ? tabBarWidth / items.length : 0;
    }
  }

  /**
   * 点击item
   *
   * @memberof TabBar
   */
  _onItemPress = (item) => {
    const { onTabClick } = this.props;
    if (onTabClick) {
      onTabClick(item._key, item.title, item.index);
    }
  }

  /**
   * 停止拖拽
   *
   * @memberof TabBar
   */
  _onScrollEndDrag = (e) => {
    const { onScrollEnd } = this.props;
    if (onScrollEnd) {
      onScrollEnd(e.nativeEvent.contentOffset.x);
    }
  }


  /**
   * 动画滚到目标位置
   *
   * @memberof TabBar
   */
  _animatedToIndex = (index, nextProps = this.props) => {
    if (this._underlineAnimation) {
      this._underlineAnimation.stop();
      this._underlineAnimation = null;
    }
    const { duration, onAnimationEnd, showUnderline } = nextProps;
    if (showUnderline) {
      const { itemWidth } = this.state;
      this._underlineAnimation = Animated.timing(
        this.state.left,
        {
          toValue: index * itemWidth,
          duration,
        },
      ).start(() => {
        this._underlineAnimation = null;
        if (onAnimationEnd) {
          onAnimationEnd(index);
        }
      });
    }
    this._scrollTabBar(index, true);
  }

  _scrollTabBar(index, animated) {
    const { itemWidth, tabBarWidth } = this.state;
    const start = itemWidth * index;
    const end = itemWidth * (index + 1);

    if (start - this._contentOffsetX < 0) {
      this._scrollView.scrollTo({ x: start, y: 0, animated });
      this._contentOffsetX = start;
    }
    if (end - this._contentOffsetX > tabBarWidth) {
      const offsetx = end - tabBarWidth;
      this._scrollView.scrollTo({ x: offsetx, y: 0, animated });
      this._contentOffsetX = offsetx;
    }
  }


  /**
   * 处理布局
   *
   * @memberof TabBar
   */
  _handleLayout = (e) => {
    const { width } = e.nativeEvent;
    const { tabBarWidth, activeIdx } = this.state;
    if (width !== tabBarWidth) {
      this.setState({
        itemWidth: this._getItemWidth(this.props, width),
        tabBarWidth: width,
      }, () => {
        this._animatedToIndex(activeIdx);
      });
    }
  }

  /**
   * 渲染TabItem
   *
   * @param {any} item
   * @param {any} activeIdx
   * @returns
   * @memberof DefaultTabBar
   */
  _renderTabItem(item, activeIdx) {
    const {
      itemStyle, activeItemStyle, textStyle, activeTextStyle,
    } = this.props;
    const isActive = activeIdx === item.index;

    const actualItemStyle = isActive ? [itemStyle, activeItemStyle] : itemStyle;
    const itemTextStyle = isActive ? [textStyle, activeTextStyle] : textStyle;

    return (
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        key={item.index}
        onPress={() => { this._onItemPress(item); }}
      >
        <View style={[{ height: this.style.container.height }, actualItemStyle]}>
          <Text style={itemTextStyle}>{item.title}</Text>
        </View>
      </TouchableWithoutFeedback >
    );
  }

  render() {
    const {
      items, activeIdx, activeUnderlineStyle, barWidth, showUnderline,
    } = this.props;
    const {
      itemWidth,
    } = this.state;

    const finalLineStyle = merge({}, {
      width: itemWidth,
      left: this.state.left,
    }, tabStyle.underline, ...activeUnderlineStyle);

    let { width } = finalLineStyle;
    if (finalLineStyle.marginHorizontal) {
      width -= 2 * finalLineStyle.marginHorizontal;
    } else if (finalLineStyle.marginLeft) {
      width -= finalLineStyle.marginLeft;
    } else if (finalLineStyle.marginRight) {
      width -= finalLineStyle.marginRight;
    }

    finalLineStyle.width = width;

    const contentView = (
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        {items.map(item => this._renderTabItem(item, activeIdx))}
        {showUnderline ? <Animated.View style={finalLineStyle}
        /> : null}
      </View>
    );
    return (
      <View
        style={[{ width: barWidth }, this.style.container]}
        onLayout={this.handleLayout}
      >
        <ScrollView
          horizontal
          ref={(s) => { this._scrollView = s; }}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          bounces={false}
          onScrollEndDrag={this._onScrollEndDrag}
          contentContainerStyle={
            [
              {
                position: 'relative',
              },
              {
                width: itemWidth * items.length,
                height: this.style.container.height,
              },
            ]}
        >
          {contentView}
        </ScrollView>
      </View >
    );
  }
}
