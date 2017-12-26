import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View, Alert, 
	// Modal,
	Dimensions,
	TouchableHighlight, ScrollView,
	ART
} from 'react-native';
import { Style } from '../../../common'
import { Popover, Icon, Toast, Modal } from 'fego-rn'

const { width, height } = Dimensions.get('window')
const Item = Popover.Item;
const { Shape, Path, Surface } = ART;

export default class PopTest extends Component {

	constructor(props) {
		super(props)
		this.state = {
			popViewVisible: false,
			positionObj: {},
			rianglePosition: 'top',
		}
	}
	render() {
		let content = [
			<Item text='添加新朋友' iconName='user'/>,
			<Item iconName='user'><Text>扫一扫</Text></Item>,
			<Item iconName='user'><View><Text>帮助</Text></View></Item>
		];

		return (
			<ScrollView style={Style.container}>
				<View style={[itemStyle]}>
					<Popover 
						content={[
							<Item text='添加新朋友' iconName='user'/>,
							<Item iconName='user' onPress={()=>{
								this.props.navigation.navigate('ui/Button');
							}}><Text>扫一扫</Text></Item>,
							<Item><Text>帮助</Text></Item>
						]}>
						<View>
							<Text>Popover 只能有一个孩子</Text>
							<Text>我是第二个孩子，要用 view 包起来</Text>
						</View>
					</Popover>
					<View>
						<Text>点我没用哦</Text>
					</View>
				</View>

				<View style={[itemStyle]}>
					<Popover content={content}
						placement='bottomLeft'
					>
						我显示在下左哦
					</Popover>
					<Popover content={content}
						placement='bottomRight'
					>
						<Text>我显示在下右哦</Text>
					</Popover>
				</View>

				<View style={[itemStyle]}>
					<Popover content={content}
						placement='right'
					>
						还可以显示在右边哦
					</Popover>
					<Popover content={content}
						placement='leftBottom'
					>
						<Text>还可以显示在左边哦</Text>
					</Popover>
				</View>

				<View style={[itemStyle, {justifyContent: 'center'}]}>
					<Popover content={content}
						placement='topLeft'
						maskClosable={false}
					>
						上左, 不能点弹层关闭
					</Popover>
				</View>
				<View style={[itemStyle, {justifyContent: 'center'}]}>
					<Popover content={content}
						placement='top'
						title='title'
					>
						上中, 有title哦
					</Popover>
				</View>
				<View style={[itemStyle, {justifyContent: 'center'}]}>
					<Popover content={content}
						placement='topRight'
					>
						上右
					</Popover>
				</View>

				<View style={[itemStyle, {justifyContent: 'center'}]}>
					<Popover content={content}
						placement='bottom'
						style={{flex: 1}}
					>
						撑满的，需要设置 continer flex = 1
					</Popover>
				</View>
				
			</ScrollView>
		);
	}
}

const itemStyle = {
	backgroundColor: '#fff',
	marginBottom: 10,
	borderBottomWidth: StyleSheet.hairlineWidth,
	borderColor: '#ededed',
	paddingVertical: 10,
	paddingHorizontal: 15,
	justifyContent: 'space-between',
	alignItems: 'center',
	flexDirection: 'row'
}
