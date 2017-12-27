import React from 'react'
import Renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import Calendar from '../index'

describe('Calendar Tests', () => {
	it('renders correctly', () => {
		const tree = Renderer.create(<Calendar 
			defaultSelectedDate={new Date(2017,11,27)} 
		/>).toJSON();

		expect(tree).toMatchSnapshot();
	});

	it('handle selectedDate props', () => {
		const wrapper = shallow(<Calendar 
			defaultSelectedDate={new Date(2017,11,27)} 
		/>);
		expect(wrapper.instance().state.year).toBe(2017);
		expect(wrapper.instance().state.month).toBe(11);

		const wrapper2 = shallow(<Calendar 
			selectedDate={new Date(2017,11,27)} 
		/>);
		expect(wrapper2.instance().state.year).toBe(2017);
		expect(wrapper2.instance().state.month).toBe(11);
	})
})


