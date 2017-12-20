import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { View, ART, Animated, Platform } from 'react-native';
import Wedge from './Wedge'

const { Surface, Shape, Path, Group } = ART;

var AnimatedWedge = Animated.createAnimatedComponent(Wedge);

export default class PieChat extends Component {
	static propTypes = {
		percentArray: PropTypes.array.isRequired,
		colorArray: PropTypes.array.isRequired,
		innerRadius: PropTypes.number,
		outerRadius: PropTypes.number.isRequired,
		duration: PropTypes.number,
		configArray: PropTypes.array,
	}

	static defaultProps = {
		innerRadius: 0,
		duration: 1500,
		configArray: [],
	}

	constructor(props) {
		super(props);

		this.wedgeAngles = [];
		this.animationArray = [];
		this.endAngleArray = [];
		//初始化动画对象
		for (var index = 0; index < this.props.percentArray.length; index++) {
			this.animationArray.push(new Animated.Value(0));
		}

		this.state = {
			animationArray: this.animationArray,
		};
	}
	//保留同步执行的动画效果
	// explode = () => {
	// 	Animated.timing(this.state.animation1, {
	// 		duration: 1500,
	// 		toValue: 10
	// 	}).start(() => {
	// 		// this.state.animation.setValue(0);
	// 		this.forceUpdate();
	// 	});
	// }

	// explode2 = () => {
	// 	Animated.timing(this.state.animation2, {
	// 		duration: 1500,
	// 		toValue: 10
	// 	}).start(() => {
	// 		// this.state.animation.setValue(0);
	// 		this.forceUpdate();
	// 	});
	// }

	_animations = () => {

		var animatedArray = [];
		for (var index = 0; index < this.props.percentArray.length; index++) {
			animatedArray.push(Animated.timing(this.state.animationArray[index], {
				duration: this.props.duration,
				toValue: 10
			}));

		}
		// console.log('animation');
		Animated.sequence(animatedArray).start();
	}

	_handleData = () => {
		var wedgeAngles = [];
		var percentArray = [];
		var endAngleArray = [];

		//处理百分比，得到每个部分的结束位置
		for (var index = 0; index < this.props.percentArray.length; index++) {
			var sum = 0;
			for (var index2 = 0; index2 <= index; index2++) {
				sum += this.props.percentArray[index2];
			}
			endAngleArray.push(sum);
		}
		this.endAngleArray = endAngleArray;

		//添加动画对象数组
		for (var index = 0; index < this.props.percentArray.length; index++) {
			if (index === 0) {
				wedgeAngles.push(this.state.animationArray[index].interpolate({
					inputRange: [0, 10],
					outputRange: [0, this.endAngleArray[index] * 360],
					extrapolate: 'clamp'
				}));
			} else if (index === this.props.percentArray.length - 1) {
				wedgeAngles.push(this.state.animationArray[index].interpolate({
					inputRange: [0, 10],
					outputRange: [this.endAngleArray[index - 1] * 360, 360],
					extrapolate: 'clamp'
				}));
			}
			else {
				wedgeAngles.push(this.state.animationArray[index].interpolate({
					inputRange: [0, 10],
					outputRange: [this.endAngleArray[index - 1] * 360, this.endAngleArray[index - 1] * 360 + this.props.percentArray[index] * 360],
					extrapolate: 'clamp'
				}));
			}
		}
		this.wedgeAngles = wedgeAngles;

	}

	componentDidMount() {
		this._handleData();
		this._animations();
	}

	componentWillReceiveProps(nextProps) {
		if (this.props && nextProps) {
			if ((this.props.percentArray.toString() == nextProps.percentArray.toString()) &&
				(this.props.colorArray.toString() == nextProps.colorArray.toString())) {
				return
			}
		}

		//初始化动画对象
		if (nextProps) {
			this.animationArray = [];
			for (var index = 0; index < nextProps.percentArray.length; index++) {
				this.animationArray.push(new Animated.Value(0));
			};
			this.setState({
				animationArray: this.animationArray,
			})
		}
	}

	componentWillUpdate(nextProps, nextState) {
		if (this.props && nextProps) {
			if ((this.props.percentArray.toString() == nextProps.percentArray.toString()) &&
				(this.props.colorArray.toString() == nextProps.colorArray.toString())) {
				return
			}
		}
		if (nextProps && nextState) {
			this.props = nextProps;
			this.state = nextState;
		}
		this._handleData();
		this._animations();
	}

	// _handleCover() {
	// 	const radius = this.props.outerRadius;
	// 	const coverRadius = this.props.innerRadius * 2;
	// 	const coverPath = new Path()
	// 		.moveTo(radius, this.props.outerRadius - this.props.innerRadius)
	// 		.arc(0, coverRadius, this.props.innerRadius)
	// 		.arc(0, -coverRadius, this.props.innerRadius)
	// 		.close();
	// 	return <Shape d={coverPath} fill={'white'} />;
	// }

	render() {
		// const rotation = Platform.OS === 'ios' ? 0 : -90;

		return (
			<Surface width={this.props.outerRadius * 2} height={this.props.outerRadius * 2}>
				<Group originX={this.props.outerRadius} originY={this.props.outerRadius}>
					{this.wedgeAngles.map((data, index) => {
						let stroke;
						let strokeWidth;
						let strokeDash;
						if (this.props.configArray.length > 0 && this.props.configArray[index]) {
							stroke = this.props.configArray[index].stroke;
							strokeWidth = this.props.configArray[index].strokeWidth;
							strokeDash = this.props.configArray[index].strokeDash
						}
						if (index === 0) {
							return <AnimatedWedge
								key={index}
								outerRadius={this.props.outerRadius}
								innerRadius={this.props.innerRadius}
								startAngle={0}
								stroke={stroke}
								strokeWidth={strokeWidth}
								strokeDash={strokeDash}
								endAngle={this.wedgeAngles[index]}
								fill={this.props.colorArray[index]}
							/>
						} else {
							return <AnimatedWedge
								key={index}
								outerRadius={this.props.outerRadius}
								innerRadius={this.props.innerRadius}
								startAngle={this.endAngleArray[index - 1] * 360}
								stroke={stroke}
								strokeWidth={strokeWidth}
								strokeDash={strokeDash}
								endAngle={this.wedgeAngles[index]}
								fill={this.props.colorArray[index]}
							/>
						}
					})}
					{/* {this._handleCover()} */}
				</Group>
			</Surface>
		)
	}
}

PieChat.Wedge = Wedge