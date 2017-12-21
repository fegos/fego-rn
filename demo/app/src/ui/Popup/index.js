import React, { Component } from 'react'
import { ScrollView, Text, View, Animated } from 'react-native'
import { Style } from '../../../common'
import { List, Popup, Button, Checkbox, Icon, Toast, Dialog } from 'fego-rn'

const ListItem = List.ListItem;

export default class Page extends Component {

	static navigationOptions = {
		title: '弹层Popup'
	}

	state = {
		closeType: '',
		visible: false,
		aniIn: 'top'
	}

	_pop = (aniIn, location) => {
		this.setState({
			visible: true,
			aniIn: aniIn,
			title: '标题:' + aniIn,
			location: location
		})
	}
	popNum = 0
	/**
	 * API标准用法
	 */
	_popShow = () => {
		this.popNum++;
		let SelfView = (
			<View style={{ padding: 10 }} >
				<View style={{ paddingVertical: 20 }}>
					<Text>当前计数<Text style={{ color: '#E22', fontSize: 36 }}>{this.popNum}</Text></Text>
				</View>
				<View style={{ paddingVertical: 20 }}>
					<Text>Api命令方式调用，Popup将处于顶层View，遮盖导航条</Text>
				</View>
				<Button type="primary" title="关闭当前Popup" onPress={() => Popup.hide()} />
				<Button type="primary" title="关闭所有Popup" onPress={() => Popup.hideAll()} />
				<Button type="primary" title="弹出Toast" onPress={() => Toast.info('Toast')} />
				<Button type="primary" title="下一个Popup" onPress={() => this._popShow()} />
			</View>
		)
		Popup.show(SelfView, {
			title: `第 ${this.popNum} 个Popup`,
			headerLeft: this.popNum > 1 ? true : false,
			aniIn: this.popNum > 1 ? (this.popNum % 2 > 0 ? 'right' : 'left') : 'bottom',
			// 退出方向可以自定义
			aniOutFn: type => type === 'headerLeft' ? null : 'bottom',
			onClose: (type) => {
				console.log('Popup close ' + type)
			},
			onAniEnd: (visible) => {
				if (visible) {
					// 窗口显示动画结束
				} else {
					this.popNum--;
					// 窗口隐藏动画结束
				}
			}
		})
	}
	render() {
		return (
			<View style={Style.container}>
				<ScrollView>
					<Text style={Style.title}>{'关闭时onClose接受参数：type=' + this.state.closeType}</Text>
					<List>
						<ListItem onPress={e => this._popShow()} title='命令方式Popup.show' />
						<ListItem onPress={e => this._pop('bottom')} title='底部弹出 aniIn=bottom' />
						<ListItem onPress={e => this._pop('top')} title='顶部弹出 aniIn=top' />
						<ListItem onPress={e => this._pop('top', 'top')} title='顶部弹出且置顶 aniIn=top location=top' />
						<ListItem onPress={e => this._pop('left')} title='左下弹出 aniIn=left' />
						<ListItem onPress={e => this._pop('right')} title='右下弹出 aniIn=right' />
						<ListItem onPress={e => this._pop('left', 'top')} title='左上弹出 aniIn=left location=top' />
						<ListItem onPress={e => this._pop('right', 'top')} title='右上弹出 aniIn=right location=top' />
						<ListItem onPress={e => {
							this.setState({
								visible: true,
								aniIn: 'bottom',
								location: 'bottom',
								title: false,
							})
						}} title='无标题' />
						<ListItem onPress={e => {
							this.setState({
								visible: true,
								aniIn: 'bottom',
								location: 'bottom',
								title: '头部左右侧图标',
								headerLeft: true,
								headerRight: true,
							})
						}} title='标题显示左侧右侧图标' />
						<ListItem onPress={e => {
							this.setState({
								visible: true,
								aniIn: 'bottom',
								location: 'bottom',
								title: <Icon style={{ flex: 1, paddingHorizontal: 40 }} name='free-code-camp'>任意元素</Icon>,
								headerLeft: <View style={{ paddingHorizontal: 10 }}><Text style={{ fontSize: 12, color: '#999' }}>取消</Text></View>,
								headerRight: '确定',
							})
						}} title='自定义头部' />
						<ListItem onPress={e => this.setState({ visible1: true })} title='多Popup叠加' />
					</List>
				</ScrollView>
				<Popup
					title={this.state.title}
					visible={this.state.visible}
					location={this.state.location}
					aniIn={this.state.aniIn}
					headerLeft={this.state.headerLeft}
					headerRight={this.state.headerRight}
					onClose={(type) => {
						console.log('关闭类型：', type)
						this.setState({
							visible: false,
							closeType: type
						})
					}} >
					<View style={{ padding: 10 }} >
						<Text>从顶部或底部浮出的模态，提供标题和关闭按钮，展示和当前内容相关的信息或提供相关操作。</Text>
						<Text>提供基础的标题头，内容区则使用children指定。</Text>
						<Button type="primary" title="点我关闭" onPress={() => this.setState({ visible: false })} />
					</View>
				</Popup>
				<Popup
					title='第一步操作'
					visible={this.state.visible1}
					location='bottom'
					aniIn='bottom'
					onClose={(type) => {
						this.setState({ visible1: false })
					}} >
					<View style={{ minHeight: 100 }}>
						<Button title='打开第二个Popup' onPress={e => this.setState({ visible2: true })} />
					</View>
				</Popup>
				<Popup
					title='第二步操作'
					visible={this.state.visible2}
					aniIn='bottom'
					maskOpacity={0}
					headerLeft={true}
					headerRight={true}
					onClose={(type) => {
						if (type !== 'headerLeft') {
							return Toast.info('只能点击左侧返回');
						}
						this.setState({ visible2: false })
					}} >
					<View style={{ height: 300, backgroundColor: '#DDE' }}>
						<Button title='打开第三个Popup' onPress={e => this.setState({ visible3: true })} />
					</View>
				</Popup>
				<Popup
					title='第三步操作'
					visible={this.state.visible3}
					maskOpacity={0}
					location='bottom'
					aniIn='right'
					headerLeft={true}
					headerRight={true}
					onClose={(type) => {
						if (type !== 'headerLeft') {
							return Toast.info('只能点击左侧返回');
						}
						this.setState({ visible3: false })
					}} >
					<ScrollView style={{ height: 300, backgroundColor: '#EDE', padding: 10 }}>
						<View>
							<Text>第三步操作，不建议叠加超过三个</Text>
							<Text>alignItems enum('flex-start', 'flex-end', 'center', 'stretch')

alignItems决定了子元素在次轴方向的排列方式（此样式设置在父元素上）。例如若子元素本来是沿着竖直方向排列的（即主轴竖直，次轴水平），则alignItems决定了它们在水平方向的排列方式。此样式和CSS中的align-items表现一致，默认值为stretch。访问https://developer.mozilla.org/en-US/docs/Web/CSS/align-items来进一步了解。

alignSelf enum('auto', 'flex-start', 'flex-end', 'center', 'stretch')

alignSelf决定了元素在父元素的次轴方向的排列方式（此样式设置在子元素上），其值会覆盖父元素的alignItems的值。其表现和CSS上的align-self一致（默认值为auto）。访问https://developer.mozilla.org/en-US/docs/Web/CSS/align-self来进一步了解。

borderBottomWidth number

borderBottomWidth和CSS上的border-bottom-width表现一致。访问https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-width来进一步了解。

borderLeftWidth number

borderLeftWidth和CSS上的border-left-width表现一致。访问https://developer.mozilla.org/en-US/docs/Web/CSS/border-left-width来进一步了解。

borderRightWidth number

borderRightWidth 和CSS上的border-right-width表现一致。访问https://developer.mozilla.org/en-US/docs/Web/CSS/border-right-width来进一步了解。

borderTopWidth number

borderTopWidth和CSS上的border-top-width表现一致。访问https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-width来进一步了解。</Text>
						</View>
					</ScrollView>
				</Popup>
			</View>
		)
	}
}