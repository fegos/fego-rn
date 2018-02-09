import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { List, Checkbox, Radio } from 'fego-rn';
import { Style } from '../../../common';
import Group from '../../../../../components/ui/Group';
import Tag from '../../../../../components/ui/Tag';

const { ListItem } = List;

export default class Page extends Component {
  state = {
    // 多选使用
    checkboxGroupValue: ['math'],
    // 单选使用
    radioGroupValue: 'math',
    // 单选使用
    tagGroupValue: 'math',
  }
  render() {
    return (
      <ScrollView style={Style.container}>
        <Text style={Style.title}>Checkbox与Group配合使用实现多选（注意：因为是多选，传入的value或defaultValue需为字符串数组）</Text>
        <List>
          <ListItem>
            <Text>Group非受控属性（多选）：</Text>
            <Group defaultValue={['chinese']} isSingle={false}>
              <Checkbox value="english">英语</Checkbox>
              <Checkbox value="chinese">语文</Checkbox>
              <Checkbox value="math">数学</Checkbox>
            </Group>
          </ListItem>
          <ListItem>
            <Text>Group受控属性（多选）：</Text>
            <Group
              value={this.state.checkboxGroupValue}
              isSingle={false}
              onChange={(values) => {
                console.log(values);
                this.setState({
                  checkboxGroupValue: values,
                });
              }}
            >
              <Checkbox value="english">英语</Checkbox>
              <Checkbox value="chinese" disabled>语文</Checkbox>
              <Checkbox value="math">数学</Checkbox>
            </Group>
          </ListItem>
        </List>
        <Text style={Style.title}>Radio与Group配合使用实现单选（注意：因为是单选，传入的value或defaultValue需为字符串）</Text>
        <List>
          <ListItem>
            <Text>Group非受控属性（单选Radio）：</Text>
            <Group defaultValue="chinese">
              <Radio value="english">英语</Radio>
              <Radio value="chinese">语文</Radio>
              <Radio value="math">数学</Radio>
            </Group>
          </ListItem>
          <ListItem>
            <Text>Group受控属性（单选Radio）：</Text>
            <Group
              value={this.state.radioGroupValue}
              onChange={(value) => {
                this.setState({
                  radioGroupValue: value,
                });
              }}
            >
              <Radio value="english">英语</Radio>
              <Radio value="chinese" disabled>语文</Radio>
              <Radio value="math">数学</Radio>
            </Group>
          </ListItem>
        </List>
        <Text style={Style.title}>Tag与Group配合使用实现单选（注意：因为是单选，传入的value或defaultValue需为字符串）</Text>
        <List>
          <ListItem>
            <Text>Group非受控属性（单选Tag）：</Text>
            <Group style={{ justifyContent: 'space-between' }} defaultValue="chinese">
              <Tag value="english">英语</Tag>
              <Tag value="chinese">语文</Tag>
              <Tag value="math">数学</Tag>
            </Group>
          </ListItem>
          <ListItem>
            <Text>Group受控属性（单选Tag）：</Text>
            <Group
              style={{ justifyContent: 'space-between' }}
              value={this.state.tagGroupValue}
              onChange={(value) => {
                this.setState({
                  tagGroupValue: value,
                });
              }}
            >
              <Tag value="english">英语</Tag>
              <Tag value="chinese" disabled>语文</Tag>
              <Tag value="math">数学</Tag>
            </Group>
          </ListItem>
        </List>
      </ScrollView>
    );
  }
}
