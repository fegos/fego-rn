import React from 'react';
import Renderer from 'react-test-renderer';
import { View, Text } from 'react-native';
import { shallow } from 'enzyme';
import AnimateModal from '../index';

describe('AnimateModal Tests', () => {
  let Comp;
  let handler;
  beforeEach(() => {
    handler = jest.fn();
    Comp = (
      <AnimateModal
        visible
        animateAppear={false}
        onClose={handler}
      >
        <View>
          <Text>简单模态框</Text>
        </View>
      </AnimateModal>
    );
  });

  it('renders correctly', () => {
    const tree = Renderer.create(Comp).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('simple content test', () => {
    const wrapper = shallow(Comp);

    expect(wrapper.contains(<View><Text>简单模态框</Text></View>)).toBe(true);
  });

  it('close AnimateModal', () => {
    const wrapper = shallow(Comp);

    wrapper.childAt(0).childAt(0).simulate('press');
    expect(handler).toHaveBeenCalled();
  });
});

