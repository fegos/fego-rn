/**
 * 走马灯组件
 * @author asyxu 
 */
import React from 'react'
import PropTypes from 'prop-types'
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Dimensions
} from 'react-native'
import UIComponent from '../../common/UIComponent'

const windowWidth = Dimensions.get('window').width

export default class Carousel extends UIComponent {
	static defaultProps = {
		// 显示方向
		direction: 'horizontal',
		// 指示点样式，默认圆形, 默认可选值：circle, rect
		dotType: 'circle',
		// 轮播播放的时间间隔
		interval: 3000,
		// 自动播放
		autoPlay: true,
		// 无限循环
		infinite: true,
		// 初始从第几张开始，值为 index, 从 0 开始
		indexPage: 0,
		// 切换面板前的回调函数，可以通过返回 false 来阻止轮播
		onBeforeChange: (fromPage, toPage) =>{},
		// 切换面板后的回调函数，参数为切换后的 index (0 开始计算)
		onChange: (page) =>{},
		// onScrollBeginDrag 事件：开始拖拽时的回调，参数为事件对象
		onScrollBeginDrag: (e) => {},
		// 是否显示面板指示点
		showDot: true,
		// 是否显示分页信息
		showPagination: false,
		// 分隔符
		paginationSeparator: ' / ',
		// 左右翻动按钮
		showArrows: false,
		// 左按钮
		leftArrow: '<',
		// 右按钮
		rightArrow: '>',
	}

