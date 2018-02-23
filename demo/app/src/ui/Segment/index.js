import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Style } from '../../../common'
import { List, Segment, Toast } from 'fego-rn'

const ListItem = List.ListItem;

export default class Page extends Component {
	static navigationOptions = {
		title: '分段选择器'
	}
	state = {
		values: [ '栏目一', '栏目二', '栏目三'],
		segmentIndex: 0
	}
	render() {
		return (
			<ScrollView style={Style.container}>
				<List>
					<ListItem styles={listItemStyle}>
						<Text style={{ padding: 10 }}>禁止的</Text>
						<Segment values={this.state.values} disabled={true} /> 
					</ListItem>
					<ListItem styles={listItemStyle}>
						<Text style={{ padding: 10 }}>非控组件: 使用非控属性defaultIndex，默认0</Text>
						<Segment values={this.state.values} onChange={i=>{}}/> 
					</ListItem>
					<ListItem styles={listItemStyle}>
						<Text style={{ padding: 10 }}>受控组件：使用受控属性index，配合onChange更新</Text>
						<Segment index={this.state.segmentIndex} values={this.state.values} onChange={i=>{
							if (i == 1) {
								Toast.info("本页(爷)面(们)不允许切换到中间")
							} else {
								this.setState({segmentIndex: i})
							}
						}}/>
					</ListItem>
					<ListItem styles={listItemStyle}>
						<Text style={{ padding: 10 }} >主题色调：themeColor</Text>
						<Segment values={this.state.values} styles={{container:{borderRadius: 8}}} themeColor='#981231'/> 
					</ListItem>
				</List>
			</ScrollView>
		)
	}
}

const listItemStyle = {
	content: {
		flexDirection: 'column',
		alignItems: 'flex-start'
	}
}