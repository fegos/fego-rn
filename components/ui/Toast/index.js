/**
 * Toast组件
 * @author esky 付鑫 2017/03/31
 */
import React, { Component } from 'react'
import AppContainer from '../AppContainer'
import ToastContainer from './ToastContainer'
let topViewKey = 'toast'
let hide = function(){
	AppContainer.remove(topViewKey);
}
let notice = (content, opt) => {
	hide();
	function animationEnd() {
		hide();
	}
	AppContainer.add( 
		<ToastContainer 
			{...opt}
			key={topViewKey} 
			content={content} 
			onAnimationEnd={animationEnd} />
	)
}

export default {
	ToastContainer: ToastContainer,
	/**
	 * 一般的消息提醒，无图标
	 */
	info(content, duration, onClose, mask, opt) {
		return notice(content, { type: 'info', duration, onClose, mask, ...opt });
	},
	/**
	 * 成功提示
	 */
	success(content, duration, onClose, mask, opt) {
		return notice(content, { type: 'success', duration, onClose, mask, ...opt });
	},
	/**
	 * 失败错误等提示
	 */
	fail(content, duration, onClose, mask, opt) {
		return notice(content, { type: 'fail', duration, onClose, mask, ...opt });
	},
	/**
	 * 离线，网络异常
	 */
	offline(content, duration, onClose, mask, opt) {
		return notice(content, { type: 'offline', duration, onClose, mask, ...opt });
	},
	// 加载默认文案
	loadingText: '加载中...',
	/**
	 * 开启加载中，不定时关闭
	 * Toast.loading()
	 * 需要的时候如下关闭
	 * Toast.hide()
	 */
	loading(content = this.loadingText, duration = 0, onClose, mask, opt) {
		return notice(content, { type: 'loading', duration, onClose, mask, ...opt });
	},
	// 加载默认文案
	waitingText: '处理中...',
	/**
	 * 等待中，不定时关闭，且遮罩禁止操作
	 * Toast.waiting('处理中...')
	 * 需要的时候如下关闭
	 * Toast.hide()
	 */
	waiting(content = this.waitingText, duration = 0, onClose, mask = true, opt) {
		return notice(content, { type: 'loading', duration, onClose, mask, ...opt });
	},
	/**
	 * type 如success等已定义，若未定义过则当字体的name使用
	 */
	show(content, opt = {}) {
		return notice(content, opt);
	},
	hide: hide
}