import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { Style } from '../../../common'
import { ActivityIndicator, Button } from 'fego-rn'
export default class Page extends Component {
	static navigationOptions = {
		title: '活动指示器'
	}
	constructor(props){
		super(props)
		this.state = {
			toast1Visible: false,
			toast2Visible: false
		}
	}
	render() {
		return (
			<ScrollView style={Style.container}>
				<ActivityIndicator />
				<ActivityIndicator color="#33F" textStyle={{color: '#33F'}} text="正在加载" />
				<ActivityIndicator size="large" />
				<ActivityIndicator text="正在加载" />
				<ActivityIndicator visible={this.state.toast1Visible} hasToast={true} size="large" color="#FFF"/>
			</ScrollView>
		);
	}
}