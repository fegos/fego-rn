import React from 'react'
import { Text } from 'react-native'
import Renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import List from '../index'
import Icon from '../../Icon'

const ListItem = List.ListItem;

describe('List Tests', () => {
	describe('List test', () => {
		it('renders correctly', () => {
			const tree = Renderer.create((
				<List>
					<ListItem title='ListItem' />
				</List>
			)).toJSON();
			
			expect(tree).toMatchSnapshot();
		});
	});

	describe('ListItem test', () => {
		it('renders correctly', () => {
			const tree = Renderer.create((
				<ListItem title='ListItem' />
			)).toJSON();
			
			expect(tree).toMatchSnapshot();
		});

		it('press event', () => {
			const handler = jest.fn();
			const wrapper = shallow(
				<ListItem title='ListItem' onPress={handler} />
			);
			expect(wrapper.name()).toMatch(/TouchableHighlight/);
			wrapper.simulate('press');
			expect(handler).toBeCalled();
		});

		it('title props test', () => {
			// 使用children属性时，title属性失效
			const wrapper = shallow(
				<ListItem title='title'>
					<Text>children</Text>
				</ListItem>
			);
			expect(wrapper.contains('title')).toBe(false);
			expect(wrapper.contains('children')).toBe(true);
		});

		it('icon & arrow test', () => {
			const wrapper = shallow(
				<ListItem title={123456} hasRightArrow iconName='user' />
			);
			expect(wrapper.find(Icon)).toHaveLength(2);
		});
	});
})
