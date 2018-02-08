import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  Alert,
  View,
  Text,
  Dimensions,
} from 'react-native';
import { GesturePassword } from 'fego-rn';

export default class GesturePasswordDemo extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      isWarning: false,
      message: 'Verify your gesture password',
      messageColor: '#A9A9A9',
      password: '',
      // thumbnails: [],
      statusBarHeight: 0,
      navigationHeight: 0,
    };
    this._cachedPassword = '';
  }
  componentWillMount() {
    // 判断屏幕的状态栏和导航栏是否存在，以便计算高度
    const { state } = this.props.navigation;
    this.state.navigationHeight = state ? 44 : 0;
  }

  componentDidMount() {
    this._cachedPassword = '13457'; // get cached gesture password
  }

  render() {
    return (
      <View style={{
        position: 'absolute',
        top: -this.state.statusBarHeight - this.state.navigationHeight,
      }}
      >
        <GesturePassword
          style={{ paddingTop: 20 + 44 }}
          isWarning={this.state.isWarning}
          warningDuration={1500}
          topComponent={this._renderDescription()}
          bottomComponent={this._renderActions()}
          onFinish={this._onFinish}
          onReset={this._onReset}
          isPointNoChange={false}
          isShowBorder
        />
      </View>
    );
  }

  _renderThumbnails() {
    const thumbnails = [];
    for (let i = 0; i < 9; i++) {
      const active = ~this.state.password.indexOf(i);
      thumbnails.push((
    <View
      key={`thumb-${i}`}
      style={[
      {
        width: 8, height: 8, margin: 2, borderRadius: 8,
      },
      active ? { backgroundColor: '#00AAEF' } : { borderWidth: 1, borderColor: '#A9A9A9' },
    ]}
    />
      ));
    }
    return (
  <View style={{ width: 38, flexDirection: 'row', flexWrap: 'wrap' }}>
    {thumbnails}
  </View>
    );
  }

	_renderDescription = () => (
			<View style={{
 height: 158, paddingBottom: 10, justifyContent: 'flex-end', alignItems: 'center',
}}
			>
				{this._renderThumbnails()}
				<Text
  style={{
 fontFamily: '.HelveticaNeueInterface-MediumP4', fontSize: 14, marginVertical: 6, color: this.state.messageColor
}}
				>{this.state.message}
    </Text>
			</View>
		)

	_renderActions = () => (
			<View
  style={{
 position: 'absolute', bottom: 0, flex: 1, justifyContent: 'space-between', flexDirection: 'row', width: Dimensions.get('window').width,
}}
			>
				{/*<Button
                    style={{ margin: 10, height: 40, justifyContent: 'center', }}
                    textStyle={{fontSize: 14, color: '#A9A9A9'}}>
                    Forget password
                </Button>
                <Button
                    style={{ margin: 10, height: 40, justifyContent: 'center', }}
                    textStyle={{fontSize: 14, color: '#A9A9A9'}}>
                    Login other accounts
				</Button>*/}
			</View>
		)

	_onReset = () => {
	  const isWarning = false;
	  // let password = ''
	  const message = 'Verify your gesture password';
	  const messageColor = '#A9A9A9';
	  this.setState({
	    isWarning,
	    // password,
	    message,
	    messageColor,
	  });
	}

	_onFinish = (password) => {
	  if (password === this._cachedPassword) {
	    const isWarning = false;
	    const message = 'Verify succeed';
	    const messageColor = '#00AAEF';
	    this.setState({
	      isWarning,
	      password,
	      message,
	      messageColor,
	    });
	  } else {
	    const isWarning = true;
	    let message;
	    const messageColor = 'red';
	    if (password.length < 4) {
	      message = 'Need to link at least 4 points';
	    } else {
	      message = 'Verify failed';
	    }
	    this.setState({
	      isWarning,
	      password,
	      message,
	      messageColor,
	    });
	  }
	  Alert.alert(`password is ${password}`);
	}
}
