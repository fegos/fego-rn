import React from 'react';
import Renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Group from '../index';
import Checkbox from '../../Checkbox';
import Radio from '../../Radio';

describe('Group Tests', () => {
  describe('Checkbox Group', () => {
    let content;
    beforeEach(() => {
      content = [
        <Checkbox value="english" key="english">英语</Checkbox>,
        <Checkbox value="chinese" key="chinese">语文</Checkbox>,
        <Checkbox value="math" key="math">数学</Checkbox>,
      ];
    });

    it('renders correctly', () => {
      const tree = Renderer.create((
        <Group>
          {content}
        </Group>
      )).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('defaultValue', () => {
      const wrapper = shallow(<Group defaultValue={['english']} isSingle={false}>{content}</Group>);
      expect(wrapper.find(Checkbox)).toHaveLength(3);
      expect(wrapper.instance().state.valueArr).toHaveLength(1);
    });
  });
  describe('Radio Group', () => {
    let content;
    beforeEach(() => {
      content = [
        <Radio value="english" key="english">英语</Radio>,
        <Radio value="chinese" key="chinese">语文</Radio>,
        <Radio value="math" key="math">数学</Radio>,
      ];
    });

    it('renders correctly', () => {
      const tree = Renderer.create((
        <Group>
          {content}
        </Group>
      )).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('defaultValue', () => {
      const wrapper = shallow(<Group defaultValue="english">{content}</Group>);
      expect(wrapper.find(Radio)).toHaveLength(3);
      expect(wrapper.instance().state.value).toEqual('english');
    });
  });
});
