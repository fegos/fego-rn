import React from 'react';
import Renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Radio from '../index';

describe('Radio item', () => {
  it('renders correctly', () => {
    const tree = Renderer.create((<Radio />
    )).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('press event', () => {
    const wrapper = shallow(<Radio>我是一个Radio</Radio>);
    expect(wrapper.instance().state.checked).toBe(false);
    wrapper.simulate('press');
    expect(wrapper.instance().state.checked).toBe(true);
  });

  it('checked props', () => {
    const handler = jest.fn();
    const wrapper = shallow(<Radio checked={false} onChange={handler}>使用受控属性checked的Radio</Radio>);
    wrapper.simulate('press');
    expect(handler).toBeCalled();
  });

  it('wrapper name', () => {
    const wrapper = shallow(<Radio>Radio</Radio>);
    expect(wrapper.name()).toMatch(/TouchableWithoutFeedback/);
  });
});
