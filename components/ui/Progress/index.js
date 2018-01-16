import React from 'react';
import PropTypes from 'prop-types'
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import UIComponent from 'common/UIComponent'

export default class Progress extends UIComponent {
	static defaultProps = {
		percent: 0,
		position: 'normal', //`normal`, `top`
		appearTransition: false,
		type: 'default', //`default`, `retangle`, `border`, `progressBorder`, 
		size: 'default', //`default`, `small`, `large`
		showUnfill: true,
		progressMarginLinear: false
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
		// 位置 top normal
		position: PropTypes.string,
		// 显示进度未满区域
		showUnfill: PropTypes.bool,
		// 进度条右边缘是否呈线形
		progressMarginLinear: PropTypes.bool
	}

	constructor(props) {
		super(props);
		this.state = {
			percentage: new Animated.Value(0),
		};
		this.viewWidth = Dimensions.get('window').width;
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.appearTransition && nextProps.percent !== this.props.percent) {
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
		const { type, position, showUnfill, progressMarginLinear} = this.props;
		//确定view的宽度。进度条bar和背景bar的半径同步，以背景bar的半径为准。边宽则各自控制		
		let w = curStyle.container ? (curStyle.container.width || this.viewWidth) : this.viewWidth;
		let h = curStyle.container ? (curStyle.container.height || 6) : 6;
		let bw = curStyle.container ? (curStyle.container.borderWidth || 0) : 0;
		let br = curStyle.container ? (curStyle.container.borderRadius || 0) : 0;
		let pbw = curStyle.progressBar ? (curStyle.progressBar.borderWidth || 0) : 0;
		
		// 控制borderWidth的宽度
		if (bw && bw > h / 4) {
			bw = h / 4;
		}
		if (pbw && pbw > h / 4) {
			pbw = h / 4;
		}
		if (br && br < h / 2) {
			br = h / 2;
		}

		const outerStyle = [
			curStyle.container,
			{
				width: w,
				borderRadius: br,
				borderColor: showUnfill ? (curStyle.container ? curStyle.container.borderColor : 'transparent') : 'transparent',
			},
			position === 'top' ? {
				position: 'absolute',
				top: 0
			} : null,
			showUnfill ? null : {
				backgroundColor: 'transparent'
			},
		];
		const borderStyle = {
			borderWidth: pbw,
			borderRadius: br,
			borderColor: curStyle.progressBar ? curStyle.progressBar.borderColor : 'transparent',
			// borderColor: showUnfill ? (curStyle.container ? curStyle.container.backgroundColor : 'transparent') : 'transparent',
		};

		let percentStyle = {}, child = null;
		if (this.props.appearTransition) {
			percentStyle.width = this.state.percentage;
			child = <Animated.View style={[curStyle.progressBar, percentStyle, borderStyle, progressMarginLinear? {borderTopRightRadius:0, borderBottomRightRadius:0}: null]} />;
		} else {
			percentStyle.width = this._getPercentWidth(w, this.props.percent);
			child = <View style={[curStyle.progressBar, percentStyle, borderStyle, progressMarginLinear? {borderTopRightRadius:0, borderBottomRightRadius:0}: null]} />;
		}

		return (
			<View style={outerStyle}>
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
		},
		progressBorder: {
			container: {
				borderRadius: 3,
				borderWidth: 0,
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
		borderRadius: 0,
		borderWidth: 0,		
	},
	progressBar: {
		backgroundColor: '#108ee9',
		flex: 1,
	},
}