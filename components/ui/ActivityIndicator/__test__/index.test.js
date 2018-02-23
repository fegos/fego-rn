import React from 'react';
import Renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import ActivityIndicator from '../index';

describe('ActivityIndicator Tests', () => {
  it('renders correctly', () => {
    const tree = Renderer.create((
      <ActivityIndicator />
    )).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('text props', () => {
    const defaultWrapper = shallow(<ActivityIndicator />);
    expect(defaultWrapper.instance().props.text).toBeUndefined();

    const textWrapper = shallow(<ActivityIndicator text="加载呢，别急" />);
    expect(textWrapper.instance().props.text).toBe('加载呢，别急');
  });

  it('size props', () => {
    const defaultWrapper = shallow(<ActivityIndicator />);
    expect(defaultWrapper.instance().props.size).toBe('small');

    const largeWrapper = shallow(<ActivityIndicator size="large" />);
    expect(largeWrapper.instance().props.size).toBe('large');
  });

  it('invisible test', () => {
    const wrapper = shallow(<ActivityIndicator visible={false} />);
    expect(wrapper.children()).toHaveLength(0);
  });
});
