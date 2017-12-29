---
title: RefreshView
subTitle: 上下拉刷新
---

# 上下拉刷新

### 组件描述
提供上下拉刷新能力

### 代码示例
~~~js
constructor(props) {
	super(props);
	var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
	this.data = ['我是一个cell', '我是一个cell', '我是一个cell', '我是一个cell', '我是一个cell', '我是一个cell', '我是一个cell', '我是一个cell', '我是一个cell', '我是一个cell'];
	this.state = {
		dataSource: ds.cloneWithRows(this.data),
	}
}

<RefreshView
	onRefresh={(RefreshView) => this.onRefresh(RefreshView)}
	onLoadMore={(RefreshView) => this.onLoadmore(RefreshView)}
	useLoadMore={true}
>
	<ListView
		dataSource={this.state.dataSource}
		renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
		renderRow={(rowData) => <View style={styles.rowItem}><Text style={{ fontSize: 16 }}>{rowData}</Text></View>}
	/>
</RefreshView>

onRefresh(RefreshView) {
	console.log('refresh');
	setTimeout(function () {
		RefreshView.refreshed();
	}, 5000);
}

onLoadmore(RefreshView) {
	var self = this;
	setTimeout(function () {

		self.data = self.data.concat(['我是一个cell(新)']);
		self.setState({
			dataSource: self.state.dataSource.cloneWithRows(self.data)
		});
		RefreshView.loaded();
		//没有数据了，没有加载更多，则useLoadMore赋值为false
	}, 5000);
	console.log('onLoadMore');
}
~~~

## API
### api 接口：
### refreshed()
当刷新完成后调用，用以将视觉还原。
### loaded()
当加载更多数据完成后调用，用于将视觉还原，并且设定当前为可滑动状态。
### props列表

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| onStatusChange | 刷新状态回调 | function | |
| onRefresh | 触发刷新的回调 | function | |
| onLoadMore | 触发加载更多的回调 | function | |
| topIndicatorHeight | 顶部下拉高度 | number | config.topHeight读取：60|
| bottomIndicatorHeight | 底部上拉高度 | number | config.bottomHeight读取：60 |
| pullImageView | 下拉gif图片数组 | array | 使用内置ImageManager中加载图片数组|
| loadMoreView | 加载更多gif图片数组 | array | 使用内置ImageManager中加载图片数组|
| duration | 动画持续时长 | number | 300 |
| refreshType | 刷新的type，有text，normal，custom可选 | string | 'normal'|
| useLoadMore | 是否有加载更多功能 | boolen | false|
| customView | 自定义头部 | object | null|
| customBottomView | 自定义底部 | object | null|
| styleType | 内部加载图片的样式 | string | config.styleType读取：'light'|


### 样式对象styles