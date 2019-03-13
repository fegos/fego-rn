import React, { Component } from 'react';
import { TestListView } from '../../common';

class TestView extends Component {
  static navigationOptions = {
    title: 'Util',
  }
  render() {
    return (
      <TestListView
        {...this.props}
        list={[
          { title: '升级测试', page: 'util/Test' },
          { title: 'Fetch', page: 'util/Fetch' },
          { title: 'SocketIO', page: 'util/SocketIO' },
          { title: 'Message', page: 'util/Message' },
        ]}
      />
    );
  }
}

export default TestView;
