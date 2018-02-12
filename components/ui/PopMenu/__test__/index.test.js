import React from 'react'
import Renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { View, Text } from 'react-native'
import PopMenu from '../index'

describe('PopMenu Tests', () => {
	it('renders correctly', () => {
		const content = [
			<PopMenu.Item text='添加新朋友' iconName='user'/>,
			<PopMenu.Item iconName='user'><Text>扫一扫</Text></PopMenu.Item>,
			<PopMenu.Item iconName='user'><View><Text>帮助</Text></View></PopMenu.Item>
		];
		const tree = Renderer.create(<PopMenu content={content}
			placement='bottomLeft'>
			点我显示 popover 哦
		</PopMenu>).toJSON();
		
		expect(tree).toMatchSnapshot();
	});
})
