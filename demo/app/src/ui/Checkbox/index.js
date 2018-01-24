import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { Style } from '../../../common'
import { List, Checkbox } from 'fego-rn'

const ListItem = List.ListItem;

export default class Page extends Component {
	state = {
		checkboxGroupValue1: 'math',
		checkboxGroupValue2: ['math'],
		checked1: false,
		checked2: false,
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
						<Checkbox checked={this.state.checked1} onChange={(checked) => {
							this.setState({
								checked1: checked
							})
						}}>受控组件：使用checked，必须同时使用onChange更新，保证选中数据的一致性</Checkbox>
					</ListItem>
					<ListItem>
						<Text>CheckboxGroup非受控属性（单选）：</Text>
						<Checkbox.Group defaultValue={'chinese'}>
							<Checkbox value='english'>英语</Checkbox>
							<Checkbox value='chinese'>语文</Checkbox>
							<Checkbox value='math'>数学</Checkbox>
						</Checkbox.Group>
					</ListItem>
					<ListItem>
						<Text>CheckboxGroup受控属性（单选）：</Text>
						<Checkbox.Group value={this.state.checkboxGroupValue1} onChange={(values) => {
							console.log(values)
							this.setState({
								checkboxGroupValue1: values
							})
						}}>
							<Checkbox value='english'>英语</Checkbox>
							<Checkbox value='chinese'>语文</Checkbox>
							<Checkbox value='math'>数学</Checkbox>
						</Checkbox.Group>
					</ListItem>
					<ListItem>
						<Text>CheckboxGroup非受控属性（多选）：</Text>
						<Checkbox.Group defaultValue={['chinese']} type='optional'>
							<Checkbox value='english'>英语</Checkbox>
							<Checkbox value='chinese'>语文</Checkbox>
							<Checkbox value='math'>数学</Checkbox>
						</Checkbox.Group>
					</ListItem>
					<ListItem>
						<Text>CheckboxGroup受控属性（多选）：</Text>
						<Checkbox.Group value={this.state.checkboxGroupValue2} type='optional' onChange={(values) => {
							console.log(values)
							this.setState({
								checkboxGroupValue2: values
							})
						}}>
							<Checkbox value='english'>英语</Checkbox>
							<Checkbox value='chinese'>语文</Checkbox>
							<Checkbox value='math'>数学</Checkbox>
						</Checkbox.Group>
					</ListItem>
					<ListItem>
						<Checkbox disabled={true}>disabled</Checkbox>
					</ListItem>
				</List>
			</ScrollView>
		);
	}
}