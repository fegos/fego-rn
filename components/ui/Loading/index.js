import React, { Component } from 'react'
import AppContainer from '../AppContainer'
import ToastBase from '../ToastBase'
export default {
// 加载默认文案
	loadingText: '加载中...',
	/**
	 * 开启加载中，不定时关闭，不阻止用户操作
	 * Loading.start()
	 * 需要的时候如下关闭
	 * Loading.stop()
	 */
	start(content = this.loadingText, duration = 0, opt) {
		return ToastBase.notice(content, { type: 'loading', duration, ...opt });
	},
	// 加载默认文案
	waitingText: '处理中...',
	/**
	 * 等待中，不定时关闭，且遮罩禁止操作
	 * Loading.startModal('处理中...')
	 * 需要的时候如下关闭
	 * Loading.stop()
	 */
	startModal(content = this.waitingText,mask=true, duration = 0, opt) {
		return ToastBase.notice(content, { type: 'loading', duration, mask,modal: true, ...opt });
	},
	stop: ToastBase.hide
}