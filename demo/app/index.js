import React, { Component } from 'react';
import StackNav from './config/StackNav';
import Font from './config/font';
import { AppContainer } from 'fego-rn';

export default {
	init: () => {
		Font.init();
		return AppContainer.setApp(<StackNav />)
	}
}

// import React, { Component } from 'react';
// import { View, Text } from 'react-native'
// import { Icon } from 'fego-rn';

// export default class App extends Component {
// 	render() {
// 		return (
// 			<View style={{marginTop: 100}}>
// 				<Icon name=''/>
// 			<Text>111</Text></View>
// 		)
// 	}
// }