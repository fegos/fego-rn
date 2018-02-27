import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Toast, Item, Button, Tag } from 'fego-rn';
import { Style } from '../../../common';

export default class Page extends Component {
  showToast() {
    Toast.info('这是一个 toast 提示!!!', 3);
  }
  successToast() {
    Toast.success('加载成功!!!', 3, { backgroundColor: '#3af568' });
  }
  failToast() {
    Toast.fail('加载失败!!!', 3);
  }
  offline() {
    Toast.offline('网络连接失败!!!', 3);
  }
  callbackToast() {
    Toast.info('动画结束后执行回调，显示执行回调', 2, {
      onClose: () => {
        // console.log('回调执行');
        setImmediate(() => {
          Toast.info('回调执行');
        });
      },
    });
  }
  multToast() {
    Toast.info('第一个持续3秒，2秒后触发下一个', 3);
    setTimeout(() => {
      Toast.info('第二个持续10秒，2秒后触发下一个 ', 10);
      setTimeout(() => {
        Toast.info('第三个持续2秒，4秒后触发下一个 ', 2);
        setTimeout(() => {
          Toast.info('第四个持续5秒，结束', 5);
        }, 4000);
      }, 2000);
    }, 2000);
  }
  render() {
    return (
      <ScrollView style={Style.container}>

        <Item onPress={this.showToast} title="纯文字 toast" />
        <Item onPress={this.successToast} title="成功 toast" />
        <Item onPress={this.failToast} title="失败 toast" />
        <Item onPress={this.offline} title="网络 toast" />
        <Item onPress={this.callbackToast} title="带回调函数的Toast" />
        <Item onPress={this.multToast} title="多Toast连续触发" />
        <Item
          onPress={() => {
            Toast.show(<View style={{ backgroundColor: '#F1AAAA', justifyContent: 'center' }}>
                        <Button title="按钮" style={{ marginBottom: 5 }} />
                        <Tag text="标签" />
                       </View>, {
                          duration: 2,
                          styles: {
                            inner: {
                              padding: 10,
                              backgroundColor: '#F1AAAA',
                            },
                          },
                        });
          }}
          title="自定义内容"
        />
      </ScrollView>
    );
  }
}
