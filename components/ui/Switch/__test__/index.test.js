import React from 'react'
import Renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import Switch from '../index'

describe('Switch Tests', () => {
	it('renders correctly', () => {
		const tree = Renderer.create((
			<Switch defaultActive={true} disabled={true} /> 
		)).toJSON();
		
		expect(tree).toMatchSnapshot();
	});

	it('active state', () => {
		let wrapper = shallow(<Switch defaultActive={true} /> );
		expect(wrapper.instance().state.active).toBe(true);
	});

	it('children length test', () => {
		let wrapper = shallow(<Switch defaultActive={false} />);
		expect(wrapper.children()).toHaveLength(2);
	});

	it('press event', () => {
		let handler = jest.fn();
		let wrapper = shallow(<Switch active={false} onChange={handler} />);
		expect(wrapper.instance().state.active).toBe(false);

		wrapper.simulate('press');
		// Switch 内部是依据 PanResponder 实现，PanResponder 需要组件 mount 才创建，因此此处不会调 onChange 回调
		expect(handler).toHaveBeenCalledTimes(0);
	});

	it('disabled Switch', () => {
		let handler = jest.fn();
		let wrapper = shallow(<Switch disabled={true} active={false} onChange={handler} />);
		wrapper.simulate('press');
		expect(handler).toHaveBeenCalledTimes(0);
	});
})
