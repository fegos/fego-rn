import React, { Component } from 'react';
import {
  Animated,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { Tabs } from 'fego-rn';
import { Style } from '../../../common';

const { width, height } = Dimensions.get('window');


const TabStyles = {
  tabBar: {
    height: 34,
  },
  tabBarItem: {
    width: 80,
    backgroundColor: 'transparent',
    borderLeftColor: '#aaa',
    borderLeftWidth: 1,
  },
  activeUnderline: {
    height: 3,
    width: 50,
    marginLeft: 15,
  },
};


export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      horizontal: false,
      activeKey: 'tab2',
    };
  }

  _onChange = (key, tab) => {
    console.log('tab change, ', key, tab);
    this.setState({
      activeKey: key,
    });
  }

  _handleDoubleClick = () => {
    this.setState({
      horizontal: !this.state.horizontal,
    });
    Animated.spring(this.anim, {
      toValue: 0,
      velocity: 3,
      tension: -10,
      friction: 1,
    }).start();
  }


  _renderAnimateView = () => {
    const { horizontal } = this.state;
    let rotationAngle = '0deg';
    let containerViewStyle = { flex: 1 };
    if (horizontal) {
      rotationAngle = '90deg';
      containerViewStyle = {
        paddingLeft: 10, height: width, width: height, justifyContent: 'flex-start',
      };
    }

    const containerView = (
      <View style={containerViewStyle}>
        {this._renderTabs()}
      </View>
    );
    return (
      <Animated.View
        style={{
          transform: [
            {
              rotate: rotationAngle,
            },
          ],
        }}
      >
        {containerView}
      </Animated.View>
    );
  }

  _renderTabs = () => {
    const { activeKey, horizontal } = this.state;

    this.anim = this.anim || new Animated.Value(0);
    let viewStyle = { width, height: 200, backgroundColor: '#eaeaea' };
    if (horizontal) {
      viewStyle = { width: height, height: 200, backgroundColor: '#eaeaea' };
    }
    const keys = ['tab1', 'tab2', 'tab3', 'tab4', 'tab5', 'tab6', 'tab7', 'tab8', 'tab9', 'tab10'];
    const tabs = [];
    keys.forEach((key) => {
      const tab = (
        <Tabs.TabPane title={key} key={key}>
          <View style={viewStyle} >
            <TouchableWithoutFeedback onPress={this._handleDoubleClick}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{key}, 单击切换横竖屏</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Tabs.TabPane>
      );
      tabs.push(tab);
    });

    const tabView = (
      <View style={[Style.container, { height: 250, width: horizontal ? height : width }]}>
        <Tabs
          styles={TabStyles}
          activeKey={activeKey}
          onChange={this._onChange}
        >
          {tabs}
        </Tabs>
      </View>
    );
    return tabView;
  }

  render() {
    let contentView;
    if (!this.state.horizontal) {
      contentView = (
        <View style={{ flex: 1 }}>
          {this._renderAnimateView()}
        </View>
      );
    } else {
      contentView = (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          {this._renderAnimateView()}
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: '#fafafa', alignItems: 'center' }}>
        {contentView}
      </View>
    );
  }
}
