
import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Button,
} from 'react-native';
import { SocketIO } from 'fego-rn';
import { Style } from '../../../common';

class TestView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serverTime: '',
      status: '',
      msg: '',
    };
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  _socketConnect = () => {
    if (this.socket) {
      this.socket.disconnect();
    }
    this.socket = SocketIO.create('http://localhost:9096');

    // 连接socket成功
    this.socket.on('connect', this._onConnectEvent);
    // 心跳
    this.socket.on('serverHeartbeatEvent', this._recHeartbeatEventEvent);
    // 自定义消息
    this.socket.on('serverTestEvent', this._recTestEvent);
    // 断开链接
    this.socket.on('disconnect', this._onDisconnectEvent);

    this.setState({
      status: '连接中...',
    });
  }

  _onConnectEvent = (socket) => {
    this.setState({
      status: `连接中${socket}`,
    });
  }
  _recHeartbeatEventEvent = (data) => {
    this.setState({
      serverTime: data.timestamp,
    });
  }

  _recTestEvent = (data) => {
    this.setState({
      msg: `${this.state.msg}\n信息：${data.test}`,
    });
  }

  _onDisconnectEvent = (socket) => {
    this.setState({
      status: `断开连接${socket}`,
    });
  }

  _sendSocketMsg = () => {
    const data = {
      traderId: 'xxxxeeeeddd',
      token: 'goooooood',
    };
    this.socket.emit('serverTestEvent', data);
  }

  _socketDisConnect = () => {
    this.socket.disconnect();
    this.socket = null;
  }

  render() {
    return (
      <View>
        <Button title="连接" onPress={this._socketConnect} />
        <Button title="发送消息" onPress={this._sendSocketMsg} />
        <Button title="断开连接" onPress={this._socketDisConnect} />

        <Text style={Style.text}>状态：{this.state.status}</Text>
        <Text style={Style.text}>服务器时间：{this.state.serverTime}</Text>
        <Text style={Style.text}>收发数据：</Text>
        <ScrollView>
          <Text style={{ padding: 5 }}>{this.state.msg}</Text>
        </ScrollView>
      </View>

    );
  }
}

export default TestView;
