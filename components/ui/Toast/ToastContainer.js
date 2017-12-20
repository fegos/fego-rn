import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, ActivityIndicator, StatusBar, Animated, Platform } from 'react-native'
import Icon from '../Icon'
import UIComponent from '../../common/UIComponent';

export default class ToastConatiner extends UIComponent {
	static defaultProps = {
		duration: 2,
		mask: false,
		iconTypes: {
			success: 'check-circle',
			fail: 'times-circle',
			offline: 'meh-o'
		},
		offsetY: 0
	}
	anim = '';
	static propTypes = {
		// Toast内容
		content: PropTypes.any,
		// 延时
		duration: PropTypes.number,
		// 关闭回调
		onClose: PropTypes.func,
		// 是否响应遮罩点击
		mask: PropTypes.bool,
		// Toast类型
		type: PropTypes.string,
		// 图标字体
		iconFamily: PropTypes.string,
		// 图标类型对象
		iconTypes: PropTypes.object,
		// Y轴偏移量
		offsetY: PropTypes.number,
		// 动画结束
		onAnimationEnd: PropTypes.func
	}
	static simpleStyleProps = {
		backgroundColor: {
			name: 'inner',
			attr: 'backgroundColor'
		},
		borderRadius: {
			name: 'inner',
			attr: 'borderRadius'
		}
	}
	constructor(props) {
		super(props);
		this.state = {
			fadeAmin: new Animated.Value(0),
		}
	}
	componentDidMount() {
		const { onClose, duration, onAnimationEnd } = this.props;
		const timing = Animated.timing;
		if (this.anim) {
			this.anim = null;
		}
		const animArr = [
			timing(this.state.fadeAmin, { toValue: 1, duration: 200 }),
			Animated.delay(duration * 1000)
		];
		if (duration > 0) {
			animArr.push(timing(this.state.fadeAmin, { toValue: 0, duration: 200 }));
		}
		this.anim = Animated.sequence(animArr);
		this.anim.start(() => {
			if (duration > 0) {
				this.anim = null;
				if (onClose) {
					onClose();
				}
				if (onAnimationEnd) {
					onAnimationEnd();
				}
			}
		});
	}
	componentWillUnmount() {
		if (this.anim) {
			this.anim.stop();
			this.anim = null;
		}
	}
	render() {
		let style = this.style
		const { type = '', content, mask, iconFamily, iconTypes, offsetY } = this.props;
		let iconDom = null;
		let contentDom = content;
		if (type === 'loading') {
			iconDom = <ActivityIndicator animating style={[style.centering]} color="white" size="large" />;
		} else if (type === 'info') {
			iconDom = null;
		} else if (type) {
			iconDom = <Icon family={iconFamily} name={iconTypes[type] || type} style={style.icon} />;
		}
		if (typeof contentDom === 'string') {
			contentDom = <Text style={style.text}>{contentDom}</Text>
		}
		return (
			<Animated.View 
				style={[style.container, mask ? style.mask : null, { top: offsetY, opacity: this.state.fadeAmin }]} 
				pointerEvents={mask ? 'auto' : 'box-none'}>
					<View style={[iconDom ? style.innerWithIcon : {}, style.inner]}>
						{iconDom}
						{contentDom}
					</View>
			</Animated.View>
		)
	}
}

// 基础样式
ToastConatiner.baseStyle = {
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		backgroundColor: 'rgba(0,0,0,0)',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1000,
	},
	mask: {
		backgroundColor: 'rgba(0,0,0,0.3)',
	},
	text: {
		marginHorizontal: 10,
		color: '#FFF',
		fontSize: 14,
	},
	inner: {
		minWidth: 100,
		alignItems: 'center',
		borderRadius: 5,
		padding: 8,
		backgroundColor: 'rgba(3, 3, 3, 0.7)',
	},
	innerWithIcon: {
		borderRadius: 7,
		padding: 10,
	},
	icon: {
		color: "#FFF",
		fontSize: 34,
		paddingBottom: 6
	},
	centering: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 9,
	},
};