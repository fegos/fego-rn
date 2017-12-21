/**
 * 月份选择控件
 * @author asy
 */
import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, ScrollView } from 'react-native'
import Button from '../Button'
import List from '../List'
import UIComponent from '../../common/UIComponent'

const ListItem = List.ListItem;

const itemHeight = 50

export default class MonthPicker extends UIComponent {
	static defaultProps = {
		// 内容，设置此属性可覆盖 MonthPicker 默认的选项
		data: [],
		// 初始选中的值，默认选中最后一个
		initialValue: '',
		// 受控属性，是否显示组件
		// visible: false,
		// 关闭回调
		onClose: () => {},
		// 选中回调,参数为选中的对象和所在数据下标
		onSelect: (obj, index) => {},
	}
	static propTypes = {
		// 内容，设置此属性可覆盖 MonthPicker 默认的选项
		data: PropTypes.array,
		// 初始选中的值，默认选中最后一个
		initialValue: PropTypes.string,
		// 受控属性，是否显示组件
		// visible: PropTypes.bool,
		// 关闭回调
		onClose: PropTypes.func,
		// 选中回调
		onSelect: PropTypes.func,
	}
	static months = []
	static startMonth = '201609'
	static setStartMonths ( value ) {
		MonthPicker.startMonth = value
	}
	static getMonths () {
		let months = [], 
			now = new Date(), 
			nowYear = now.getFullYear(), 
			nowMonth = now.getMonth()+1,
			nowDate = now.getDate(),
			sm = MonthPicker.startMonth,
			startYear = parseInt(sm.slice(0, 4)),
			startMonth = parseInt(sm.slice(4))

		for ( let i=startYear; i<=nowYear; i++ ) {
			for ( let j=1; j<= 12; j++ ) {
				if ( i === startYear && j < startMonth ) continue
				else if ( i === nowYear && j > nowMonth) continue
				else {
					// 格式化月份数据
					j = ( j < 10 ? '0' : '' ) + j
					let label = MonthPicker.format(i, j)
					months.push( {
						label: label,
						value: ''+i+j
					} )
				}
			}
		}
		MonthPicker.months = months
		return months
	}
	static format (year, month) {
		return ''+year+'年'+month+'月'
	}

	static autoStyleSheet = false

	constructor(props) {
		super(props)

		this._init(props)
		this.state = this._getInitialState(props)
	}

	_init(props) {
		let { data } = props
		this.months = data.length === 0 ? MonthPicker.months : data
		this.totalCount = this.months.length
		this.viewCount = this.totalCount < 4 ? this.totalCount : 4

		let pickerHeight = this.totalCount < 4 ? (this.totalCount * itemHeight) : (4 * itemHeight)
		this.containerHeight = pickerHeight + 54
		this.listHeight = pickerHeight
	}

	_getInitialState(props) {
		let months = this.months,
			{ initialValue, visible } = props,
			value = '', index = 0
		if ( initialValue ) {
			months.forEach( (m, i) => {
				if (m.value === initialValue) {
					value = m.value
					index = i
				}
			} )
		} else {
			let lastMonthIndex = months.length-1
			value = months[lastMonthIndex].value
			index = lastMonthIndex
		}

		return {
			value,
			index,
			// visible
		}
	}

	_onClose = () => {
		this.props.onClose()
	}

	_onSelect = (obj, index) => {
		this.props.onSelect(obj, index)
		this.setState({
			value: obj.value,
			index
		})
	}

	_onLayout = () => {
		let { index } = this.state
		if ( this.scrollView && index > (this.viewCount - 1) ) {
			let offsetY = ( index - (this.viewCount - 1) ) * itemHeight
			this.scrollView.scrollTo({ x: 0, y: offsetY, animated: false })
		}
	}

	_onScrollEndDrag = (e) => {
		let offset = e.nativeEvent.contentOffset.y,
			t = offset / itemHeight
			count = (offset%itemHeight) > (itemHeight/2) ? Math.ceil(t) : Math.floor(t)

		if (count < 0) {
			count = 0
		}
		if (count > (this.totalCount - this.viewCount)) {
			count = this.totalCount - this.viewCount
		}
		if (this.scrollView) {
			this.scrollView.scrollTo({ x: 0, y: count * itemHeight, animated: true })
		}
	}

	render() {
		let { value } = this.state, style = this.style
		return (
			<View style={[style.container, {height: this.containerHeight}]}>
				<View style={[style.list, {height: this.listHeight}]} onLayout={this._onLayout}>
					<ScrollView
						ref={c=>this.scrollView = c}
						bounce={false}
						alwaysBounceHorizontal={false}
						alwaysBounceVertical={false}
						automaticallyAdjustContentInsets={false}
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
						onScrollEndDrag={this._onScrollEndDrag}
					>
						<List>
							{ this.months.map( (m, i) => (
								<ListItem key={m.value} onPress={this._onSelect.bind(this, m, i)} style={style.item}>
									<Text style={[style.text, m.value === value && style.selectedText]}>{m.label}</Text>
								</ListItem>
							) ) }
						</List>
					</ScrollView>
				</View>
				<Button title='取消' onPress={this._onClose} style={style.btn} textColor='#858DA0' />
			</View>
		)
	}
}

MonthPicker.baseStyle = {
	container: {
		// height: pickerHeight + 54,
		backgroundColor: '#F1F1F3',
		justifyContent: 'flex-start'
	},
	list: {
		// height: pickerHeight,
	},
	item: {
		marginLeft: 0,
		paddingLeft: 0,
		paddingRight: 0,
		paddingBottom: 16,
		paddingTop: 16,
		height: itemHeight,
	},
	text: {
		flex: 1,
		textAlign: 'center',
		color: '#858DA0',
		fontSize: 16,
		justifyContent: 'center',
		alignItems: 'center'
	},
	selectedText: {
		color: '#333333'
	},
	btn: {
		height: 44,
		borderWidth: 0,
		marginTop: 10,	
		backgroundColor: '#ffffff'
	}
}