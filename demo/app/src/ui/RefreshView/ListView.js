
'use strict';
import React, { Component } from 'react';
import {
	View,
	ListView,
	Image,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	StyleSheet,
	Alert,
	ScrollView,
	Dimensions,
	InteractionManager,
	AppRegistry
} from 'react-native';

import { RefreshView, RefreshConfig } from 'fego-rn'

export default class Page extends Component {
	constructor(props) {
		super(props);
		var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.data = ['我是一个cell', '我是一个cell', '我是一个cell', '我是一个cell', '我是一个cell', '我是一个cell', '我是一个cell', '我是一个cell', '我是一个cell', '我是一个cell'];
		this.state = {
			dataSource: ds.cloneWithRows(this.data),
		}
	}

	onRefresh(PullRefresh) {
		console.log('refresh');
		setTimeout(function () {
			PullRefresh.refreshed();
		}, 5000);

	}

	onLoadmore(PullRefresh) {
		var self = this;
		setTimeout(function () {

			self.data = self.data.concat(['我是一个cell(新)']);
			self.setState({
				dataSource: self.state.dataSource.cloneWithRows(self.data)
			});
			PullRefresh.loaded();
			//没有数据了，没有加载更多，则useLoadMore赋值为false
		}, 5000);

		console.log('onLoadMore');
	}

	render() {
		return (
			<View style={styles.container}>
				<RefreshView
					onRefresh={(PullRefresh) => this.onRefresh(PullRefresh)}
					onLoadMore={(PullRefresh) => this.onLoadmore(PullRefresh)}
					useLoadMore={true}
				>
					<ListView
						dataSource={this.state.dataSource}
						renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
						renderRow={(rowData) => <View style={styles.rowItem}><Text style={{ fontSize: 16 }}>{rowData}</Text></View>}
					/>
				</RefreshView>
			</View>
		);
	}
}



const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	header: {
		height: 64,
		backgroundColor: '#293447',
	},
	rowItem: {
		flex: 1,
		height: 120,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ccc'
	},
	separator: {
		height: 1,
		backgroundColor: '#999',
	},
});
