import React from 'react';
import { View, Text } from 'react-native';
import Renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Carousel from '../index';

describe('Carousel Tests', () => {
  let content;
  beforeEach(() => {
    content = [
      <View key="1"><Text>这是一张走马灯</Text></View>,
      <View key="2"><Text>这也是一张走马灯</Text></View>,
      <View key="3"><Text>这还是一张走马灯</Text></View>,
    ];
  });

  it('renders correctly', () => {
    const tree = Renderer.create((
      <Carousel>
        {content}
      </Carousel>
    )).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('render test by children length', () => {
    // showDot 默认 true, showPagination & showArrows 默认 false
    const wrapper = shallow(<Carousel>{content}</Carousel>);
    const wrapperWithoutDots = shallow(<Carousel showDot={false}>{content}</Carousel>);
    const wrapperWithArrowsAndPagination = shallow(<Carousel showArrows showPagination showDot={false}>{content}</Carousel>);
    const wrapperWithAll = shallow(<Carousel showArrows showPagination >{content}</Carousel>);
    expect(wrapper.instance().props.showDot).toBe(true); // dots & content
    expect(wrapperWithoutDots.instance().props.showDot).toBe(false); // content
    expect(wrapperWithArrowsAndPagination.instance().props.showPagination).toBe(true); // content & rightArrow & leftArrow & pagination
    expect(wrapperWithAll.instance().props.showArrows).toBe(true);
  });

  it('props test', () => {
    const wrapper = shallow(<Carousel defaultPage={1}>{content}</Carousel>);
    expect(wrapper.instance().props.dotType).toBe('circle');
  });
});
