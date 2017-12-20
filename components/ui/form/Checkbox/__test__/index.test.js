import React from 'react'
import Renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import Checkbox from '../index'

describe('Checkbox Tests', () => {
	describe('Checkbox item', () => {
		it('renders correctly', () => {
			const tree = Renderer.create((
				<Checkbox />
			)).toJSON();
			
			expect(tree).toMatchSnapshot();
		});
	
		it('press event', () => {
			const wrapper = shallow(
				<Checkbox>我是一个checkbox</Checkbox>
			);
			expect(wrapper.instance().state.checked).toBe(false);
			wrapper.simulate('press');
			expect(wrapper.instance().state.checked).toBe(true);
		});
	
		it('checked props', () => {
			let handler = jest.fn();
			const wrapper = shallow(
				<Checkbox checked={true} onChange={handler}>使用受控属性checked的checkbox</Checkbox>
			);
			wrapper.simulate('press');
			expect(handler).toBeCalled();
			// 使用这种方式来模拟应该在onChange中执行的setState操作吧
			wrapper.setState({
				checked: false
			});
			expect(wrapper.instance().state.checked).toBe(false);
		});
	
		it('wrapper name', () => {
			const wrapper = shallow(
				<Checkbox>checkbox</Checkbox>
			);
			expect(wrapper.name()).toMatch(/TouchableWithoutFeedback/);
		});
	});

	describe('Checkbox group', () => {
		let content;
		beforeEach(() => {
			content = [
				<Checkbox value='english' key='english'>英语</Checkbox>,
				<Checkbox value='chinese' key='chinese'>语文</Checkbox>,
				<Checkbox value='math' key='math'>数学</Checkbox>
			]
		});
		
		it('renders correctly', () => {
			const tree = Renderer.create((
				<Checkbox.Group>
					{content}
				</Checkbox.Group>
			)).toJSON();
			
			expect(tree).toMatchSnapshot();
		});

		it('defaultValue', () => {
			const wrapper = shallow(
				<Checkbox.Group defaultValue={['english']}>
					{content}
				</Checkbox.Group>
			);
			expect(wrapper.find(Checkbox)).toHaveLength(3);
			expect(wrapper.instance().state.valueArr).toHaveLength(1);
		})
	});
})
