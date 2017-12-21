/**
 * 选择器 PickerView 组件
 * @author asyxu
 */
import React from 'react'
import PropTypes from 'prop-types'
import {
	View,
	PickerIOS,
	Platform
} from 'react-native'
import UIComponent from '../../common/UIComponent'
import PickerAndroid from './PickerAndroid'

class PickerView extends UIComponent {
	static defaultProps = {
		// 传递的数据
		data: [],
		// 是否级联
		cascade: false,
		// 列数,级联时共有的级数
		cols: 0,
		// picker 初始值
		initialValue: [],
		// 每列数据选择变化后的回调函数
		onChange: (indexArr, valueArr, labelArr)=>{},
		// 准备就绪的回调函数
		onReady: (indexArr, valueArr, labelArr)=>{},
	}

	static propTypes = {
		// 传递的数据
		data: PropTypes.array,
		// 是否级联
		cascade: PropTypes.bool,
		// 列数,级联式时有的级数
		cols: PropTypes.number,
		// picker 初始值
		initialValue: PropTypes.array,
		// picker 的值，作为受控属性使用，一般情况不建议使用，主要用于解决datePicker里data和selectedValue不匹配的情况
		value: PropTypes.array,
		// 每列数据选择变化后的回调函数
		onChange: PropTypes.func,
		// 准备就绪的回调函数
		onReady: PropTypes.func,
	}

	static PickerRoll = Platform.OS === 'ios' ? PickerIOS : PickerAndroid

	constructor(props) {
		super(props)
		this._handleData(props)
		this._getInitialState(props)
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps()

		if (nextProps.data.toString() !== this.props.data.toString()) {
			this._handleData(nextProps)
		}
		if (nextProps.value !== undefined && nextProps.value.toString() !== this.props.value.toString()) {
			let { cascade, value } = nextProps,
				pickerData = cascade ? this.state.cascadeData : this.data,
				label = [], index = [];
			
			pickerData.forEach((data, i) => {
				data.forEach((d, j) => {
					if (d.value === value[i]) {
						label.push(d.label)
						index.push(j)
					}
				})
			})

			this.setState({
				selectedValue: value,
				selectedIndex: index,
				selectedLabel: label,
			})
		}
	}

	componentDidMount() {
		let { selectedValue, selectedIndex, selectedLabel } = this.state
		this.props.onReady( selectedValue, selectedIndex, selectedLabel )
	}

	_handleData(props) {
		let multiRoll = props.data[0] instanceof Array;

		if ( multiRoll ) {
			this.data = props.data
		} else {
			this.data = [props.data]
		}
	}

	_getInitialState(props) {
		let { cascade } = props

		if ( cascade ) {
			this.state = this._getCascadeInitialState()
		} else {
			this.state = this._getUnCascadeInitialState()
		}
	}

	_getUnCascadeInitialState() {
		let data = this.data,
			len = data.length,
			initialValue = 'value' in this.props ? this.props.value : this.props.initialValue,
			selectedIndex = [], selectedValue = [], selectedLabel = []

		if ( initialValue.length ) { // 有初始值
			selectedValue = initialValue.slice()
			for ( let i=0; i<len; i++ ) {
				let arr = data[i],
					l = arr.length

				for ( let j=0; j<l; j++ ) {
					if ( arr[j].value === selectedValue[i] ) {
						selectedIndex.push(j)
						selectedLabel.push( arr[j].label )
					}
				}
			}
		} else { // 无初始值
			for ( let i=0; i<len; i++ ) {
				selectedIndex.push(0)
				selectedValue.push(data[i][0].value)
				selectedLabel.push(data[i][0].label)
			}
		}

		return {
			selectedValue,
			selectedIndex,
			selectedLabel
		}
	}

