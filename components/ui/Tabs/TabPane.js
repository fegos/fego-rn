import React, { PureComponent } from 'react';
import { View } from 'react-native';

export default class TabPane extends PureComponent {
  render() {
    const { children, style = { flex: 1 }, ...rets } = this.props;
    return (
      <View style={style} {...rets}>
        {children}
      </View>
    );
  }
}
