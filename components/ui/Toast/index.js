/**
 * Toast组件
 * @author esky 付鑫 2017/03/31
 */
import ToastBase from '../ToastBase';

export default {
  /**
   * 一般的消息提醒，无图标
   */
  info(content, duration, opt) {
    return ToastBase.notice(content, {
      type: 'info',
      duration,
      ...opt,
    });
  },
  /**
   * 成功提示
   */
  success(content, duration, opt) {
    return ToastBase.notice(content, {
      type: 'success',
      duration,
      ...opt,
    });
  },
  /**
   * 失败错误等提示
   */
  fail(content, duration, opt) {
    return ToastBase.notice(content, {
      type: 'fail',
      duration,
      ...opt,
    });
  },
  /**
   * 离线，网络异常
   */
  offline(content, duration, onClose, mask, opt) {
    return ToastBase.notice(content, {
      type: 'offline',
      duration,
      ...opt,
    });
  },

  /**
   * type 如success等已定义，若未定义过则当字体的name使用
   */
  show(content, opt = {}) {
    return ToastBase.notice(content, opt);
  },
  hide: ToastBase.hide,
};
