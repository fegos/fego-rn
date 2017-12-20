import React from 'react'
import { Text } from 'react-native'
import Renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import Icon from '../index'

describe('Icon Tests', () => {
	it('renders correctly', () => {
		const tree = Renderer.create((
			<Icon name='user' />
		)).toJSON();
		
		expect(tree).toMatchSnapshot();
	});

	it('children test', () => {
		const wrapper = shallow(
			<Icon name='user'>
				<Text>icon child</Text>
			</Icon>
		);
		
		expect(wrapper.contains(<Text>icon child</Text>)).toBe(true);
		expect(wrapper.contains('icon child')).toBe(true);
	});
})
