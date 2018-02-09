import React from 'react';
import Renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { describe, it, expect, jest, beforeEach } from 'jest';
import MonthPicker from '../index';

describe('MonthPicker Tests', () => {
  let data;
  beforeEach(() => {
    data = [{
      label: 'item1',
      value: '1',
    }, {
      label: 'item2',
      value: '2',
    }, {
      label: 'item3',
      value: '3',
    }, {
      label: 'item4',
      value: '4',
    }, {
      label: 'item5',
      value: '5',
    }];
  });

  it('renders correctly', () => {
    const tree = Renderer.create(<MonthPicker data={data} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('default initialValue tests', () => {
    const wrapper = shallow(<MonthPicker
      data={data}
    />);
    expect(wrapper.instance().state.value).toBe('5');
  });

  it('close monthPicker event', () => {
    const handler = jest.fn();
    const wrapper = shallow(<MonthPicker
      data={data}
      onClose={handler}
    />);
    // 找到取消按钮
    wrapper.childAt(1).simulate('press');
    expect(handler).toHaveBeenCalled();
  });

  it('select event', () => {
    const handler = jest.fn();
    const wrapper = shallow(<MonthPicker
      initialValue="3"
      data={data}
      onSelect={handler}
    />);
    // 初始选中3
    expect(wrapper.instance().state.value).toBe('3');
    // 找到2并选择
    wrapper.childAt(0).childAt(0).childAt(0).childAt(1)
      .simulate('press');
    expect(wrapper.instance().state.value).toBe('2');
  });
});

