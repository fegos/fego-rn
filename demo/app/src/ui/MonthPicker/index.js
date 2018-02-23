import React, { Component } from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import { MonthPicker, List, Popup } from 'fego-rn';

const { ListItem } = List;

// 组件静态方法生成 从 startMonth 到昨天所在月份的可选数组
// startMonth 目前是随意写的 201609
// MonthPicker.setStartMonth('201001')
MonthPicker.getMonths();

export default class Page extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      MonthPicker1Value: '',
      MonthPicker2Value: '201703',
      MonthPicker3Value: '',
      MonthPicker1Label: '',
      MonthPicker2Label: '2017年03月',
      MonthPicker3Label: '',
    };

    this.opt = {
      title: false,
      location: 'bottom',
      aniFrom: 'bottom',
    };
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#efefef' }}>
        <ScrollView style={{ flex: 1, backgroundColor: '#efefef' }}>
          <List>
            <ListItem
              title={`默认选中最后一个。您选择: ${this.state.MonthPicker1Label}`}
              onPress={() => {
              Popup.show(<MonthPicker
                initialValue={this.state.MonthPicker1Value}
                onClose={() => { Popup.hide(); }}
                onSelect={(obj) => {
                    this.setState({
                      MonthPicker1Value: obj.value,
                      MonthPicker1Label: obj.label,
                    });
                    Popup.hide();
                  }}
              />, this.opt);
            }}
            />
            <ListItem
              title={`默认选中2017年3月。您选择: ${this.state.MonthPicker2Label}`}
              onPress={() => {
              Popup.show(<MonthPicker
                initialValue={this.state.MonthPicker2Value}
                onClose={() => { Popup.hide(); }}
                onSelect={(obj) => {
                    this.setState({
                      MonthPicker2Value: obj.value,
                      MonthPicker2Label: obj.label,
                    });
                    Popup.hide();
                  }}
              />, this.opt);
            }}
            />
            <ListItem
              title={`使用自行定义的数据,类似于普通picker了。您选择: ${this.state.MonthPicker3Label}`}
              onPress={() => {
              Popup.show(<MonthPicker
                data={[{ value: '1', label: 'qwer' }, { value: '2', label: 'asdf' }, { value: '3', label: 'zxcv' }]}
                initialValue={this.state.MonthPicker3Value}
                onClose={() => { Popup.hide(); }}
                onSelect={(obj) => {
                    this.setState({
                      MonthPicker3Value: obj.value,
                      MonthPicker3Label: obj.label,
                    });
                    Popup.hide();
                  }}
              />, this.opt);
            }}
            />
          </List>
        </ScrollView>
      </View>
    );
  }
}
