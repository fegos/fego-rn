import React from 'react'
import Renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import Segment from '../index'

describe('Segment Tests', () => {
	it('renders correctly', () => {
		const tree = Renderer.create((
			<Segment values={['栏目一', '栏目二', '栏目三']} defaultIndex={0} /> 
		)).toJSON();
		
		expect(tree).toMatchSnapshot();
	});

	it('press event', () => {
		let handler = jest.fn();
		let wrapper = shallow(<Segment values={['栏目一', '栏目二', '栏目三']} defaultIndex={0} onChange={handler} />);
		expect(wrapper.instance().state.index).toBe(0);
		wrapper.childAt(1).simulate('press');
		expect(wrapper.instance().state.index).toBe(1);
		expect(handler).toHaveBeenCalled();
	});

	it('controled prop index', () => {
		let handler = jest.fn();
		let wrapper = shallow(<Segment values={['栏目一', '栏目二', '栏目三']} index={0} onChange={handler} />);
		expect(wrapper.instance().state.index).toBe(0);
		wrapper.childAt(1).simulate('press');
		expect(wrapper.instance().state.index).toBe(0);
		expect(handler).toHaveBeenCalled();
	});

	it('disabled segment', () => {
		let handler = jest.fn();
		let wrapper = shallow(<Segment values={['栏目一', '栏目二', '栏目三']} desabled={true} onChang={handler} />);
		wrapper.childAt(1).simulate('press');
		expect(handler).not.toHaveBeenCalled();
	});
})
