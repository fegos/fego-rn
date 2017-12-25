'use strict'
import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { Style } from '../../../common'
import { Fetch, Button } from 'fego-rn'

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
		Fetch.get('http://localhost:3001/api/test/fetch/list', {
			params: {
				pageSize: 10,
				pageNo: 3
			}
		}).then(res => {
			this.setState({
				fetchMsg: '成功',
				list: res.data.data.result
			})
		}).catch(err => {
			if (!err) return;
			this.setState({
				fetchMsg: '失败 ' + err.message
			})
		});
	}
	// fetchData2() {
	// 	this.setState({
	// 		fetchMsg: '数据加载中...'
	// 	})
	// 	this.fetch = Fetch.create({
	// 		// canAbort: false
	// 	});
	// 	this.fetch.get('http://localhost:3001/api/test/fetch/list', {
	// 		pageSize: 10,
	// 		pageNo: 3
	// 	}).then(res => {
	// 		this.setState({
	// 			fetchMsg: '成功',
	// 			list: res.datadata.result
	// 		})
	// 	}).catch(err => {
	// 		if (!err) {
	// 			this.setState({
	// 				fetchMsg: '请求被忽略了，此时页面不用提示异常，由拦截器统一处理'
	// 			})
	// 			return;
	// 		}
	// 		this.setState({
	// 			fetchMsg: '失败 ' + err.message
	// 		})
	// 	});
	// }
	// fetchData3() {
	// 	this.setState({
	// 		fetchMsg: '数据加载中...'
	// 	})
	// 	Fetch.create({ hostKey: 'other', timeout: 2000 }).get('other/host').then(data => {
	// 		this.setState({
	// 			fetchMsg: '成功'
	// 		})
	// 	}).catch(err => {
	// 		if (!err) return;
	// 		this.setState({
	// 			fetchMsg: '失败 ' + err.message,
	// 			result: 'hostKey=other :' + err.url
	// 		})
	// 	});
	// }
	// abort() {
	// 	this.fetch.abort();
	// }
	fetchTimeout() {
		this.setState({
			fetchMsg: '数据加载中...'
		})
		Fetch.create({ timeout: 300 }).get('http://localhost:3001/api/test/fetch/list').then(res => {
			this.setState({
				fetchMsg: '成功',
				list: res.data.data.result
			})
		}).catch(err => {
			if (!err) return;
			this.setState({
				fetchMsg: '失败 ' + err.message
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
					{/*<Button title="请求2" onPress={this.fetchData2.bind(this)}></Button>
					<Button title="忽略请求2" onPress={this.abort.bind(this)}></Button>
					<Button title="请求不同的host，延迟2秒超时" onPress={this.fetchData3.bind(this)}></Button>*/}
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
