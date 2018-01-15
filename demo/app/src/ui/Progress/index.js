import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableWithoutFeedback } from 'react-native'
import { Style } from '../../../common'
import { Progress, Button } from 'fego-rn'

export default class Page extends Component {
	constructor(props) {
		super(props)
		this.state = {
			p: 0
		}
	}
	render() {
		return (
			<ScrollView style={[Style.container]}>
				<Button type='primary' onPress={()=>{this.setState({p: this.state.p+10})}}>
					<Text>单击更新进度</Text>
				</Button>
				<Progress showUnfill={false} percent={this.state.p} appearTransition={true}/>
				<Text style={Style.title}> showUnfill = false </Text>
				<Progress showUnfill={false} percent={50} />
				<Text style={Style.title}> size = large </Text>
				<Progress size='large' percent={70} />
				<Text style={Style.title}> size = small </Text>
				<Progress size='small' percent={60} />
				<Text style={Style.title}> type = border </Text>
				<Progress type='border' size='large' percent={40} />
				<Text style={Style.title}> type = retangle </Text>
				<Progress type='retangle' percent={30} />
				<Text style={Style.title}> progressBarColor = red </Text>
				<Progress progressBarColor='red' percent={60} />
				<Text style={Style.title}>width = 200, height = 80</Text>
				<View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: 100 }}>
					<Progress style={{ backgroundColor:'red', width: 200, height: 80 }} type='border' percent={50} />
				</View>
			</ScrollView>)
	}
}