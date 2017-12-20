import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import TabNavOptios from './TabNavOptions';
import UIScreen from '../src/ui';
import UtilScreen from '../src/util';

export default TabNavigator({
	ui: {
		screen: UIScreen,
		navigationOptions: {
			title: 'UI 组件',
			tabBarLabel: 'ui'
		}
	},
	util: {
		screen: UtilScreen,
		navigationOptions: {
			title: 'Util 组件',
			tabBarLabel: 'util'
		}
	},
}, TabNavOptios)