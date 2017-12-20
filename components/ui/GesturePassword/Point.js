import React, {
	Component,
} from 'react'
import PropTypes from 'prop-types'
import {
	StyleSheet,
	View,
} from 'react-native'

import Circle from './Circle'

export default class Point extends Component {

	static defaultProps = {
		isActive: false,
		isWarning: false,
		isNoChange: false,
		isShowBorder: false,//标记是否显示外边框
	}

	static propTypes = {
		index: PropTypes.number.isRequired,
		radius: PropTypes.number.isRequired,
		borderWidth: PropTypes.number.isRequired,
		isActive: PropTypes.bool.isRequired,
		isWarning: PropTypes.bool.isRequired,
		backgroundColor: PropTypes.string,
		color: PropTypes.string.isRequired,
		activeColor: PropTypes.string.isRequired,
		warningColor: PropTypes.string.isRequired,
		position: PropTypes.shape({
			left: PropTypes.number.isRequired,
			top: PropTypes.number.isRequired,
		}).isRequired,
		isNoChange: PropTypes.bool.isRequired,
		isShowBorder: PropTypes.bool.isRequired,
	}

	// 构造
	constructor(props) {
		super(props)
		// 初始状态
		this.state = {}

		this._outerCircleRadius = props.radius
		this._outerCirclePosition = props.position
		this._innerCircleRadius = this._outerCircleRadius / 3
		this._innerCirclePosition = {
			left: this._innerCircleRadius * 0.375 - props.borderWidth * 2,
			top: this._innerCircleRadius * 0.375 - props.borderWidth * 2,
		}

		this._innerCircleRadius2 = this._outerCircleRadius / 2.5
		this._innerCirclePosition2 = {
			left: this._innerCircleRadius2 * 1.5 - props.borderWidth,
			top: this._innerCircleRadius2 * 1.5 - props.borderWidth,
		}

	}

	render() {
		this._color = this.props.isWarning ?
			this.props.warningColor :
			(this.props.isActive ? this.props.activeColor : this.props.color)

		return (
			<Circle
				backgroundColor='transparent'
				color={this._color}
				radius={this.props.radius}
				borderWidth={this.props.isShowBorder ? 1 : 0}
				position={this._outerCirclePosition}>
				<Circle
					isFill={true}
					color={(this.props.isActive || this.props.isWarning) && !this.props.isNoChange ? this._color : 'transparent'}
					radius={this._innerCircleRadius2}
					borderWidth={this.props.borderWidth}
					position={this._innerCirclePosition2}
				>
					<Circle
						isFill={true}
						color={this._color}
						radius={this._innerCircleRadius}
						borderWidth={this.props.borderWidth}
						position={this._innerCirclePosition}
					>
					</Circle>
				</Circle>
			</Circle>
		)
	}

}