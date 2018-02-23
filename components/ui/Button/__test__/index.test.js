import React from 'react';
import Renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Button from '../index';

describe('Button Tests', () => {
  it('renders correctly', () => {
    const tree = Renderer.create((
      <Button type="primary">primary button</Button>
    )).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('fires pressIn event', () => {
    const handlePressIn = jest.fn();
    const wrapper = shallow(<Button onPressIn={handlePressIn}>default button</Button>);
    wrapper.simulate('pressIn');

    expect(handlePressIn).toBeCalledWith();
  });

  it('fires press event', () => {
    const handlePress = jest.fn();
    const wrapper = shallow(<Button onPress={handlePress}>default button</Button>);
    wrapper.simulate('press');

    expect(handlePress).toBeCalledWith();
  });

  it('disabled button', () => {
    const handlePress = jest.fn();
    const wrapper = shallow(<Button onPress={handlePress} disabled>disabled button</Button>);
    wrapper.simulate('press');

    expect(handlePress).not.toBeCalledWith();
    expect(wrapper.instance().props.disabled).toBe(true);
  });

  it('type props', () => {
    const defaultButtonWrapper = shallow(<Button>default button</Button>);
    expect(defaultButtonWrapper.instance().props.type).toBe('default');

    const primaryButtonWrapper = shallow(<Button type="primary">default button</Button>);
    expect(primaryButtonWrapper.instance().props.type).toBe('primary');

    const dangerButtonWrapper = shallow(<Button type="danger">default button</Button>);
    expect(dangerButtonWrapper.instance().props.type).toBe('danger');
  });

  it('size props', () => {
    const defaultButtonWrapper = shallow(<Button>default button</Button>);
    expect(defaultButtonWrapper.instance().props.size).toBe('default');

    const smallButtonWrapper = shallow(<Button size="small">default button</Button>);
    expect(smallButtonWrapper.instance().props.size).toBe('small');

    const largeButtonWrapper = shallow(<Button size="large">default button</Button>);
    expect(largeButtonWrapper.instance().props.size).toBe('large');
  });

  it('loading Button', () => {
    const handlePress = jest.fn();
    const wrapper = shallow(<Button loading onPress={handlePress}>loading button</Button>);
    expect(wrapper.name()).toMatch(/View/);
    expect(handlePress).not.toBeCalledWith();
  });
});
