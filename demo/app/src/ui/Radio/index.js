import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { Style } from '../../../common'
import { List, Radio } from 'fego-rn'

const ListItem = List.ListItem;

export default class Page extends Component {
	static navigationOptions = {
		title: '表单类组件',
	}
	state = {
		radioGroupValue: 'english',
	}
	render() {
		return (
			<ScrollView style={Style.container}>
				<Text style={Style.title}>Radio</Text>
				<List>
					<ListItem>
						<Radio defaultChecked={false}>非受控组件：使用defaultChecked</Radio>
					</ListItem>
					<ListItem>
						<Radio checked={this.state.checked2} onChange={(checked)=>{
							this.setState({
								checked2: checked
							})
						}}>受控组件：使用checked</Radio>
					</ListItem>
					<ListItem>
						<Text>RadioGroup非受控属性：</Text>
						<Radio.Group>
							<Radio value='english'>英语</Radio>
							<Radio value='chinese' disabled>语文</Radio>
							<Radio value='math'>数学</Radio>
						</Radio.Group>
					</ListItem>
					<ListItem>
						<Text>RadioGroup受控属性：</Text>
						<Radio.Group value={this.state.radioGroupValue} onChange={(value)=>{
							this.setState({
								radioGroupValue: value
							})
						}}>
							<Radio value='english'>英语</Radio>
							<Radio value='chinese'>语文</Radio>
							<Radio value='math'>数学</Radio>
						</Radio.Group>
					</ListItem>
				</List>
			</ScrollView>
		);
	}
}