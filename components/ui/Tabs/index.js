/**
 * 标签页组件
 * @author esky 翟宇佳
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import TabBar from './TabBar';
import TabPane from './TabPane';
import UIComponent from '../../common/UIComponent';
import SceneComponent from './SceneComponent';

class Tabs extends UIComponent {
  static defaultProps = {
    renderTabBar: true,
    tabBarPosition: 'top',
    onChange: () => { },
    onTabClick: () => { },
    onAnimationEnd: () => { },
    animated: true,
    swipeable: true,
    compose: true,
    preRenderNum: 0,
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
    // 是否渲染 tabBar
    renderTabBar: PropTypes.bool,
    // tab 位置 top/bottom
    tabBarPosition: PropTypes.oneOf(['top', 'bottom']),
    // 切换面板（手动点击标签或是滑动 tab 内容切换）的回调
    onChange: PropTypes.func,
    // 点击 tab 标签的回调
    onTabClick: PropTypes.func,
    // tab 切换动画结束后执行的回调
    onAnimationEnd: PropTypes.func,
    // 是否显示切换动画
    animated: PropTypes.bool,
    // 是否可以滑动 tab 内容进行切换
    swipeable: PropTypes.bool,
    // 是否对内容进行压缩
    compose: PropTypes.bool,
    // 预加载的数量
    preRenderNum: PropTypes.number,
  }

  // 简单样式
  static simpleStyleProps = {
    textColor: { name: 'text', attr: 'color' },
    activeTextColor: { name: 'activeText', attr: 'color' },
    underlineColor: { name: 'bar', attr: 'borderColor' },
    activeUnderlineColor: { name: 'activeUnderline', attr: 'backgroundColor' },
    activeBgColor: { name: 'activeBg', attr: 'backgroundColor' },
  }

  static autoStyleSheet = false

  constructor(props) {
    super(props);

    const width = props.containerWidth || Dimensions.get('window').width;
    // 默认激活的 tab
    const activeKey = props.activeKey === undefined ? props.defaultActiveKey : props.activeKey;
    // 激活 tab 的 index
    let activeIdx = 0;
    // children
    const { children } = props;
    // 存放处理后的 tabs, 用于生成 tabBar
    const tabs = [];

    // 预处理
    React.Children.forEach(children, (child, idx) => {
      // 找到初始显示的 tab
      if (activeKey === child.key) {
        activeIdx = idx;
      }

      tabs.push({
        _key: child.key,
        index: idx,
        label: child.props.tab,
      });
    });

    this.state = {
      containerWidth: width,
      curPageIdx: activeIdx,
      // _scrollX: new Animated.Value(activeIdx * width),
      // _aniScrollIdx: new Animated.Value(activeIdx)
    };

    this._showedSceneKeys = [activeIdx];
    this._tabs = tabs;
    this._tabBarOffsetX = 0;
  }

  componentDidMount() {
    this.mountGotoPageTimer = setTimeout(() => {
      this._scrollContent(this.state.curPageIdx, false);
      if (this.mountGotoPageTimer) clearTimeout(this.mountGotoPageTimer);
    }, 0);

    // InteractionManager.runAfterInteractions(() => {
    //  this._scrollContent(this.state.curPageIdx, false);
    // })
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);

    const { activeKey } = nextProps;
    // 受控属性，由父元素告知 activeKey 来进行更新
    if (activeKey !== undefined && activeKey !== this.props.activeKey) {
      const idx = this._getIndex(activeKey);
      this._doAnimated(idx);
    }
  }

  componentWillUnmount() {
    if (this.handleLayoutTimer) clearTimeout(this.handleLayoutTimer);
    if (this.mountGotoPageTimer) clearTimeout(this.mountGotoPageTimer);
    // if(this.listener) this.state._scrollX.removeListener(this.listener)
  }

  _getTab(index) {
    let key = '';
    let newLabel = '';
    // 找到当前 index 对应的 tab
    this._tabs.forEach((t) => {
      if (t.index === index) {
        key = t._key;
        newLabel = t.label;
      }
    });

    return {
      key,
      label: newLabel,
    };
  }

  _getIndex(activeKey) {
    let index;
    // 找到 activeKey 对应的 tab index
    this._tabs.forEach((t, idx) => {
      if (t._key === activeKey) {
        index = idx;
      }
    });

    return index;
  }

  _doAnimated(idx) {
    this.setState({
      curPageIdx: idx,
    }, () => {
      this._scrollContent(idx);
    });
  }

  _onTabBarScrollEnd = (offsetX) => {
    this._tabBarOffsetX = offsetX;
  }

  _onTabClick = (key, label, index) => {
    const { activeKey, onChange, onTabClick } = this.props;
    const { curPageIdx } = this.state;

    // onTabClick 回调
    onTabClick(key, label);

    if (curPageIdx !== index) {
      // 使用的是非受控属性 defaultActiveKey，更新组件维护的值
      if (activeKey === undefined) {
        this._doAnimated(index);
      }
      // onChange 回调
      onChange(key, label);
    }
  }

  _scrollTabBar(nextPageIdx, animated) {
    const { containerWidth } = this.state;
    const tbw = this.style.bar.width; // 若是滚动的 tab bar 则需更新 tab bar 位置
    const tabBarWidth = tbw || containerWidth;
    const tabWidth = this.style.tab.width;

    if (tabBarWidth > containerWidth) {
      const start = tabWidth * nextPageIdx;
      const end = tabWidth * (nextPageIdx + 1);

      if (start - this._tabBarOffsetX < 0) {
        this._tabBar._scrollView.scrollTo({ x: start, y: 0, animated });
        this._tabBarOffsetX = start;
      }
      if (end - this._tabBarOffsetX > containerWidth) {
        const offsetx = end - containerWidth;
        this._tabBar._scrollView.scrollTo({ x: offsetx, y: 0, animated });
        this._tabBarOffsetX = offsetx;
      }
    }
  }

  _scrollContent = (nextPageIdx, animated = this.props.animated) => {
    const { containerWidth } = this.state;
    const offset = nextPageIdx * containerWidth;

    this._updateSceneKeys(nextPageIdx);

    // 使用的是 Animated.ScrollView, 所以多了一层 _component
    // if (this._scrollView && this._scrollView._component && this._scrollView._component.scrollTo) {
    //  this._scrollView._component.scrollTo({ x: offset, y: 0, animated });
    //  this._scrollTabBar(nextPageIdx, animated);
    // }

    if (this._scrollView && this._scrollView.scrollTo) {
      this._scrollView.scrollTo({ x: offset, y: 0, animated });
      this._scrollTabBar(nextPageIdx, animated);
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

  _shouldRenderSceneKey(idx, curPageIdx) {
    const numOfSibling = this.props.preRenderNum;

    return (idx < (curPageIdx + numOfSibling + 1) && idx > (curPageIdx - numOfSibling - 1));
  }

  _onMomentumScrollBeginAndEnd = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const { containerWidth, curPageIdx } = this.state;
    const { activeKey, onChange } = this.props;
    const index = Math.round(offsetX / containerWidth);

    if (curPageIdx !== index) {
      // 使用的是非受控属性 defaultActiveKey，更新组件维护的值
      if (activeKey === undefined) {
        this._doAnimated(index);
      }

      const { key, label } = this._getTab(index);
      onChange(key, label);
    }
  }

  _onAnimationEnd = (activeIdx) => {
    const { key, label } = this._getTab(activeIdx);
    this.props.onAnimationEnd(key, label);
  }

  _renderTabBar = () => {
    if (this.props.renderTabBar === false) return null;

    const { style } = this;
    const { containerWidth, curPageIdx } = this.state;
    const { tabBarPosition } = this.props;
    const tabBarTop = tabBarPosition === 'top';
    const barBaseStyle = tabBarTop ? style.barTop : style.barBottom;
    const linePosition = tabBarTop ? {} : { top: -1 };
    const activeUnderlineStyle = [style.activeUnderline, {
      bottom: tabBarTop ? -1 : null,
    }, linePosition];

    const tabBarProps = {
      // aniScrollIdx: this.state._aniScrollIdx,
      tabs: this._tabs,
      activeIdx: curPageIdx,
      tabWidth: style.tab.width, // 单个 tab 宽
      containerWidth: style.bar.width, // tabBar 容器宽
      viewWidth: containerWidth, // 内容区宽
      onTabClick: this._onTabClick,
      onScrollEnd: this._onTabBarScrollEnd,
      onAnimationEnd: this._onAnimationEnd,
    };

    return (
      <TabBar
        ref={(t) => { this._tabBar = t; }}
        style={[style.bar, barBaseStyle]}
        textStyle={style.text}
        activeTextStyle={style.activeText}
        tabStyle={style.tab}
        activeUnderlineStyle={activeUnderlineStyle}
        {...tabBarProps}
      />
    );
  }

  _composeScenes() {
    const { containerWidth, curPageIdx } = this.state;
    const { compose } = this.props;
    const showedSceneKeys = this._showedSceneKeys;

    return this.props.children.map((child, idx) => {
      let realChild = child;
      if (compose && !((showedSceneKeys.indexOf(idx) >= 0) || (idx === curPageIdx))) {
        realChild = <View tab={child.props.tab} />;
      }
      return (
        <SceneComponent
          key={idx}
          shouldUpdated={this._shouldRenderSceneKey(idx, curPageIdx)}
          style={{ width: containerWidth }}
        >
          {realChild}
        </SceneComponent>
      );
    });
  }

  _onScroll = () => {
    // this.state._scrollX.setValue(e.nativeEvent.contentOffset.x)
  }

  _renderContent() {
    const { swipeable } = this.props;

    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        horizontal
        pagingEnabled
        automaticallyAdjustContentInsets={false}
        ref={(s) => { this._scrollView = s; }}
        // onScroll={Animated.event(
        // [{
        //  nativeEvent: { contentOffset: { x: this.state._scrollX } }
        // }], {
        //  useNativeDriver: true,
        // })}
        onScroll={this._onScroll}
        onMomentumScrollBegin={this._onMomentumScrollBeginAndEnd}
        onMomentumScrollEnd={this._onMomentumScrollBeginAndEnd}
        scrollEventThrottle={16}
        scrollsToTop={false}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={swipeable}
        directionalLockEnabled
        alwaysBounceVertical={false}
      >
        {this._composeScenes()}
      </ScrollView>
    );
  }

  _handleLayout = (e) => {
    const { width } = e.nativeEvent.layout;
    const { curPageIdx, containerWidth } = this.state;
    // let finalWidth = containerWidth;

    if (Math.round(width) !== Math.round(containerWidth)) {
      // finalWidth = width;

      // this.state._scrollX.setValue(curPageIdx * width);
      // this.state._aniScrollIdx.setValue(curPageIdx);

      this.setState({ containerWidth: width });

      if (this.handleLayoutTimer) clearTimeout(this.handleLayoutTimer);
      this.handleLayoutTimer = setTimeout(() => {
        this._scrollContent(curPageIdx, false);
        if (this.handleLayoutTimer) clearTimeout(this.handleLayoutTimer);
      }, 0);
    }
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

Tabs.baseStyle = {
  // 单个 tab 标签
  tab: {
    flex: 1,
    paddingBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // tab 标签内文字
  text: {
    fontSize: 15,
    color: '#333',
  },
  // 激活态 tab 标签内文字
  activeText: {
    color: '#108ee9',
  },
  // tab bar
  bar: {
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
  // 激活态线条
  activeUnderline: {
    height: 2,
    backgroundColor: '#108ee9',
  },
  activeBg: {
    backgroundColor: '#108ee9',
  },
};

Tabs.TabPane = TabPane;
export default Tabs;
