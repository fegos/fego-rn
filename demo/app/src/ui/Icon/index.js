import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { Style } from '../../../common'
import { Icon } from 'fego-rn'
import { List } from 'fego-rn'

const ListItem = List.ListItem;

class Example extends Component {
	static navigationOptions = {
		title: '图标Icon',
	}
	render() {
		return (
			<ScrollView style={Style.container}>
				<Text style={Style.title}>Icon</Text>
				<List>
					<ListItem>
						<Text style={localStyle.text}>Icon默认样式</Text>
						<Icon name='star' />
					</ListItem>
					<ListItem>
						<Text style={localStyle.text}>Icon设置字体颜色</Text>
						<Icon name='star' color="#D8B080" />
					</ListItem>
					<ListItem>
						<Text style={localStyle.text}>Icon使用style设置字体颜色</Text>
						<Icon name='music' style={{ color: "#D8B080" }} />
					</ListItem>
					<ListItem>
						<Text style={localStyle.text}>Icon设置字体大小</Text>
						<Icon name='star' size={20} />
					</ListItem>
					<ListItem>
						<Text style={localStyle.text}>Icon使用style设置字体大小</Text>
						<Icon name='music' style={{ fontSize: 20 }} />
					</ListItem>
					<ListItem>
						<Text style={localStyle.text}>Icon简易属性设置字体样式</Text>
						<Icon name='star' color="#D8B080" size={20} />
					</ListItem>
					<ListItem>
						<Text style={localStyle.text}>Icon使用style设置字体样式</Text>
						<Icon name='music' style={{ color: '#D8B080', fontSize: 20 }} />
					</ListItem>
				</List>
			</ScrollView>
		)
	}
}

const localStyle = StyleSheet.create({
	text: {
		color: '#D8B080',
		fontSize: 16,
		flex: 1
	}
});

export default Example
