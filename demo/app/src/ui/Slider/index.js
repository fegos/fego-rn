import React, { Component } from 'react'
import { ScrollView, Text } from 'react-native'
import { Style } from '../../../common'
import { Slider } from 'fego-rn'

export default class Page extends Component {
	constructor(props) {
		super(props)
		this.state = {
			value: 10
		}
	}

	render() {
		return (
			<ScrollView style={Style.container}>
				<Text style={Style.title} >slider value</Text>
				<Text style={Style.text}>Value: {this.state.value}</Text>
				<Slider value={this.state.value} onValueChange={(value) => this.setState({ value })} />
				<Text style={Style.title}>type = circle</Text>
				<Slider type='circle' value={20} />
				<Text style={Style.title}>type = square</Text>
				<Slider type='square' value={30} />
				<Text style={Style.title}>size = large</Text>
				<Slider size='large' value={40} />
				<Text style={Style.title}>size = small</Text>
				<Slider size='small' value={50} />
			</ScrollView>
		)
	}
}