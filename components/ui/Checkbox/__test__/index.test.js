import React from 'react';
import Renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Checkbox from '../index';

describe('Checkbox item', () => {
  it('renders correctly', () => {
    const tree = Renderer.create((
      <Checkbox />
    )).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('press event', () => {
    const wrapper = shallow(<Checkbox>我是一个checkbox</Checkbox>);
    expect(wrapper.instance().state.checked).toBe(false);
    wrapper.simulate('press');
    expect(wrapper.instance().state.checked).toBe(true);
  });

  it('checked props', () => {
    const handler = jest.fn();
    const wrapper = shallow(<Checkbox checked onChange={handler}>使用受控属性checked的checkbox</Checkbox>);
    wrapper.simulate('press');
    expect(handler).toBeCalled();
    // 使用这种方式来模拟应该在onChange中执行的setState操作吧
    wrapper.setState({
      checked: false,
    });
    expect(wrapper.instance().state.checked).toBe(false);
  });

  it('wrapper name', () => {
    const wrapper = shallow(<Checkbox>checkbox</Checkbox>);
    expect(wrapper.name()).toMatch(/TouchableWithoutFeedback/);
  });
});
