import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Icon, Item, Toast } from 'fego-rn';
import { Style } from '../../../common';

const localStyle = StyleSheet.create({
  text: {
    color: '#D8B080',
    fontSize: 16,
    flex: 1,
  },
});

class Example extends Component {
  static navigationOptions = {
    title: '图标Icon',
  }
  render() {
    return (
      <ScrollView style={Style.container}>
        <Text style={Style.title}>Icon</Text>
        <Item>
          <Text style={localStyle.text}>Icon默认样式</Text>
          <Icon name="star" />
        </Item>
        <Item>
          <Text style={localStyle.text}>Icon设置字体颜色</Text>
          <Icon name="star" color="#D8B080" />
        </Item>
        <Item>
          <Text style={localStyle.text}>Icon使用style设置字体颜色</Text>
          <Icon name="music" style={{ color: '#D8B080' }} />
        </Item>
        <Item>
          <Text style={localStyle.text}>Icon设置字体大小</Text>
          <Icon name="star" size={20} />
        </Item>
        <Item>
          <Text style={localStyle.text}>Icon使用style设置字体大小</Text>
          <Icon name="music" style={{ fontSize: 20 }} />
        </Item>
        <Item>
          <Text style={localStyle.text}>Icon简易属性设置字体样式</Text>
          <Icon name="star" color="#D8B080" size={20} />
        </Item>
        <Item>
          <Text style={localStyle.text}>Icon使用style设置字体样式</Text>
          <Icon
            name="music"
            style={{ color: '#D8B080', fontSize: 20 }}
          />
        </Item>
        <Item>
          <Text style={localStyle.text}>Icon可点击</Text>
          <Icon
            name="music"
            style={{ color: '#D8B080', fontSize: 20 }}
            onPress={() => {
              Toast.info('我被点击了');
            }}
          />
        </Item>
      </ScrollView>
    );
  }
}

export default Example;
