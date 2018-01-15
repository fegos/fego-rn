import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { Style } from '../../../common'
import { ActivityIndicator, List } from 'fego-rn'
const ListItem = List.ListItem;

export default class Page extends Component {
	static navigationOptions = {
		title: '活动指示器'
	}
	constructor(props) {
		super(props)
		this.state = {
			toast1Visible: false,
			toast2Visible: false
		}
	}
	render() {
		return (
			<ScrollView style={Style.container}>
				<Text style={Style.title}>ActivityIndicator</Text>
				<List>
					<ListItem>
						<Text>默认：</Text>
						<ActivityIndicator />
					</ListItem>
					<ListItem>
						<Text>size设为large：</Text>
						<ActivityIndicator size="large" />
					</ListItem>
					<ListItem>
						<Text>text设为正在加载：</Text>
						<ActivityIndicator text="正在加载" />
					</ListItem>
					<ListItem>
						<Text>变更颜色：</Text>
						<ActivityIndicator color="#33F" textStyle={{ color: '#33F' }} text="正在加载" />
					</ListItem>
					<ListItem>
						<Text>visible为false</Text>
						<ActivityIndicator visible={this.state.toast1Visible} hasToast={true} size="large" color="#FFF" />
					</ListItem>
				</List>
			</ScrollView>
		);
	}
}