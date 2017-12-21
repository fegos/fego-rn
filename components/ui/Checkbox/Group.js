/**
 * CheckboxGroup
 * @author asy
 */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import UIComponent from '../../common/UIComponent';

export default class Group extends UIComponent {
	static defaultProps = {
		// 默认选中的项对应的value
		defaultValue: []
	}
	static propTypes = {
		// 受控属性，选中的项对应的value，需配合onChange使用
		value: PropTypes.array,
		// 非受控属性，默认选中的项对应的value
		defaultValue: PropTypes.array,
		// 状态改变回调
		onChange: PropTypes.func,
		// 子元素
		children: PropTypes.node,
	}
	constructor(props) {
		super(props);

		this.state = {
			valueArr: 'value' in props ? props.value : props.defaultValue
		}
	}
	componentWillReceiveProps(nextProps) {
		if ('value' in nextProps && nextProps.value.toString() !== this.props.value.toString()) {
			this.setState({
				valueArr: nextProps.value
			})
		}
	}
	updateSelectValue(value, checked) {
		let valueArr = this.state.valueArr.concat();

		if (checked) {
			valueArr.push(value)
		} else {
			let index = valueArr.indexOf(value);
			valueArr.splice(index, 1);
		}
		return valueArr;
	}
	onChange = (checked, ele) => {
		let { onChange } = this.props,
			_valueArr = this.updateSelectValue(ele.props.value, checked);
		let s = this.state.valueArr;
		if (!('value' in this.props)) {
			this.setState({
				valueArr: _valueArr
			})
		}
		onChange instanceof Function && onChange(_valueArr, this)
	}
	render() {
		return (
			<View style={this.style.container}>{
				React.Children.map(this.props.children, (child) => React.cloneElement(child, {
					checked: this.state.valueArr.indexOf(child.props.value) >= 0,
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