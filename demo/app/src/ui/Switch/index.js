import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Item, Switch } from 'fego-rn';
import { Style } from '../../../common';

export default class Page extends Component {
  static navigationOptions = {
    title: '开关选择器',
  }
  state = {
    active: false,
    active1: false,
    switchAll: false,
    switch1: false,
    switch2: true,
    switch3: false,
  }
  checkAll = () => {

  }
  render() {
    return (
      <ScrollView style={Style.container}>
        <Text style={Style.title}>Switch</Text>
        <Item>
          <Switch defaultActive disabled />
          <Text>禁止的</Text>
        </Item>
        <Item>
          <Switch defaultActive />
          <Text>使用defaultActive则属于非控组件</Text>
        </Item>
        <Item>
          <Switch active={this.state.active} onChange={active => this.setState({ active })} />
          <Text>使用active则属于受控组件，组件状态由外部props控制</Text>
        </Item>
        <Item>
          <Switch active={this.state.active1} onChange={() => this.setState({ active1: false })} />
          <Text>错误的例子，需使用onChange更新</Text>
        </Item>
        <Item>
          <Switch
            active={this.state.switchAll}
            onChange={active => this.setState({
              switchAll: active,
              switch1: active,
              switch2: active,
              switch3: active,
            })}
          />
          <Text>全部</Text>
        </Item>
        <Item>
          <Switch active={this.state.switch1} onChange={active => this.setState({ switch1: active })} />
          <Text>选项一</Text>
        </Item>
        <Item>
          <Switch active={this.state.switch2} onChange={active => this.setState({ switch2: active })} />
          <Text>选项二</Text>
        </Item>
        <Item>
          <Switch active={this.state.switch3} onChange={active => this.setState({ switch3: active })} />
          <Text>选项三</Text>
        </Item>
        <Item>
          <Switch
            defaultActive={false}
            styles={{
              button: {
                borderRadius: 15,
              },
              buttonActive: {
                backgroundColor: '#00ff00',
              },
              buttonInActive: {
                backgroundColor: '#dcdcdc',
              },
              buttonPressActive: {
                backgroundColor: '#32cd32',
              },
              buttonPressInActive: {
                backgroundColor: '#a9a9a9',
              },
              bar: {
                width: 50,
                height: 20,
              },
              barActive: {
                backgroundColor: '#f5deb3',
              },
              barInactive: {
                backgroundColor: '#d8bfd8',
              },
            }}
          />
          <Text>自定义样式</Text>
        </Item>
      </ScrollView>
    );
  }
}
