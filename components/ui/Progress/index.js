import React from 'react';
import PropTypes from 'prop-types'
import { View, StyleSheet, Animated, Dimensions, } from 'react-native';
import UIComponent from '../../common/UIComponent'

export default class Progress extends UIComponent {
	static defaultProps = {
		percent: 0,
		position: 'normal',
		appearTransition: false,
		type: 'default',
		size: 'default',
		showUnfill: true,
	};

	static autoStyleSheet = false;

	static simpleStyleProps = {
		progressBarColor: {
			name: 'progressBar',
			attr: 'backgroundColor'
		}
	}
	static propTypes = {
		//进度0-100
		percent: PropTypes.number,
		// 主题类型 default rectangle border
		type: PropTypes.string,
		// 尺寸 small default large 
		size: PropTypes.string,
		// 位置 fixed normal
		position: PropTypes.string,
		// 显示进度未满区域
		showUnfill: PropTypes.bool,
	}

	constructor(props) {
		super(props);
		this.state = {
			//wrapWidth: props.wrapWidth || Dimensions.get('window').width,
			percentage: new Animated.Value(0),
		};
		this.viewWidth = Dimensions.get('window').width;
	}

	componentWillReceiveProps(nextProps) {
		// if (nextProps.wrapWidth !== this.props.wrapWidth) {
		// 	this.setState({
		// 		wrapWidth: nextProps.wrapWidth
		// 	});
		// }
		if (this.props.appearTransition && nextProps.percent !== this.props.percent) {
			// this.setState({
			// 	percentage: new Animated.Value(this._getPercentWidth(nextProps.percent))
			// });
			/**
			 * 修改1：this._getPercentWidth(nextProps.percent) 的参数不对，_getPercentWidth 的第一个参数应该是 width
			 * 修改2：当 appearTransition 为 true 时，percent 值的变化应该使用 start 来启动动画，不应该直接 setState
			 */
			let curStyle = this.style;
			let w = curStyle.container ? (curStyle.container.width || this.viewWidth) : this.viewWidth;
			let pw = this._getPercentWidth(w, nextProps.percent);
			
			Animated.timing(this.state.percentage, {
				toValue: pw,
				duration: 1000,
			}).start();
		}
	}

	componentDidMount() {
		if (this.props.appearTransition) {
			this.state.percentage.setValue(0);
			Animated.timing(this.state.percentage, {
				toValue: this._getPercentWidth(),
				duration: 1000,
			}).start();
		}
	}

	// onLayout = (e) => {
	// 	let w = this.viewWidth;
	// 	if (!w || w > e.nativeEvent.layout.width) {
	// this.setState({
	// 	wrapWidth: e.nativeEvent.layout.width,
	// });
	// viewWidth = nativeEvent.layout.width;
	// 	}
	// }

	_normalPercent = (percent) => {
		let widthPercent = 0;
		if (percent > 0) {
			widthPercent = percent > 100 ? 100 : percent;
		}
		if (percent < 0) {
			widthPercent = 0;
		}
		return widthPercent;
	}

	_getPercentWidth = (width = this.viewWidth, percent = this.props.percent) => {
		return width * (this._normalPercent(percent) / 100);
	}

	render() {
		let curStyle = this.style;
		const { position, showUnfill } = this.props;
		//确定view的宽度		
		let w = curStyle.container ? (curStyle.container.width || this.viewWidth) : this.viewWidth;
		let h = curStyle.container ? (curStyle.container.height || 6) : 6;
		let bw = curStyle.container ? (curStyle.container.borderWidth || 0) : 0;
		let br = curStyle.container ? (curStyle.container.borderRadius || 0) : 0;
		
		//控制borderWidth的宽度
		if (bw && bw > h / 4) {
			bw = h / 4;
		}
		if (br && br < h / 2) {
			br = h / 2;
		}
		// console.log(curStyle);
		// console.log('border width: ', bw, 'border radius: ', br);

		const outerStyle = [
			curStyle.container,
			{
				width: w,
				borderRadius: br,
				borderColor: 'transparent',
				borderWidth: 0,
			},
			position === 'fixed' ? {
				position: 'absolute',
				top: 0
			} : null,
			showUnfill ? null : {
				backgroundColor: 'transparent'
			},
		];
		const borderStyle = {
			borderWidth: bw,
			borderRadius: br,
			borderColor: showUnfill ? (curStyle.container ? curStyle.container.backgroundColor : 'transparent') : 'transparent',
		};

		let percentStyle = {}, child = null;
		if (this.props.appearTransition) {
			percentStyle.width = this.state.percentage;
			child = <Animated.View style={[curStyle.progressBar, percentStyle, borderStyle]} />;
		} else {
			percentStyle.width = this._getPercentWidth(w, this.props.percent);
			child = <View style={[curStyle.progressBar, percentStyle, borderStyle]} />;
		}

		return (
			<View onLayout={this.onLayout} style={outerStyle}>
				{child}
			</View>);
	}
}

// 默认主题样式 default必须，其他类别可自定义
Progress.themeStyle = {
	type: {
		default: {
			container: {
				borderRadius: 3,
				borderWidth: 0,
			},
			progressBar: {
				borderRadius: 3,
				borderWidth: 0,
			}
		},
		retangle: {
			container: {
				borderRadius: 0,
				borderWidth: 0,
			},
			progressBar: {
				borderRadius: 0,
				borderWidth: 0,
			}
		},
		border: {
			container: {
				borderRadius: 3,
				borderWidth: StyleSheet.hairlineWidth,
			},
			progressBar: {
				borderRadius: 3,
				borderWidth: StyleSheet.hairlineWidth,
			}
		}
	},
	size: {
		default: {
			container: {
				height: 6
			},
			progressBar: {
				height: 6
			},
		},
		small: {
			container: {
				height: 4,
			},
			progressBar: {
				height: 4,
			},
		},
		large: {
			container: {
				height: 8
			},
			progressBar: {
				height: 8
			},
		}
	}
}
// 默认基础样式 
Progress.baseStyle = {
	container: {
		backgroundColor: '#ddd',
		justifyContent: 'center',
		borderRadius: 1,
		borderWidth: 0,		
	},
	progressBar: {
		backgroundColor: '#108ee9',
		flex: 1,
	},
}