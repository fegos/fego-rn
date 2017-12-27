import React from 'react'
import Renderer from 'react-test-renderer'
import { View, Text } from 'react-native'
import { shallow } from 'enzyme'
import Modal from '../index'

describe('Modal Tests', () => {
	let Comp, handler;
	beforeEach(() => {
		handler = jest.fn();
		Comp = <Modal
			visible={true}
			animateAppear={false}
			onClose={handler}
		>
			<View>
				<Text>简单模态框</Text>
			</View>
		</Modal>
	});

	it('renders correctly', () => {
		const tree = Renderer.create(Comp).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('simple content test', () => {
		const wrapper = shallow(Comp);

		expect(wrapper.contains(<View>
			<Text>简单模态框</Text>
		</View>)).toBe(true);
	});

	it('close modal', () => {
		const wrapper = shallow(Comp);

		wrapper.childAt(0).childAt(0).simulate('press');
		expect(handler).toHaveBeenCalled();
	});
})


