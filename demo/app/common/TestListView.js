import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { List, ListItem } from 'fego-rn'
import Style from './Style'

export default class Page extends Component {
	constructor(props){
		super(props)
	}
	_renderList(list=[]){
		let { navigation } = this.props
		return (<List>
				{list.map((item, i) => {
					return <ListItem key={i} iconName={item.icon||'puzzle-piece'} title={item.title} onPress={() => {
						navigation.navigate(item.page);
					}} hasRightArrow={true}/>
				})}
			</List>)
	}
	_renderGroup(groupList=[]){
		return groupList.map((item, i) =>{
			return (
				<View key={i}>
					<Text style={ { color: '#396', backgroundColor: '#eee', padding: 10} }>{item.title}</Text> 
					{this._renderList(item.list)}
				</View>)
		})
	}
	render() {
		let { navigator, list, groupList } = this.props
		let view;
		if(list){
			view = this._renderList(list);
		}
		if(groupList){
			view = this._renderGroup(groupList);
		}
		return (
			<ScrollView style={Style.container}>{view}</ScrollView>
		)
	}
}