	static propTypes = {
		// 显示方向
		direction: PropTypes.string,
		// 指示点样式，默认圆形
		dotType: PropTypes.string,
		// 轮播播放的时间间隔
		interval: PropTypes.number,
		// 自动播放
		autoPlay: PropTypes.bool,
		// 无限循环
		infinite: PropTypes.bool,
		// 初始从第几张开始，值为 index, 从 0 开始
		indexPage: PropTypes.number,
		// 切换面板前的回调函数，可以通过返回 false 来阻止轮播
		onBeforeChange: PropTypes.func,
		// 切换面板后的回调函数，参数为切换后的 index (0 开始计算)
		onChange: PropTypes.func,
		// onScrollBeginDrag 事件：开始拖拽时的回调，参数为事件对象
		onScrollBeginDrag: PropTypes.func,
		// 是否显示面板指示点
		showDot: PropTypes.bool,
		// 是否显示分页信息
		showPagination: PropTypes.bool,
		// 分隔符
		paginationSeparator: PropTypes.string,
		// 左右翻动按钮
		showArrows: PropTypes.bool,
		// 左按钮
		leftArrow: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.string
		]),
		// 右按钮
		rightArrow: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.string
		])
	}

	constructor(props) {
		super(props)

		const size = { width: 0, height: 0 }
		this._children = this._handleChildren(props);
		this.state = {
			size,
			currentPage: props.indexPage,
			childrenLength: this._children.length,
		}
	}

	componentDidMount() {
		if (this.state.childrenLength) {
			this._setTimer()
		}
	}

	componentWillUnmount() {
		this._clearTimer()
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps)
		
		this._children = this._handleChildren(nextProps)
		this.setState({
			childrenLength: this._children.length
		})
		this._setTimer()
	}

	_handleChildren(props) {
		let { children } = props, newChildren = [];
		React.Children.forEach(children, (child) => {
			newChildren.push(child);
		});
		return newChildren;
	}

	_clearTimer = () => {
		this.timer && clearTimeout(this.timer)
	}

	_setTimer = () => {
		let { autoPlay, children, interval } = this.props
		if (autoPlay && children.length > 1) {
			this._clearTimer()
			this.timer = setTimeout(this._animateNextPage, interval)
		}
	}

	_animateNextPage = () => {
		let { currentPage } = this.state,
			{ infinite, indexPage } = this.props,
			nextPage = this._normalizePageNumber(currentPage + 1)
		
		/**
		 * “无限循环播放” 或是 “不无限循环播放，但是当前还未播放到最后一张”，需要继续播放下一张
		 * 这里 “最后一张” 目前的策略是 indexPage 的前一张，如果以 this.props.children 的最后一个为最后一张
		 * 应该将 nextPage 与 childrenLength 进行比较
		 */
		if ( infinite || ( !infinite && nextPage !== indexPage ) ) {
			this._animateToPage(nextPage)
		} else {
			this._clearTimer()
		}
	}

	_normalizePageNumber = (page) => {
		const { childrenLength } = this.state

		if (page === childrenLength) {
			return 0
		} else if (page >= childrenLength) {
			return 1
		}
		return page
	}

	_onBeforeChange (page) {
		let toPage = page,
			fromPage = page - 1 
		
		if ( fromPage < 0 ) fromPage = this.state.childrenLength - 1
		
		return this.props.onBeforeChange(fromPage, toPage)
	}

	_animateToPage = (page) => {
		this._clearTimer()

		if ( this._onBeforeChange(page) === false ) {
			return
		}

		let { childrenLength, size } = this.state,
			{ width, height } = size

		if ( this.props.direction === 'horizontal' ) {
			if ( page === 0 ) {
				this._scrollTo((childrenLength - 1) * width, 0, false)
				this._scrollTo(childrenLength * width, 0, true)
			} else if ( page === 1 ) {
				this._scrollTo(0, 0, false)
				this._scrollTo(width, 0, true)
			} else {
				this._scrollTo(page * width, 0, true)
			}
		} else {
			if ( page === 0 ) {
				this._scrollTo(0, (childrenLength - 1) * height, false)
				this._scrollTo(0, childrenLength * height, true)
			} else if ( page === 1 ) {
				this._scrollTo(0, 0, false)
				this._scrollTo(0, height, true)
			} else {
				this._scrollTo(0, page * height, true)
			}
		}
		
		/**
		 * 因为在 android 上 onMomentumScrollEnd 触发机制有问题，所以暂不使用 onMomentumScrollEnd 来启动计时器
		 * 采用的方案是：
		 * 在 onScrollBeginDrag 清楚计时器，在 onScrollEndDrag 更新拖拽后的位置，并启懂计时器
		 */
		this._setCurrentPage(page)
		this._setTimer()
	}

	_setCurrentPage = (currentPage) => {
		this.setState({ currentPage }, () => {
			// 触发 props 的 onChange 回调
			this.props.onChange(currentPage)
		})
	}

	_scrollTo = (offsetX, offsetY, animated) => {
		if (this.scrollView) {
			this.scrollView.scrollTo({ y: offsetY, x: offsetX, animated })
		}
	}

	_onScrollBeginDrag = (event) => {
		this._clearTimer()
		this.props.onScrollBeginDrag(event)
	}

	_onScrollEndDrag = (event) => {
		let { direction } = this.props,
			contentOffset = { ...event.nativeEvent.contentOffset },
			offset = direction === 'horizontal' ? contentOffset.x : contentOffset.y,
			page = this._calculateCurrentPage(offset)
		
		this._placeCritical(page)
		this._setCurrentPage(page)
		this._setTimer()
	}

	// _onMomentumScrollEnd = (event) => {	
	// 	console.log('NSIP Carousel: momentumScrollEnd')
	// 	let { direction } = this.props,
	// 		contentOffset = { ...event.nativeEvent.contentOffset },
	// 		offset = direction === 'horizontal' ? contentOffset.x : contentOffset.y,
	// 		page = this._calculateCurrentPage(offset)
		
	// 	// if (!event.nativeEvent.contentOffset) {
	// 	// 	let position = event.nativeEvent.position
	// 	// 	event.nativeEvent.contentOffset = {
	// 	// 		x: position * this.state.width,
	// 	// 		y: position * this.state.height
	// 	// 	}
	// 	// 	console.log(position)
	// 	// }

	// 	this._placeCritical(page)
	// 	this._setCurrentPage(page)
	// 	this._setTimer()
	// }

	_calculateCurrentPage = (offset) => {
		let { width, height } = this.state.size,
			{ direction } = this.props,
			denominator = direction === 'horizontal' ? width : height,
			cal = offset / denominator,
			page = ( cal % 1 ) >= 0.5 ? Math.ceil(cal) : Math.floor(cal)

		return this._normalizePageNumber(page)
	}

	_placeCritical = (page) => {
		const { childrenLength, size } = this.state
		const { width, height } = size

		if ( this.props.direction === 'horizontal' ) {
			if (childrenLength === 1) {
				this._scrollTo(0, 0, false)
			} else if (page === 0) {
				this._scrollTo(childrenLength * width, 0, false)
			} else if (page === 1) {
				this._scrollTo(width, 0, false)
			} else {
				this._scrollTo(page * width, 0, false)
			}
		} else {
			if (childrenLength === 1) {
				this._scrollTo(0, 0, false)
			} else if (page === 0) {
				this._scrollTo(0, childrenLength * height, false)
			} else if (page === 1) {
				this._scrollTo(0, height, false)
			} else {
				this._scrollTo(0, page * height, false)
			}
		}
	}

	_renderPagination = (pageLength) => {
		if (!this.state.childrenLength) return null;

		let style = this.style
		let { currentPage } = this.state,
			{ paginationSeparator } = this.props
		
		return (
			<View style={style.paginationContainer} pointerEvents="none">
				<View
					style={style.paginationWrapper}
				>
					<Text style={style.paginationText} >
						{`${currentPage + 1}${paginationSeparator}${pageLength}`}
					</Text>
				</View>
			</View>
		)
	}

	_renderDots = (pageLength) => {
		if (!this.state.childrenLength) return null;

		let style = this.style,
			{ currentPage } = this.state,
			{ direction, dotType } = this.props,
			attr = direction === 'horizontal' ? 'dotHorizontal' : 'dotVertical',
			rectDot = dotType === 'rect',
			dots = []

		for (let i = 0; i < pageLength; i += 1) {
			dots.push(
				<TouchableWithoutFeedback onPress={() => this._animateToPage(i)} key={`dot${i}`}>
					<View
						style={i === currentPage ?
							[style.dot, style.activeDot, rectDot && style[attr] ] :
							[style.dot, rectDot && style[attr]]}
					/>
				</TouchableWithoutFeedback>)
		}
		return (
			<View style={style.dotsWrapper}>{dots}</View>
		)
	}

	_renderLeftArrows = () => {
		if (!this.state.childrenLength) return null;

		let style = this.style
		let { currentPage, childrenLength } = this.state
		let { leftArrow } = this.props

		if (currentPage < 1) {
			currentPage = childrenLength
		}

		return (
			<View style={style.leftArrowContainer}>
				<TouchableOpacity 
					onPress={() => this._animateToPage(this._normalizePageNumber(currentPage - 1))} 
					style={[style.arrowWrapper, style.leftArrowWrapper]}
				>	
				{
					typeof leftArrow == 'string' ? 
						<Text style={style.arrowText}>{leftArrow}</Text>
						:
						leftArrow
				}
				</TouchableOpacity>
			</View>
		)
	}

	_renderRightArrows = () => {
		if (!this.state.childrenLength) return null;

		let style = this.style
		let { currentPage, childrenLength } = this.state
		let { rightArrow } = this.props

		if (currentPage < 1) {
			currentPage = childrenLength
		}

		return (
			<View style={style.rightArrowContainer}>
				<TouchableOpacity 
					onPress={() => this._animateToPage(this._normalizePageNumber(currentPage + 1))} 
					style={[style.arrowWrapper, style.rightArrowWrapper]}
				>
				{
					typeof rightArrow == 'string' ? 
						<Text style={style.arrowText}>{rightArrow}</Text>
						:
						rightArrow
				}
				</TouchableOpacity>
			</View>
		)
	}

	_renderContent = () => {
		let style = this.style,
			{ size, childrenLength } = this.state,
			{ direction } = this.props,
			pages,
			horizontal = direction === 'horizontal'
		
		if (!childrenLength) {
			let emptyView = <View style={style.noChild}><Text style={{color: '#333'}}>您未添加任何轮播内容</Text></View>
			pages = [emptyView]
		} else if (childrenLength === 1) {
			pages = this._children.concat()
		} else {
			pages = this._children.concat()
			pages.push(this._children[0])
			pages.push(this._children[1])
		}

		pages = pages.map((page, i) => (
			<TouchableWithoutFeedback ref={`page${i}`} onLayout={this._onPagesLayout} style={{ ...size }} key={`page${i}`}>
				{page}
			</TouchableWithoutFeedback>
		))

		let wh = {
			width: horizontal ? size.width * (childrenLength > 1 ? (childrenLength + 2) : 1) : size.width,
			height: horizontal ? size.height : size.height * (childrenLength > 1 ? (childrenLength + 2) : 1)
		}

		return (
			<ScrollView
				ref={(c) => { this.scrollView = c }}
				onScrollBeginDrag={this._onScrollBeginDrag}
				onScrollEndDrag={this._onScrollEndDrag}
				onMomentumScrollEnd={this._onMomentumScrollEnd}
				alwaysBounceHorizontal={false}
				alwaysBounceVertical={false}
				contentInset={{ top: 0 }}
				automaticallyAdjustContentInsets={false}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				horizontal={horizontal}
				pagingEnabled
				bounces={false}
				contentContainerStyle={[
					{
						position: 'relative',
					},
					// this.props.contentContainerStyle,
					wh,
				]}
			>
				{pages}
			</ScrollView>
		)
	}

	_onPagesLayout = ( e ) => {
		let { x, y, width, height } = e.nativeEvent.layout,
			{ size } = this.state,
			stateWidth = size.width,
			stateHeight = size.height,
			newWidth = width > stateWidth ? width : stateWidth,
			newHeight = height > stateHeight ? height : stateHeight
		this.setState({
			size: { width: newWidth, height: newHeight },
		})
		this._placeCritical(this.state.currentPage)
	}

	_onLayout = () => {
		this.container.measure((x, y, w, h) => {
			// this.setState({
			// 	size: { width: w, height: h },
			// })
			this.setState({
				size: { width: this.state.size.width, height: this.state.size.height },
			})
			this._placeCritical(this.state.currentPage)
		})
	}

	render() {
		let style = this.style,
			{ showArrows, showDot, showPagination, direction } = this.props,
			{ childrenLength } = this.state,
			horizontal = direction === 'horizontal'

		return (
			<View 
				ref={(c) => { this.container = c }}
				onLayout={this._onLayout}
				style={[style.container, {...this.state.size}]}
			>
				{this._renderContent()}
				{/* 水平才提供 arrow */}
				{horizontal && showArrows && this._renderLeftArrows(childrenLength)}
				{horizontal && showArrows && this._renderRightArrows(childrenLength)}
				{showDot && this._renderDots(childrenLength)}
				{showPagination && this._renderPagination(childrenLength)}
			</View>
		)
	}
}

