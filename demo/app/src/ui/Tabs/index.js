import React, { Component } from 'react';
import ReactNative, {
	StyleSheet,
	Animated,
	Text,
	View,
	ScrollView,
} from 'react-native';
import { Tabs } from 'fego-rn'
import { Style } from '../../../common'

export default class Page extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeKey: '3',
		};
	}

	_onTabClick = (key, tab) => {
		console.log('tab click, ', key, tab)
	}

	_onAnimationEnd = (key, tab) => {
		console.log('ani end and start wait==========', key, tab);
		// for (let i = 0; i < 5000; i++) {
		// 	console.log(1);
		// }
	}

	_onChange = (key, tab) => {
		console.log('tab change, ', key, tab)
		this.setState({
			activeKey: key
		})
	}

	render() {
		let keys = ['分时', '5日', '日k', '分k', '1', '2', '3', '4', '5'];
		let tabs = [];
		for (let tab in keys) {
			let _key = keys[tab];
			tabs.push(
				<Tabs.TabPane tab={_key} key={_key}>
				</Tabs.TabPane>
			)
		}

		return (
			<ScrollView style={Style.container}>
				<Text style={Style.title}>红色背景的 tab 通过调用 onAnimationEnd 在 tab 动画结束后做一些操作</Text>
				<View style={{ height: 35, backgroundColor: 'red' }}>
					<View style={{ height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(255,255,255,0.15)' }} />
					{/*<View style={{ height: 35 }}>*/}
						<Tabs
							defaultActiveKey='3'
							onTabClick={this._onTabClick}
							onAnimationEnd={this._onAnimationEnd}
							styles={TabStyles}
							textColor='rgba(255,255,255,0.5)'
							activeTextColor='#FFFFFF'
							underlineColor='transparent'
							activeUnderlineColor='#FFFFFF'
						>
							{tabs}
						</Tabs>
					{/*</View>*/}
					<View style={{ height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(255,255,255,0.15)' }} />
				</View>

				<View style={{ marginTop: 50, height: 35, backgroundColor: 'red' }}>
					<View style={{ height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(255,255,255,0.15)' }} />
					{/*<View style={{ height: 35 }}>*/}
						<Tabs
							activeKey={this.state.activeKey}
							onChange={this._onChange}
							onTabClick={this._onTabClick}
							onAnimationEnd={this._onAnimationEnd}
							styles={TabStyles}
							textColor='rgba(255,255,255,0.5)'
							activeTextColor='#FFFFFF'
							underlineColor='transparent'
							activeUnderlineColor='#FFFFFF'
						>
							{tabs}
						</Tabs>
					{/*</View>*/}
					<View style={{ height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(255,255,255,0.15)' }} />
				</View>

				<Ori />
			</ScrollView>
		);
	}
}

class Ori extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeKey1: '日k',
			activeKey2: '分k',
		};
	}

	_onChange = (key, tab) => {
		console.log('tab change ', key, tab)
		this.setState({
			activeKey2: key
		})
	}

	render() {
		let keys = ['分时', '5日', '日k', '分k', '1', '2', '3', '4', '5'];
		let tabs = [];
		for (let tab in keys) {
			let _key = keys[tab];
			tabs.push(
				<Tabs.TabPane tab={_key} key={_key}>
				</Tabs.TabPane>
			)
		}
		return (
			<ScrollView style={{marginTop: 50}}>
				<Text style={Style.title}>使用非受控属性，默认显示第一个 tab</Text>
				<View style={{ height: 200 }}>
					<Tabs
						styles={TabStyles2}
						textColor='blue'
						activeTextColor='yellow'
						underlineColor='red'
						activeUnderlineColor='green'
					>
						{tabs}
					</Tabs>
				</View>

				<Text style={Style.title}>使用非受控属性 defaultActiveKey = '5日'</Text>
				<View style={{ height: 200 }}>
					<Tabs
						defaultActiveKey='5日'
						styles={TabStyles}
					>
						{tabs}
					</Tabs>
				</View>

				<Text style={Style.title}>使用受控属性 activeKey 需搭配 onChange 维护 activeKey 值，不搭配 onChange 的错误示例</Text>
				<View style={{ height: 200 }}>
					<Tabs
						styles={TabStyles}
						activeKey={this.state.activeKey1}
					>
						{tabs}
					</Tabs>
				</View>

				<Text style={Style.title}>使用受控属性 activeKey 搭配 onChange 维护 activeKey 值</Text>
				<View style={{ height: 200 }}>
					<Tabs
						styles={TabStyles}
						activeKey={this.state.activeKey2}
						onChange={this._onChange}
					>
						{tabs}
					</Tabs>
				</View>

				<Text style={Style.title}>滚动的 tabBar</Text>
				<View style={{ height: 200 }}>
					<Tabs
						styles={TabStyles3}
						defaultActiveKey='fenk'
					>
						<Tabs.TabPane tab='分时' key='timeline'>
							<View style={viewStyle}>
								<Text>分时</Text>
							</View>
						</Tabs.TabPane>
						<Tabs.TabPane tab='5日' key='fivedays'>
							<View style={viewStyle}>
								<Text>5日</Text>
							</View>
						</Tabs.TabPane>
						<Tabs.TabPane tab='日k' key='rik'>
							<View style={viewStyle}>
								<Text>日k</Text>
							</View>
						</Tabs.TabPane>
						<Tabs.TabPane tab='分k' key='fenk'>
							<View style={viewStyle}>
								<Text>分k</Text>
							</View>
						</Tabs.TabPane>
						<Tabs.TabPane tab='周k' key='zhouk'>
							<View style={viewStyle}>
								<Text>周k</Text>
							</View>
						</Tabs.TabPane>
						<Tabs.TabPane tab='月k' key='yuek'>
							<View style={viewStyle}>
								<Text>月k</Text>
							</View>
						</Tabs.TabPane>
						<Tabs.TabPane tab='年k' key='niank'>
							<View style={viewStyle}>
								<Text>年k</Text>
							</View>
						</Tabs.TabPane>
						<Tabs.TabPane tab='a' key='a'>
							<View style={viewStyle}>
								<Text>a</Text>
							</View>
						</Tabs.TabPane>
						<Tabs.TabPane tab='b' key='b'>
							<View style={viewStyle}>
								<Text>b</Text>
							</View>
						</Tabs.TabPane>
						<Tabs.TabPane tab='c' key='c'>
							<View style={viewStyle}>
								<Text>c</Text>
							</View>
						</Tabs.TabPane>
					</Tabs>
				</View>
			</ScrollView>
		)
	}
}

const tabWidth = 80
const TabStyles = {
	tab: {
		backgroundColor: 'transparent',
	},
	bar: {
		height: 34,
	},
	activeUnderline: {
		height: 3,
	}
}
const TabStyles2 = {
	tab: {
		width: tabWidth,
		backgroundColor: 'transparent',
	},
	bar: {
		width: tabWidth * 9,
		height: 34,
	},
	activeUnderline: {
		height: 3,
		width: 50,
		marginLeft: 25
	}
}
const TabStyles3 = {
	tab: {
		width: tabWidth,
		backgroundColor: 'transparent',
		borderLeftColor: '#aaa',
		borderLeftWidth: 1
	},
	bar: {
		width: tabWidth * 10,
		height: 34,
	},
	activeUnderline: {
		height: 3,
		width: 50,
		marginLeft: 15
	}
}
const viewStyle = {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: '#aaa',
}