import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Radio, Item } from 'fego-rn';
import { Style } from '../../../common';

export default class Page extends Component {
  static navigationOptions = {
    title: '表单类组件',
  }
  state = {
    checked: false,
  }
  render() {
    return (
      <ScrollView style={Style.container}>
        <Text style={Style.title}>Radio</Text>
        <Item>
          <Radio defaultChecked left={false} styles={{ icon: { marginLeft: 10 } }}>非受控组件：使用defaultChecked</Radio>
        </Item>
        <Item>
          <Radio
            checked={this.state.checked}
            onChange={(checked) => {
              this.setState({
                checked,
              });
            }}
          >受控组件：使用checked
          </Radio>
        </Item>
        <Item>
          <Radio disabled>disabled</Radio>
        </Item>

      </ScrollView>
    );
  }
}
