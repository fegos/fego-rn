import React from 'react';
import Renderer from 'react-test-renderer';
import { View, Text } from 'react-native';
import PopMenu from '../index';
import Item from '../../Item';

describe('PopMenu Tests', () => {
  it('renders correctly', () => {
    const content = [
    <Item title="添加新朋友" iconName="user" />,
    <Item iconName="user">
        <Text>扫一扫</Text>
    </Item>,
      <Item iconName="user"><View><Text>帮助</Text></View></Item>,
    ];
    const tree = Renderer.create(<PopMenu
      content={content}
      placement="bottomLeft"
    >
      点我显示 popover 哦
                                 </PopMenu>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
