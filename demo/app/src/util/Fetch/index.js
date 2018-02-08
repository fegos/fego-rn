'use strict'
import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { Style } from '../../../common'
import { Fetch, Button } from 'fego-rn'
import Accordion from 'react-native-collapsible/Accordion';

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
		this.sections = [
			{
				title: '初始设置',
				content: `初始化:设置host
				-----------------------------------
				Fetch.defaults.baseURL = 'http://localhost:3001/api'
				Fetch.defaults.timeout = 1000
				`
			},
			{
				title: '拦截设置',
				content: `Fetch.interceptors.request.use(function (config) {
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
			},
			{
				title: 'Get请求',
				content: `Fetch Get请求示例：
				-----------------------------------
				Fetch.get('/test/fetch/list?p=xxx')
				.then(res => {
					this.__requestResult(true, res) 
				}).catch(err => {
					this.__requestResult(false, err) 
				});`
			},
			{
				title: 'Post请求',
				content: `Fetch Post请求示例：
				-----------------------------------
				Fetch.post('/test/fetch/list',{p:'xxx'})
				.then(res => {
					this.__requestResult(true, res) 
				}).catch(err => {
					this.__requestResult(false, err) 
				});`
			},
			{
				title: '取消请求',
				content: `Fetch 取消请求示例,目前必须是get情况cancel：
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
			},
			{
				title: '并发请求',
				content: `function getUserAccount() {
					return axios.get('/user/12345');
				  }
				  
				  function getUserPermissions() {
					return axios.get('/user/12345/permissions');
				  }
				  
				  axios.all([getUserAccount(), getUserPermissions()])
					.then(axios.spread(function (acct, perms) {
					  // Both requests are now complete
					}));`
			}
		];
		this.__renderHeader = this.__renderHeader.bind(this)
		this.__renderContent = this.__renderContent.bind(this)
		this.__renderTest = this.__renderTest.bind(this)
	}

	__renderTest(index, code) {
		let content = <View />;
		if (index == 0) {
			content =
				<View style={localStyle.item}>
					<Text style={localStyle.code}>{code}</Text>
					<Button title="初始化"
						onPress={() => {
							Fetch.defaults.baseURL = 'http://localhost:3001/api'
							Fetch.defaults.timeout = 20000
							// Fetch.testCustom('http://localhost:3001/api')
						}} />
				</View>
		}
		else if (index == 1) {
			content =
				< View style={localStyle.item} >
					<Text style={localStyle.code}>{code}</Text>
					<Button title="拦截设置，点击测试"
						onPress={() => {
							Fetch.interceptors.request.use(function (config) {
								if (config.method == 'post') {
									let data = config.data
									//异步处理
									return Promise.resolve({ encrypt: '00000' }).then((data) => {
										config.data = data
										return config;
									})
								}
								else {
									//同步处理
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
		}
		else if (index == 2) {
			content =
				< View style={localStyle.item} >
					<Text style={localStyle.code}>{code}</Text>
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
				</View >
		}
		else if (index == 3) {
			content =
				< View style={localStyle.item} >
					<Text style={localStyle.code}>{code}</Text>
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
				</View >
		}
		else if (index == 4) {
			content =
				< View style={localStyle.item} >
					<Text style={localStyle.code}>{code}</Text>
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

						var source1 = CancelToken.source();
						Fetch.get('/test/fetch/cancel', { cancelToken: source1.token }).then(res => {
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

						Fetch.get('/test/fetch/list').then(res => {
							this.__requestResult(true, res)
						}).catch((error) => {
							this.__requestResult(false, error)
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
				</View >
		}
		else if (index == 5) {
			content =
				< View >
					<Text style={localStyle.code}>{code}</Text>
					<Button title="并发请求，点击测试" onPress={() => {
						this.setState({
							fetchMsg: '数据加载中...',
							list: []
						})
						function getUserName() {
							return Fetch.get('/test/fetch/username');
						}

						function getNickName() {
							return Fetch.get('/test/fetch/nickname');
						}
						let that = this
						Fetch.all([getUserName(), getNickName()])
							.then(
							Fetch.spread(function (username, nickname) {
								that.setState({
									fetchMsg: '成功',
									list: [
										{ name: username.data.username },
										{ name: nickname.data.nickname }
									]
								})
							})).catch((error) => {
								this.__requestResult(false, error)
							})
					}} />
				</View >
		}
		return content
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

	__renderHeader(section, index) {
		return (
			<View style={localStyle.header}>
				<Text style={localStyle.headerText}>{section.title}</Text>
			</View>
		);
	}

	__renderContent(section, index) {
		let content = this.__renderTest(index, section.content)
		return (
			<View style={localStyle.content}>
				{content}
			</View>
		);
	}

	render() {
		return (
			<View style={Style.container}>
				<View style={{ flex: 1, padding: 10, borderWidth: 5, borderColor: '#123123' }}>
					<ScrollView>
						<Accordion
							align='center'
							underlayColor='transparent'
							sections={this.sections}
							renderHeader={this.__renderHeader}
							renderContent={this.__renderContent}
						/>
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
		);
	}

}

let localStyle = {
	title: {
		textAlign: 'center',
		fontSize: 22,
		fontWeight: '300',
		marginBottom: 20,
	},
	header: {
		backgroundColor: '#F5FCFF',
		padding: 10,
	},
	headerText: {
		textAlign: 'center',
		fontSize: 16,
		fontWeight: '500',
	},
	content: {
		padding: 20,
		backgroundColor: '#fff',
	},
	item: {
	},
	code: {
		textAlign: 'left', color: 'white', backgroundColor: 'black', lineHeight: 25, marginVertical: 10
	}
}

export default TestView