Carousel.baseStyle = {
	noChild: {
		width: windowWidth,
		height: 100, 
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center'
	},
	// 容器
	container: {},
	// 指示点
	dotsWrapper: {
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
	},
	activeDot: {
		backgroundColor: '#fff',
	},
	// 分页
	paginationContainer: {
		position: 'absolute',
		bottom: 10,
		left: 0,
		right: 0,
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paginationWrapper: {
		width: 80,
		height: 20,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(234, 234, 234, 0.5)',
	},
	paginationText: {
		textAlign: 'center',
		color: '#2b2b2b',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	// 左右箭头
	leftArrowContainer: {
		position: 'absolute',
		left: 10,
		bottom: 0,
		top: 0,
		backgroundColor: 'transparent',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start'
	},
	rightArrowContainer: {
		position: 'absolute',
		right: 10,
		bottom: 0,
		top: 0,
		backgroundColor: 'transparent',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start'
	},
	arrowWrapper: {
		width: 34,
		height: 34,
		borderRadius: 3,
		backgroundColor: 'rgba(51, 51, 51, 0.3)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	leftArrowWrapper: {
	},
	rightArrowWrapper: {
	},
	arrowText: {
		color: '#fafafa'
	}
}

Carousel.themeStyle = {
	direction: {
		horizontal: {
			dotsWrapper: {
				left: 0,
				right: 0,
				bottom: 10,
				flexDirection: 'row',
			}
		},
		vertical: {
			dotsWrapper: {
				top: 0,
				right: 10,
				bottom: 0,
				flexDirection: 'column',
			}
		}
	},
	dotType: {
		circle: {
			dot: {
				margin: 5,
				width: 10,
				height: 10,
				borderRadius: 5,
				backgroundColor: 'rgba(31, 31, 31, 0.2)',
				borderColor: '#fff',
				borderWidth: 1,
			}
		},
		rect: {
			dot: {
				margin: 5,
				borderRadius: 2,
				backgroundColor: 'rgba(231, 231, 231, 0.4)',
			},
			dotHorizontal: {
				width: 18,
				height: 4,
			},
			dotVertical: {
				width: 4,
				height: 18,
			}
		}
	},
}