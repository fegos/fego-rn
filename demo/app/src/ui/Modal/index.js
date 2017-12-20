import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { Style } from '../../../common'
import { Button, Modal, Dialog } from 'fego-rn'
export default class Page extends Component {
	static navigationOptions = {
		title: '模态框'
	}
	constructor(props){
		super(props)
		this.state = {
			simpleVisible: false,
			dialogVisible: false,
			fullScreenDialogVisible: false
		}
	}
	openSimple(){
		this.setState({ simpleVisible: true })
	}
	render() {
		return (
			<ScrollView style={Style.container}>
				<Text style={Style.title}>Modal（同一时间只允许弹出一个模态）</Text>
				<Button onPress={()=>{this.setState({ simpleVisible: true })}}>简单模态框容器</Button>
				<Modal
					animationType= 'slide-down'
					visible={this.state.simpleVisible}
					animateAppear={false}
					maskClosable={true}
					onClose={()=>this.setState({ simpleVisible: false })}
				>
					<View>
						<Text style={ {color: '#333'} }>简单模态框容器</Text>
						<Button onPress={()=>this.setState({ simpleVisible: false })}>关闭</Button>
					</View>
				</Modal>

				<Button onPress={()=>{this.setState({ mod1Visible: true })}}>多模态框叠加（不建议使用）</Button>
				<Modal
					visible={this.state.mod1Visible}
					onClose={()=>this.setState({ mod1Visible: false })}
				>
					<View>
						<Text style={ { paddingTop: 300, color: '#333'} }>模态框1</Text>
						<Button onPress={()=>this.setState({ mod2Visible: true })}>模态框2</Button>
						<Button onPress={()=>Dialog.alert('模态框1上的提示框')}>alert</Button>
					</View>
				</Modal>
				<Modal
					visible={this.state.mod2Visible}
					onClose={()=>this.setState({ mod2Visible: false })}
				>
					<View>
						<Text style={ { paddingTop: 200,color: '#333'} }>模态框2</Text>
						<Button onPress={()=>this.setState({ mod3Visible: true })}>模态框3</Button>
					</View>
				</Modal>
				<Modal
					visible={this.state.mod3Visible}
					onClose={()=>this.setState({ mod3Visible: false })}
				>
					<View>
						<Text style={ { paddingTop: 100,color: '#333'} }>模态框3</Text>
						<Button onPress={()=>Dialog.alert('模态框3上的提示框')}>alert</Button>
					</View>
				</Modal>

				<Text style={Style.title}>Dialog</Text>
				<Button onPress={()=>{this.setState({ dialogVisible: true })}}>普通对话框</Button>
				<Dialog
					title= '标题'
					visible={this.state.dialogVisible}
					onClose={()=>this.setState({ dialogVisible: false })}
					footer={[
						{ text: '取消', onPress: () => console.log('cancel'), style: 'no' },
						{ text: '确定', onPress: () => console.log('ok'), style: 'yes' },
					]}
				>
					<View>
						<Text style={ {color: '#333'} }>简单的对话框</Text>
					</View>
				</Dialog>

				<Button onPress={()=>{this.setState({ dialog2Visible: true })}}>多按钮对话框</Button>
				<Dialog
					title= '标题'
					visible={this.state.dialog2Visible}
					onClose={()=>this.setState({ dialog2Visible: false })}
					footer={[
						{ text: '按钮1', style: 'no' },
						{ text: '按钮2'},
						{ text: '按钮3'},
						{ text: '按钮4', style: 'yes' },
					]}
				>
					<View>
						<Text style={ {color: '#333'} }>多按钮对话框</Text>
					</View>
				</Dialog>

				<Button onPress={()=>{this.setState({ fullScreenDialogVisible: true })}}>全屏对话框</Button>
				<Dialog
					fullScreen={true}
					visible={this.state.fullScreenDialogVisible}
				>
					<View>
						<Text style={ {color: '#333'} }>全屏对话框</Text>
						<Button onPress={()=>this.setState({ fullScreenDialogVisible: false })}>关闭</Button>
					</View>
				</Dialog>
				<Text style={Style.title}>Dialog.tip/alert/confirm</Text>
				<Button onPress={() => Dialog.tip('删除', '确定删除么???', [
					{ text: '不好', onPress: () => console.log('cancel') },
					{ text: '可以', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
				])}>自定义按钮tip</Button>
				<Button onPress={() => Dialog.alert('新密码须至少包含1个字母和1个数字，6-10位')}>alert</Button>
				<Button onPress={() => Dialog.confirm('你很帅吗？', (btn)=>{
					if(btn.type === 'yes'){
						Dialog.alert('你很自信嘛！')
					}else{
						Dialog.alert('这就对了！')
					}
				})}>confirm</Button>
				<Button onPress={() => Dialog.confirm(<Text style={{color: '#338811'}}>这窗口点确定是没用的</Text>, (btn)=>{
					if(btn.type === 'yes'){
						return false
					}
				})}>可判断是否关闭</Button>
				<Button onPress={() => {
					Dialog.alert('第一个');
					Dialog.alert('第二个')
					setTimeout(e=>{
						Dialog.alert('第三个')
						setTimeout(e=>{
							Dialog.alert('第四个')
						}, 1000)
					}, 200)
					
				}}>连续弹出多个Dialog</Button>
				<Button onPress={() => Dialog.confirm('动画结束回调', (btn, aniEnd)=>{
					console.log('按钮被点击，但动画未结束')
					aniEnd(()=>{
						console.log('动画结束后才执行')
					})
				})}>动画结束回调</Button>
			</ScrollView>
		);
	}
}
