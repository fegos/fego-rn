/**
 * RadioGroup
 * @author asy
 */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import UIComponent from '../../common/UIComponent';

export default class Group extends UIComponent {
	static defaultProps = {}
	static propTypes = {
		// 受控属性，选中的项对应的value，需配合onChange使用
		value: PropTypes.string,
		// 非受控属性，默认选中的项对应的value
		defaultValue: PropTypes.string,
		// 状态改变回调
		onChange: PropTypes.func,
		// 子元素
		children: PropTypes.node,
	}
	constructor(props) {
		super(props);

		this.state = {
			value: 'value' in props ? props.value : props.defaultValue
		}
	}
	componentWillReceiveProps(nextProps) {
		if ('value' in nextProps && nextProps.value !== this.props.value) {
			this.setState({
				value: nextProps.value
			})
		}
	}
	onChange = (checked, ele) => {
		let { onChange } = this.props;
		if (!('value' in this.props)) {
			this.setState({
				value: ele.props.value
			})
		}
		onChange instanceof Function && onChange(ele.props.value, this)
	}
	render() {
		return (
			<View style={this.style.container}>{
				React.Children.map(this.props.children, (child) => React.cloneElement(child, {
					checked: child.props.value === this.state.value,
					onChange: this.onChange
				}, child.props.children))
			}</View>
		)
	}
}

Group.baseStyle = {
	container: {
		flex: 1,
		flexDirection: 'row'
	}
}