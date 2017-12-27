import React from 'react'
import Renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { View, Text } from 'react-native'
import Popup from '../index'

describe('Popup Tests', () => {
	let Comp, handler;
	beforeEach(() => {
		handler = jest.fn();
		Comp = (
			<Popup
				title='popup title'
				visible={true}
				location='top'
				onClose={handler}>
				<View>
					<Text>从顶部浮出的模态</Text>
				</View>
			</Popup>
		)
	})
	it('renders correctly', () => {
		const tree = Renderer.create(Comp).toJSON();
		
		expect(tree).toMatchSnapshot();
	});

	it('mask press event', () => {
		const wrapper = shallow(Comp);
		wrapper.childAt(0).simulate('press')
		expect(handler).toHaveBeenCalled();
	});


	it('other tests', () => {
		const wrapper = shallow(Comp);
		expect(wrapper.instance().state.modalVisible).toBe(true);
		expect(wrapper.contains('popup title')).toBe(true);
	});
})
