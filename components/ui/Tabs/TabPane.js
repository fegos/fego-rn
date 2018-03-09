import React from 'react';
import { View } from 'react-native';

export default (props) => {
  const { children, style = { flex: 1 }, ...rets } = props;
  return (
    <View style={style} {...rets}>
      {children}
    </View>
  );
};
