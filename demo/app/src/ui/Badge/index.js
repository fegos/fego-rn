import React from 'react';
import { View, Text } from 'react-native';
import { Badge } from 'fego-rn';

export default () => (
  <View style={{ flex: 1, paddingHorizontal: 10 }}>
    <View>
      <Text>badge</Text>
      <Badge />
    </View>
  </View>
);
