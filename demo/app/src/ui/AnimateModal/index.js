import React, { Component } from 'react';
import { ScrollView, View, Text, Modal } from 'react-native';
import { Button, AnimateModal, Dialog, Radio } from 'fego-rn';
import { Style } from '../../../common';
import Group from '../../../../../components/ui/Group';

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      officialModalVisible: false,
      officialAnimationType: 'none',
      visible: false,
      animationType: 'none',
      multiModalVisible: false,
      springEffect: false,
      maskClosable: true,
    };
  }
  render() {
    const {
      officialAnimationType, officialModalVisible, animationType, visible, springEffect, maskClosable, multiModalVisible,
    } = this.state;
    return (
      <ScrollView style={Style.container}>
        <Text style={[Style.title, { marginTop: 15 }]}>官方Modal（同一时间只允许弹出一个模态）</Text>
        <Group
          style={{ marginTop: 15 }}
          defaultValue="none"
          onChange={(value) => {
            this.setState({
              officialAnimationType: value,
            });
          }}
        >
          <Radio style={{ marginLeft: 15 }} value="none">none</Radio>
          <Radio style={{ marginLeft: 15 }} value="fade">fade</Radio>
          <Radio style={{ marginLeft: 15 }} value="slide">slide</Radio>
        </Group>
        <Button
          type="primary"
          style={{ marginTop: 20, marginHorizontal: 10, backgroundColor: 'green' }}
          onPress={() => {
            this.setState({
              officialModalVisible: true,
            });
          }}
        >弹出modal
        </Button>
        <Modal
          animationType={officialAnimationType}
          visible={officialModalVisible}
          onRequestClose={() => this.setState({ officialModalVisible: false })}
        >
          <View style={{ backgroundColor: 'green' }}>
            <Text style={{ color: '#333' }}>官方模态框</Text>
            <Button onPress={() => this.setState({ officialModalVisible: false })}>关闭</Button>
          </View>
        </Modal>
        <Text style={[Style.title, { marginTop: 15 }]}>AnimateModal（同一时间只允许弹出一个模态）</Text>
        <Group
          style={{ marginTop: 15 }}
          defaultValue="none"
          onChange={(value) => {
            this.setState({
              animationType: value,
            });
          }}
        >
          <Radio style={{ marginLeft: 5 }} styles={{ text: { fontSize: 10 } }} value="none">none</Radio>
          <Radio style={{ marginLeft: 0 }} styles={{ text: { fontSize: 10 } }} value="fade">fade</Radio>
          <Radio style={{ marginLeft: 0 }} styles={{ text: { fontSize: 10 } }} value="slide">slide</Radio>
          <Radio style={{ marginLeft: 0 }} styles={{ text: { fontSize: 10 } }} value="slide-down">slide-down</Radio>
          <Radio style={{ marginLeft: 0 }} styles={{ text: { fontSize: 10 } }} value="scale">scale</Radio>
          <Radio style={{ marginLeft: 0 }} styles={{ text: { fontSize: 10 } }} value="fade-scale">fade-scale</Radio>
          <Radio style={{ marginLeft: 0 }} styles={{ text: { fontSize: 10 } }} value="alert">alert</Radio>
        </Group>
        <Radio
          style={{ marginLeft: 5, marginTop: 10 }}
          checked={springEffect}
          onChange={(checked) => {
            this.setState({
              springEffect: checked,
            });
          }}
        >springEffect
        </Radio>
        <Radio
          style={{ marginLeft: 5, marginTop: 10 }}
          checked={maskClosable}
          onChange={(checked) => {
            this.setState({
              maskClosable: checked,
            });
          }}
        >maskClosable
        </Radio>
        <Button
          type="primary"
          style={{ marginTop: 20, marginHorizontal: 10, backgroundColor: 'green' }}
          onPress={() => { this.setState({ visible: true }); }}
        >弹出AnimateModal
        </Button>
        <AnimateModal
          animationType={animationType}
          visible={visible}
          animateWhenMount
          maskClosable={maskClosable}
          onClose={() => this.setState({ visible: false })}
          springEffect={springEffect}
        >
          <View>
            <Text style={{ color: '#333' }}>简单模态框容器</Text>
            <Button onPress={() => this.setState({ visible: false })}>关闭</Button>
          </View>
        </AnimateModal>

        <Button
          type="primary"
          style={{ marginTop: 20, marginHorizontal: 10, backgroundColor: 'green' }}
          onPress={() => { this.setState({ multiModalVisible: true }); }}
        >多模态框叠加（不建议使用，且iOS仅支持一级）
        </Button>
        <AnimateModal
          visible={this.state.multiModalVisible}
          onClose={() => this.setState({ multiModalVisible: false })}
        >
          <View>
            <Text style={{
              paddingTop: 260, paddingHorizontal: 20, textAlign: 'center', color: '#333', fontSize: 18,
            }}
            >第一级模态框（iOS只能显示到这一级）
            </Text>
            <Button style={{ marginTop: 20 }} onPress={() => this.setState({ multiModalVisible: true })}>弹出第二级模态框</Button>
            <Button onPress={() => Dialog.alert('第一级模态框上的提示框')}>alert(iOS上无法正常显示)</Button>
            <Button onPress={() => this.setState({ multiModalVisible: false })}>关闭</Button>
          </View>
        </AnimateModal>
        <AnimateModal
          animationType={animationType}
          visible={this.state.mod2Visible}
          animateWhenMount
          maskClosable={maskClosable}
          onClose={() => this.setState({ mod2Visible: false })}
          springEffect={springEffect}
        >
          <View>
            <Text style={{
              paddingTop: 300, paddingHorizontal: 20, textAlign: 'center', color: '#333', fontSize: 18,
            }}
            >第二级模态框
            </Text>
            <Button style={{ marginTop: 20 }} onPress={() => this.setState({ mod3Visible: true })}>弹出第三级模态框</Button>
            <Button onPress={() => this.setState({ mod2Visible: false })}>关闭</Button>
          </View>
        </AnimateModal>
        <AnimateModal
          visible={this.state.mod3Visible}
          onClose={() => this.setState({ mod3Visible: false })}
        >
          <View>
            <Text style={{
              paddingTop: 300, paddingHorizontal: 20, textAlign: 'center', color: '#333', fontSize: 18,
            }}
            >第三级模态框
            </Text>
            <Button style={{ marginTop: 20 }} onPress={() => Dialog.alert('模态框3上的提示框')}>alert</Button>
            <Button onPress={() => this.setState({ mod3Visible: false })}>关闭</Button>
          </View>
        </AnimateModal>
      </ScrollView >
    );
  }
}
