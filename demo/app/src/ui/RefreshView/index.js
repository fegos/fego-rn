import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { RefreshView } from 'fego-rn';

export default class Page extends Component {
  onRefresh() {
    console.log('refresh');
    const self = this;
    setTimeout(() => {
      self.refs.PullRefresh.refreshed();
    }, 2000);
  }

  onLoadMore() {
  }

  render() {
    return (
            <View style={styles.container}>
                <View style={styles.header} />

                <RefreshView ref="PullRefresh" onRefresh={() => this.onRefresh()}>
                    <View style={styles.scrollItem}><Text>Scroll1</Text></View>
                    <View style={styles.scrollItem}><Text>Scroll2</Text></View>
                    <View style={styles.scrollItem}><Text>Scroll3</Text></View>
                    <View style={styles.scrollItem}><Text>Scroll4</Text></View>
                    <View style={styles.scrollItem}><Text>Scroll5</Text></View>
                    <View style={styles.scrollItem}><Text>Scroll6</Text></View>
                </RefreshView>
            </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 64,
    backgroundColor: '#293447',
  },
  scrollItem: {
    flex: 1,
    height: 80,
    marginBottom: 10,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
});
