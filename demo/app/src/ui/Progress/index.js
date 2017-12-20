import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableWithoutFeedback } from 'react-native'
import { Style } from '../../../common'
import { Progress } from 'fego-rn'

export default class Page extends Component {
	constructor(props) {
		super(props)
		this.state = {
			p: 0
		}
	}
	render() {
		return (
			<ScrollView style={[Style.container, { backgroundColor: '#666777' }]}>
				<TouchableWithoutFeedback onPress={()=>{this.setState({p: this.state.p+10})}}>
					<View>
						<Text style={Style.text}>单击我动态更新进度条，你可以看见动画哦</Text>
					</View>
				</TouchableWithoutFeedback>
				<Progress showUnfill={false} percent={this.state.p} appearTransition={true}/>
				<Text style={Style.text}> showUnfill = false </Text>
				<Progress showUnfill={false} percent={50} />
				<Text style={Style.text}> size = large </Text>
				<Progress size='large' percent={70} />
				<Text style={Style.text}> size = small </Text>
				<Progress size='small' percent={60} />
				<Text style={Style.text}> type = border </Text>
				<Progress type='border' size='large' percent={40} />
				<Text style={Style.text}> type = retangle </Text>
				<Progress type='retangle' percent={30} />
				<Text style={Style.text}> progressBarColor = red </Text>
				<Progress progressBarColor='red' percent={60} />
				<Text style={Style.text}>width = 200, height = 80</Text>
				<View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: 100 }}>
					<Progress style={{ width: 200, height: 80 }} type='border' percent={50} />
				</View>
			</ScrollView>)
	}
}