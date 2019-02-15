import React from 'react';
import Renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import DatePicker from '../index';

describe('DatePicker Tests', () => {
  it('renders correctly', () => {
    const tree = Renderer.create(<DatePicker
      mode="date"
      initialValue={new Date(2017, 11, 27, 16, 13, 8)}
      visible
    />).toJSON();

    const tree2 = Renderer.create(<DatePicker
      mode="time"
      initialValue={new Date(2017, 11, 27, 16, 13, 8)}
      visible
    />).toJSON();


    expect(tree).toMatchSnapshot();
    expect(tree2).toMatchSnapshot();
  });

  it('render different type', () => {
    const dateWrapper = shallow(<DatePicker
      mode="date"
      visible
    />);
    const timeWrapper = shallow(<DatePicker
      mode="time"
      visible
    />);
    expect(dateWrapper.name()).toBe('DatePicker');
    expect(timeWrapper.name()).toBe('TimePicker');
  });
});

