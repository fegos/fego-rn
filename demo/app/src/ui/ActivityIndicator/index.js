import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { ActivityIndicator, Item } from 'fego-rn';
import { Style } from '../../../common';


export default class Page extends Component {
  static navigationOptions = {
    title: '活动指示器',
  }
  constructor(props) {
    super(props);
    this.state = {
      toast1Visible: false,
    };
  }
  render() {
    return (
      <ScrollView style={Style.container}>
        <Text style={Style.title}>ActivityIndicator</Text>
        <Item>
          <Text>默认：</Text>
          <ActivityIndicator />
        </Item>
        <Item>
          <Text>size设为large：</Text>
          <ActivityIndicator size="large" />
        </Item>
        <Item>
          <Text>text设为正在加载：</Text>
          <ActivityIndicator text="正在加载" />
        </Item>
        <Item>
          <Text>变更颜色：</Text>
          <ActivityIndicator color="#33F" textStyle={{ color: '#33F' }} text="正在加载" />
        </Item>
        <Item>
          <Text>visible为false</Text>
          <ActivityIndicator visible={this.state.toast1Visible} hasToast size="large" color="#FFF" />
        </Item>
      </ScrollView>
    );
  }
}
