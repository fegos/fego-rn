import React from 'react'
import Renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import Radio from '../index'

describe('Radio Tests', () => {
	describe('Radio item', () => {
		it('renders correctly', () => {
			const tree = Renderer.create((
				<Radio />
			)).toJSON();
			
			expect(tree).toMatchSnapshot();
		});
	
		it('press event', () => {
			const wrapper = shallow(
				<Radio>我是一个Radio</Radio>
			);
			expect(wrapper.instance().state.checked).toBe(false);
			wrapper.simulate('press');
			expect(wrapper.instance().state.checked).toBe(true);
		});
	
		it('checked props', () => {
			let handler = jest.fn();
			const wrapper = shallow(
				<Radio checked={false} onChange={handler}>使用受控属性checked的Radio</Radio>
			);
			wrapper.simulate('press');
			expect(handler).toBeCalled();
			// 使用这种方式来模拟应该在onChange中执行的setState操作吧
			wrapper.setState({
				checked: true
			});
			expect(wrapper.instance().state.checked).toBe(true);
		});
	
		it('wrapper name', () => {
			const wrapper = shallow(
				<Radio>Radio</Radio>
			);
			expect(wrapper.name()).toMatch(/TouchableWithoutFeedback/);
		});
	});

	describe('Radio group', () => {
		let content;
		beforeEach(() => {
			content = [
				<Radio value='english' key='english'>英语</Radio>,
				<Radio value='chinese' key='chinese'>语文</Radio>,
				<Radio value='math' key='math'>数学</Radio>
			]
		});
		
		it('renders correctly', () => {
			const tree = Renderer.create((
				<Radio.Group>
					{content}
				</Radio.Group>
			)).toJSON();
			
			expect(tree).toMatchSnapshot();
		});

		it('defaultValue', () => {
			const wrapper = shallow(
				<Radio.Group defaultValue={'english'}>
					{content}
				</Radio.Group>
			);
			expect(wrapper.find(Radio)).toHaveLength(3);
			expect(wrapper.instance().state.value).toEqual('english');
		})
	});
})
