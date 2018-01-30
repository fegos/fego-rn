import React from 'react'
import Renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import PickerView from '../index'

describe('PickerView Tests', () => {
	let data, handler;
	beforeEach(() => {
		data = [{
			label: 'item1',
			value: '1'
		}, {
			label: 'item2',
			value: '2'
		}, {
			label: 'item3',
			value: '3'
		}, {
			label: 'item4',
			value: '4'
		}, {
			label: 'item5',
			value: '5'
		}]
	})
	
	it('renders correctly', () => {
		const tree = Renderer.create(<PickerView
			data={data}
		/>).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('initial selected value tests', () => {
		const wrapper = shallow(<PickerView
			data={data}
		/>);
		// selectedValue = ['1']
		expect(wrapper.instance().state.selectedValue).toHaveLength(1);
		expect(wrapper.instance().state.selectedValue).toContain('1');

		const wrapper2 = shallow(<PickerView
			data={data}
			initialValue={['3']}
		/>);
		// selectedValue = ['3']
		expect(wrapper2.instance().state.selectedValue).toHaveLength(1);
		expect(wrapper2.instance().state.selectedValue).toContain('3');
	});
})


