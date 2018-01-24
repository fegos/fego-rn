import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { Style } from '../../../common'
import { List, Checkbox } from 'fego-rn'

const ListItem = List.ListItem;

export default class Page extends Component {
	state = {
		checked: false
	}
	render() {
		return (
			<ScrollView style={Style.container}>
				<Text style={Style.title}>Checkbox</Text>
				<List>
					<ListItem>
						<Checkbox defaultChecked={true}>非受控组件：使用defaultChecked</Checkbox>
					</ListItem>
					<ListItem>
						<Checkbox checked={this.state.checked} onChange={(checked) => {
							this.setState({
								checked: checked
							})
						}}>受控组件：使用checked，必须同时使用onChange更新，保证选中数据的一致性</Checkbox>
					</ListItem>
					<ListItem>
						<Checkbox disabled={true}>disabled</Checkbox>
					</ListItem>
				</List>
			</ScrollView>
		);
	}
}