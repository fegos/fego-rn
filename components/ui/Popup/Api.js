/**
 * Popup API模块
 * @author esky
 */
import React from 'react';
import { Platform, StatusBar } from 'react-native';
import AppContainer from '../AppContainer';
import Popup from './index';

const topViewKey = 'popup';
let popupCount = 0;
let popupCache = [];
/**
 * Popup代理容器
 */
class PopupAgent extends React.Component {
  state = {
    visible: false,
  }
  componentWillUnmount() {
    const { _key } = this.props;
    // 计数减一
    popupCount -= 1;
    // 移除缓存
    popupCache = popupCache.filter(item => item.key !== _key);
    this.isUnmount = true;
  }
  _onClose = (type, hasAni) => {
    // 不可见不执行
    if (!this.state.visible) return;
    const { onClose } = this.props;
    const ret = onClose && onClose(type);
    // 关闭回调返回false，则关闭失效
    if (ret === false) return;
    this._close(hasAni);
  }
  _close = (hasAni = true) => {
    if (!hasAni) {
      this.remove(this.props._key);
      return;
    }
    this.setState({
      visible: false,
    });
  }
  _onAniEnd = (visible) => {
    const { onAniEnd, _key } = this.props;
    onAniEnd && onAniEnd(visible);
    if (!visible) this.remove(_key);
  }
  remove = (key) => {
    setTimeout(() => {
      AppContainer.remove(key);
    });
  }
  render() {
    const {
      children, offsetHeight = Platform.select({
        ios: 0,
        android: StatusBar.currentHeight,
      }), ...rest
    } = this.props;
    return (
      <Popup
        // 默认后续叠加Popup的遮罩透明
        maskOpacity={popupCache.length > 1 ? 0 : 0.7}
        {...rest}
        offsetHeight={offsetHeight}
        visible={this.state.visible}
        onClose={this._onClose}
        onAniEnd={this._onAniEnd}
      >
        {children}
      </Popup>
    );
  }
}
const Api = {
  /**
   * 显示一个Popup，位于顶层View
   * key可以由opt覆盖来指定
   */
  show(el, opt = {}) {
    popupCount += 1;
    const key = opt.key || (topViewKey + popupCount);
    let popupRef;
    AppContainer.add(
      <PopupAgent
        key={key}
        _key={key}
        ref={(popup) => {
          if (!popup) return;
          popupRef = popup;
          popupCache.push({
            key,
            popup,
          });
        }}
        {...opt}
      >
        {el}
      </PopupAgent>,
      () => {
        popupRef.setState({ visible: true });
      },
    );
  },
  /**
   * 隐藏Popup
   * 默认隐藏当前显示的Popup
   */
  hide(key, hasAni) {
    let curPopup;
    // 过滤无用的
    popupCache = popupCache.filter(item => !item.popup.isUnmount);
    if (key) curPopup = popupCache.find(item => item.key === key);
    if (!curPopup) curPopup = popupCache[popupCache.length - 1];
    if (!curPopup) return;
    curPopup.popup._onClose('api', hasAni);
  },
  /**
   * 隐藏所有
   * 此时不再响应onClose，否则请使用hide
   */
  hideAll(hasAni) {
    popupCache.forEach((item) => {
      item.popup && !item.popup.isUnmount && item.popup._close(hasAni);
    });
    popupCache.length = 0;
  },
};
export default Api;
