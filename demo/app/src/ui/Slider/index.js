import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Slider, Toast } from 'fego-rn';
import { Style } from '../../../common';

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 10,
    };
  }

  render() {
    return (
      <ScrollView style={Style.container}>
        <Text style={Style.text}>Slider</Text>

        <Text style={Style.title}>受控组件，Value: {this.state.value}</Text>
        <Slider
          value={this.state.value}
          onValueChange={(value) => {
            if (value < 50) {
              this.setState({ value });
            } else {
              Toast.info('大于50，禁止在增大');
            }
          }}
        />

        <Text style={Style.title}>非受控组件，type = circle</Text>
        <Slider type="circle" defaultValue={20} />
        <Text style={Style.title}>非受控组件，type = square</Text>
        <Slider type="square" defaultValue={30} />
        <Text style={Style.title}>非受控组件，size = large</Text>
        <Slider size="large" defaultValue={40} />
        <Text style={Style.title}>非受控组件，size = small</Text>
        <Slider size="small" defaultValue={50} />
      </ScrollView>
    );
  }
}
