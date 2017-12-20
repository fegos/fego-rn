import React, { Component } from 'react';
import ReactNative, {
	Animated,
	Text,
	View,
	Dimensions,
	TouchableWithoutFeedback
} from 'react-native';
import { Tabs } from 'fego-rn'
import { Style } from '../../../common'

let { width, height } = Dimensions.get("window");

export default class Page extends Component {
	constructor(props) {
		super(props);
		this.state = {
			horizontal: false,
			activeKey: 'fivedays',
		};
	}

	_onChange = (key, tab) => {
		console.log('tab change, ', key, tab)
		this.setState({
			activeKey: key
		})
	}
	
	render() {
		let contentView;
		if (!this.state.horizontal) {
			contentView = (
				<View style={{ flex: 1}}>
					{this._renderAnimateView()}
				</View>
			)
		} else {
			contentView = (
				<View style={{ flex: 1, justifyContent: 'center'}}>
					{this._renderAnimateView()}
				</View>
			)
		}
		return (
			<View style={{flex: 1, backgroundColor: '#fafafa', alignItems: 'center'}}>
				{contentView}
			</View>
		);
	}

	_renderAnimateView = () => {
		let horizontal = this.state.horizontal;
		let rotationAngle = '0deg';
		let containerViewStyle = { flex: 1 };
		if (horizontal) {
			rotationAngle = '90deg';
			containerViewStyle = { paddingLeft: 10, height: width, width: height, justifyContent: 'flex-start'};
		}

		let containerView = (
			<View style={containerViewStyle}>
				{this._renderTabs()}
			</View>
		);
		return (
			<Animated.View
				style={{
					transform: [
						{
							rotate: rotationAngle,
						},
					]
				}}
			>
				{containerView}
			</Animated.View>
		)
	}

	_renderTabs = () => {
		let { activeKey } = this.state

		this.anim = this.anim || new Animated.Value(0);
		let horizontal = this.state.horizontal;
		let viewStyle = {width: width, height: 200, backgroundColor: '#eaeaea'};
		let trendViewStyle = { flex: 1};
		if (horizontal) {
			viewStyle = { width: height , height: 200, backgroundColor: '#eaeaea'};
		}

		let tabView = (
			<View style={{ height: 250, width: horizontal ? height : width}}>
				<Tabs
					styles={TabStyles}
					activeKey={this.state.activeKey}
					onChange={this._onChange}
				>
					<Tabs.TabPane tab='分时' key='timeline'>
						<View style={viewStyle} >
							<TouchableWithoutFeedback onPress={this._handleDoubleClick}>
								<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
									<Text>分时</Text>
								</View>
							</TouchableWithoutFeedback>
						</View>
					</Tabs.TabPane>
					<Tabs.TabPane tab='5日' key='fivedays'>
						<View style={viewStyle} >
							<TouchableWithoutFeedback onPress={this._handleDoubleClick}>
								<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
									<Text>5日</Text>
								</View>
							</TouchableWithoutFeedback>
						</View>
					</Tabs.TabPane>
					<Tabs.TabPane tab='日k' key='rik'>
						<View style={viewStyle} >
							<TouchableWithoutFeedback onPress={this._handleDoubleClick}>
								<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
									<Text>日k</Text>
								</View>
							</TouchableWithoutFeedback>
						</View>
					</Tabs.TabPane>
					<Tabs.TabPane tab='分k' key='fenk'>
						<View style={viewStyle} >
							<TouchableWithoutFeedback onPress={this._handleDoubleClick}>
								<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
									<Text>分k</Text>
								</View>
							</TouchableWithoutFeedback>
						</View>
					</Tabs.TabPane>
					<Tabs.TabPane tab='周k' key='zhouk'>
						<View style={viewStyle} >
							<TouchableWithoutFeedback onPress={this._handleDoubleClick}>
								<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
									<Text>周k</Text>
								</View>
							</TouchableWithoutFeedback>
						</View>
					</Tabs.TabPane>
					<Tabs.TabPane tab='月k' key='yuek'>
						<View style={viewStyle} >
							<TouchableWithoutFeedback onPress={this._handleDoubleClick}>
								<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
									<Text>月k</Text>
								</View>
							</TouchableWithoutFeedback>
						</View>
					</Tabs.TabPane>
					<Tabs.TabPane tab='年k' key='niank'>
						<View style={viewStyle} >
							<TouchableWithoutFeedback onPress={this._handleDoubleClick}>
								<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
									<Text>年k</Text>
								</View>
							</TouchableWithoutFeedback>
						</View>
					</Tabs.TabPane>
				</Tabs>
			</View>
		)
		return tabView;
	}

	_handleDoubleClick = () => {
		this.setState({
			horizontal: !this.state.horizontal,
		});
		Animated.spring(this.anim, {
			toValue: 0, 
			velocity: 3,  
			tension: -10, 
			friction: 1, 
		}).start();
	}
}

const tabWidth = 80
const TabStyles = {
	tab: {
		width: tabWidth,
		backgroundColor: 'transparent',
		borderLeftColor: '#aaa',
		borderLeftWidth: 1
	},
	bar: {
		width: tabWidth * 7,
		height: 34,
	},
	activeUnderline: {
		height: 3,
		width: 50,
		marginLeft: 15
	}
}