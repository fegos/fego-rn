import React, { Component } from 'react'
import { ScrollView, Text, Platform } from 'react-native'
import { List, ListItem, DatePicker, Popup } from 'fego-rn'

export default class Page extends Component {
	constructor(props) {
		super(props)
		this.state = {
			visible1: false,
			visible2: false,
			visible3: false,
			picker1Str: '',
			picker2Str: ''
		}
	}
	render () {
		return (
			<ScrollView style={{backgroundColor: '#fff', flex: 1}}>
				<List>
					<ListItem onPress={()=>{
						this.setState({visible1:true})
						// Popup.show(<DatePicker mode='date' showInModal={false}/>)
					}}><Text>DatePicker:{this.state.picker1Str}</Text></ListItem>
					<ListItem onPress={()=>{
						this.setState({visible2:true})
						// Popup.show(<DatePicker mode='time' showInModal={false}/>)
					}}><Text>TimePicker:{this.state.picker2Str}</Text></ListItem>
				</List>
				<DatePicker 
					mode='date' 
					minDate={new Date(2014,6,10)}
					maxDate={new Date(2027,10,20)}
					initialValue={new Date(2017,1,16)}
					visible={this.state.visible1}
					onClose={()=>{this.setState({visible1: false})}}
					onConfirm={(val, idx, label, pickerType) => {
						console.log(val, idx, label)
						this.setState({
							picker1Str: label.join('')
						})
					}}
					onChange={(v, i, l)=>{
						console.log(v, i, l)
					}}
				/>
				<DatePicker 
					mode='time' 
					minDate={new Date(2017,8,14, 15, 40)}
					maxDate={new Date(2017,8,14, 18, 3)}
					initialValue={new Date(2017,8,14, 20, 20)}
					minuteStep={5} 
					visible={this.state.visible2}
					onClose={()=>{this.setState({visible2: false})}}
					onConfirm={(val, idx, label, pickerType) => this.setState({
						picker2Str: label.join('')
					})}
				/>
			</ScrollView>
		)
	}
}