import React from 'react'
import Renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { View, Text } from 'react-native'
import Popover from '../index'

describe('Popover Tests', () => {
	it('renders correctly', () => {
		const content = [
			<Popover.Item text='添加新朋友' iconName='user'/>,
			<Popover.Item iconName='user'><Text>扫一扫</Text></Popover.Item>,
			<Popover.Item iconName='user'><View><Text>帮助</Text></View></Popover.Item>
		];
		const tree = Renderer.create(<Popover content={content}
			placement='bottomLeft'>
			点我显示 popover 哦
		</Popover>).toJSON();
		
		expect(tree).toMatchSnapshot();
	});
})
