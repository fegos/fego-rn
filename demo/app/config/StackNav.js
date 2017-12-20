import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import TabNav from './TabNav';
import UIRoute from '../src/ui/Route';
import UtilRoute from '../src/util/Route';

export default StackNavigator({
	home: {
		screen: TabNav
	},
	...UIRoute,
	...UtilRoute
}, {
	navigationOptions: () => ({
		headerStyle: {
			backgroundColor: '#231f1f',
		},
		headerTitleStyle: {
			fontWeight: 'bold',
			color: '#fff',
			backgroundColor: '#231f1f',
		},
	}),
});