import React from 'react';
import Renderer from 'react-test-renderer';
import Badge from '../index';

describe('Badge Tests', () => {
  it('renders correctly', () => {
    const tree = Renderer.create((
      <Badge />
    )).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
