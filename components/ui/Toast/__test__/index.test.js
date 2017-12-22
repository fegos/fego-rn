import React from 'react'
import Renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import ToastContainer from '../ToastContainer'

describe('Toast Tests', () => {
	it('renders correctly', () => {
		const tree = Renderer.create((
			<ToastContainer 
				key='toast'
				content='这是一个 toast 提示!!!'
				duration={3} />
		)).toJSON();
		
		expect(tree).toMatchSnapshot();
	});
})
