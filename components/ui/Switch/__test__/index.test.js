import React from 'react';
import Renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Switch from '../index';

describe('Switch Tests', () => {
  it('renders correctly', () => {
    const tree = Renderer.create((<Switch
      defaultActive
      disabled
    />
    )).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('active state', () => {
    const wrapper = shallow(<Switch defaultActive />);
    expect(wrapper.instance().state.active).toBe(true);
  });

  it('children length test', () => {
    const wrapper = shallow(<Switch defaultActive={false} />);
    expect(wrapper.children()).toHaveLength(2);
  });

  it('press event', () => {
    const handler = jest.fn();
    const wrapper = shallow(<Switch
      active={false}
      onChange={handler}
    />);
    expect(wrapper.instance().state.active).toBe(false);

    wrapper.simulate('press');
    // Switch 内部是依据 PanResponder 实现，PanResponder 需要组件 mount 才创建，因此此处不会调 onChange 回调
    expect(handler).toHaveBeenCalledTimes(0);
  });

  it('disabled Switch', () => {
    const handler = jest.fn();
    const wrapper = shallow(<Switch
      disabled
      active={false}
      onChange={handler}
    />);
    wrapper.simulate('press'); expect(handler).toHaveBeenCalledTimes(0);
  });
});
