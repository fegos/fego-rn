import React from 'react'
import Renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import Input from '../index'

describe('Input Tests', () => {
	it('renders correctly', () => {
		const tree = Renderer.create((
			<Input label='label' placeholder='placeholder'/>
		)).toJSON();
		
		expect(tree).toMatchSnapshot();
	});

	it('children length test', () => {
		const wrapperWithLabel = shallow(
			<Input label='label' />
		);
		const wrapperWithExtra = shallow(
			<Input extra='extra' />
		);
		const wrapperWithAll = shallow(
			<Input label='label' extra='extra' error />
		);
		
		expect(wrapperWithLabel.children()).toHaveLength(2); // label & input
		expect(wrapperWithExtra.children()).toHaveLength(2); // extra & input
		expect(wrapperWithAll.children()).toHaveLength(4); // label & extra & input & error
	});
})
