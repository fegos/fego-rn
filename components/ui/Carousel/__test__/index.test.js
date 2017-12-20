import React from 'react'
import { View, Text } from 'react-native'
import Renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import Carousel from '../index'

describe('Carousel Tests', () => {
	let content;
	beforeEach(() => {
		content = [
			<View key='1'><Text>这是一张走马灯</Text></View>,
			<View key='2'><Text>这也是一张走马灯</Text></View>,
			<View key='3'><Text>这还是一张走马灯</Text></View>,
		];
	})

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
		const wrapper = shallow(
			<Carousel>
				{content}
			</Carousel>
		);
		const wrapperWithoutDots = shallow(
			<Carousel showDot={false}>
				{content}
			</Carousel>
		);
		const wrapperWithArrowsAndPagination = shallow(
			<Carousel showArrows={true} showPagination={true} showDot={false}>
				{content}
			</Carousel>
		);
		const wrapperWithAll = shallow(
			<Carousel showArrows={true} showPagination={true} >
				{content}
			</Carousel>
		);
		expect(wrapper.children()).toHaveLength(2); // dots & content
		expect(wrapperWithoutDots.children()).toHaveLength(1); // content
		expect(wrapperWithArrowsAndPagination.children()).toHaveLength(4); // content & rightArrow & leftArrow & pagination
		expect(wrapperWithAll.children()).toHaveLength(5);
		
	});

	it('onChange test', () => {
		// 非无限循环播放，那么三张会触发两次 onChange
		// 但是因为 shallow 是将 React 组件渲染成 Virtual DOM 对象
		// 所以其实是不会触发 didMount 里的计时器的...尴尬...
		let onChangeHandler = jest.fn();
		const wrapper = shallow(
			<Carousel infinite={false} onChange={onChangeHandler}>
				{content}
			</Carousel>
		);
		
		expect(onChangeHandler).toHaveBeenCalledTimes(0);
	});

	it('props test', () => {
		const wrapper = shallow(
			<Carousel indexPage={1}>
				{content}
			</Carousel>
		);
		
		expect(wrapper.instance().state.currentPage).toBe(1);
		expect(wrapper.instance().props.dotType).toBe('circle');
	});
})
