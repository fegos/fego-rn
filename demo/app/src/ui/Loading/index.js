import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Style } from '../../../common';
import { Loading, Toast, Item } from 'fego-rn';

export default class Page extends Component {
  loadingToast() {
    Loading.start();
    setTimeout((e) => {
      Loading.stop();
      Toast.info('5秒后手动关闭了Loading', 1);
    }, 5000);
  }
  waitingToast() {
    Loading.startModal();
    setTimeout((e) => {
      Loading.stop();
      Toast.info('5秒后手动关闭了Loading', 1);
    }, 5000);
  }

  waitingNomask() {
    Loading.startModal('处理中', false);
    setTimeout((e) => {
      Loading.stop();
      Toast.info('5秒后手动关闭了Loading', 1);
    }, 5000);
  }

  blackLoadingToast() {
    Loading.start('加载中...', 2, { loadingColor: 'black' });
  }
  render() {
    return (
      <ScrollView style={Style.container}>
        <Item onPress={this.loadingToast} title="加载中，可操作，手动Loading.stop()" />
        <Item onPress={this.blackLoadingToast} title="设置Loading icon的颜色为黑色" />
        <Item onPress={this.waitingToast} title="等待中，遮罩,禁止操作，直到Loading.stop()" />
        <Item onPress={this.waitingNomask} title="等待中，无遮罩,禁止操作，直到Loading.stop()" />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#333333',
    flex: 1,
  },
  view: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
