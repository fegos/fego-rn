import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Animated,
	Dimensions,
	Text,
	ART,
	TouchableWithoutFeedback,
	View,
	StyleSheet,
	Easing
} from 'react-native';
import Item from './Item';
import UIComponent from '../../common/UIComponent';
import Modal from '../Modal';

const { width, height } = Dimensions.get('window')
const { Shape, Path, Surface } = ART;

export default class Popover extends UIComponent {
	static defaultProps = {
		// Popover 标题
		title: '',
		// Popover 的内容
		content: [],
		// 是否显示 Popover 的三角
		showTriangle: true,
		// 三角形的高
		triangleHeight: 8,
		// 三角形的宽
		triangleWidth: 10,
		// Popover 出现的位置
		placement: 'bottom',
		// Popover 距离 trigger 的边距
		offset: 5,
		// 是否能点击遮罩关闭 Popover
		maskClosable: true,
		// 动画时间
		animateTime: 300
	}
	static propTypes = {
		// Popover 标题
		title: PropTypes.node,
		// Popover 的内容
		content: PropTypes.array,
		// 控制Popover的三角形是否显示
		showTriangle: PropTypes.bool,
		// 三角形的高
		triangleHeight: PropTypes.number,
		// 三角形的宽
		triangleWidth: PropTypes.number,
		// Popover 出现的位置
		placement: PropTypes.oneOf(['top', 'topLeft', 'topRight', 'bottom', 'bottomLeft', 'bottomRight', 'left', 'leftTop', 'leftBottom', , 'right', 'rightTop', 'rightBottom']),
		// Popover 距离 trigger 的边距
		offset: PropTypes.number,
		// 是否能点击遮罩关闭 Popover
		maskClosable: PropTypes.bool,
		// 动画时间
		animateTime: PropTypes.number,
	}
	static autoStyleSheet = false

