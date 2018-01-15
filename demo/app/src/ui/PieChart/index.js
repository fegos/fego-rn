import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { PieChart } from 'fego-rn'

export default class PieChartView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			percentArray: [0.1,0.1,0.7,0.1],
		};
	}

	componentDidMount() {
		this.setState({
			percentArray:[0.2,0.1, 0.4,0.3],
		})
	}



	render() {
		return (
			<View style={privateStyle.bgStyle}>
				<View style={privateStyle.pieStyle}>
					<PieChart
						percentArray={this.state.percentArray}
						colorArray={['#4d84eb', '#fca63e','green','yellow']}
						outerRadius={40}
						innerRadius={25}
						duration={1500}
						animationType = 'synchron'
						configArray={[,{stroke:'red',strokeWidth:1,strokeDash:[2,5]},,{stroke:'black',strokeWidth:1,strokeDash:[2,5]}]}
					/>
				</View>
			</View>
		);
	}
}

var privateStyle = StyleSheet.create({
	bgStyle: {
		flex: 1,
	},
	pieStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

})