import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { List, Radio } from 'fego-rn';
import { Style } from '../../../common';

const { ListItem } = List;

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
        <List>
          <ListItem>
            <Radio defaultChecked>非受控组件：使用defaultChecked</Radio>
          </ListItem>
          <ListItem>
            <Radio
              checked={this.state.checked}
              onChange={(checked) => {
                this.setState({
                  checked,
                });
              }}
            >受控组件：使用checked
            </Radio>
          </ListItem>
          <ListItem>
            <Radio disabled>disabled</Radio>
          </ListItem>
        </List>
      </ScrollView>
    );
  }
}
