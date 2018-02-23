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
			activeKey: 'tab3',
		};
	}

	_onTabClick = (key, tab) => {
		console.log('tab click, ', key, tab)
	}

	_onAnimationEnd = (key, tab) => {
		console.log('ani end and start wait==========', key, tab);
	}

	_onChange = (key, tab) => {
		console.log('tab change, ', key, tab)
		this.setState({
			activeKey: key
		})
	}

	render() {
		let keys = ['tab1', 'tab2', 'tab3', 'tab4', 'tab5'];
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
				<Text style={Style.title}>通过调用 onAnimationEnd 可以在 tab 动画结束后做一些操作</Text>
				<View style={{ height: 35, }}>
					<View style={{ height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(255,255,255,0.15)' }} />
						<Tabs
							defaultActiveKey='tab3'
							onTabClick={this._onTabClick}
							onAnimationEnd={this._onAnimationEnd}
							styles={TabStyles}
							textColor='#333'
						>
							{tabs}
						</Tabs>
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
			activeKey1: 'tab1',
			activeKey2: 'tab2',
		};
	}

	_onChange = (key, tab) => {
		console.log('tab change ', key, tab)
		this.setState({
			activeKey2: key
		})
	}

	render() {
		let keys = ['tab1', 'tab2', 'tab3', 'tab4', 'tab5', 'tab6'];
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
				<View style={{ height: 100 }}>
					<Tabs
						styles={TabStyles}
						textColor='blue'
						activeTextColor='yellow'
						underlineColor='red'
						activeUnderlineColor='green'
					>
						{tabs}
					</Tabs>
				</View>

				<Text style={Style.title}>使用非受控属性 defaultActiveKey = 'tab2'</Text>
				<View style={{ height: 100 }}>
					<Tabs
						defaultActiveKey='tab2'
						styles={TabStyles}
					>
						{tabs}
					</Tabs>
				</View>

				<Text style={Style.title}>使用受控属性 activeKey 需搭配 onChange 维护 activeKey 值，不搭配 onChange 的错误示例</Text>
				<View style={{ height: 100 }}>
					<Tabs
						styles={TabStyles}
						activeKey={this.state.activeKey1}
					>
						{tabs}
					</Tabs>
				</View>

				<Text style={Style.title}>使用受控属性 activeKey 搭配 onChange 维护 activeKey 值</Text>
				<View style={{ height: 100 }}>
					<Tabs
						styles={TabStyles}
						activeKey={this.state.activeKey2}
						onChange={this._onChange}
					>
						{tabs}
					</Tabs>
				</View>

				<Text style={Style.title}>滚动的 tabBar</Text>
				<View style={{ height: 100 }}>
					<Tabs
						styles={TabStyles3}
						defaultActiveKey='tab1'
					>
						<Tabs.TabPane tab='tab1' key='tab1'>
							<View style={viewStyle}>
								<Text>tab1</Text>
							</View>
						</Tabs.TabPane>
						<Tabs.TabPane tab='tab2' key='tab2'>
							<View style={viewStyle}>
								<Text>tab2</Text>
							</View>
						</Tabs.TabPane>
						<Tabs.TabPane tab='tab3' key='tab3'>
							<View style={viewStyle}>
								<Text>tab3</Text>
							</View>
						</Tabs.TabPane>
						<Tabs.TabPane tab='tab4' key='tab4'>
							<View style={viewStyle}>
								<Text>tab4</Text>
							</View>
						</Tabs.TabPane>
						<Tabs.TabPane tab='tab5' key='tab5'>
							<View style={viewStyle}>
								<Text>tab5</Text>
							</View>
						</Tabs.TabPane>
						<Tabs.TabPane tab='tab6' key='tab6'>
							<View style={viewStyle}>
								<Text>tab6</Text>
							</View>
						</Tabs.TabPane>
						<Tabs.TabPane tab='tab7' key='tab7'>
							<View style={viewStyle}>
								<Text>tab7</Text>
							</View>
						</Tabs.TabPane>
						<Tabs.TabPane tab='tab8' key='tab8'>
							<View style={viewStyle}>
								<Text>tab8</Text>
							</View>
						</Tabs.TabPane>
						<Tabs.TabPane tab='tab9' key='tab9'>
							<View style={viewStyle}>
								<Text>tab9</Text>
							</View>
						</Tabs.TabPane>
						<Tabs.TabPane tab='tab10' key='tab10'>
							<View style={viewStyle}>
								<Text>tab10</Text>
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