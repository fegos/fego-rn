import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { Style } from '../../../common'
import { Icon } from 'fego-rn'

class Example extends Component {
	static navigationOptions = {
		title: '图标Icon',
	}
	render() {
		return (
			<ScrollView style={[Style.container, {paddingLeft: 20, paddingTop: 20}]}>
				<Icon name='user' />
				<Icon name='glass' color="#398812" />
				<Icon name='music' style={{ color: "#EE0000" }} />
				<Icon name='heart' color="#000" style={{ color: "#E00", fontSize: 20 }}  />
				<Icon name='search' style = {{
					color: '#993311',
					fontSize: 30,
					padding: 10
				}} />
				<Icon name='check' size={40} family='entypo'>
					<Text style={{ fontSize: 38, paddingLeft: 10 }}>checkbox</Text>
				</Icon>
				<Icon name='angle-right' size={40} />
			</ScrollView>
		)
	}
}

export default Example
