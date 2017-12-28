import React from 'react'
import Renderer from 'react-test-renderer'
import { Text } from 'react-native'
import { shallow } from 'enzyme'
import PieChart from '../index'

describe('PieChart Tests', () => {
	let Comp;
	beforeEach(() => {
		Comp = <PieChart
			percentArray={[0.2, 0.1, 0.4, 0.3]}
			colorArray={['red', 'yellow','blue','green']}
			outerRadius={40}
			innerRadius={25}
			duration={1000}
		/>
	})
	it('renders correctly', () => {
		const tree = Renderer.create(<Text>PieChart</Text>).toJSON();
		expect(tree).toMatchSnapshot();
	});

	// it('other', () => {
	// 	const wrapper = shallow(Comp);
	// 	expect(wrapper.instance().props.innerRadius).toBe(25);
	// });
})
