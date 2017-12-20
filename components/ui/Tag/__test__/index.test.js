import React from 'react'
import Renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import Tag from '../index'

describe('Tag Tests', () => {
	it('renders correctly', () => {
		const tree = Renderer.create((
			<Tag text='这是一个tag' />
		)).toJSON();
		
		expect(tree).toMatchSnapshot();
	});

	it('defaultSelected state', () => {
		let wrapper = shallow(<Tag>I’m a tag</Tag>);
		expect(wrapper.instance().state.selected).toBe(false);

		wrapper.simulate('press');
		expect(wrapper.instance().state.selected).toBe(true);
	});

	it('press event', () => {
		let handler = jest.fn();
		let wrapper = shallow(<Tag onPress={handler}>I’m a tag too</Tag>);
		
		expect(wrapper.instance().state.selected).toBe(false);
		wrapper.simulate('press');
		expect(wrapper.instance().state.selected).toBe(true);
	});
})
