import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Button, Modal, Dialog } from 'fego-rn';
import { Style } from '../../../common';

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      simpleVisible: false,
    };
  }
  openSimple() {
    this.setState({ simpleVisible: true });
  }
  render() {
    return (
      <ScrollView style={Style.container}>
        <Text style={Style.title}>Modal（同一时间只允许弹出一个模态）</Text>
        <Button onPress={() => { this.setState({ simpleVisible: true }); }}>简单模态框容器</Button>
        <Modal
          animationType="slide-down"
          visible={this.state.simpleVisible}
          animateAppear
          maskClosable
          onClose={() => this.setState({ simpleVisible: false })}
          scale={false}
        >
          <View>
            <Text style={{ color: '#333' }}>简单模态框容器</Text>
            <Button onPress={() => this.setState({ simpleVisible: false })}>关闭</Button>
          </View>
        </Modal>

        <Button onPress={() => { this.setState({ mod1Visible: true }); }}>多模态框叠加（不建议使用）</Button>
        <Modal
          visible={this.state.mod1Visible}
          onClose={() => this.setState({ mod1Visible: false })}
        >
          <View>
            <Text style={{ paddingTop: 300, color: '#333' }}>模态框1</Text>
            <Button onPress={() => this.setState({ mod2Visible: true })}>模态框2</Button>
            <Button onPress={() => Dialog.alert('模态框1上的提示框')}>alert</Button>
          </View>
        </Modal>
        <Modal
          visible={this.state.mod2Visible}
          onClose={() => this.setState({ mod2Visible: false })}
        >
          <View>
            <Text style={{ paddingTop: 200, color: '#333' }}>模态框2</Text>
            <Button onPress={() => this.setState({ mod3Visible: true })}>模态框3</Button>
          </View>
        </Modal>
        <Modal
          visible={this.state.mod3Visible}
          onClose={() => this.setState({ mod3Visible: false })}
        >
          <View>
            <Text style={{ paddingTop: 100, color: '#333' }}>模态框3</Text>
            <Button onPress={() => Dialog.alert('模态框3上的提示框')}>alert</Button>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}
