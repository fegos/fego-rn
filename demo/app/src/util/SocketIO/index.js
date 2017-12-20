'use strict'
import React, { Component } from 'react'
import {
	Styleheet,
	Text,
	View,
	ScrollView,
	TouchableHighlight,
	Button
} from 'react-native'

import { Style } from '../../../common'
import { Fetch, SocketIO } from 'fego-rn'

class TestView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fetchMsg: '',
			msg: '',
		};
	}

	_fetchSocketData = () => {
		let socket = SocketIO.create('http://api.hhtcex.com', { path: '/app/socket.io', jsonp: false });

		// 连接socket成功
		socket.onConnectedHandler(this._onConnectEvent);

		// 连接服务器成功
		socket.onServerConnectedHandler(this._onServerConnectedEvent);

		// 接受同步信息
		socket.recSyncHandler(this._recSyncEvent);

		let data = {
			traderId: 'xxxxeeeeddd',
			token: 'goooooood'
		};
		socket.reqSync(data);
		//接受市场行情信息
		socket.recQuoteHandler(this._recQuoteData);

		// socket断开链接
		socket.onDisonnectedHandler(this._onDisconnectEvent);

		this.setState({
			fetchMsg: '连接中...'
		})
	}

	_onConnectEvent = (socket) => {
		this.setState({
			fetchMsg: '连接成功',
			msg: `${this.state.msg}\nsocket连接成功：${socket}`
		});
	}

	_onServerConnectedEvent = (socket) => {
		this.setState({
			msg: `${this.state.msg}\n服务器连接成功：${socket}`
		})
	}

	_onDisconnectEvent = (socket) => {
		this.setState({
			msg: `${this.state.msg}\n与socket断开连接：${socket}`
		})
	}

	_recSyncEvent = (data) => {
		this.setState({
			msg: `${this.state.msg}\n服务器同步信息：${data}`
		});
	}

	_recQuoteData = (data) => {
		this.setState({
			msg: `${this.state.msg}\n行情信息：${data}`
		});
	}

	render() {
		return (
			<View>
				<Button title="请求数据" onPress={this._fetchSocketData}></Button>
				<Text style={Style.text}>请求状态：</Text>
				<Text style={{ padding: 5 }}>{this.state.fetchMsg}</Text>
				<Text style={Style.text}>请求状态：</Text>
				<ScrollView>
					<Text style={{ padding: 5 }}>{this.state.msg}</Text>
				</ScrollView>
			</View>

		)
	}
}

export default TestView
