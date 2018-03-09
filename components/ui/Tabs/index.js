/**
 * 标签页组件
 * @author esky 翟宇佳
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { UIComponent } from 'common';

import TabBar from './TabBar';
import TabPane from './TabPane';
import SceneComponent from './SceneComponent';


const screenWidth = Dimensions.get('window').width;

export default class Tabs extends UIComponent {
  static defaultProps = {
    showTabBar: true,
    tabBarPosition: 'top',
    onChange: () => { },
    onTabClick: () => { },
    onAnimationEnd: () => { },
    animated: true,
    swipeable: true,
    usePreload: true,
    singleSidePreloadCount: 1,
  }

  static propTypes = {
    // 受控属性，当前激活 tab 面板的 key，需配合 onChange 维护 activeKey 值
    activeKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    // 非受控属性，默认激活的 tab 面板的 key
    defaultActiveKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    // 是否显示切换动画
    animated: PropTypes.bool,
    // 是否显示tabBar
    showTabBar: PropTypes.bool,
    // 是否显示底部选中线
    showUnderline: PropTypes.bool,
    // tab 位置 top/bottom
    tabBarPosition: PropTypes.oneOf(['top', 'bottom']),
    // 是否可以滑动 tab 内容进行切换
    swipeable: PropTypes.bool,
    // 是否使用预加载
    usePreload: PropTypes.bool,
    // 单边预加载的数量
    singleSidePreloadCount: PropTypes.number,
    // 切换面板（手动点击标签或是滑动 tab 内容切换）的回调
    onChange: PropTypes.func,
    // 点击 tab 标签的回调
    onTabClick: PropTypes.func,
    // tab 切换动画结束后执行的回调
    onAnimationEnd: PropTypes.func,
  }

  // 简单样式
  static simpleStyleProps = {
    textColor: { name: 'text', attr: 'color' },
    activeTextColor: { name: 'activeText', attr: 'color' },
    underlineColor: { name: 'bar', attr: 'borderColor' },
    activeUnderlineColor: { name: 'activeUnderline', attr: 'backgroundColor' },
    activeBgColor: { name: 'activeItem', attr: 'backgroundColor' },
  }

  static autoStyleSheet = false;

  constructor(props) {
    super(props);

    const width = props.containerWidth || screenWidth;
    const { activeKey, defaultActiveKey, children } = this.props;
    // 默认激活的 tab
    let realActiveKey = activeKey === undefined ? defaultActiveKey : activeKey;
    this._updateTabBarItems(children);
    if (!realActiveKey && this._tabBarItems.length) {
      realActiveKey = this._tabBarItems[0]._key;
    }

    this.state = {
      containerWidth: width,
      curPageIdx: this._getIndex(realActiveKey),
    };

    this._loadedScenes = [realActiveKey];
  }


  /**
   * lifecylce
   *
   * @memberof Tabs
   */
  componentDidMount() {
    setTimeout(() => {
      this._scrollToRightPlace(this.state.curPageIdx, false);
    }, 0);
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);

    const { activeKey, children } = nextProps;
    this._updateTabBarItems(children);
    // 受控属性，由父元素告知 activeKey 来进行更新
    if (activeKey !== undefined && activeKey !== this.props.activeKey) {
      const idx = this._getIndex(activeKey);
      this._setCurrentPage(idx);
    }
  }

  /**
   * 更新TabBarItems
   *
   * @memberof Tabs
   */
  _updateTabBarItems = (children) => {
    const tabBarItems = [];
    React.Children.forEach(children, (child, idx) => {
      tabBarItems.push({
        _key: child.key,
        index: idx,
        title: child.props.title,
      });
    });
    this._tabBarItems = tabBarItems;
  }

  /**
   * 根据index获取item
   *
   * @param {any} index
   * @returns
   * @memberof Tabs
   */
  _getItem(index) {
    if (this._tabBarItems) {
      return this._tabBarItems[index];
    }
    return null;
  }

  /**
   * 根据itemKey获取index
   *
   * @param {any} key
   * @returns
   * @memberof Tabs
   */
  _getIndex(key) {
    const tabBarItems = this._tabBarItems;
    let index = 0;
    for (const item of tabBarItems) {
      if (item._key === key) {
        break;
      } else {
        index++;
      }
    }
    return index;
  }

  /**
   * 设置当前页
   *
   * @param {any} idx
   * @memberof Tabs
   */
  _setCurrentPage(idx) {
    this.setState({
      curPageIdx: idx,
    }, () => {
      this._scrollToRightPlace(idx);
    });
  }

  /**
   * TabBar点击回调
   *
   * @memberof Tabs
   */
  _onTabClick = (key, title, index) => {
    const { activeKey, onChange, onTabClick } = this.props;
    const { curPageIdx } = this.state;

    // onTabClick 回调
    if (onTabClick) {
      onTabClick(key, title);
    }

    if (curPageIdx !== index) {
      // 使用的是非受控属性 defaultActiveKey，更新组件维护的值
      if (activeKey === undefined) {
        this._setCurrentPage(index);
      }
      // onChange 回调
      onChange(key, title);
    }
  }


  /**
   * TabBar滚动结束回调
   *
   * @memberof Tabs
   */
  _onTabBarScrollEnd = (offsetX) => {
    this._tabBarOffsetX = offsetX;
  }

  _scrollToRightPlace = (nextPageIdx, animated = this.props.animated) => {
    const { containerWidth } = this.state;
    const offset = nextPageIdx * containerWidth;
    if (this._scrollView) {
      this._scrollView.scrollTo({ x: offset, y: 0, animated });
    }
  }

  _updateSceneKeys(nextPageIdx) {
    const newKeys = [];
    const showedSceneKeys = this._showedSceneKeys;

    this._tabs.forEach((t) => {
      if (showedSceneKeys.indexOf(t.index) >= 0 || this._shouldRenderSceneKey(t.index, nextPageIdx)) {
        newKeys.push(t.index);
      }
    });

    this._showedSceneKeys = newKeys;
  }

  /**
   * 预加载管理
   *
   * @param {any} key
   * @returns
   * @memberof Tabs
   */
  _shouldLoadPage(key) {
    const { singleSidePreloadCount, usePreload } = this.props;
    if (usePreload) {
      const { curPageIdx } = this.state;
      const idx = this._getIndex(key);
      let shouldLoad = (idx <= (curPageIdx + singleSidePreloadCount) &&
        idx > (curPageIdx - singleSidePreloadCount));
      if (!shouldLoad) {
        shouldLoad = this._loadedScenes.indexOf(key) >= 0;
      }
      return shouldLoad;
    } else {
      return true;
    }
  }

  _shouldUpdatePage(idx) {
    const { singleSidePreloadCount, usePreload } = this.props;
    if (usePreload) {
      const { curPageIdx } = this.state;
      return (idx <= (curPageIdx + singleSidePreloadCount) &&
        idx > (curPageIdx - singleSidePreloadCount));
    } else {
      return true;
    }
  }


  /**
   * ScrollView回调
   *
   * @memberof Tabs
   */
  _onMomentumScrollBeginAndEnd = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const { containerWidth, curPageIdx } = this.state;
    const { activeKey, onChange } = this.props;
    const index = Math.round(offsetX / containerWidth);

    if (curPageIdx !== index) {
      // 使用的是非受控属性 defaultActiveKey，更新组件维护的值
      if (activeKey === undefined) {
        this._setCurrentPage(index);
      }

      const { key, title } = this._getItem(index);
      onChange(key, title);
    }
  }

  /**
   * TabBar切换动画结束回调
   *
   * @memberof Tabs
   */
  _onAnimationEnd = (activeIdx) => {
    const { _key, title } = this._getItem(activeIdx);
    this.props.onAnimationEnd(_key, title);
  }


  /**
   * 渲染区
   *
   * @memberof Tabs
   */
  _handleLayout = (e) => {
    const { width } = e.nativeEvent.layout;
    const { curPageIdx, containerWidth } = this.state;

    if (Math.round(width) !== Math.round(containerWidth)) {
      this.setState({ containerWidth: width });
      setTimeout(() => {
        this._scrollToRightPlace(curPageIdx, false);
      }, 0);
    }
  }

  _renderTabBar = () => {
    const { showTabBar, tabBarPosition, showUnderline } = this.props;
    if (!showTabBar) return null;

    const { style } = this;
    const { curPageIdx, containerWidth } = this.state;

    const topPostion = tabBarPosition === 'top';
    const barBaseStyle = topPostion ? style.barTop : style.barBottom;
    const linePosition = topPostion ? { bottom: -1 } : { top: -1 };
    const activeUnderlineStyle = [style.activeUnderline, linePosition];

    const tabBarProps = {
      items: this._tabBarItems,
      activeIdx: curPageIdx,
      showUnderline,
      barWidth: containerWidth,
      itemWidth: style.tabBarItem.width,
    };

    return (
      <TabBar
        ref={(t) => { this._tabBar = t; }}
        style={[barBaseStyle, style.tabBar]}
        itemStyle={style.tabBarItem}
        activeItemStyle={style.activeItem}
        textStyle={style.text}
        activeTextStyle={style.activeText}
        activeUnderlineStyle={activeUnderlineStyle}
        {...tabBarProps}
        onTabClick={(key, title, index) => this._onTabClick(key, title, index)}
        onScrollEnd={offset => this._onTabBarScrollEnd(offset)}
        onAnimationEnd={activeIdx => this._onAnimationEnd(activeIdx)}
      />
    );
  }

  _renderScenes() {
    const { children } = this.props;
    const { containerWidth } = this.state;

    return children.map((child, idx) => {
      const key = `scene${idx}`;
      let realChild = child;
      if (!this._shouldLoadPage) {
        realChild = <View key={key} />;
      }

      return (
        <SceneComponent
          key={key}
          style={{ width: containerWidth }}
          shouldUpdated={this._shouldUpdatePage(idx)}
        >
          {realChild}
        </SceneComponent>
      );
    });
  }

  _renderContent() {
    const { swipeable } = this.props;
    return (
      <ScrollView
        ref={(s) => { this._scrollView = s; }}
        horizontal
        pagingEnabled
        directionalLockEnabled
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        alwaysBounceVertical={false}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        scrollEnabled={swipeable}
        scrollsToTop={false}
        onMomentumScrollBegin={this._onMomentumScrollBeginAndEnd}
        onMomentumScrollEnd={this._onMomentumScrollBeginAndEnd}
      >
        {this._renderScenes()}
      </ScrollView>
    );
  }

  render() {
    const { tabBarPosition } = this.props;
    return (
      <View onLayout={this._handleLayout} style={[{ flex: 1 }, this.style.container]}>
        {tabBarPosition === 'top' && this._renderTabBar()}
        {this._renderContent()}
        {tabBarPosition === 'bottom' && this._renderTabBar()}
      </View>
    );
  }
}

Tabs.TabPane = TabPane;

Tabs.baseStyle = {
  // tab bar
  tabBar: {
    height: 42,
    flexDirection: 'row',
    borderColor: '#ddd',
  },
  barTop: {
    borderTopWidth: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  barBottom: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
  },
  // 单个TabBarItem
  tabBarItem: {
    flex: 1,
    paddingBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // TabBarItem内标题
  text: {
    fontSize: 15,
    color: '#333',
  },
  // 激活态TabBarItem内标题
  activeText: {
    color: '#108ee9',
  },
  // 激活态线条
  activeUnderline: {
    height: 2,
    backgroundColor: '#108ee9',
  },
  // 激活态TabBarItem背景色
  activeItem: {
    // backgroundColor: '#108ee9',
  },
};
