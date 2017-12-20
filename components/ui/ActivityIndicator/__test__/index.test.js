import React from 'react'
import Renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import ActivityIndicator from '../index'

describe('ActivityIndicator Tests', () => {
	it('renders correctly', () => {
		const tree = Renderer.create((
			<ActivityIndicator />
		)).toJSON();
		
		expect(tree).toMatchSnapshot();
	});

	it('text props', () => {
		let defaultWrapper = shallow(<ActivityIndicator />);
		expect(defaultWrapper.instance().props.text).toBeUndefined();

		let textWrapper = shallow(<ActivityIndicator text='加载呢，别急' />);
		expect(textWrapper.instance().props.text).toBe('加载呢，别急');
	});

	it('size props', () => {
		let defaultWrapper = shallow(<ActivityIndicator />);
		expect(defaultWrapper.instance().props.size).toBe('small');

		let largeWrapper = shallow(<ActivityIndicator size='large' />);
		expect(largeWrapper.instance().props.size).toBe('large');
	});

	it('invisible test', () => {
		let wrapper = shallow(<ActivityIndicator visible={false} />);
		expect(wrapper.children()).toHaveLength(0);
	});
})
