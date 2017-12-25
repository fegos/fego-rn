/*
 * @author @by zramals
 */
import React, { Component } from 'react';
import { View, Image, Platform } from 'react-native';

//图片数组  
var pulling_imgs = new Array();
var loading_imgs = new Array();
//最大图片张数  
// const imagePullLength = 21;
// const imageLoadLength = 24;

export default {

	pullImageView: function (styleType) {
		//初始化加载所有图片
		if (pulling_imgs.length > 0) {
			return pulling_imgs;
		} else {
			/**
			 * 由于RN不支持动态加载图片，故对每幅图都要静态加载
			 */
			if (styleType == 'dark') {
				pulling_imgs.push(require('./refresh_source/dark/pulling/pulling_1.png'));
				pulling_imgs.push(require('./refresh_source/dark/pulling/pulling_2.png'));
				pulling_imgs.push(require('./refresh_source/dark/pulling/pulling_3.png'));
				pulling_imgs.push(require('./refresh_source/dark/pulling/pulling_4.png'));
				pulling_imgs.push(require('./refresh_source/dark/pulling/pulling_5.png'));
				pulling_imgs.push(require('./refresh_source/dark/pulling/pulling_6.png'));
				pulling_imgs.push(require('./refresh_source/dark/pulling/pulling_7.png'));
				pulling_imgs.push(require('./refresh_source/dark/pulling/pulling_8.png'));
				pulling_imgs.push(require('./refresh_source/dark/pulling/pulling_9.png'));
				pulling_imgs.push(require('./refresh_source/dark/pulling/pulling_10.png'));
				pulling_imgs.push(require('./refresh_source/dark/pulling/pulling_11.png'));
				pulling_imgs.push(require('./refresh_source/dark/pulling/pulling_12.png'));
				pulling_imgs.push(require('./refresh_source/dark/pulling/pulling_13.png'));
				pulling_imgs.push(require('./refresh_source/dark/pulling/pulling_14.png'));
				pulling_imgs.push(require('./refresh_source/dark/pulling/pulling_15.png'));
				pulling_imgs.push(require('./refresh_source/dark/pulling/pulling_16.png'));
				pulling_imgs.push(require('./refresh_source/dark/pulling/pulling_17.png'));
				pulling_imgs.push(require('./refresh_source/dark/pulling/pulling_18.png'));
				pulling_imgs.push(require('./refresh_source/dark/pulling/pulling_19.png'));
				pulling_imgs.push(require('./refresh_source/dark/pulling/pulling_20.png'));
				pulling_imgs.push(require('./refresh_source/dark/pulling/pulling_21.png'));
			} else {
				pulling_imgs.push(require('./refresh_source/light/pulling/pulling_1.png'));
				pulling_imgs.push(require('./refresh_source/light/pulling/pulling_2.png'));
				pulling_imgs.push(require('./refresh_source/light/pulling/pulling_3.png'));
				pulling_imgs.push(require('./refresh_source/light/pulling/pulling_4.png'));
				pulling_imgs.push(require('./refresh_source/light/pulling/pulling_5.png'));
				pulling_imgs.push(require('./refresh_source/light/pulling/pulling_6.png'));
				pulling_imgs.push(require('./refresh_source/light/pulling/pulling_7.png'));
				pulling_imgs.push(require('./refresh_source/light/pulling/pulling_8.png'));
				pulling_imgs.push(require('./refresh_source/light/pulling/pulling_9.png'));
				pulling_imgs.push(require('./refresh_source/light/pulling/pulling_10.png'));
				pulling_imgs.push(require('./refresh_source/light/pulling/pulling_11.png'));
				pulling_imgs.push(require('./refresh_source/light/pulling/pulling_12.png'));
				pulling_imgs.push(require('./refresh_source/light/pulling/pulling_13.png'));
				pulling_imgs.push(require('./refresh_source/light/pulling/pulling_14.png'));
				pulling_imgs.push(require('./refresh_source/light/pulling/pulling_15.png'));
				pulling_imgs.push(require('./refresh_source/light/pulling/pulling_16.png'));
				pulling_imgs.push(require('./refresh_source/light/pulling/pulling_17.png'));
				pulling_imgs.push(require('./refresh_source/light/pulling/pulling_18.png'));
				pulling_imgs.push(require('./refresh_source/light/pulling/pulling_19.png'));
				pulling_imgs.push(require('./refresh_source/light/pulling/pulling_20.png'));
				pulling_imgs.push(require('./refresh_source/light/pulling/pulling_21.png'));
			}
			return pulling_imgs;
		}
	},
	loadMoreView: function (styleType) {
		//初始化加载所有图片
		//初始化加载所有图片
		if (loading_imgs.length > 0) {
			return loading_imgs;
		} else {
			/**
			 * 由于RN不支持动态加载图片，故对每幅图都要静态加载
			 */
			if (styleType == 'dark') {
				loading_imgs.push(require('./refresh_source/dark/loading/loading_1.png'));
				loading_imgs.push(require('./refresh_source/dark/loading/loading_2.png'));
				loading_imgs.push(require('./refresh_source/dark/loading/loading_3.png'));
				loading_imgs.push(require('./refresh_source/dark/loading/loading_4.png'));
				loading_imgs.push(require('./refresh_source/dark/loading/loading_5.png'));
				loading_imgs.push(require('./refresh_source/dark/loading/loading_6.png'));
				loading_imgs.push(require('./refresh_source/dark/loading/loading_7.png'));
				loading_imgs.push(require('./refresh_source/dark/loading/loading_8.png'));
				loading_imgs.push(require('./refresh_source/dark/loading/loading_9.png'));
				loading_imgs.push(require('./refresh_source/dark/loading/loading_10.png'));
				loading_imgs.push(require('./refresh_source/dark/loading/loading_11.png'));
				loading_imgs.push(require('./refresh_source/dark/loading/loading_12.png'));
				loading_imgs.push(require('./refresh_source/dark/loading/loading_13.png'));
				loading_imgs.push(require('./refresh_source/dark/loading/loading_14.png'));
				loading_imgs.push(require('./refresh_source/dark/loading/loading_15.png'));
				loading_imgs.push(require('./refresh_source/dark/loading/loading_16.png'));
				loading_imgs.push(require('./refresh_source/dark/loading/loading_17.png'));
				loading_imgs.push(require('./refresh_source/dark/loading/loading_18.png'));
				loading_imgs.push(require('./refresh_source/dark/loading/loading_19.png'));
				loading_imgs.push(require('./refresh_source/dark/loading/loading_20.png'));
				loading_imgs.push(require('./refresh_source/dark/loading/loading_21.png'));
				loading_imgs.push(require('./refresh_source/dark/loading/loading_22.png'));
				loading_imgs.push(require('./refresh_source/dark/loading/loading_23.png'));
				loading_imgs.push(require('./refresh_source/dark/loading/loading_24.png'));
			} else {
				loading_imgs.push(require('./refresh_source/light/loading/loading_1.png'));
				loading_imgs.push(require('./refresh_source/light/loading/loading_2.png'));
				loading_imgs.push(require('./refresh_source/light/loading/loading_3.png'));
				loading_imgs.push(require('./refresh_source/light/loading/loading_4.png'));
				loading_imgs.push(require('./refresh_source/light/loading/loading_5.png'));
				loading_imgs.push(require('./refresh_source/light/loading/loading_6.png'));
				loading_imgs.push(require('./refresh_source/light/loading/loading_7.png'));
				loading_imgs.push(require('./refresh_source/light/loading/loading_8.png'));
				loading_imgs.push(require('./refresh_source/light/loading/loading_9.png'));
				loading_imgs.push(require('./refresh_source/light/loading/loading_10.png'));
				loading_imgs.push(require('./refresh_source/light/loading/loading_11.png'));
				loading_imgs.push(require('./refresh_source/light/loading/loading_12.png'));
				loading_imgs.push(require('./refresh_source/light/loading/loading_13.png'));
				loading_imgs.push(require('./refresh_source/light/loading/loading_14.png'));
				loading_imgs.push(require('./refresh_source/light/loading/loading_15.png'));
				loading_imgs.push(require('./refresh_source/light/loading/loading_16.png'));
				loading_imgs.push(require('./refresh_source/light/loading/loading_17.png'));
				loading_imgs.push(require('./refresh_source/light/loading/loading_18.png'));
				loading_imgs.push(require('./refresh_source/light/loading/loading_19.png'));
				loading_imgs.push(require('./refresh_source/light/loading/loading_20.png'));
				loading_imgs.push(require('./refresh_source/light/loading/loading_21.png'));
				loading_imgs.push(require('./refresh_source/light/loading/loading_22.png'));
				loading_imgs.push(require('./refresh_source/light/loading/loading_23.png'));
				loading_imgs.push(require('./refresh_source/light/loading/loading_24.png'));
			}
			return loading_imgs;
		}
	},

	// pullImageView: function (styleType) {
	// 	//初始化加载所有图片
	// 	if (pulling_imgs.length > 0) {
	// 		return pulling_imgs;
	// 	} else {
	// 		for (let i = 1; i <= imagePullLength; i++) {
	// 			let pullingUri = ''
	// 			if (Platform.OS == 'ios') {
	// 				pullingUri = 'pulling_' + i + '.png';
	// 			} else {
	// 				if (i < 10) {
	// 					pullingUri = 'prepare_loading000' + i;
	// 				} else {
	// 					pullingUri = 'prepare_loading00' + i;
	// 				}
	// 			}
	// 			pulling_imgs.push(pullingUri);
	// 		}
	// 		return pulling_imgs;
	// 	}

	// },

	// loadMoreView: function (styleType) {
	// 	//初始化加载所有图片
	// 	if (loading_imgs.length > 0) {
	// 		return loading_imgs;
	// 	} else {
	// 		for (let i = 1; i <= imageLoadLength; i++) {
	// 			let loadingUri = '';
	// 			if (Platform.OS == 'ios') {
	// 				loadingUri = 'loading_' + i + '.png';
	// 			} else {
	// 				if (i < 10) {
	// 					loadingUri = 'loading000' + i;
	// 				} else {
	// 					loadingUri = 'loading00' + i;
	// 				}
	// 			}
	// 			loading_imgs.push(loadingUri);
	// 		}
	// 		return loading_imgs;
	// 	}
	// },

}
