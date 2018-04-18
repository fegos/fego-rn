import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

import { Tabs } from 'fego-rn';
import { Style } from '../../../common';


const TabStyles = {
  tabBar: {
    height: 34,
  },
  tabBarItem: {
    backgroundColor: 'transparent',
  },
  activeUnderline: {
    height: 3,
    marginHorizontal: 15,
  },
};

const TabStyles3 = {
  tabBarItem: {
    width: 80,
    backgroundColor: 'transparent',
    borderLeftColor: '#aaa',
    borderLeftWidth: 1,
  },
  tabBar: {
    height: 34,
  },
  activeUnderline: {
    height: 3,
    width: 50,
    marginLeft: 15,
  },
};
const viewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#aaa',
};


export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey1: 'tab1',
      activeKey2: 'tab2',
    };
  }

  _onTabClick = (key, tab) => {
    console.log('tab click, ', key, tab);
  }

  _onAnimationEnd = (key, tab) => {
    console.log('ani end and start wait==========', key, tab);
  }

  _onChange = (key, tab) => {
    console.log('tab change, ', key, tab);
  }

  render() {
    const keys = ['tab1', 'tab2', 'tab3', 'tab4', 'tab5'];
    const tabs = [];
    keys.forEach((key) => {
      tabs.push(<Tabs.TabPane title={key} key={key} />);
    });

    const keys2 = ['tab1', 'tab2', 'tab3', 'tab4', 'tab5', 'tab6', 'tab7', 'tab8', 'tab9', 'tab10'];
    const tabs2 = [];
    keys2.forEach((key) => {
      const tab = (
        <Tabs.TabPane title={key} key={key}>
          <View style={viewStyle}>
            <Text>key</Text>
          </View>
        </Tabs.TabPane>
      );
      tabs2.push(tab);
    });

    return (
      <ScrollView style={Style.container}>
        <Text style={Style.title}>通过调用 onAnimationEnd 可以在 tab 动画结束后做一些操作</Text>
        <View style={{ height: 100 }}>
          <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(255,255,255,0.15)' }} />
          <Tabs
            defaultActiveKey="tab3"
            onTabClick={this._onTabClick}
            onAnimationEnd={this._onAnimationEnd}
            styles={TabStyles}
            textColor="#333"
            showUnderline={false}
            activeTextColor="white"
            activeBgColor="#108ee9"
          >
            {tabs}
          </Tabs>
          <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(255,255,255,0.15)' }} />
        </View>
        <Text style={Style.title}>使用非受控属性，默认显示第一个 tab</Text>
        <View style={{ height: 100 }}>
          <Tabs
            styles={TabStyles}
            textColor="blue"
            activeTextColor="yellow"
            underlineColor="red"
            activeUnderlineColor="green"
          >
            {tabs}
          </Tabs>
        </View>

        <Text style={Style.title}>使用非受控属性 defaultActiveKey= tab2 </Text>
        <View style={{ height: 100 }}>
          <Tabs
            defaultActiveKey="tab2"
            styles={TabStyles}
          >
            {tabs}
          </Tabs>
        </View>

        <Text style={Style.title}>使用受控属性 activeKey 需搭配 onChange 维护 activeKey 值，不搭配 onChange 的错误示例</Text>
        <View style={{ height: 100 }}>
          <Tabs
            styles={TabStyles}
            activeKey={this.state.activeKey1}
          >
            {tabs}
          </Tabs>
        </View>

        <Text style={Style.title}>使用受控属性 activeKey 搭配 onChange 维护 activeKey 值</Text>
        <View style={{ height: 100 }}>
          <Tabs
            styles={TabStyles}
            activeKey={this.state.activeKey2}
            onChange={(key) => {
              this.setState({
                activeKey2: key,
              });
            }}
          >
            {tabs}
          </Tabs>
        </View>

        <Text style={Style.title}>滚动的 tabBar</Text>
        <View style={{ height: 100 }}>
          <Tabs
            styles={TabStyles3}
            defaultActiveKey="tab1"
          >
            {tabs2}
          </Tabs>
        </View>
      </ScrollView >
    );
  }
}
