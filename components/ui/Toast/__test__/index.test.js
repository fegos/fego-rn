import React from 'react';
import Renderer from 'react-test-renderer';
import { Text } from 'react-native';

describe('Toast Tests', () => {
  it('renders correctly', () => {
    const tree = Renderer.create((
      <Text > toast </Text>
    )).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
