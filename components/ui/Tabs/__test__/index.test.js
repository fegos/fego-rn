import React from 'react';
import Renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Tabs from '../index';
import TabBar from '../TabBar';

jest.useFakeTimers();
describe('Tabs Tests', () => {
  let content;

  beforeEach(() => {
    content = [];
    const tabs = ['tab1', 'tab2', 'tab3'];
    tabs.forEach((index, key) => {
      const tab = tabs[key];
      content.push(<Tabs.TabPane tab={tab} key={tab} />);
    });
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
    const tabs = (
      <Tabs defaultActiveKey="0">
        {content}
      </Tabs>
    );
    const wrapper = shallow(tabs);

    expect(wrapper.find(TabBar)).toHaveLength(1);
  });
});
