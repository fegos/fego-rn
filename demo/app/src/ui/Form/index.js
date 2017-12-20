import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { Style } from '../../../common'
import { List, ListItem, Checkbox, Input, Radio } from 'fego-rn'
export default class Page extends Component {
	static navigationOptions = {
		title: '表单类组件',
	}
	state = {
		radioGroupValue: 'english',
		checkboxGroupValue: ['math'],
		checked1: false,
		checked2: false,
		inputValue1: '受控组件：value 与 onChange一起使用',
		inputValue2: 3333331343353363,
		inputValue3: 18200032343,
	}
	render() {
		return (
			<ScrollView style={Style.container}>
				<Text style={Style.title}>Radio</Text>
				<List>
					<ListItem>
						<Radio defaultChecked={false}>非受控组件：使用defaultChecked</Radio>
					</ListItem>
					<ListItem>
						<Radio checked={this.state.checked2} onChange={(checked)=>{
							this.setState({
								checked2: checked
							})
						}}>受控组件：使用checked</Radio>
					</ListItem>
					<ListItem>
						<Text>RadioGroup非受控属性：</Text>
						<Radio.Group>
							<Radio value='english'>英语</Radio>
							<Radio value='chinese' disabled>语文</Radio>
							<Radio value='math'>数学</Radio>
						</Radio.Group>
					</ListItem>
					<ListItem>
						<Text>RadioGroup受控属性：</Text>
						<Radio.Group value={this.state.radioGroupValue} onChange={(value)=>{
							this.setState({
								radioGroupValue: value
							})
						}}>
							<Radio value='english'>英语</Radio>
							<Radio value='chinese'>语文</Radio>
							<Radio value='math'>数学</Radio>
						</Radio.Group>
					</ListItem>
				</List>
				<Text style={Style.title}>Checkbox</Text>
				<List>
					<ListItem>
						<Checkbox defaultChecked={true}>非受控组件：使用defaultChecked</Checkbox>
					</ListItem>
					<ListItem>
						<Checkbox checked={this.state.checked1} onChange={(checked)=>{
							this.setState({
								checked1: checked
							})
						}}>受控组件：使用checked，必须同时使用onChange更新，保证选中数据的一致性</Checkbox>
					</ListItem>
					<ListItem>
						<Text>CheckboxGroup非受控属性：</Text>
						<Checkbox.Group defaultValue={['chinese']}>
							<Checkbox value='english'>英语</Checkbox>
							<Checkbox value='chinese'>语文</Checkbox>
							<Checkbox value='math'>数学</Checkbox>
						</Checkbox.Group>
					</ListItem>
					<ListItem>
						<Text>CheckboxGroup受控属性：</Text>
						<Checkbox.Group value={this.state.checkboxGroupValue} onChange={(values)=>{
							console.log(values)
							this.setState({
								checkboxGroupValue: values
							})
						}}>
							<Checkbox value='english'>英语</Checkbox>
							<Checkbox value='chinese'>语文</Checkbox>
							<Checkbox value='math'>数学</Checkbox>
						</Checkbox.Group>
					</ListItem>
					<ListItem>
						<Checkbox disabled={true}>disabled</Checkbox>
					</ListItem>
				</List>
				<Text style={Style.title}>Input</Text>
				<List>
					<Input label='label标题' clear placeholder='带删除按钮，输入状态显示'/>
					<Input label='错误状态' autoFocus error defaultValue='错误状态标红，且自动聚焦' onFocus={v=>{
						console.log('focus: ',v)
					}} onBlur={v=>{
						console.log('blur: ',v)
					}}/>
					<Input label='正确示例' clear value={this.state.inputValue1} onChange={v=>{
						this.setState({
							inputValue1: v
						})
					}} onFocus={v=>{
						console.log('focus: ',v)
					}} onBlur={v=>{
						console.log('blur: ',v)
					}}/>
					<Input label='自定义label宽度' labelStyle={{ width: 120, color: '#393' }}/>
					<Input label="标题" type='number' defaultValue='10000' extra="元"/>
					<Input label="银行卡" type="bankCard" maxLength={16} value={this.state.inputValue2} onChange={v=>{
						this.setState({
							inputValue2: v
						})
					}}/>
					<Input label="手机号" type="phone" value={this.state.inputValue3} onChange={v=>{
						this.setState({
							inputValue3: v
						})
					}}/>
					<Input defaultValue='输入域默认值，且无标题label'/>
					<Input last defaultValue='最后一个，无底边框'/>
				</List>
			</ScrollView>
		);
	}
}