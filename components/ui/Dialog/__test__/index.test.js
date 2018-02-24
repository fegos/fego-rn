import React from 'react';
import Renderer from 'react-test-renderer';
import { View, Text } from 'react-native';
import { shallow } from 'enzyme';
import Dialog from '../index';

describe('Dialog Tests', () => {
  let Comp;
  let handler;
  beforeEach(() => {
    handler = jest.fn();
    Comp = (<Dialog
      title="标题"
      visible
      animateAppear={false}
      onClose={handler}
    >
      <View>
        <Text>简单对话框</Text>Ï
      </View>
            </Dialog>
    );
  });

  it('renders correctly', () => {
    const tree = Renderer.create(Comp).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('simple content test', () => {
    const wrapper = shallow(Comp);

    expect(wrapper.contains(<View>
                              <Text>简单对话框</Text>
                            </View>)).toBe(true);
  });
});

