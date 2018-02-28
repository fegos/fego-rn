import React, { Component } from 'react';
import { View, ART, Animated, ScrollView, Text } from 'react-native';
import { PieChart } from 'fego-rn';

const { Wedge } = PieChart;
const {
  Surface, Shape, Path, Group, LinearGradient, RadialGradient,
} = ART;

/**
 * Surface:一个矩形可渲染的区域，是其他元素的容器！
 *    width : 渲染区域的宽
 *    height : 定义渲染区域的高
 * Group:用于组合art component
 *    rotation : 旋转角度
 * Shape:形状定义，可填充
 *    d : 定义绘制路径
 *    stroke : 描边颜色
 *    strokeWidth : 描边宽度
 *    strokeDash : 定义虚线
 *      [10,5] : 表示绘10像素实线在绘5像素空白，如此循环
 *      [10,5,20,5] : 表示绘10像素实线在绘制5像素空白在绘20像素实线及5像素空白
 *    fill : 填充颜色
 * Text
 *    font : 字体样式，定义字体、大小、是否加粗 fontFamily 如: bold 35px Heiti SC，
 * Path
 *    moveTo(x,y) : 移动到坐标（x,y）
 *      其实是画线的起点
 *    lineTo(x,y) : 连线到（x,y）
 *    arc() : 绘制弧线
 *      arc(x,y,radius)的使用, 终点坐标距离起点坐标的相对距离
 *    close() : 封闭空间
 *      创建一个密闭的路径
 */
export default class TestART extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing( // 随时间变化而执行的动画类型
      this.state.fadeAnim, // 动画中的变量值
      {
        toValue: 1, // 透明度最终变为1，即完全不透明
        duration: 2000,
      },
    ).start();
  }

  render() {
    const coverPath = new Path()
      .moveTo(1, 1)
      .lineTo(300, 1);
    const rectPath = new Path()
      .moveTo(1, 1)
      .lineTo(1, 99)
      .lineTo(99, 99)
      .lineTo(99, 1)
      .close();
    const arcPath = new Path()
      .moveTo(50, 0)
      .arc(0, 100, 50)
      .arc(0, -100, 50)
      .close();

    const colors = ['red', 'blue'];
    const linearGradient = new LinearGradient(colors, 0, 0, 100, 100);
    const colors1 = ['#393A3F', '#222222'];
    const width = 100;
    const height = 100;
    const radialGradient = new RadialGradient(colors1, width * 0.5, height * 0.5, height * 0.5, height * 0.5, width * 0.5, height * 0.5);
    // const radialGradientPath = new Path()
    //  .moveTo(0, 0)
    //  .lineTo(width, 0)
    //  .lineTo(width, height)
    //  .lineTo(0, height)
    //  .close();
    // return (
    //  <Surface width={width} height={height}>
    //    <Shape d={radialGradientPath} fill={radialGradient} />
    //  </Surface>
    // )

    return (
      <ScrollView style={{ flex: 1, margin: 20 }}>
        <Text style={{ margin: 10 }}>绘制线性渐变</Text>
        <View style={{
          width: 200,
          height: 200,
          borderColor: 'red',
          borderWidth: 1,
          padding: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        >
          <Surface width={100} height={100} >
            <Shape d={rectPath} fill={linearGradient} />
          </Surface>
          <Surface width={100} height={100} >
            <Shape d={rectPath} fill={radialGradient} />
          </Surface>
        </View>
        <Text style={{ margin: 10 }}>绘制横线</Text>
        <Surface width={300} height={2}>
          <Shape d={coverPath} stroke="#000000" strokeWidth={1} />
        </Surface>
        <Text style={{ margin: 10 }}>绘制虚线</Text>
        <Surface width={300} height={2}>
          <Shape d={coverPath} stroke="#000000" strokeWidth={1} strokeDash={[10, 5]} />
        </Surface>
        <View style={{ margin: 10 }} />
        <Surface width={300} height={2}>
          <Shape d={coverPath} stroke="#000000" strokeWidth={1} strokeDash={[10, 5, 20, 5]} />
        </Surface>
        <Text style={{ margin: 10 }}>绘制矩形</Text>
        <Surface width={100} height={100}>
          <Shape d={rectPath} stroke="#ffffff" fill="#892265" strokeWidth={1} strokeDash={[10, 5]} />
        </Surface>
        <Text style={{ margin: 10 }}>绘制环形</Text>
        <Animated.View style={{ opacity: this.state.fadeAnim }}>
          <PieChart
            percentArray={[1]}
            colorArray={['#4d84eb', '#fca63e', '#892265']}
            outerRadius={40}
            innerRadius={25}
            duration={1000}
          />
        </Animated.View>
        <Text style={{ margin: 10 }}>绘制圆</Text>
        <Surface width={100} height={100}>
          <Shape d={arcPath} stroke="#ffffff" fill="#892265" strokeWidth={1} strokeDash={[10, 5]} />
        </Surface>
        <Text style={{ margin: 10 }}>绘制文字</Text>
        <Surface width={164} height={40} >
          <ART.Text strokeWidth={1} stroke="#000" font="32px FontAwesome" >Hello World</ART.Text>
        </Surface>
        <Text style={{ margin: 10 }}>绘制扇形</Text>
        <Surface width={100} height={100}>
          <Wedge innerRadius={25} outerRadius={50} startAngle={-90} endAngle={-30} fill="white" stroke="#000" strokeWidth={1} strokeDash={[10, 5]} />
        </Surface>
        <Text style={{ margin: 10 }}>Group使用，此例为圆和扇形的组合</Text>
        <Surface width={100} height={100}>
          <Group>
            <Shape d={arcPath} stroke="#ffffff" fill="#892265" strokeWidth={1} strokeDash={[10, 5]} />
            <Wedge outerRadius={50} startAngle={-90} endAngle={-30} fill="blue" />
          </Group>
        </Surface>
      </ScrollView>
    );
  }
}
