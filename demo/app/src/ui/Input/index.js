import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Input } from 'fego-rn';
import { Style } from '../../../common';

export default class Page extends Component {
  static navigationOptions = {
    title: 'Input',
  }
  state = {
    inputValue1: '受控组件：value 与 onChange一起使用',
    inputValue2: 3333331343353363,
    inputValue3: 18200032343,
  }
  render() {
    return (
      <ScrollView style={Style.container}>
        <Text style={Style.title}>Input</Text>
        <Input label="label标题" clear placeholder="带删除按钮，输入状态显示" />
        <Input
          label="错误状态"
          autoFocus
          error
          defaultValue="错误状态标红，且自动聚焦"
          onFocus={() => {
            // console.log('focus: ', v);
          }}
          onBlur={() => {
            // console.log('blur: ', v);
          }}
        />
        <Input
          label="正确示例"
          clear
          value={this.state.inputValue1}
          onChange={(v) => {
            this.setState({
              inputValue1: v,
            });
          }}
          onFocus={() => {
            // console.log('focus: ', v);
          }}
          onBlur={() => {
            // console.log('blur: ', v);
          }}
        />
        <Input label="自定义label宽度" labelStyle={{ width: 120, color: '#393' }} />
        <Input label="标题" type="number" defaultValue="10000" extra="元" />
        <Input
          label="银行卡"
          type="bankCard"
          maxLength={16}
          value={this.state.inputValue2}
          onChange={(v) => {
            this.setState({
              inputValue2: v,
            });
          }}
        />
        <Input
          label="手机号"
          type="phone"
          value={this.state.inputValue3}
          onChange={(v) => {
            this.setState({
              inputValue3: v,
            });
          }}
        />
        <Input defaultValue="输入域默认值，且无标题label" />
        <Input last defaultValue="最后一个，无底边框" />
      </ScrollView>
    );
  }
}
