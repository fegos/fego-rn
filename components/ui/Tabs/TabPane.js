import React, { Component } from 'react'
import { View, Text } from 'react-native'
export default class TabPane extends Component {
	render() {
		const { children, style={ flex: 1 },  ...rets } = this.props;
		return (
			<View style={style} {...rets}>
				{children}
			</View>
		);
	}
}