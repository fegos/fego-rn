import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { Style } from '../../../common'
import { List, Radio } from 'fego-rn'
import { fail } from 'assert';

const ListItem = List.ListItem;

export default class Page extends Component {
	static navigationOptions = {
		title: '表单类组件',
	}
	state = {
		checked: false,
	}
	render() {
		return (
			<ScrollView style={Style.container}>
				<Text style={Style.title}>Radio</Text>
				<List>
					<ListItem>
						<Radio defaultChecked={true}>非受控组件：使用defaultChecked</Radio>
					</ListItem>
					<ListItem>
						<Radio checked={this.state.checked} onChange={(checked) => {
							this.setState({
								checked: checked
							})
						}}>受控组件：使用checked</Radio>
					</ListItem>
					<ListItem>
						<Radio disabled={true}>disabled</Radio>
					</ListItem>
				</List>
			</ScrollView>
		);
	}
}