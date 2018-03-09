import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Progress, Button } from 'fego-rn';
import { Style } from '../../../common';

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      p: 0,
    };
  }

  render() {
    return (
      <ScrollView style={[Style.container]}>
        <Button style={{ marginTop: 6 }} type="primary" onPress={() => { this.setState({ p: this.state.p + 10 }); }}>
          <Text style={{ color: 'white' }} >单击更新进度, 置于顶部:position = top, 显示进度条变化动画:appearTransition = true</Text>
        </Button>
        <Progress showUnfill={false} progressBarColor="yellow" position="top" percent={this.state.p} appearTransition />
        <Text style={Style.title}> 剩余进度条不显示:showUnfill = false </Text>
        <Progress showUnfill={false} percent={80} />
        <Text style={Style.title}> size = large </Text>
        <Progress size="large" percent={60} />
        <Text style={Style.title}> size = small </Text>
        <Progress size="small" percent={40} />
        <Text style={Style.title}> 显示边框:type = border </Text>
        <Progress type="border" size="large" percent={20} />
        <Text style={Style.title}> 只显示进度条的边框:type = progressBorder </Text>
        <Progress type="progressBorder" size="large" percent={20} />
        <Text style={Style.title}> 不按圆角显示:type = retangle </Text>
        <Progress type="retangle" percent={40} />
        <Text style={Style.title}> 进度条右边缘呈线形:progressMarginLinear = true </Text>
        <Progress progressMarginLinear size="large" percent={60} />
        <Text style={Style.title}> 进度条显示黄色:progressBarColor = yellow </Text>
        <Progress progressBarColor="yellow" percent={80} />
        <Text style={Style.title}> {"自定义:progressBarStyle = borderWidth:2, backgroundColor:'green', borderColor:'blue', borderTopRightRadius:0, borderBottomRightRadius:0 containerStyle = borderWidth:1, backgroundColor:'yellow', borderColor:'red', width: 200, height: 80  type = border"}</Text>
        <View style={{
          justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: 100,
        }}
        >
          <Progress
            progressBarStyle={{
              borderWidth: 2, backgroundColor: 'green', borderColor: 'blue', borderTopRightRadius: 0, borderBottomRightRadius: 0,
            }}
            containerStyle={{
              borderWidth: 1, backgroundColor: 'yellow', borderColor: 'red', width: 200, height: 80,
            }}
            type="border"
            percent={50}
          />
        </View>
      </ScrollView>);
  }
}
