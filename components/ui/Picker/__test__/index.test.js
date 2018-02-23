import React from 'react';
import Renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Picker from '../index';

describe('Picker Tests', () => {
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
    const tree = Renderer.create(<Picker
      data={data}
      visible
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('default props tests', () => {
    const wrapper = shallow(<Picker
      data={data}
      visible
    />);

    expect(wrapper.instance().props.title).toBe('请选择');
    expect(wrapper.instance().props.okText).toBe('确定');
    expect(wrapper.instance().props.cancelText).toBe('取消');
  });

  it('close picker event', () => {
    const handler = jest.fn();
    const wrapper = shallow(<Picker
      data={data}
      visible
      onClose={handler}
    />);
    // 找到取消按钮
    wrapper.childAt(0).childAt(0).childAt(0).simulate('press');
    expect(handler).toHaveBeenCalled();
  });
});

