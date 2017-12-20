import React, { Component } from 'react'
import {
	View,
	ScrollView,
	TouchableWithoutFeedback,
	Text,
	Platform
} from 'react-native'
import { Picker, List, ListItem } from 'fego-rn'

const pickerData1 = [[{
	label: '2011年',
	value: '2011'
}, {
	label: '2012年',
	value: '2012'
}, {
	label: '2013年',
	value: '2013'
}, {
	label: '2014年',
	value: '2014'
}, {
	label: '2015年',
	value: '2015'
}, {
	label: '2016年',
	value: '2016'
}] ,[{
	label: '1月',
	value: '1'
}, {
	label: '2月',
	value: '2'
}, {
	label: '3月',
	value: '3'
}, {
	label: '4月',
	value: '4'
}, {
	label: '5月',
	value: '5'
}, {
	label: '6月',
	value: '6'
}, {
	label: '7月',
	value: '7'
}], [{
	label: '21日',
	value: '21'
}, {
	label: '22日',
	value: '22'
}, {
	label: '23日',
	value: '23'
}]]

const pickerData2 = [{
	label: '网易',
	value: 'net'
}, {
	label: '百度',
	value: 'bd'
}, {
	label: '新浪',
	value: 'sina'
}, {
	label: '腾讯',
	value: 'qq'
}, {
	label: '阿里',
	value: 'ali'
}, {
	label: '陌陌',
	value: 'momo'
}, {
	label: '脉脉',
	value: 'mama'
}, {
	label: '美团',
	value: 'mt'
}, {
	label: '大众点评',
	value: 'daz'
}]

const pickerData3 = [{
	label: '川菜',
	value: 'chuancai',
	children: [{
		label: '川菜-火锅',
		value: 'huoguo',
		children: [{
			label: '毛肚',
			value: 'maodu'
		}, {
			label: '鸭肠',
			value: 'jiachang'
		}]
	}, {
		label: '川菜-家常',
		value: 'jiachang',
		children: [{
			label: '宫保鸡丁',
			value: 'jiding'
		}, {
			label: '水煮鱼',
			value: 'yu'
		}]
	}]
}, {
	label: '台湾小吃',
	value: 'taiwan',
	children: [{
		label: '台湾-小吃',
		value: 'xiaochi',
		children: [{
			label: '卤肉饭',
			value: 'lurou'
		}, {
			label: '肥肉饭',
			value: 'feirou'
		}]
	}, {
		label: '台湾-烧烤',
		value: 'shao',
	}]
}, {
	label: '西餐',
	value: 'xican',
	children: [{
		label: '西餐-牛排',
		value: 'niupai',
		children: [{
			label: '一分熟',
			value: 'yi'
		}, {
			label: '三分熟',
			value: 'san'
		}, {
			label: '五分熟',
			value: 'wu'
		}, {
			label: '七分熟',
			value: 'qi'
		}]
	}, {
		label: '西餐-海鲜',
		value: 'haixian',
		children: [{
			label: '牡蛎',
			value: 'muli'
		}, {
			label: '扇贝',
			value: 'shanbei'
		}, {
			label: '鳗鱼',
			value: 'manyu'
		}]
	}]
}]

export default class Page extends Component {
	constructor(props, context) {
		super(props, context)
		this.state = {
			picker1Value: '',
			picker2Value: '',
			picker3Value: '',
			picker1Visible: false,
			picker2Visible: false,
			picker3Visible: false
		}
	}

	render() {
		return (
			<ScrollView style={{flex: 1, backgroundColor: '#efefef'}}>
				<List>
					<ListItem title={'多列非级联 Picker, 遮罩可点击关闭。您选择: '+this.state.picker1Value} onPress={()=>{this.setState({picker1Visible:true})}} />
					<ListItem title={'单列非级联 Picker, 您选择: '+this.state.picker2Value} onPress={()=>{this.setState({picker2Visible:true})}} />
					<ListItem title={'多列级联 Picker, 您选择: '+this.state.picker3Value} onPress={()=>{this.setState({picker3Visible:true})}} />
				</List>
				<Picker
					data={pickerData1}
					visible={this.state.picker1Visible}
					initialValue={['2013', '2', '22']}
					maskClosable={true}
					onClose={()=>{this.setState({picker1Visible:false})}}
					onConfirm={(selectedValue, selectedIndex, selectedLabel) => {
						console.log('onConfirm: ', selectedValue, selectedIndex, selectedLabel)
						this.setState({ picker1Value: selectedLabel.join('') })
					}}
					onChange={(selectedIndex, selectedValue, selectedLabel) => {
						console.log('onChange: ', selectedValue, selectedIndex, selectedLabel)
					}}
				/>
				<Picker
					data={pickerData2}
					visible={this.state.picker2Visible}
					onClose={()=>{this.setState({picker2Visible:false})}}
					onConfirm={(selectedValue, selectedIndex, selectedLabel) => {
						console.log('onConfirm: ', selectedValue, selectedIndex, selectedLabel)
						this.setState({ picker2Value: selectedLabel.join('') })
					}}
					onChange={(selectedValue, selectedIndex, selectedLabel) => {
						console.log('onChange: ', selectedValue, selectedIndex, selectedLabel)
					}}
				/>
				<Picker
					data={pickerData3}
					visible={this.state.picker3Visible}
					onClose={()=>{this.setState({picker3Visible:false})}}
					initialValue={['chuancai','jiachang','yu']}
					cascade={true}
					cols={3}
					onConfirm={(selectedValue, selectedIndex, selectedLabel) => {
						console.log('onConfirm: ', selectedValue, selectedIndex, selectedLabel)
						this.setState({ picker3Value: selectedLabel.join('') })
					}}
					onChange={(selectedValue, selectedIndex, selectedLabel) => {
						console.log('onChange: ', selectedValue, selectedIndex, selectedLabel)
					}}
				/>
			</ScrollView>
		);
	}
}