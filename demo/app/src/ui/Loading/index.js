import React, { Component } from 'react'
import { ScrollView, Text, View, StyleSheet } from 'react-native'
import { Style } from '../../../common'
import { Loading,Toast, List, Dialog, Button, Tag } from 'fego-rn'

const ListItem = List.ListItem;

export default class Page extends Component {
	loadingToast() {
		Loading.start();
		setTimeout(e => {
			Loading.stop();
			Toast.info('5秒后手动关闭了Loading', 1);
		}, 5000)
	}
	waitingToast() {
		Loading.startModal();
		setTimeout(e => {
			Loading.stop();
			Toast.info('5秒后手动关闭了Loading', 1);
		}, 5000)
	}

	waitingNomask(){
		Loading.startModal('处理中',false);
		setTimeout(e => {
			Loading.stop();
			Toast.info('5秒后手动关闭了Loading', 1);
		}, 5000)
	}
	
	blackLoadingToast(){
		Loading.start('加载中...',2,{loadingColor:'black'});
	}
	render() {
		return (
			<ScrollView style={Style.container}>
				<List>
					<ListItem onPress={this.loadingToast} title='加载中，可操作，手动Loading.stop()' />
					<ListItem onPress={this.blackLoadingToast} title='设置Loading icon的颜色为黑色'/>
					<ListItem onPress={this.waitingToast} title='等待中，遮罩,禁止操作，直到Loading.stop()' />
					<ListItem onPress={this.waitingNomask} title='等待中，无遮罩,禁止操作，直到Loading.stop()'/>
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