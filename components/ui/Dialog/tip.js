/**
 * 简易的提示
 * 基于模态实现，同一时刻只能创建一个提示框
 */
import React from 'react';
import AppContainer from '../AppContainer';
import TipAgent from './TipAgent';

const defaultOption = {
  alert: {
    // title: '提示',
    actions: [{ text: '确定', type: 'yes' }],
  },
  confirm: {
    // title: '请确认',
    actions: [{ text: '取消', type: 'no', style: { color: '#858DA0' } }, { text: '确定', type: 'yes' }],
  },
};
const topViewDialogKey = 'modal.Dialog.tip';
let curTip = null;
const onAnimationEnd = (visible) => {
  if (!visible) {
    curTip = null;
    AppContainer.remove(topViewDialogKey);
  }
};

function creatTip(title, content, actions) {
  actions = actions || defaultOption.alert.actions;
  AppContainer.add(<TipAgent
    key={topViewDialogKey}
    ref={(el) => { curTip = el; }}
    title={title}
    content={content}
    actions={actions}
    onAnimationEnd={onAnimationEnd}
  />);
}

/**
 * 基础的提示框（唯一不可叠加）
 * @param {String} title
 * @param {String/Element} content
 * @param {Array} actions
 */
function tip(title, content, actions) {
  if (curTip) {
    curTip.close(() => {
      setTimeout(() => {
        AppContainer.remove(topViewDialogKey);
        setTimeout(() => {
          creatTip(title, content, actions);
        }, 0);
      }, 200);
    });
  } else {
    creatTip(title, content, actions);
  }
}

/**
 * 提醒
 * Dialog.alert('内容')
 * Dialog.alert('内容', callback)
 * Dialog.alert('标题', '内容')
 * Dialog.alert('标题', '内容', callback)
 * @param {String} title
 * @param {String/Element} content
 */
function alert(title, content, callback) {
  const opt = defaultOption.alert;
  const argLen = arguments.length;
  if (argLen === 1) {
    content = title;
    title = null;
  }
  if (argLen === 2) {
    if (typeof content === 'function') {
      callback = content;
      content = title;
      title = null;
    }
  }
  title = title || opt.title;
  if (opt.actions[0]) {
    opt.actions[0].onPress = callback;
  }
  tip(title, content, opt.actions);
}
/**
 * 确认
 * Dialog.confirm('内容')
 * Dialog.confirm('内容', callback)
 * Dialog.confirm('标题', '内容')
 * Dialog.confirm('标题', '内容', callback)
 * @param {String} title
 * @param {String/Element} content
 */
function confirm(title, content, callback) {
  const opt = defaultOption.confirm;
  const argLen = arguments.length;
  if (argLen === 1) {
    content = title;
    title = null;
  }
  if (argLen === 2) {
    if (typeof content === 'function') {
      callback = content;
      content = title;
      title = null;
    }
  }
  title = title || opt.title;
  if (opt.actions[0]) {
    opt.actions[0].onPress = callback;
  }
  if (opt.actions[1]) {
    opt.actions[1].onPress = callback;
  }
  tip(title, content, opt.actions);
}
/**
 * TipAgent容器，可设置基础样式
 */
tip.TipAgent = TipAgent;
/**
 * 设置默认配置
 */
tip.setDefaultOption = function setOptions(option) {
  Object.assign(defaultOption, option);
};
export {
  tip,
  alert,
  confirm,
};
export default tip;
