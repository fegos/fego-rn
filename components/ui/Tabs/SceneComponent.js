import React, { Component } from 'react';
import { View } from 'react-native';
import StaticContainer from 'react-static-container';

export default class SceneComponent extends Component {
  render() {
    const { shouldUpdated, ...props } = this.props;
    return (
      <View {...props}>
        <StaticContainer shouldUpdate={shouldUpdated}>
          {props.children}
        </StaticContainer>
      </View>
    );
  }
}
