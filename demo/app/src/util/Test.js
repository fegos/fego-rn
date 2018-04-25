import React from 'react';
import { View, Dimensions, TextInput } from 'react-native';

export default class Lifecycles extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps');
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      console.log('do something');
    }
  }

  getSnapshotBeforeUpdate(prevProps) {
    console.log('getSnapshotBeforeUpdate');
    return this.props;
  }

  // <TextInput keyboardType="visible-password" secureTextEntry lineHeight={30} />
  render() {
    return (
      <View
        style={{ flex: 1 }}
        onLayout={(e) => {
          console.log(e.nativeEvent);
          const params = Dimensions.get('window');
          console.log(params);
        }}
      >
        <TextInput secureTextEntry style={{ backgroundColor: 'red', lineHeight: 80 }} />

        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        >
          <View style={{ width: 20, backgroundColor: 'blue' }} />
          <View style={{ width: 20, backgroundColor: 'green' }} />
          <View style={{ width: 20, backgroundColor: 'yellow' }} />
          <View style={{ width: 20, backgroundColor: 'black' }} />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ width: 20, backgroundColor: 'blue' }} />
          <View style={{ width: 20, backgroundColor: 'green' }} />
          <View style={{ width: 20, backgroundColor: 'yellow' }} />
          <View style={{ width: 20, backgroundColor: 'black' }} />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <View style={{ width: 20, backgroundColor: 'blue' }} />
          <View style={{ width: 20, backgroundColor: 'green' }} />
          <View style={{ width: 20, backgroundColor: 'yellow' }} />
          <View style={{ width: 20, backgroundColor: 'black' }} />
        </View>
      </View>
    );
  }
}
