import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { Style } from '../../../common'
import { Button, Switch,Toast } from 'fego-rn'

export default class Page extends Component {
	static navigationOptions = {
		title: '按钮Button'
	}
	state = {
		layout: false
	}
	constructor(props) {
		super(props)
		// 统一重设主题样式
		Button.setThemeStyle(Button, {
			type: {
				danger: {
					container: {
						borderColor: '#d93333',
						backgroundColor: '#d90000'
					}
				}
			}
		})
	}

	render() {
		return (
			<View style={{flex:1, paddingHorizontal: 10}}>
			<View style={{height: 50, padding: 10, flexDirection: 'row', alignItems: 'center'}}>
				<Text>布局切换 {this.layout?'alignItems: flex-start':''}</Text>
				<Switch active={this.state.layout} onChange={active=> this.setState({layout: active})} />
				{this.state.layout?<Text>alignItems: 'flex-start'</Text>:null}
			</View>
			<ScrollView style={Style.container}>
				<View style={this.state.layout?{ alignItems: 'flex-start' }:null}>
				<Button title="default" />
				<Button type="primary">type="primary"</Button>
				<Button type="primary" size="small" textColor="#991111">type="primary" size="small"</Button>
				<Button type="primary" size="large">type="primary" size="large"</Button>
				<Button type="danger">type="danger"</Button>
				<Button disabled={true}>disabled</Button>
				<Button type="primary" loading={true}>加载中按钮不可点击</Button>
				<Button type="danger" loading={true} loadingText="自定义加载文案">按钮文案</Button>
				<Button
					styles={{ container: { backgroundColor: '#E9E' }, text: { fontSize: 24, color: '#5E1' } }}
					textStyle={{ fontSize: 18, color: '#999' }}
					onPress={e => { console.log('单击') }}>
					自定义样式
				</Button>
				<Button style={{ backgroundColor: '#568976', width: 300 }} >
					<Text style={{ color: '#EFE', fontSize: 18 }}>自定义元素, 宽度300</Text>
				</Button>
				</View>
				<View style={{flexDirection: 'row'}}>
					<Button type="primary" title="左按钮" style={{flex: 1, borderRadius: 0}}/>
					<Button type="danger" title="右按钮" style={{flex: 2, borderRadius: 0}}/>
				</View>
			</ScrollView>
			</View>
		)
	}
}