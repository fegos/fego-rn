import React, { Component } from 'react'
import { ScrollView, Text, View, StyleSheet } from 'react-native'
import { Style } from '../../../common'
import { Toast, List, Dialog, Button, Tag } from 'fego-rn'

const ListItem = List.ListItem;

export default class Page extends Component {
	showToast() {
		Toast.info('这是一个 toast 提示!!!', 3);
	}
	successToast() {
		Toast.success('加载成功!!!', 3,{ backgroundColor: '#3af568' });
	}
	failToast() {
		Toast.fail('加载失败!!!', 3);
	}
	offline() {
		Toast.offline('网络连接失败!!!', 3);
	}
	loadingToast() {
		Toast.loading();
		setTimeout(e => {
			Toast.hide();
			Toast.info('5秒后手动关闭了Toast', 1);
		}, 5000)
	}
	waitingToast() {
		Toast.waiting();
		setTimeout(e => {
			Toast.hide();
			Toast.info('5秒后手动关闭了Toast', 1);
		}, 5000)
	}
	blackLoadingToast(){
		Toast.loading('加载中...',2,{loadingColor:'black'});
	}
	callbackToast(){
		Toast.info('动画结束后执行回调，显示执行回调',2,{ 
			onClose:()=>{
				console.log('回调执行');
				setImmediate(()=>{
					Toast.info('回调执行');
				})
			}
		})
	}
	multToast() {
		Toast.info('第一个持续3秒，2秒后触发下一个', 3);
		setTimeout(e => {
			Toast.info('第二个持续10秒，2秒后触发下一个 ', 10);
			setTimeout(e => {
				Toast.info('第三个持续2秒，4秒后触发下一个 ', 2);
				setTimeout(e => {
					Toast.info('第四个持续5秒，结束', 5);
				}, 4000)
			}, 2000)
		}, 2000)
	}
	render() {
		return (
			<ScrollView style={Style.container}>
				<List>
					<ListItem onPress={this.showToast} title='纯文字 toast' />
					<ListItem onPress={this.successToast} title='成功 toast' />
					<ListItem onPress={this.failToast} title='失败 toast' />
					<ListItem onPress={this.offline} title='网络 toast' />
					<ListItem onPress={this.loadingToast} title='加载中，可操作，手动Toast.hide()' />
					<ListItem onPress={this.blackLoadingToast} title='设置loading icon的颜色为黑色'/>
					<ListItem onPress={this.callbackToast} title='带回调函数的Toast' />
					<ListItem onPress={this.waitingToast} title='等待中，遮罩禁止操作，直到Toast.hide()' />
					<ListItem onPress={this.multToast} title='多Toast连续触发' />
					<ListItem onPress={e => {
						Toast.show(
							<View style={{ backgroundColor: '#F1AAAA', justifyContent: 'center', }}>
								<Button title='按钮' style={{ marginBottom: 5 }} />
								<Tag text='标签' />
							</View>, {
								duration: 2,
								styles: {
									inner: {
										padding: 10,
										backgroundColor: '#F1AAAA'
									}
								}
							})
					}} title='自定义内容' />
				</List>
			</ScrollView>
		)
	}
}

var styles = StyleSheet.create({
	text: {
		color: '#333333',
		flex: 1
	},
	view: {
		flexDirection: 'row',
		marginTop: 10
	}
})