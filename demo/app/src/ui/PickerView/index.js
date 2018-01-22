import React, { Component } from 'react'
import {
	View,
	ScrollView,
	TouchableWithoutFeedback,
	Text,
	Image,
	Platform,
	StyleSheet
} from 'react-native'
import { PickerView } from 'fego-rn'

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
		children: []
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
	}
	render() {
		return (
			<ScrollView style={styles.container}>
				<View>
					<Text style={styles.title}>非级联 Picker</Text>
					<PickerView
						data={pickerData1}
						onChange={(selectedValue, selectedIndex, selectedLabel) => {
							console.log('onValueChange: ', selectedValue, selectedIndex, selectedLabel)
						}}
					/>
				</View>
				<View>
					<Text style={styles.title}>级联 Picker</Text>
					<PickerView
						data={pickerData3}
						initialValue={['xican','niupai','qi']}
						onChange={(selectedValue, selectedIndex, selectedLabel) => {
							console.log('onValueChange ', selectedValue, selectedIndex, selectedLabel)
						}}
					/>
				</View>
			</ScrollView>
		)
	}
}

const styles =  StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#efefef'
		// backgroundColor: '#77D7CB'
	},
	title: {
		marginLeft: 20,
		marginTop: 10,
		marginBottom: 10,
		color: '#333'
	},
	button: {
		width: 200,
		height: 30,
		marginLeft: 20,
		marginTop: 10,
		backgroundColor: '#f79e80',
		borderRadius: 3,
		borderWidth: 1,
		borderColor: '#ba3407',
		justifyContent: 'center',
		alignItems: 'center'
	}
})