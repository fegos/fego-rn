import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { PieChart, List } from 'fego-rn'
import { Style } from '../../../common'
const ListItem = List.ListItem;
export default class PieChartView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			percentArray: [0.1, 0.1, 0.7, 0.1],
		};
	}

	componentDidMount() {
		this.setState({
			percentArray: [0.2, 0.1, 0.4, 0.3],
		})
	}



	render() {
		return (
			<ScrollView style={Style.container}>
				<Text style={Style.title}>PieChartView</Text>
				<List>
					<ListItem>
						<Text>基本用法：</Text>
						<PieChart
							percentArray={[0.2, 0.1, 0.4, 0.3]}
							colorArray={['#4d84eb', '#fca63e', 'green', 'yellow']}
							outerRadius={40}
							innerRadius={25}
							animationEndCallBack={()=>{console.log("animationEndCallBack")}}
						/>
					</ListItem>
					<ListItem>
						<Text>总percent不足100%：</Text>
						<PieChart
							percentArray={[0.2, 0.1, 0.4]}
							colorArray={['#4d84eb', '#fca63e', 'green', 'yellow']}
							outerRadius={40}
							innerRadius={25}
						/>
					</ListItem>
					<ListItem>
						<Text>总percent超过100%,内半径为0：</Text>
						<PieChart
							percentArray={[0.2, 0.1, 0.4,0.3,0.4]}
							colorArray={['#4d84eb', '#fca63e', 'green', 'yellow','black']}
							outerRadius={40}
							innerRadius={0}
						/>
					</ListItem>
					<ListItem>
						<Text>动画时间设定为4秒,逆时针显示：</Text>
						<PieChart
							percentArray={[0.2, 0.1, 0.4, 0.3]}
							colorArray={['#4d84eb', '#fca63e', 'green', 'yellow']}
							outerRadius={40}
							innerRadius={25}
							duration={4000}
							animationType='sequence'
							isClockwise={false}
						/>
					</ListItem>
					<ListItem>
						<Text>内半径为0，有设置虚线,90度起始点：</Text>
						<PieChart
							percentArray={[0.2, 0.1, 0.4, 0.3]}
							colorArray={['#4d84eb', '#fca63e', 'green', 'yellow']}
							outerRadius={60}
							innerRadius={0}
							duration={1500}
							animationType='sequence'
							rotation={90}
							configArray={[ { stroke: 'red', strokeWidth: 1, strokeDash: [2, 5] }, { stroke: 'black', strokeWidth: 1, strokeDash: [2, 5] },,]}
						/>
					</ListItem>
					<ListItem>
						<Text>animationType为同步，有设置虚线：</Text>
						<PieChart
							percentArray={[0.2, 0.1, 0.4, 0.3]}
							colorArray={['#4d84eb', '#fca63e', 'green', 'yellow']}
							outerRadius={40}
							innerRadius={25}
							duration={1500}
							animationType='synchron'
							animationEndCallBack={()=>{console.log("同步animationEndCallBack")}}
							configArray={[, { stroke: 'red', strokeWidth: 1, strokeDash: [2, 5] }, , { stroke: 'black', strokeWidth: 1, strokeDash: [2, 5] }]}
						/>
					</ListItem>
				</List>
			</ScrollView>
		);
	}
}
