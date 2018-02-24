import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Item, Checkbox } from 'fego-rn';
import { Style } from '../../../common';

export default class Page extends Component {
  state = {
    checked: false,
  }
  render() {
    return (
      <ScrollView style={Style.container}>
        <Text style={Style.title}>Checkbox</Text>
        <Item>
          <Checkbox defaultChecked>非受控组件：使用defaultChecked</Checkbox>
        </Item>
        <Item>
          <Checkbox
            checked={this.state.checked}
            onChange={(checked) => {
              this.setState({
                checked,
              });
            }}
          >受控组件：使用checked，必须同时使用onChange更新，保证选中数据的一致性
          </Checkbox>
        </Item>
        <Item>
          <Checkbox disabled>disabled</Checkbox>
        </Item>
      </ScrollView>
    );
  }
}
