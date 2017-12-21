import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { Style } from '../../../common'
import { List, Button } from 'fego-rn'

const ListItem = List.ListItem;

export default class Page extends Component {
	static navigationOptions = {
		title: '清单List',
	}
	render() {
		return (
			<ScrollView style={Style.container}>
				<List>
					<ListItem title='默认的' />
					<ListItem iconName='user' title='带图标, 右箭头' hasRightArrow={true}/>
					<ListItem iconName='bars' title='自定义样式' styles={{
						title: {
							color: '#E00',
							fontSize: 18
						},
						rightArrow: {
							color: '#E00',
							fontSize: 20
						}
					}}/>
					<ListItem >
						<Text style={{color:'red', fontSize:18 }}>自定义内容</Text>
						<Button style={{ width: 80 }}>Button</Button>
					</ListItem>
				</List>
			</ScrollView>
		);
	}
}