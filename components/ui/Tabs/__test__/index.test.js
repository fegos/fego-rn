import React from 'react'
import Renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import Tabs from '../index'
import TabBar from '../../Tabs/TabBar.js'

describe('Tabs Tests', () => {
	let handler;
	let content;

	beforeEach(() => {
		handler = jest.fn();
		content = [];
		let tabs = ['tab1', 'tab2', 'tab3'];
		for (let key in tabs) {
			let tab = tabs[key];
			content.push(
				<Tabs.TabPane tab={tab} key={tab} />
			)
		}
	});
	
	it('renders correctly', () => {
		const tree = Renderer.create((
			<Tabs>
				{content}
			</Tabs>
		)).toJSON();
		
		expect(tree).toMatchSnapshot();
	});

	it('shallow function', () => {
		const wrapper = shallow(
			<Tabs defaultActiveKey='0'>
				{content}
			</Tabs>
		);
		
		expect(wrapper.find(TabBar)).toHaveLength(1);
	});
})
