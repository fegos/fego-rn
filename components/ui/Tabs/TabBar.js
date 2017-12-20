import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
	Text,
	View,
	Animated,
	ScrollView,
	StyleSheet,
	TouchableWithoutFeedback
} from 'react-native';

export default class DefaultTabBar extends Component {
	static defaultProps = {
		onTabClick: () => {},
		onScrollEnd: () => {},
		onAnimationEnd: () => {},
	}

	static propTypes = {
		// tab 标签
		tabs: PropTypes.array,
		// 当前激活的 tab 在 tabs 数组中的下标
		activeIdx: PropTypes.number,
		// animated value, 用户控制下划线的位置
		aniScrollIdx: PropTypes.object, // animated value
		// tabBar 容器宽
		containerWidth: PropTypes.number,
		// 内容区宽
		viewWidth: PropTypes.number,
		// 点击 tab 标签的回调
		onTabClick: PropTypes.func,
		// tabBar 可滚动时，滚动后的回调，参数为滚动后的 x 方向上的位移
		onScrollEnd: PropTypes.func,
		// tabBar 位置更新后的回调
		onAnimationEnd: PropTypes.func,
		// tabBar 容器样式
		style: View.propTypes.style,
		// tab 标签样式
		tabStyle: View.propTypes.style,
		// tab 文字样式
		textStyle: Text.propTypes.style,
		// 激活态文字样式
		activeTextStyle: Text.propTypes.style,
		// 激活态下划线样式
		activeUnderlineStyle: View.propTypes.style,
	}

	constructor(props) {
		super(props)

		this._itemWidth = this._getItemWidth(props);
		this.state = {
			aniLeft: new Animated.Value(props.activeIdx * this._itemWidth)
		}
	}

	componentWillReceiveProps(nextProps) {
		let index = nextProps.activeIdx;

		if (index !== this.props.activeIdx) {
			this._itemWidth = this._getItemWidth(nextProps);

			if (this._handler) {
				this._handler.stop()
				this._handler = null
			}
			
			this._handler = Animated.timing(
				this.state.aniLeft,
				{
					toValue: index * this._itemWidth,
					duration: 350
				}
			).start( () => {
				console.log('tabbar scroll end')
				this._handler = null;
				this.props.onAnimationEnd(index)
			})
		}
	}

	_getItemWidth(props) {
		let { containerWidth, viewWidth, tabs } = props;

		return (containerWidth ? containerWidth : viewWidth) / tabs.length;
	}

	_onTabClick = (tab) => {
		this.props.onTabClick(tab._key, tab.label, tab.index) 
	}

	// _onScroll = (e) => {
	// }
	// _onMomentumScrollBegin = (e) => {
	// }
	// _onMomentumScrollEnd = (e) => {
	// }
	// _onScrollBeginDrag = (e) => {
	// }

	_onScrollEndDrag = (e) => {
		this.props.onScrollEnd(e.nativeEvent.contentOffset.x);
	}

	renderTab(tab, activeIdx) {
		let isTabActive = activeIdx === tab.index,
			{ textStyle, activeTextStyle } = this.props,
			_activeTextStyle = isTabActive ? activeTextStyle : {};

		return (
			<TouchableWithoutFeedback
				style={{flex: 1}}
				key={tab.index}
				accessible={true}
				accessibilityLabel={tab.label}
				accessibilityTraits='button'
				onPress={this._onTabClick.bind(this, tab)}
			>
				<View style={this.props.tabStyle}>
					<Text style={[textStyle, _activeTextStyle]}>{tab.label}</Text>
				</View>
			</TouchableWithoutFeedback>
		);
	}

	render() {
		let { containerWidth, viewWidth, tabs, style, activeIdx, activeUnderlineStyle, aniScrollIdx } = this.props,
			width = containerWidth ? containerWidth : viewWidth;
		
		// let left = aniScrollIdx.interpolate({
		// 	inputRange: [0, 1], outputRange: [0, this._itemWidth],
		// });

		let cnt = (
			<View style={style}>
				{tabs.map( tab => this.renderTab(tab, activeIdx) )}
				<Animated.View style={[tabStyle.tabUnderline, {
					width: this._itemWidth,
					// left: left
					left: this.state.aniLeft
				}, activeUnderlineStyle]} />
			</View>
		)

		return width > viewWidth ? (
			<View style={[{width: viewWidth}]} >
				<ScrollView
					horizontal
					/**
					 * 当值为true时，滚动条会停在滚动视图的尺寸的整数倍位置，可以用在水平分页上
					 * 默认值为false
					 * 此处为防止以后忘记以及加以提醒，还是显示的设置为 false
					 */
					pagingEnabled={false}
					automaticallyAdjustContentInsets={false}
					ref={s => {this._scrollView = s}}
					// onScrollBeginDrag={this._onScrollBeginDrag}
					onScrollEndDrag={this._onScrollEndDrag}
					// onMomentumScrollBegin={this._onMomentumScrollBegin}
					// onMomentumScrollEnd={this._onMomentumScrollEnd}
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					bounces={false}
					alwaysBounceVertical={false}
					alwaysBounceHorizontal={false}
				>
					{cnt}
				</ScrollView>
			</View>
		) : cnt
	}
}

const tabStyle = StyleSheet.create({
	tabUnderline: {
		position: 'absolute',
		height: 4,
		bottom: 0,
	}
})