	constructor(props) {
		super(props)

		this.state = {
			visible: false,
			original: {X: 0, Y: 0},
			triggerSize: {tWidth: 0, tHeight: 0},
			overlaySize: {oWidth: 0, oHeight: 0},
		}

		let child = React.Children.map(this.props.children, child => child );
		this.hasOneChild = child.length === 1
		if (!this.hasOneChild) {
			console.log('Popover 接收且仅接收一个子元素')
		}
	}
	_measureContainer = (visible = false) => {
		this.container.measure((x, y, w, h, pageX, pageY) => {
			let _state = {
				// 容器左上角点在屏幕中的位置
				original: {
					X: pageX % width,
					Y: pageY % height
				},
				// 容器的宽高
				triggerSize: {
					tWidth: w,
					tHeight: h
				}
			}
			if (visible) _state.visible = true

			this.setState(_state)
		})
	}
	_onShowPopover = () => {
		this._measureContainer(true)
	}
	_onOverlayLayout = (e) => {
		this.overlay.measure((x, y, width, height) => {
			// 记录泡泡内容的宽高
			this.setState({
				overlaySize: {
					oWidth: width,
					oHeight: height
				}
			})
		})
	}
	_getOverlayPosition() {
		let { original, triggerSize, overlaySize } = this.state,
			{ X, Y } = original,
			{ tWidth, tHeight } = triggerSize,
			{ oWidth, oHeight } = overlaySize,
			{ showTriangle, triangleHeight, offset, placement } = this.props;

		let placementMap = {
			// 上
			'topLeft': {
				top: Y - oHeight - offset - (showTriangle ? triangleHeight : 0),
				left: X,
			},
			'top': {
				top: Y - oHeight - offset - (showTriangle ? triangleHeight : 0),
				left: X + tWidth / 2 - oWidth / 2
			},
			'topRight': {
				top: Y - oHeight - offset - (showTriangle ? triangleHeight : 0),
				left: X + tWidth - oWidth
			},
			// 下
			'bottomLeft': {
				top: Y + tHeight + offset + (showTriangle ? triangleHeight : 0),
				left: X,
			},
			'bottom': {
				top: Y + tHeight + offset + (showTriangle ? triangleHeight : 0),
				left: X + tWidth / 2 - oWidth / 2
			},
			'bottomRight': {
				top: Y + tHeight + offset + (showTriangle ? triangleHeight : 0),
				left: X + tWidth - oWidth
			},
			// 左
			'leftTop': {
				top: Y,
				left: X - oWidth - offset - (showTriangle ? triangleHeight : 0),
			},
			'left': {
				top: Y + tHeight / 2 - oHeight / 2,
				left: X - oWidth - offset - (showTriangle ? triangleHeight : 0)
			},
			'leftBottom': {
				top: Y + tHeight - oHeight,
				left: X - oWidth - offset - (showTriangle ? triangleHeight : 0)
			},
			// 右
			'rightTop': {
				top: Y,
				left: X + tWidth + offset + (showTriangle ? triangleHeight : 0),
			},
			'right': {
				top: Y + tHeight / 2 - oHeight / 2,
				left: X + tWidth + offset + (showTriangle ? triangleHeight : 0)
			},
			'rightBottom': {
				top: Y + tHeight - oHeight,
				left: X + tWidth + offset + (showTriangle ? triangleHeight : 0)
			}
		}

		return placementMap[placement]
	}
	_getTrianglePosition() {
		let style = this.style,
			{ overlaySize } = this.state,
			{ oWidth, oHeight } = overlaySize,
			{ triangleHeight, triangleWidth, placement } = this.props;
		
		let triangleMap = {
			// 上
			'topLeft': {
				top: oHeight,
				left: 15,
			},
			'top': {
				top: oHeight,
				left: oWidth / 2 - triangleWidth / 2
			},
			'topRight': {
				top: oHeight,
				left: oWidth - 15 - triangleWidth
			},
			// 下
			'bottomLeft': {
				top: 0 - triangleHeight,
				left: 15,
			},
			'bottom': {
				top: 0 - triangleHeight,
				left: oWidth / 2 - triangleWidth / 2
			},
			'bottomRight': {
				top: 0 - triangleHeight,
				left: oWidth - 15 - triangleWidth
			},
			// 左
			'leftTop': {
				top: 15,
				left: oWidth
			},
			'left': {
				top: oHeight / 2 - triangleWidth / 2,
				left: oWidth
			},
			'leftBottom': {
				top: oHeight - 15 - triangleWidth,
				left: oWidth
			},
			// 右
			'rightTop': {
				top: 15,
				left: 0 - triangleHeight
			},
			'right': {
				top: oHeight / 2 - triangleWidth / 2,
				left: 0 - triangleHeight
			},
			'rightBottom': {
				top: oHeight - 15 - triangleWidth,
				left: 0 - triangleHeight
			}
		}

		return triangleMap[placement]
	}
	_getPath() {
		let { triangleHeight, triangleWidth, placement } = this.props,
			path;
		
		// 不支持 startsWidth
		if (placement.indexOf('top') === 0) {
			path = new Path()
				.moveTo(0, 0)
				.lineTo(triangleWidth / 2, triangleHeight)
				.lineTo(triangleWidth, 0)
				.close();
		} else if (placement.indexOf('bottom') === 0) {
			path = new Path()
				.moveTo(0, triangleHeight)
				.lineTo(triangleWidth, triangleHeight)
				.lineTo(triangleWidth / 2, 0)
				.close();
		} else if (placement.indexOf('left') === 0) {
			path = new Path()
				.moveTo(0, 0)
				.lineTo(0, triangleWidth)
				.lineTo(triangleHeight, triangleWidth / 2)
				.close();
		} else if (placement.indexOf('right') === 0) {
			path = new Path()
				.moveTo(triangleHeight, 0)
				.lineTo(0, triangleWidth / 2)
				.lineTo(triangleHeight, triangleWidth)
				.close();
		}

		return path;
	}
	_getSurfaceSize() {
		let { triangleHeight, triangleWidth, placement } = this.props,
			surfaceSize;
		
		// 不支持 startsWidth
		if (placement.indexOf('top') === 0 || placement.indexOf('bottom') === 0) {
			return {
				width: triangleWidth,
				height: triangleHeight
			}
		} else if (placement.indexOf('left') === 0 || placement.indexOf('right') === 0) {
			return {
				width: triangleHeight,
				height: triangleWidth
			}
		}
	}
	_renderOverlayaTitle() {
		let { title } = this.props,
			style = this.style, 
			titleEl;
		
		if (!title) return null;

		if (typeof title === 'string' || typeof title === 'number') {
			titleEl = (
				<Text style={style.title}>{title}</Text>
			)
		} else if (React.isValidElement(item)) {
			titleEl = title
		}

		return (
			<View style={style.overlayTitle}>
			 {titleEl}
			</View>
		)
	}
	_renderOverlay() {
		let style = this.style,
			{ showTriangle, triangleHeight, triangleWidth, offset, placement, content } = this.props,
			cntLen = content.length,
			path, surfaceSize, trianglePos;

		if (showTriangle) {
			trianglePos = this._getTrianglePosition();
			path = this._getPath();
			surfaceSize = this._getSurfaceSize();
		}

		let cnt = content.map((c, i) => {
			let newProps = {
				key: i,
				last: i === (cntLen - 1)
			};

			if (c.props.onPress) {
				newProps.onAfterItemPress = this._onHidePopover.bind(this)
			}

			return React.cloneElement(c, newProps)
		});

		return (
			<View 
				style={[style.overlayContainer, {overflow: 'visible'}]}
				ref={o => {this.overlay = o}} 
				onLayout={this._onOverlayLayout}
			>
				{this._renderOverlayaTitle()}
				<View style={style.overlayContent}>
					{cnt}
				</View>
				{showTriangle ? (
					<View style={[{position: 'absolute'}, trianglePos]}>
						<Surface {...surfaceSize}>
							<Shape d={path} fill={style.overlayContainer.backgroundColor} />
						</Surface>
					</View>
				) : null}
			</View>
		)
	}
	_renderTrigger() {
		let { children } = this.props,
			style = this.style,
			trigger;

		if (typeof children === 'string') {
			trigger = (
				<Text style={style.triggerText}>{children}</Text>
			);
		} else if (React.isValidElement(children)) {
			trigger = children
		}

		return (
			<TouchableWithoutFeedback onPress={this._onShowPopover}>
				<View style={style.triggerContainer}>{trigger}</View>
			</TouchableWithoutFeedback>
		)
	}
	_onHidePopover = () => {
		// 直接设置 visible 属性为 false 即可，
		/**
		 * 直接设置 visible 属性为 false 即可，
		 * modal 组件会根据 maskClosable 属性决定是否调用 onClose 回调
		 */
		this.setState({
			visible: false
		})
	}
	_onContainerLayout = (e) => {
		// this._measureContainer()
	}
	render() {
		if (!this.hasOneChild) return <view />;
		
		let style = this.style,
			{ children, maskClosable, animateTime } = this.props,
			{ visible, opacity } = this.state,
			contentOffset = this._getOverlayPosition();
	

		let { showTriangle, triangleHeight, triangleWidth, offset, placement, content } = this.props,
			cntLen = content.length,
			path, surfaceSize, trianglePos;

		if (showTriangle) {
			trianglePos = this._getTrianglePosition();
			path = this._getPath();
			surfaceSize = this._getSurfaceSize();
		}

		return (
			<View 
				ref={c => {this.container = c}} 
				onLayout={this._onContainerLayout} 
				style={style.container}
			>
				{this._renderTrigger()}
				<Modal
					animationType= 'fade'
					scale={false}
					visible={visible}
					maskClosable={maskClosable}
					animateAppear={false}
					animationDuration={animateTime}
					onClose={this._onHidePopover}
					contentStyle={{
						overflow: 'visible',
						position: 'absolute',
						backgroundColor: 'transparent',
						...contentOffset
					}}
				>
					{this._renderOverlay()}
				</Modal>
			</View>
			
		)
	}
}

Popover.Item = Item;

Popover.baseStyle = {
	container: {
	},
	triggerContainer: {
	},
	triggerText: {},
	overlayContainer: {
		backgroundColor: '#fff',
		borderRadius: 4,
	},
	overlayTitle: {
		padding: 10,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: '#bdbdbd',
		backgroundColor: 'transparent'
	},
	title: {
		fontSize: 16,
		color: '#333'
	},
	overlayContent: {
		paddingHorizontal: 5
	},
};