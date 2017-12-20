import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { Style } from '../../../common'
import { Badge } from 'fego-rn'

export default class Page extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style={{flex:1, paddingHorizontal: 10}}>
				<View>
					<Text>badge</Text>
					<Badge />
				</View>
			</View>
		)
	}
}