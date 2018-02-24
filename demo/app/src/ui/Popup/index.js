import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Item, Popup, Button, Icon, Toast } from 'fego-rn';
import { Style } from '../../../common';

export default class Page extends Component {
  static navigationOptions = {
    title: '弹层Popup',
  }

  state = {
    closeType: '',
    visible: false,
    aniIn: 'top',
  }

  _pop = (aniIn, location) => {
    this.setState({
      visible: true,
      aniIn,
      title: `标题:${aniIn}`,
      location,
    });
  }
  popNum = 0
  /**
   * API标准用法
   */
  _popShow = () => {
    this.popNum++;
    const SelfView = (
      <View style={{ padding: 10 }} >
        <View style={{ paddingVertical: 20 }}>
          <Text>当前计数<Text style={{ color: '#E22', fontSize: 36 }}>{this.popNum}</Text></Text>
        </View>
        <View style={{ paddingVertical: 20 }}>
          <Text>Api命令方式调用，Popup将处于顶层View，遮盖导航条</Text>
        </View>
        <Button type="primary" title="关闭当前Popup" onPress={() => Popup.hide()} />
        <Button type="primary" title="关闭所有Popup" onPress={() => Popup.hideAll()} />
        <Button type="primary" title="弹出Toast" onPress={() => Toast.info('Toast')} />
        <Button type="primary" title="下一个Popup" onPress={() => this._popShow()} />
      </View>
    );
    Popup.show(SelfView, {
      title: `第 ${this.popNum} 个Popup`,
      headerLeft: this.popNum > 1,
      aniIn: this.popNum > 1 ? (this.popNum % 2 > 0 ? 'right' : 'left') : 'bottom',
      // 退出方向可以自定义
      aniOutFn: type => (type === 'headerLeft' ? null : 'bottom'),
      onClose: (type) => {
        console.log(`Popup close ${type}`);
      },
      onAniEnd: (visible) => {
        if (visible) {
          // 窗口显示动画结束
        } else {
          this.popNum--;
          // 窗口隐藏动画结束
        }
      },
    });
  }
  render() {
    return (
      <View style={Style.container}>
        <ScrollView>
          <Text style={Style.title}>{`关闭时onClose接受参数：type=${this.state.closeType}`}</Text>
          <Item onPress={() => this._popShow()} title="命令方式Popup.show" />
          <Item onPress={() => this._pop('bottom')} title="底部弹出 aniIn=bottom" />
          <Item onPress={() => this._pop('top')} title="顶部弹出 aniIn=top" />
          <Item onPress={() => this._pop('top', 'top')} title="顶部弹出且置顶 aniIn=top location=top" />
          <Item onPress={() => this._pop('left')} title="左下弹出 aniIn=left" />
          <Item onPress={() => this._pop('right')} title="右下弹出 aniIn=right" />
          <Item onPress={() => this._pop('left', 'top')} title="左上弹出 aniIn=left location=top" />
          <Item onPress={() => this._pop('right', 'top')} title="右上弹出 aniIn=right location=top" />
          <Item
            onPress={() => {
              this.setState({
                visible: true,
                aniIn: 'bottom',
                location: 'bottom',
                title: false,
              });
            }}
            title="无标题"
          />
          <Item
            onPress={() => {
              this.setState({
                visible: true,
                aniIn: 'bottom',
                location: 'bottom',
                title: '头部左右侧图标',
                headerLeft: true,
                headerRight: true,
              });
            }}
            title="标题显示左侧右侧图标"
          />
          <Item
            onPress={() => {
              this.setState({
                visible: true,
                aniIn: 'bottom',
                location: 'bottom',
                title: <Icon style={{ flex: 1, paddingHorizontal: 40, textAlign: 'center' }} name="free-code-camp" />,
                headerLeft: <View style={{ paddingHorizontal: 10 }}><Text style={{ fontSize: 12, color: '#999' }}>取消</Text></View>,
                headerRight: '确定',
              });
            }}
            title="自定义头部"
          />
          <Item onPress={() => this.setState({ visible1: true })} title="多Popup叠加" />
        </ScrollView>
        <Popup
          title={this.state.title}
          visible={this.state.visible}
          location={this.state.location}
          aniIn={this.state.aniIn}
          headerLeft={this.state.headerLeft}
          headerRight={this.state.headerRight}
          onClose={(type) => {
            console.log('关闭类型：', type);
            this.setState({
              visible: false,
              closeType: type,
            });
          }}
        >
          <View style={{ padding: 10 }} >
            <Text>从顶部或底部浮出的模态，提供标题和关闭按钮，展示和当前内容相关的信息或提供相关操作。</Text>
            <Text>提供基础的标题头，内容区则使用children指定。</Text>
            <Button type="primary" title="点我关闭" onPress={() => this.setState({ visible: false })} />
          </View>
        </Popup>
        <Popup
          title="第一步操作"
          visible={this.state.visible1}
          location="bottom"
          aniIn="bottom"
          onClose={() => {
            this.setState({ visible1: false });
          }}
        >
          <View style={{ minHeight: 100 }}>
            <Button title="打开第二个Popup" onPress={() => this.setState({ visible2: true })} />
          </View>
        </Popup>
        <Popup
          title="第二步操作"
          visible={this.state.visible2}
          aniIn="bottom"
          maskOpacity={0}
          headerLeft
          headerRight
          onClose={(type) => {
            if (type !== 'headerLeft') {
              return Toast.info('只能点击左侧返回');
            } else {
              this.setState({ visible2: false });
              return true;
            }
          }}
        >
          <View style={{ height: 300, backgroundColor: '#DDE' }}>
            <Button title="打开第三个Popup" onPress={() => this.setState({ visible3: true })} />
          </View>
        </Popup>
        <Popup
          title="第三步操作"
          visible={this.state.visible3}
          maskOpacity={0}
          location="bottom"
          aniIn="right"
          headerLeft
          headerRight
          onClose={(type) => {
            if (type !== 'headerLeft') {
              return Toast.info('只能点击左侧返回');
            } else {
              this.setState({ visible3: false });
              return true;
            }
          }}
        >
          <ScrollView style={{ height: 300, backgroundColor: '#EDE', padding: 10 }}>
            <View>
              <Text>第三步操作，不建议叠加超过三个</Text>
              <Text>第三个弹窗</Text>
            </View>
          </ScrollView>
        </Popup>
      </View >
    );
  }
}
