import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Item } from 'fego-rn';
import Style from './Style';

export default class TestListView extends Component {
  _renderList(list = []) {
    const { navigation } = this.props;
    return (
      <ScrollView>
        {list.map((item, i) => (
          <Item
            key={i}
            iconName={item.icon || 'puzzle-piece'}
            title={item.title}
            onPress={() => {
              navigation.navigate(item.page);
            }}
            hasRightArrow
          />
        ))}
      </ScrollView>
    );
  }
  _renderGroup(groupList = []) {
    return groupList.map((item, i) => (
      <View key={i}>
        <Text style={{ color: '#396', backgroundColor: '#eee', padding: 10 }}>{item.title}</Text>
        {this._renderList(item.list)}
      </View>));
  }
  render() {
    const { list, groupList } = this.props;
    let view;
    if (list) {
      view = this._renderList(list);
    }
    if (groupList) {
      view = this._renderGroup(groupList);
    }
    return (
      <ScrollView style={Style.container}>{view}</ScrollView>
    );
  }
}
