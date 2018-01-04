'use strict'
import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { Style } from '../../../common'
import { Fetch, Button } from 'fego-rn'

class TestView extends Component {
	static navigationOptions = {
		title: '网络请求组件，基于Axios封装'
	}

	constructor(props) {
		super(props);
		this.state = {
			showView: false,
			fetchMsg: '--',
			list: []
		};
	}

	__requestResult(isOK, obj) {
		if (isOK) {
			this.setState({
				fetchMsg: '成功',
				list: obj.data.data.result
			})
		}
		else {
			this.setState({
				fetchMsg: '失败 ' + obj.message,
				list: []
			})
		}
	}

	render() {
		let { navigator } = this.props
		return (
			<View style={Style.container}>
				<View style={{ flex: 1, padding: 10, borderWidth: 5, borderColor: '#123123' }}>
					<ScrollView>

						<View style={localStyle.item}>
							<Text style={localStyle.code}>
								{
									`初始化:设置host
-----------------------------------
Fetch.defaults.baseURL = 'http://localhost:3001/api'
Fetch.defaults.timeout = 1000`
								}
							</Text>
							<Button title="初始化" onPress={() => {
								Fetch.defaults.baseURL = 'http://localhost:3001/api'
								Fetch.defaults.timeout = 20000
								// Fetch.testCustom('http://localhost:3001/api')
							}} />
						</View>

						<View style={localStyle.item}>
							<Text style={localStyle.code}>
								{
									`Fetch.interceptors.request.use(function (config) {
										if (config.method == 'post') {
											let data = config.data
											function encrypt(params) {
												params = { encrypt: '00000' }
												return Promise.resolve(params)
											}
											return encrypt(data).then((data) => {
												config.data = data
												return config;
											})
										}
										else {
											return config;
										}
									}, function (error) {
										return Promise.reject(error);
									});
	
									Fetch.interceptors.response.use(function (response) {
										return response.data;
									}, function (error) {
										return Promise.reject(error);
									});`
								}
							</Text>
							<Button title="拦截设置，点击测试" onPress={() => {
								Fetch.interceptors.request.use(function (config) {
									if (config.method == 'post') {
										let data = config.data
										function encrypt(params) {
											params = { encrypt: '00000' }
											return Promise.resolve(params)
										}
										return encrypt(data).then((data) => {
											config.data = data
											return config;
										})
									}
									else {
										return config;
									}
								}, function (error) {
									return Promise.reject(error);
								});

								Fetch.interceptors.response.use(function (response) {
									return response.data;
								}, function (error) {
									return Promise.reject(error);
								});
							}} />
						</View>

						<View style={localStyle.item}>
							<Text style={localStyle.code}>
								{
									`Fetch Get请求示例：
-----------------------------------
Fetch.get('/test/fetch/list?p=xxx')
.then(res => {
	this.__requestResult(true, res) 
}).catch(err => {
	this.__requestResult(false, err) 
});`
								}
							</Text>
							<Button title="Get使用方法，点击测试" onPress={() => {
								this.setState({
									fetchMsg: '数据加载中...',
									list: []
								})
								Fetch.get('/test/fetch/list?a=100').then(res => {
									this.__requestResult(true, res)
								}).catch(err => {
									this.__requestResult(false, err)
								});
							}} />
						</View>


						<View style={localStyle.item}>
							<Text style={localStyle.code}>
								{
									`Fetch Post请求示例：
-----------------------------------
Fetch.post('/test/fetch/list',{p:'xxx'})
.then(res => {
	this.__requestResult(true, res) 
}).catch(err => {
	this.__requestResult(false, err) 
});`
								}
							</Text>
							<Button title="Post使用方法，点击测试" onPress={() => {
								this.setState({
									fetchMsg: '数据加载中...',
									list: []
								})
								Fetch.post('/test/fetch/list', { p: 'xxx' }).then(res => {
									this.__requestResult(true, res)
								}).catch(err => {
									this.__requestResult(false, err)
								});
							}} />
						</View>

						<View style={localStyle.item}>
							<Text style={localStyle.code}>
								{
									`Fetch 取消请求示例,目前必须是get情况cancel：
-----------------------------------
var CancelToken = Fetch.CancelToken;
var source = CancelToken.source();
Fetch.get('/test/fetch/cancel', 
	{ cancelToken: source.token }
).then(res => {
	this.__requestResult(true, res) 
}).catch((error) => {
	this.__requestResult(false, err) 
	if (Fetch.isCancel(error)) {
		console.log('Request canceled', error.message);
	} 
});
	
setTimeout(() => {
	//取消请求（消息参数是可选的）
	source.cancel('操作被用户取消。');
	this.setState({
		fetchMsg: '操作被用户取消。。',
		list: []
	})
}, 3000)`
								}
							</Text>
							<Button title="取消请求，点击测试" onPress={() => {
								this.setState({
									fetchMsg: '数据加载中...',
									list: []
								})

								var CancelToken = Fetch.CancelToken;
								var source = CancelToken.source();
								Fetch.get('/test/fetch/cancel', { cancelToken: source.token }).then(res => {
									this.__requestResult(true, res)
								}).catch((error) => {
									console.log(error.message);
									this.__requestResult(false, error)
									if (Fetch.isCancel(error)) {
										console.log('Request canceled', error.message);
									} else {
										// 处理错误
									}
								});

								function cancelRequest() {
									console.log('========')
									source.cancel('操作被用户取消。');
									this.setState({
										fetchMsg: '操作被用户取消。。',
										list: []
									})
								}
								//取消请求（消息参数是可选的）
								setTimeout(cancelRequest.bind(this), 3000)

							}} />
						</View>

						<View>
							<Text style={localStyle.code}>
								{
									`				 axios.get('/user?ID=12345')
							  .then(function (response) {
									console.log(response);
							  })
							  .catch(function (error) {
							   		console.log(error);
							   });`
								}
							</Text>
							<Button title="并发请求，点击测试" onPress={() => {

							}} />
						</View>

						<View style={localStyle.item}>
							<Text style={localStyle.code}>
								{
									`				 axios.get('/user?ID=12345')
						  .then(function (response) {
								console.log(response);
						  })
						  .catch(function (error) {
								   console.log(error);
						   });`
								}
							</Text>
							<Button title="自定义实例，点击测试" onPress={() => {

							}} />
						</View>
					</ScrollView>
				</View>
				<View style={{ flex: 0.2, flexDirection: 'row', padding: 10, borderWidth: 5, borderColor: '#123123', alignItems: 'center' }}>
					<View style={{ flex: 4 }}>
						<Text style={localStyle.code}>状态：{this.state.fetchMsg}</Text>
					</View>
					<View style={{ flex: 6 }}>
						<ScrollView>
							{this.state.list.map((item, i) => {
								return <Text style={Style.text} key={item.id}>数据项{i + 1}:{item.name} {item.desc}</Text>
							})}
						</ScrollView>
					</View>
				</View>
			</View>

		)
	}
}

let localStyle = {
	item: {
		borderWidth: 5,
		borderColor: '#345678',
		padding: 5
	},
	code: {
		textAlign: 'left', color: 'white', backgroundColor: 'black', lineHeight: 25, marginVertical: 10
	}
}

export default TestView
