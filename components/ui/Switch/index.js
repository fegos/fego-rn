/**
 * 开关组件
 * 受控/非控组件含义 参见https://facebook.github.io/react/docs/forms.html
 * @author esky 史晓霞
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { PanResponder, View, TouchableHighlight, Animated } from 'react-native';
import UIComponent from '../../common/UIComponent'

export default class NPSwitch extends UIComponent {
	static defaultProps = {
		defaultActive: false,
		disabled: false,
		switchAniTime: 200
	}

	static propTypes = {
		//受控属性：激活状态，需配合onChange使用
		active: PropTypes.bool,
		//非控属性：默认激活状态，获取状态使用 this.refs.switch.state.active
		defaultActive: PropTypes.bool,
		//是否禁止
		disabled: PropTypes.bool,
		//切换动画时间
		switchAniTime: PropTypes.number,
		//状态改变回调
		onChange: PropTypes.func,
	}
	static autoStyleSheet = false
	state = {
		width: 0,
		active: false,
		position: null,
	}
	componentWillMount() {
		super.componentWillMount();
		let style = this.style;
		// 使用了active则defaultActive无效
		let active = typeof this.props.active === 'boolean' ? this.props.active : this.props.defaultActive;
		this.start = {};
		//动画起始位置
		this.w = style.bar.width - Math.min(style.bar.height, style.button.borderRadius * 2);
		this.setState({
			width: this.w,
			active: active,
			position: new Animated.Value(active ? this.w : 0),
		})
		this._panResponder = PanResponder.create({
			//在开始触摸时的捕获期，是否成为响应者
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			//在用户开始触摸的时候，是否成为响应者
			onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
			//确定是否处理移动事件
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			//在捕获期确定是否捕获移动时间
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

			//监视器发出通知开始操作
			onPanResponderGrant: (evt, gestureState) => {
				if (this.props.disabled) return;

				this.setState({ pressed: true });
				this.start.x0 = gestureState.x0;
				this.start.pos = this.state.position._value;
				this.start.moved = false;
				this.start.active = this.state.active;
				this.start.stateChanged = false;
			},
			//当触摸移动调用
			onPanResponderMove: (evt, gestureState) => {
				if (this.props.disabled) return;
				this.start.moved = true;
				if (this.start.pos == 0) {
					if (gestureState.dx <= this.state.width && gestureState.dx >= 0) {
						this.state.position.setValue(gestureState.dx);
					}
					if (gestureState.dx > this.state.width) {
						this.state.position.setValue(this.state.width);
					}
					if (gestureState.dx < 0) {
						this.state.position.setValue(0);
					}
				}
				if (this.start.pos == this.state.width) {
					if (gestureState.dx >= -this.state.width && gestureState.dx <= 0) {
						this.state.position.setValue(this.state.width + gestureState.dx);
					}
					if (gestureState.dx > 0) {
						this.state.position.setValue(this.state.width);
					}
					if (gestureState.dx < -this.state.width) {
						this.state.position.setValue(0);
					}
				}
				var currentPos = this.state.position._value;
				this._swipe(currentPos, this.start.pos,
					() => {
						if (!this.start.active) this.start.stateChanged = true;
						// this._changeActiveOn()
					},
					() => {
						if (this.start.active) this.start.stateChanged = true;
						// this._changeActiveOff()
					});
			},
			//监视器被要求终止
			onPanResponderTerminationRequest: (evt, gestureState) => true,
			//监视器被释放
			onPanResponderRelease: (evt, gestureState) => {
				// console.log("onPanResponderRelease");
				this.setState({ pressed: false });
				var currentPos = this.state.position._value;
				if (!this.start.moved || (Math.abs(currentPos - this.start.pos) < 5 && !this.start.stateChanged)) {
					this.toggle();
					return;
				}
				this._swipe(currentPos, this.start.pos, this._changeActiveOn, this._changeActiveOff);
			},
			//响应被终止
			onPanResponderTerminate: (evt, gestureState) => {
				// console.log("onPanResponderTerminate");
				var currentPos = this.state.position._value;
				this.setState({ pressed: false });
				this._swipe(currentPos, this.start.pos, this._changeActiveOn, this._changeActiveOff);
			},
			onShouldBlockNativeResponder: (evt, gestureState) => true,
		});
	}
	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps)
		// 若使用受控组件属性
		if(typeof nextProps.active === 'boolean' && nextProps.active !== this.state.active){
			this._changeActive(nextProps.active, true)
			this.setState({ active: nextProps.active });
		}
	}
	
	/**
	 * 判断状态是否改变
	 * @param {number} currentPosition 当前位置
	 * @param {number} startingPosition 起始位置
	 * @param {func} onChange 状态改变回调
	 * @param {func} onTerminate 状态不发生改变回调
	 */
	_swipe = (currentPosition, startingPosition, onChange, onTerminate) => {
		if (currentPosition - startingPosition >= 0) {//向右滑动
			if (currentPosition - startingPosition > this.state.width / 2 || startingPosition == this.state.width) {
				onChange();
			} else {
				onTerminate();
			}
		} else {//向左滑动
			if (currentPosition - startingPosition < -this.state.width / 2) {
				onTerminate();
			} else {
				onChange();
			}
		}
	}

	/**
	 * 滑动到active位置
	 */
	_activateAni = () => {
		Animated.timing(
			this.state.position,
			{
				toValue: this.state.width,
				duration: this.props.switchAniTime,
			}
		).start();
	}

	/**
	 * 滑动到inactive位置
	 */
	_deactivateAni = () => {
		Animated.timing(
			this.state.position,
			{
				toValue: 0,
				duration: this.props.switchAniTime,
			}
		).start();
	}

	/**
	 * 改变状态值
	 */
	_changeActive = (newActive, propsUpdate=false) => {
		let { onChange, active } = this.props
		if(propsUpdate){
			if(newActive){
				this._activateAni();
			}else{
				this._deactivateAni();
			}
			return;
		}
		// 未使用受控props则自己控制状态
		if (typeof active !== 'boolean') {
			this.setState({ active: newActive });
			if(newActive){
				this._activateAni();
			}else{
				this._deactivateAni();
			}
		}
		onChange && onChange(newActive, this);
	}
	_changeActiveOn = ()=>{
		this._changeActive(true)
	}
	_changeActiveOff = ()=>{
		this._changeActive(false)
	}
	/**
	 * 修改当前状态
	 */
	toggle = () => {
		if (this.props.disabled) return;
		if (this.state.active) {
			this._changeActiveOff();
		} else {
			this._changeActiveOn();
		}
	}

	render() {
		let style = this.style;
		let borderRadius = style.button.borderRadius;
		let padding = borderRadius - style.bar.height / 2 + 1;
		let doublePadding = padding * 2 - 2;
		let halfPadding = doublePadding / 2;
		return (
			<View
				{...this._panResponder.panHandlers}
				style={{ ...style.container, padding: padding }}>
				<View
					style={[
						style.bar,
						this.props.disabled ? style.barDisabled :
							(this.state.active ? style.barActive : style.barInactive),
						{ borderRadius: style.bar.height / 2 }
					]} />
				<TouchableHighlight underlayColor='transparent' activeOpacity={1} style={{
					height: Math.max(borderRadius * 2 + doublePadding, style.bar.height + doublePadding),
					width: style.bar.width + doublePadding,
					position: 'absolute',
					top: 1,
					left: 1
				}}>
					<Animated.View style={[
						style.button,
						this.props.disabled ? style.buttonDisabled :
							this.state.active
								? (this.state.pressed ? style.buttonPressActive : style.buttonActive)
								: (this.state.pressed ? style.buttonPressInactive : style.buttonInactive),
						{
							height: borderRadius * 2,
							width: borderRadius * 2,
							top: halfPadding + style.bar.height / 2 - borderRadius,
							left: style.bar.height / 2 > borderRadius ? halfPadding : halfPadding + style.bar.height / 2 - borderRadius,
							transform: [{ translateX: this.state.position }]
						}]}
					>
					</Animated.View>
				</TouchableHighlight>
			</View>
		)
	}
}
NPSwitch.baseStyle = {
	container: {
		position: 'relative'
	},
	// 切换按钮样式
	button: {
		position: 'absolute',
		borderRadius: 15,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		shadowColor: '#000',
		shadowOpacity: 0.5,
		shadowRadius: 1,
		shadowOffset: { height: 1, width: 0 },
	},
	buttonActive: {
		backgroundColor: '#2196F3'
	},
	buttonInactive: {
		backgroundColor: '#FAFAFA'
	},
	buttonPressActive: {
		backgroundColor: '#42A5F5'
	},
	buttonPressInactive: {
		backgroundColor: '#F5F5F5'
	},
	buttonDisabled: {
		backgroundColor: '#DDD'
	},
	// 底部状态条
	bar: {
		height: 30,
		width: 50,
		borderRadius: 25,
	},
	barActive: {
		backgroundColor: 'rgba(211,211,211,.5)',
	},
	barInactive: {
		backgroundColor: 'rgba(0,0,0,.5)',
	},
	barDisabled: {
		backgroundColor: '#DDD'
	}
}