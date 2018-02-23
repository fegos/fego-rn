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
          { title: 'Fetch', page: 'util/Fetch' },
          { title: 'SocketIO', page: 'util/SocketIO' },
        ]}
      />
    );
  }
}

export default TestView;
