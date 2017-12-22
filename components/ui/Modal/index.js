/**
 * 模态框组件
 * 模态框是唯一的，多模态框在安卓平台可以，但IOS不行。
 * http://react-component.github.io/
 * @author esky 
 */
import React from 'react'
import PropTypes from 'prop-types'
import {
	View,
	Text,
	Modal,
	StyleSheet,
	Easing,
	Animated,
	Dimensions,
	TouchableWithoutFeedback
} from 'react-native'
import UIComponent from '../../common/UIComponent'

const screen = Dimensions.get('window');
export default class NSIPModal extends UIComponent {
	static defaultProps = {
		animationType: 'fade',
		animateAppear: false,
		animationDuration: 300,
		visible: false,
		maskClosable: true,
		onClose: () => { },
		onAnimationEnd: visible => { },
		scale: true
	}
	static propTypes = {
		visible: PropTypes.bool,
		maskClosable: PropTypes.bool,
		animationType: PropTypes.string,
		animateAppear: PropTypes.bool,
		animationDuration: PropTypes.number,
		onClose: PropTypes.func,
		onAnimationEnd: PropTypes.func,
		scale: PropTypes.bool,
	}
	constructor(props) {
		super(props);
		let { visible } = this.props;
		this.state = {
			position: new Animated.Value(this._getPosition(visible)),
			scale: new Animated.Value(this._getScale(visible)),
			opacity: new Animated.Value(this._getOpacity(visible)),
			modalVisible: visible
		}
	}
	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		if (this.shouldComponentUpdate(nextProps)) {
			// 一直可见，直到动画结束
			this.setState({
				modalVisible: true
			});
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.visible || this.props.visible !== nextProps.visible) {
			return true;
		}
		if (nextState) {
			if (nextState.modalVisible !== this.state.modalVisible) {
				return true;
			}
		}
		return false;
	}
	componentDidMount() {
		if (this.props.animateAppear && this.props.animationType !== 'none') {
			this.componentDidUpdate({});
		}
	}
	componentDidUpdate(prevProps) {
		var props = this.props;

		if (prevProps.visible !== props.visible) {
			this._animateDialog(props.visible);
		}
	}
	// componentWillUnmount() {
	// 	this._stopDialogAnim();
	// 	this._stopMaskAnim();
	// 	this.setState({
	// 		modalVisible: false
	// 	})
	// }
	_animateMask(visible) {
		this._stopMaskAnim();
		this.state.opacity.setValue(this._getOpacity(!visible));
		this.animMask = Animated.timing(this.state.opacity, {
			toValue: this._getOpacity(visible),
			duration: this.props.animationDuration
		});
		this.animMask.start(() => {
			this.animMask = null;
		});
	}
	_stopMaskAnim() {
		if (this.animMask) {
			this.animMask.stop();
			this.animMask = null;
		}
	}
	_stopDialogAnim() {
		if (this.animDialog) {
			this.animDialog.stop();
			this.animDialog = null;
		}
	}
	_animateDialog(visible) {
		let animationType = this.props.animationType;

		this._stopDialogAnim();
		this._animateMask(visible);

		if (animationType !== 'none') {
			if (animationType === 'slide' || animationType === 'slide-up' || animationType === 'slide-down') {
				this.state.position.setValue(this._getPosition(!visible));
				this.animDialog = Animated.timing(this.state.position, {
					toValue: this._getPosition(visible),
					duration: this.props.animationDuration,
					easing: visible ? Easing.elastic(0.8) : undefined
				});
			} else if (animationType === 'fade') {
				this.animDialog = Animated.parallel([Animated.timing(this.state.opacity, {
					toValue: this._getOpacity(visible),
					duration: this.props.animationDuration,
					easing: visible ? Easing.elastic(0.8) : undefined
				}), Animated.spring(this.state.scale, {
					toValue: this._getScale(visible),
					duration: this.props.animationDuration,
					easing: visible ? Easing.elastic(0.8) : undefined
				})]);
			}
			this.animDialog.start(() => {
				this.animDialog = null;
				if (!visible) {
					this.setState({
						modalVisible: false
					})
				}
				this.props.onAnimationEnd(visible);
			});
		} else {
			if (!visible) {
				this.setState({
					modalVisible: false
				})
			}
		}
	}
	close() {
		this._animateDialog(false);
	}
	_maskClose() {
		if (this.props.maskClosable) {
			this.props.onClose();
		}
	}
	_getPosition(visible) {
		if (visible) {
			return 0;
		}
		return this.props.animationType === 'slide-down' ? -screen.height : screen.height;
	}
	_getScale(visible) {
		if (this.props.scale) return visible ? 1 : 1.05;
		return 1;
		
	}
	_getOpacity(visible) {
		return visible ? 1 : 0;
	}
	render() {
		let props = this.props;
		let style = this.style;

		if (!this.state.modalVisible) {
			return null;
		}
		let animationStyleMap = {
			none: {},
			'slide': { transform: [{ translateY: this.state.position }] },
			'slide-up': { transform: [{ translateY: this.state.position }] },
			'slide-down': { transform: [{ translateY: this.state.position }] },
			fade: { transform: [{ scale: this.state.scale }], opacity: this.state.opacity }
		};
		return React.createElement(Modal, {
			visible: true,
			transparent: true,
			onRequestClose: this.props.onClose.bind(this)
		}, React.createElement(View, {
			style: [style.container]
		}, React.createElement(TouchableWithoutFeedback, {
			onPress: this._maskClose.bind(this)
		}, React.createElement(Animated.View, {
			style: [style.absolute, { opacity: this.state.opacity }]
		}, React.createElement(View, {
			style: [style.absolute, style.mask]
		}))), React.createElement(Animated.View, { style: [style.content, animationStyleMap[props.animationType]] }, this.props.children)));
	}
}
// 基础样式
NSIPModal.baseStyle = {
	container: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0)'
	},
	mask: {
		backgroundColor: 'black',
		opacity: .5
	},
	content: {
		backgroundColor: 'white'
	},
	absolute: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	}
};