import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { List, Checkbox } from 'fego-rn';
import { Style } from '../../../common';

const { ListItem } = List;

export default class Page extends Component {
  state = {
    checked: false,
  }
  render() {
    return (
      <ScrollView style={Style.container}>
        <Text style={Style.title}>Checkbox</Text>
        <List>
          <ListItem>
            <Checkbox defaultChecked>非受控组件：使用defaultChecked</Checkbox>
          </ListItem>
          <ListItem>
            <Checkbox
              checked={this.state.checked}
              onChange={(checked) => {
                this.setState({
                  checked,
                });
              }}
            >受控组件：使用checked，必须同时使用onChange更新，保证选中数据的一致性
            </Checkbox>
          </ListItem>
          <ListItem>
            <Checkbox disabled>disabled</Checkbox>
          </ListItem>
        </List>
      </ScrollView>
    );
  }
}