	_getCascadeInitialState () {
		let { cols, data } = this.props, 
			initialValue = 'value' in this.props ? this.props.value : this.props.initialValue,
			cascadeData = [], selectedIndex = [], selectedValue = [], selectedLabel = []

		cascadeData[0] = data.concat()
		var i = 0
		for (i=0; i< cols; i++) {
			let item = cascadeData[i][0], index = 0
			cascadeData[i].map( (data, ind) => {
				if ( data.value === initialValue[i] ) {
					item = data
					index = ind
				}
			} )

			if ( item ) {
				if ( item.children ) cascadeData.push(item.children)
				selectedIndex.push(index)
				selectedValue.push( item.value)
				selectedLabel.push( item.label)
			}
		}

		return {
			selectedValue,
			selectedIndex,
			selectedLabel,
			cascadeData
		}
	}

	/**
	 * @param d picker 一项的数据
	 * @param index picker 这一项的数据在 picker 整个数据数组中的下标
	 * @param newValue 新选中的值对应的value
	 * @param newIndex 新选中的值在 d 中的下边
	 */
	_onChange = ( d, index, newValue, newIndex ) => {
		let { cols, cascade } = this.props,
			label = d[newIndex].label,
			{ selectedIndex, selectedValue, selectedLabel } = this.state
			_selectedValue = selectedValue.concat(),
			_selectedIndex = selectedIndex.concat(),
			_selectedLabel = selectedLabel.concat(),
			_state = {};

		if ( cascade ) { // 级联
			let cascadeData = this.state.cascadeData.concat()

			cascadeData.splice(index+1) // state 中保存的数据中的前index+1列的数据不用变，只需要级联变化之后的列数据
			if ( d[newIndex].children ) cascadeData.push( d[newIndex].children )
			// 存储的选中信息则是需要从变化的这一列开始重新计算
			_selectedValue.splice(index)
			_selectedIndex.splice(index)
			_selectedLabel.splice(index)
			_selectedValue.push(newValue)
			_selectedIndex.push(newIndex)
			_selectedLabel.push(label)

			for (let i=index+1; i< cols; i++) {
				let cData = cascadeData[i][0], cIndex = 0

				if ( cData ){
					_selectedValue.push( cData.value)
					_selectedIndex.push(cIndex)
					_selectedLabel.push( cData.label)

					if ( cData.children ){
						cascadeData.push(cData.children)
					}
				}
			}
			_state.cascadeData = cascadeData;
		} else {
			_selectedValue.splice(index, 1, newValue)
			_selectedIndex.splice(index, 1, newIndex)
			_selectedLabel.splice(index, 1, label)
		}

		if (this.props.value === undefined) {
			_state = {
				..._state,
				selectedValue: _selectedValue,
				selectedIndex: _selectedIndex,
				selectedLabel: _selectedLabel
			}
		}
		/**
		 * cascade 涉及到每一列数据的变化，需要 setState 触发渲染出新的数据项
		 * 因此，cascade 时会对 cascadeData 进行 setState 操作
		 * componentWillRecieveProps 会使用到 cascadeData
		 * 所以保证 state 更新完后再进行 onChange 回调
		 */
		this.setState(_state, ()=>{
			this.props.onChange(_selectedValue, _selectedIndex, _selectedLabel)
		})
	}

	_renderRoll = () => {
		let { cascade } = this.props,
			pickerData = cascade ? this.state.cascadeData : this.data,
			PickerItem = PickerIOS.Item;

		return pickerData.map((rollData, index) => {
			// selectedValue 供 PickerIOS 使用，为官方提供的 PickerIOS 的 API
			// selectedIndex 供 PickerAndroid 使用，方便 PickerAndroid 滚动的相关计算
			return (
				<PickerView.PickerRoll
					key={index}
					style={{flex: 1, justifyContent: 'flex-start'}}
					data={rollData}
					selectedIndex={this.state.selectedIndex[index]}
					selectedValue={this.state.selectedValue[index]}
					onValueChange={this._onChange.bind(this, rollData, index)}
				>
				{
					Platform.OS === 'ios' && (
					rollData.map((item) => (
						<PickerItem
							key={item.value}
							value={item.value}
							label={item.label}
						/>
					)))
				}
				</PickerView.PickerRoll>
			)
		})
	}

	render() {
		let style = this.style
		return <View style={[style.container]} >{this._renderRoll()}</View>
	}
}

PickerView.baseStyle = {
	container: {
		flexDirection: 'row',
		backgroundColor: '#fff'
	}
}

export default PickerView
