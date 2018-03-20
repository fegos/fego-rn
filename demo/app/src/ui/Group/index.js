import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Item, Checkbox, Radio } from 'fego-rn';
import { Style } from '../../../common';
import Group from '../../../../../components/ui/Group';
import Tag from '../../../../../components/ui/Tag';

Group.baseStyle = {
  container: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
  },
};

export default class Page extends Component {
  state = {
    // 多选使用
    checkboxGroupValue: ['math'],
    // 单选使用
    radioGroupValue: 'math',
    // 单选使用
    tagGroupValue: 'math',
    groupValue: 'math',
  }
  render() {
    return (
      <ScrollView style={Style.container}>
        <Text style={Style.title}>Checkbox与Group配合使用实现多选（注意：因为是多选，传入的value或defaultValue需为字符串数组）</Text>
        <Item>
          <Text>Group非受控属性（多选）：</Text>
        </Item>
        <Group defaultValue={['chinese']} isSingle={false} style={{ flexDirection: 'column' }}>
          <Checkbox value="english">英语</Checkbox>
          <Checkbox value="chinese">语文</Checkbox>
          <Checkbox value="math">数学</Checkbox>
        </Group>
        <Item>
          <Text>Group受控属性（多选）：</Text>

        </Item>
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
          <Checkbox style={{ marginLeft: 10 }} value="chinese" disabled>语文</Checkbox>
          <Checkbox style={{ marginLeft: 10 }} value="math">数学</Checkbox>
        </Group>
        <Text style={Style.title}>Radio与Group配合使用实现单选（注意：因为是单选，传入的value或defaultValue需为字符串）</Text>
        <Item>
          <Text>Group非受控属性（单选Radio）：</Text>
        </Item>
        <Group defaultValue="chinese">
          <Radio value="english">英语</Radio>
          <Radio style={{ marginLeft: 10 }} value="chinese">语文</Radio>
          <Radio style={{ marginLeft: 10 }} value="math">数学</Radio>
        </Group>
        <Item>
          <Text>Group受控属性（单选Radio）：</Text>
        </Item>
        <Group
          value={this.state.radioGroupValue}
          onChange={(value) => {
            this.setState({
              radioGroupValue: value,
            });
          }}
        >
          <Radio value="english">英语</Radio>
          <Radio style={{ marginLeft: 10 }} value="chinese" disabled>语文</Radio>
          <Radio style={{ marginLeft: 10 }} value="math">数学</Radio>
        </Group>
        <Text style={Style.title}>Tag与Group配合使用实现单选（注意：因为是单选，传入的value或defaultValue需为字符串）</Text>
        <Item>
          <Text>Group非受控属性（单选Tag）：</Text>
        </Item>
        <Group style={{ justifyContent: 'space-between' }} defaultValue="chinese">
          <Tag value="english">英语</Tag>
          <Tag value="chinese">语文</Tag>
          <Tag value="math">数学</Tag>
        </Group>
        <Item>
          <Text>Group受控属性（单选Tag）：</Text>
        </Item>
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
        <Text style={Style.title}>支持加一层view，多行显示</Text>
        <Group
          style={{ flexDirection: 'column' }}
          value={this.state.groupValue}
          onChange={(value) => {
            this.setState({
              groupValue: value,
            });
          }}
        >
          <View type="container" style={{ flexDirection: 'row' }}>
            <Radio style={{ marginLeft: 5, width: 70, flex: 0 }} styles={{ text: { fontSize: 13 } }} value="english">英语</Radio>
            <Radio style={{ marginLeft: 0, width: 70, flex: 0 }} styles={{ text: { fontSize: 13 } }} value="chinese">语文</Radio>
            <Radio style={{ marginLeft: 0, width: 70, flex: 0 }} styles={{ text: { fontSize: 13 } }} value="math">数学</Radio>
            <Radio style={{ marginLeft: 0, width: 70, flex: 0 }} styles={{ text: { fontSize: 13 } }} value="music">音乐</Radio>
            <Radio style={{ marginLeft: 0, width: 70, flex: 0 }} styles={{ text: { fontSize: 13 } }} value="PE">体育</Radio>
          </View>
          <View type="container" style={{ flexDirection: 'row', marginTop: 10 }}>
            <Radio style={{ marginLeft: 5, width: 70, flex: 0 }} styles={{ text: { fontSize: 13 } }} value="biology">生物</Radio>
            <Radio style={{ marginLeft: 0, width: 70, flex: 0 }} styles={{ text: { fontSize: 13 } }} value="chemistry">化学</Radio>
            <Radio style={{ marginLeft: 0, width: 70, flex: 0 }} styles={{ text: { fontSize: 13 } }} value="physics">物理</Radio>
          </View>
        </Group>
      </ScrollView>
    );
  }
}
