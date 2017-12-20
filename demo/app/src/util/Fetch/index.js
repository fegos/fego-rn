'use strict'
import React, { Component } from 'react'
import { Styleheet, Text, View, ScrollView, TouchableHighlight, Button } from 'react-native'
import { Style } from '../../../common'
import { Fetch, socketCreator } from 'fego-rn'
import Handler from './Handler'
Fetch.init({
	// host: 'http://localhost:3001/api',
	host: {
		base: 'http://localhost:3001/api',
		other: 'http://api.google.com/com'
	},
	hostKey: 'base',
	// params: {
	// 	com: 333
	// },
	params: function (params) {
		console.log('Fetch对象', this)
		console.log('待处理的参数', params)
		return {
			com3: 111
		}
	},
	// beforeUrlParamHandler: function (params) {
	// 	console.log('原url', this.srcUrl)
	// 	console.log('原参数', this.srcParams)
	// 	console.log('待处理的参数', params)
	// 	return params;
	// },
	/**
	 * 若参数处理是异步的，则需返回promise
	 */
	beforeUrlParamHandler: function (params) {
		return new Promise((resolve, reject)=>{
			setTimeout(e=>{
				console.log('原url', this.srcUrl)
				console.log('原参数', this.srcParams)
				console.log('待处理的参数', params)
				resolve({
					...params,
					promise: '异步加密参数'
				})
			}, 300)
		})
	},
	afterUrlParamHandler: function (urlParams) {
		console.log('urlParams', urlParams)
		return urlParams;
	},
	timeout: 3000,
	resoleHandler: Handler.resoleHandler,
	rejectHandler: Handler.rejectHandler
})
class TestView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showView: false,
			fetchMsg: 'fetchMsg',
			list: []
		};
	}
	fetchData() {
		this.setState({
			fetchMsg: '数据加载中...'
		})
		Fetch.get('test/fetch/list', {
			pageSize: 10,
			pageNo: 3
		}).then(data => {
			this.setState({
				fetchMsg: '成功',
				list: data.result
			})
		}).catch(err => {
			if (!err) return;
			this.setState({
				fetchMsg: '失败 ' + err.msg
			})
		});
		// Fetch.clear();
	}
	fetchData2() {
		this.setState({
			fetchMsg: '数据加载中...'
		})
		this.fetch = Fetch.create({
			// canAbort: false
		});
		this.fetch.get('test/fetch/list', {
			pageSize: 10,
			pageNo: 3
		}).then(data => {
			this.setState({
				fetchMsg: '成功',
				list: data.result
			})
		}).catch(err => {
			if (!err) {
				this.setState({
					fetchMsg: '请求被忽略了，此时页面不用提示异常，由拦截器统一处理'
				})
				return;
			}
			this.setState({
				fetchMsg: '失败 ' + err.msg
			})
		});
	}
	fetchData3() {
		this.setState({
			fetchMsg: '数据加载中...'
		})
		Fetch.create({ hostKey: 'other', timeout: 2000 }).get('other/host').then(data => {
			this.setState({
				fetchMsg: '成功'
			})
		}).catch(err => {
			if (!err) return;
			this.setState({
				fetchMsg: '失败 ' + err.msg,
				result: 'hostKey=other :' + err.url
			})
		});
	}
	abort() {
		this.fetch.abort();
	}
	fetchTimeout() {
		this.setState({
			fetchMsg: '数据加载中...'
		})
		Fetch.create({ timeout: 300 }).get('test/fetch/list').then(data => {
			this.setState({
				fetchMsg: '成功',
				list: data.result
			})
		}).catch(err => {
			if (!err) return;
			this.setState({
				fetchMsg: '失败 ' + err.msg
			})
		});
	}
	render() {
		let { navigator } = this.props
		return (
			<ScrollView>
				<View style={Style.container}>
					<Text style={Style.text}>请求状态：{this.state.fetchMsg}</Text>
					<Button title="请求数据" onPress={this.fetchData.bind(this)}></Button>
					<Button title="请求超时" onPress={this.fetchTimeout.bind(this)}></Button>
					<Button title="请求2" onPress={this.fetchData2.bind(this)}></Button>
					<Button title="忽略请求2" onPress={this.abort.bind(this)}></Button>
					<Button title="请求不同的host，延迟2秒超时" onPress={this.fetchData3.bind(this)}></Button>
					<Text style={Style.title}>请求结果</Text>
					<Text style={Style.text}>{this.state.result}</Text>
					<Text style={Style.title}>数据列表</Text>
					{this.state.list.map((item, i) => {
						return <Text style={Style.text} key={item.id}>数据项{i + 1}:{item.name} {item.desc}</Text>
					})}
				</View>

			</ScrollView>
		)
	}
}

export default TestView
