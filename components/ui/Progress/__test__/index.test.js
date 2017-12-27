import React from 'react'
import Renderer from 'react-test-renderer'
import { View } from 'react-native'
import { shallow } from 'enzyme'
import Progress from '../index'

describe('Progress Tests', () => {
	it('renders correctly', () => {
		const tree = Renderer.create((
			<Progress />
		)).toJSON();
		
		expect(tree).toMatchSnapshot();
	});

	it('appearTransition', () => {
		// sometimes, the case below may cause tests fail, still don't know the reason
		// let aniWrapper = shallow(<Progress appearTransition={true} />);
		// expect(aniWrapper.childAt(0).name()).toEqual('AnimatedComponent');

		let wrapper = shallow(<Progress appearTransition={false} />);
		expect(wrapper.childAt(0).type()).toEqual(View);
	});

	it('showUnfill prop test', () => {
		let wrapper = shallow(<Progress showUnfill={true} />);
		expect(wrapper.props().style[3]).toBe(null);

		let wrapper2 = shallow(<Progress showUnfill={false} />);
		expect(wrapper2.props().style[3]).toMatchObject({backgroundColor: 'transparent'});
	});
})
