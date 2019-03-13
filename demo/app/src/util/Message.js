import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Message } from 'fego-rn';

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'hello',
    };
  }

  sendMsg = () => {
    Message.emit('event');
    this.setState({
      text: '发送消息成功',
    });
  }

  regMsg = () => {
    Message.emit('event');
    this.setState({
      text: '发送消息成功',
    });
  }

  unregMsg = () => {
    Message.off('event');
    this.setState({
      text: '注销消息成功',
    });
  }
  render() {
    const { text } = this.state;
    return (
      <View>
        <Button
          type="primary"
          onPress={() => {
            this.regMsg();
          }}
        >注册监听
        </Button>
        <Button
          type="primary"
          onPress={() => {
            this.sendMsg();
          }}
        >发送消息
        </Button>
        <Button
          type="primary"
          onPress={() => {
            this.unregMsg();
          }}
        >注销监听
        </Button>
        <Text>{text}</Text>
      </View>
    );
  }
}
