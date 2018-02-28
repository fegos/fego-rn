import React, { PureComponent } from 'react';
import { View } from 'react-native';
import StaticContainer from 'react-static-container';

export default class SceneComponent extends PureComponent {
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
