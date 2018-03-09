import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { PieChart, Item } from 'fego-rn';
import { Style } from '../../../common';

export default class PieChartView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 'none',
    };
  }

  componentDidMount() {

  }
  _showTips = () => {
    this.setState({
      show: 'flex',
    });
  }


  render() {
    return (
      <ScrollView style={Style.container}>
        <Text style={Style.title}>PieChartView</Text>
        <Item>
          <View style={{ backgroundColor: '#f5f5f5', height: 200, width: 200 }}>
            <Text>基本用法：</Text>
            <Text
              position="absolute"
              style={{
                display: this.state.show, top: 40, left: 130, zIndex: 10, backgroundColor: 'transparent',
              }}
            >20%
            </Text>
            <Text
              position="absolute"
              style={{
                display: this.state.show, top: 60, left: 150, zIndex: 10, backgroundColor: 'transparent',
              }}
            >10%
            </Text>
            <Text
              position="absolute"
              style={{
                display: this.state.show, top: 95, left: 90, zIndex: 10, backgroundColor: 'transparent',
              }}
            >40%
            </Text>
            <Text
              position="absolute"
              style={{
                display: this.state.show, top: 0, left: 40, zIndex: 10, backgroundColor: 'transparent',
              }}
            >30%
            </Text>
            <View position="absolute" style={{ top: 60, left: 60 }}>
              <PieChart
                percentArray={[0.2, 0.1, 0.4, 0.3]}
                colorArray={['#4d84eb', '#fca63e', 'green', 'yellow']}
                outerRadius={40}
                innerRadius={25}
                animationEndCallBack={this._showTips}
              />
            </View>
          </View>
        </Item>
        <Item>
          <Text>总percent不足100%：</Text>
          <PieChart
            percentArray={[0.2, 0.1, 0.4]}
            colorArray={['#4d84eb', '#fca63e', 'green', 'yellow']}
            outerRadius={40}
            innerRadius={25}
          />
        </Item>
        <Item>
          <Text>总percent超过100%,内半径为0：</Text>
          <PieChart
            percentArray={[0.2, 0.1, 0.4, 0.3, 0.4]}
            colorArray={['#4d84eb', '#fca63e', 'green', 'yellow', 'black']}
            outerRadius={40}
            innerRadius={0}
          />
        </Item>
        <Item>
          <Text>动画时间设定为4秒,逆时针显示：</Text>
          <PieChart
            percentArray={[0.2, 0.1, 0.4, 0.3]}
            colorArray={['#4d84eb', '#fca63e', 'green', 'yellow']}
            outerRadius={40}
            innerRadius={25}
            duration={4000}
            animationType="sequence"
            isClockwise={false}
          />
        </Item>
        <Item>
          <Text>内半径为0，有设置虚线,90度起始点：</Text>
          <PieChart
            percentArray={[0.2, 0.1, 0.4, 0.3]}
            colorArray={['#4d84eb', '#fca63e', 'green', 'yellow']}
            outerRadius={60}
            innerRadius={0}
            duration={1500}
            animationType="sequence"
            rotation={90}
            configArray={[{ stroke: 'red', strokeWidth: 1, strokeDash: [2, 5] }, { stroke: 'black', strokeWidth: 1, strokeDash: [2, 5] }, null, null]}
          />
        </Item>
        <Item>
          <Text>animationType为同步，有设置虚线：</Text>
          <PieChart
            percentArray={[0.2, 0.1, 0.4, 0.3]}
            colorArray={['#4d84eb', '#fca63e', 'green', 'yellow']}
            outerRadius={40}
            innerRadius={25}
            duration={1500}
            animationType="synchron"
            animationEndCallBack={() => { console.log('同步animationEndCallBack'); }}
            configArray={[null, { stroke: 'red', strokeWidth: 1, strokeDash: [2, 5] }, null, { stroke: 'black', strokeWidth: 1, strokeDash: [2, 5] }]}
          />
        </Item>
      </ScrollView>
    );
  }
}
