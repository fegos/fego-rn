import React from 'react';
import { View } from 'react-native';
import StaticContainer from 'react-static-container';

export default (props) => {
  const { shouldUpdated, ...ret } = props;

  return (
    <View {...ret}>
      <StaticContainer shouldUpdate={shouldUpdated}>
        {props.children}
      </StaticContainer>
    </View>
  );
};
