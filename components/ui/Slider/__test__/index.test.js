import React from 'react';
import Renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Slider from '../index';

// Slider 内部使用了 PanResponder 使用，像 press 事件这些都测不到，故暂只做最简单的测试

describe('Slider Tests', () => {
  it('renders correctly', () => {
    const tree = Renderer.create((
      <Slider type="circle" value={20} />
    )).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('default props', () => {
    const wrapper = shallow(<Slider type="square" size="small" />);
    expect(wrapper.instance().props.type).toBe('square');
    expect(wrapper.instance().props.size).toBe('small');
  });
});
