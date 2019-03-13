/*
 * A smart gesture password locker for react-native apps
 * https://github.com/react-native-component/react-native-smart-sudoku-grid/
 * Released under the MIT license
 * Copyright (c) 2016 react-native-component <moonsunfall@aliyun.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  PanResponder,
  Dimensions,
  View,
} from 'react-native';
import { UIComponent } from '../../common';

import * as Utils from './Utils';
import Point from './Point';
import Line from './Line';
import Arrow from './Arrow';


const padding = 8;
const borderWidth = 1;

const {
  width: deviceWidth,
} = Dimensions.get('window');

export default class GesturePassword extends UIComponent {
  static defaultProps = {
    warningDuration: 0,
    gestureAreaLength: 222,
    isWarning: false,
    isPointNoChange: false,
    showArrow: true,
    allowCross: true,
    isShowBorder: true,
    isHideLine: true, // 是否隐藏连接点内的线
  }

  static simpleStyleProps = {
    activeColor: {
      name: 'active',
      attr: 'color',
    },
    normalColor: {
      name: 'normal',
      attr: 'color',
    },
  }

  static propTypes = {
    // 显示警告的间隔
    warningDuration: PropTypes.number,
    // 手势图形的宽度
    gestureAreaLength: PropTypes.number,
    // 手势上方组件
    topComponent: PropTypes.element,
    // 手势下方组件
    bottomComponent: PropTypes.element,
    // 是否处于warning状态
    isWarning: PropTypes.bool,
    // 连接点是否不会变
    isPointNoChange: PropTypes.bool,
    // 显示箭头
    showArrow: PropTypes.bool,
    // 是否显示边缘
    isShowBorder: PropTypes.bool,
    // 是否隐藏连接点内的线
    isHideLine: PropTypes.bool,
    // 是否允许穿过点
    allowCross: PropTypes.bool,
    // 开始手势回调
    onStart: PropTypes.func,
    // 重置手势回调
    onReset: PropTypes.func,
    // 手势结束回调
    onFinish: PropTypes.func,
  }
  static autoStyleSheet = false

  static getDerivedStateFromProps(nextProps) {
    return ({
      isWarning: nextProps.isWarning,
    });
  }

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      isWarning: false,
      points: [],
      lines: [],
      segMentLines: [], // 分段线，在手势跨点的时候产生
      arrows: [],
    };

    this._gestureAreaMarginHorizontal = (deviceWidth - props.gestureAreaLength) / 2;
    this._gestureAreaLeft = 0;
    this._gestureAreaTop = 0;
    this._pointRadius = (props.gestureAreaLength - (padding * 2)) / 8;
    this._currentPoint = null; // 当前手势线所在的圆圈
    this._currentLine = null; // 当前手势线所在的圆圈拉出来的线
    this._timer = null;
    this._sequence = []; // 记录手势经过的圆圈的序列号

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: this._onTouchStart,
      onPanResponderMove: this._onTouchMove,
      onPanResponderRelease: this._onTouchEnd,
      onPanResponderTerminationRequest: () => false,
    });
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    const { style } = this;
    return (
      <View style={{ ...style.container }}>
        {this.props.topComponent}
        <View
          {...this._panResponder.panHandlers}
          onLayout={this._onLayout}
          style={{
            overflow: 'hidden',
            width: this.props.gestureAreaLength,
            height: this.props.gestureAreaLength,
            marginHorizontal: this._gestureAreaMarginHorizontal,
          }}
        >
          {this._renderLines()}
          {this._renderPoints()}
          {this.props.showArrow ? this._renderArrows() : null}
        </View>
        {this.props.bottomComponent}
      </View>
    );
  }

  componentWillUnmount() {
    if (this._timer != null) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }

  _onLayout = (e) => {
    this._gestureAreaLeft = e.nativeEvent.layout.x;
    this._gestureAreaTop = e.nativeEvent.layout.y;
    this._initializePoints();
  }

  _renderArrows() {
    const {
      style,
    } = this;
    return this.state.arrows.map((arrow) => {
      if (this.state.isWarning) {
        arrow.color = style.warning.color;
      }
      return (<Arrow
        key={arrow.id}
        width={
          this._pointRadius / 3
        }
        color={
          arrow.color
        }
        start={{
          x: arrow.start.x - this._gestureAreaLeft,
          y: arrow.start.y - this._gestureAreaTop,
        }}
        end={{
          x: arrow.end.x - this._gestureAreaLeft,
          y: arrow.end.y - this._gestureAreaTop,
        }}
      />
      );
    });
  }

  _renderPoints() {
    const {
      style,
    } = this;
    return this.state.points.map(point => (<Point
      key={point.index}
      radius={this._pointRadius}
      borderWidth={borderWidth}
      backgroundColor={
        style.normal.backgroundColor
      }
      color={
        style.normal.color
      }
      activeColor={
        style.active.color
      }
      warningColor={
        style.warning.color
      }
      isActive={
        point.isActive
      }
      isWarning={
        point.isActive ? this.state.isWarning : false
      }
      index={
        point.index
      }
      isNoChange={
        this.props.isPointNoChange
      }
      isShowBorder={
        this.props.isShowBorder
      }
      position={
        point.position
      }
    />
    ));
  }

  _renderLineDetail(line, index) {
    const {
      style,
    } = this;
    if (line.show) {
      if (this.state.isWarning) {
        line.color = style.warning.color;
      }
      return (
        <Line
          key={`line-${index}`}
          color={line.color}
          lineWidth={style.line.width}
          start={{
            x: line.start.x - this._gestureAreaLeft,
            y: line.start.y - this._gestureAreaTop,
          }}
          end={{
            x: line.end.x - this._gestureAreaLeft,
            y: line.end.y - this._gestureAreaTop,
          }}
        />
      );
    }
    return null;
  }

  _renderLines() {
    const lines = this.state.lines.map((line, index) => this._renderLineDetail(line, index));
    const segMentLines = this.state.segMentLines.map((line, index) => this._renderLineDetail(line, index));
    return (
      <View style={{ flex: 1 }}>
        {lines}
        {segMentLines}
      </View>
    );
  }

  _initializePoints() {
    // avoid repeat invoking(for android)
    if (this.state.points.length) {
      return;
    }

    const points = [];
    for (let i = 0; i < 9; i += 1) {
      const left = (this._pointRadius * 3 * (i % 3)) + padding;
      const top = (this._pointRadius * 3 * Math.floor(i / 3)) + padding;
      points.push({
        index: i,
        position: {
          left,
          top,
        },
        origin: {
          x: this._gestureAreaLeft + left + this._pointRadius,
          y: this._gestureAreaTop + top + this._pointRadius,
        },
        isActive: false,
        isWarning: false,
      });
    }
    this.setState({
      points,
    });
  }

  _getTouchPoint(location) {
    for (const point of this.state.points) {
      if (Utils.isPointInPath(location, point.origin, this._pointRadius)) {
        return point;
      }
    }
    return null;
  }

  _addSequence(index) {
    // if (~this._sequence.findIndex((item) => item === index)) {
    if (this._sequence.includes(index)) {
      return;
    }
    this._sequence.push(index);
  }

  _addArrow(arrow) {
    // this.state.arrows.push(arrow);
    const { arrows } = this.state;
    this.setState({
      // arrows: arrows.slice().push(arrow),
      arrows: arrows.concat(arrow),
    });
  }

  _addLine(line) {
    if (this.props.isHideLine) {
      const {
        start,
        end,
      } = line;

      const dy = end.y - start.y;
      const dx = end.x - start.x;
      const len = Math.sqrt((dx * dx) + (dy * dy));
      if (len < this._pointRadius) {
        line.show = false;
      } else {
        line.show = true;
        line.start = {
          x: start.x + ((this._pointRadius * dx) / len),
          y: start.y + ((this._pointRadius * dy) / len),
        };
      }
    }
    // this.state.lines.push(line);
    const { lines } = this.state;
    this.setState({
      lines: lines.concat(line),
    });
  }


  _computerSegMentLines(point, line, end) {
    const segMentLines = [];
    // 计算线条经过的其他圆圈
    const { points } = this.state;
    let crossPoint = [];
    for (let i = 0; i < points.length; i += 1) {
      const tmpPoint = points[i];
      if (tmpPoint.index !== point.index) {
        // 计算line.start/end的直线到tmpPoint的距离，来判断线是否跟圆圈相交
        const distanse = Utils.computerDistance(line.start, end, tmpPoint.origin);
        if (distanse < this._pointRadius) {
          // 相交
          // 如果跟这个圆圈相交，则需要计算出线的交点
          const crossPoints = Utils.getCircleLineIntersectionPoint(line.start, end, tmpPoint.origin, this._pointRadius);
          // 确保交叉点在起始点范围内
          if (Utils.pointInMiddleLine(crossPoints[0], line.start, end) &&
            Utils.pointInMiddleLine(crossPoints[1], line.start, end)) {
            crossPoint.push({
              index: tmpPoint.index,
              point1: crossPoints[0],
              point2: crossPoints[1],
            });
          }
        }
      }
    }

    const crossCount = crossPoint.length;
    if (crossCount > 0) {
      // 触碰圆圈大于1个，需要调整好交点的位置
      crossPoint = Utils.reSortArray(crossPoint, line.start, end);
      const {
        style,
      } = this;
      for (let i = 0; i < crossCount; i += 1) {
        const crossDetail = crossPoint[i];
        if (i === 0) {
          line.end = {
            x: crossDetail.point1.x,
            y: crossDetail.point1.y,
          };
        }
        const segMentLine = {
          show: true,
          start: crossDetail.point2,
          end: i === crossCount - 1 ? end : crossPoint[i + 1].point1,
          color: style.line.color || style.active.color,
        };
        segMentLines.push(segMentLine);
      }
    }
    return segMentLines;
  }

  /**
   * 更新手势线
   * @param {*} point 手势圆圈信息
   * @param {*} end 移动的终点位置信息
   * @param {*} endIsPointOrigin 用来标识终点位置是否是一个圆圈的圆心，默认false
   * @param {*} needCheckCross 用来标识当前更新线是否需要检测落点跟其他的圆圈相交
   * 如果相交，在isShowBorder模式需要做断线处理
   */
  _updateLine(
    point, end,
    endIsPointOrigin = false,
    needCheckCross = false,
    endPointHasActive = false,
  ) {
    // 获取当前手势圆圈的信息
    const start = point.origin;
    this._currentLine.start = start;
    this._currentLine.end = end;
    // 先清理之前的短线
    this.setState({
      segMentLines: [],
    });

    const { lines } = this.state;

    if (this.props.isHideLine) {
      let dy = end.y - start.y;
      let dx = end.x - start.x;
      let len = Math.sqrt((dx * dx) + (dy * dy));

      const line = this._currentLine;
      // 更新线条
      if (len >= this._pointRadius) {
        line.show = true;
        line.start = {
          x: point.origin.x + ((this._pointRadius * dx) / len),
          y: point.origin.y + ((this._pointRadius * dy) / len),
        };
        if (endIsPointOrigin) {
          // 计算以end为中心的圆与point点之间的交点
          dx = start.x - end.x;
          dy = start.y - end.y;
          len = Math.sqrt(dx * dx + dy * dy);
          end = {
            x: end.x + this._pointRadius * dx / len,
            y: end.y + this._pointRadius * dy / len,
          };
          const segLines = this._computerSegMentLines(point, line, end, true);
          if (segLines.length > 0) {
            if (!endPointHasActive) {
              for (let m = 0; m < segLines.length; m += 1) {
                lines.push(segLines[m]);
              }
            }
            this.setState({
              segMentLines: segLines.slice(0),
            });
          } else {
            line.end = end;
          }
        } else if (needCheckCross) {
          // 处理线跳点的情况
          // 如果存在交点，那么需要根据当前line的方向决定分段线
          const segMentLines = this._computerSegMentLines(point, line, end);
          if (segMentLines.length > 0) {
            this.setState({
              segMentLines,
            });
          }
        }
      } else {
        line.show = false;
      }
    }

    // 更新线条
    this.setState({
      lines,
    });
  }

  _setToActive(point) {
    point.isActive = true;
    this.setState({
      points: this.state.points,
    });
  }

  _reset() {
    const points = this.state.points.map((point) => {
      point.isActive = false;
      return point;
    });
    this.setState({
      isWarning: false,
      points,
      lines: [],
      segMentLines: [],
      arrows: [],
    });

    this._sequence = [];
    this._currentPoint = null;
    this._currentLine = null;

    if (this.props.onReset) {
      this.props.onReset();
    }
  }

  _onTouchStart = (e) => {
    if (this.props.onStart) {
      this.props.onStart();
    }

    if (this._timer != null) {
      clearTimeout(this._timer);
      this._timer = null;
    }

    this._reset();
    const location = {
      x: e.nativeEvent.pageX,
      y: e.nativeEvent.pageY,
    };
    const point = this._getTouchPoint(location);
    if (point == null) {
      return;
    }

    this._addSequence(point.index);
    this._setToActive(point);
    this._currentPoint = point;
  }

  _onTouchMove = (e) => {
    // 获取当前移动位置的坐标
    const {
      style,
    } = this;
    const location = {
      x: e.nativeEvent.pageX,
      y: e.nativeEvent.pageY,
    };
    // 根据坐标获取对应的手势原点
    const point = this._getTouchPoint(location);

    if (point == null) {
      // 如果没有获取到手势圆圈，说明位置在圆圈与圆圈之间的部分
      if (this._currentLine == null) {
        // 当前线为空说明首次发起移动的地方不在圆圈点内
        return;
      }
      // 如果存在当前的线，说明该线是从某一个圆圈拉出来的但是没有落到其他圆圈里的路径
      this._updateLine(this._currentPoint, location, false, true);
    } else if (this._currentLine == null) {
      const line = {
        show: true,
        start: point.origin,
        end: location,
        color: style.line.color || style.active.color,
        id: `line-${point.origin.x}-${point.origin.y}-${location.x}-${location.y}`,
      };
      this._addLine(line);
      this._currentLine = line;
      if (this._currentPoint != null) {
        return;
      }
      this._addSequence(point.index);
      this._setToActive(point);
      this._currentPoint = point;
    } else {
      // 落点任然在当前手势圆圈里，如果是isShowBorder=true无需处理
      if (point === this._currentPoint) {
        if (!this.props.isHideLine) {
          this._updateLine(point, location, false, true);
        }
        return;
      }
      // 落点在已经激活的手势圆圈里
      if (this._sequence.includes(point.index)) {
        if (this.props.isHideLine) {
          this._updateLine(this._currentPoint, point.origin, true, true, true);
        } else {
          this._updateLine(this._currentPoint, location);
        }

        return;
      }

      if (!this.props.allowCross) {
        const crossPoint = Utils.getCrossPoint(this.state.points, this._currentPoint, point, this._pointRadius);
        if (crossPoint != null) {
          this._addSequence(crossPoint.index);
          this._setToActive(crossPoint);
        }
      }

      // 如果落点在其他未激活的手势圆圈里
      this._updateLine(this._currentPoint, point.origin, true, true);
      // 需要在其他圆圈里处理箭头
      const arrow = {
        start: this._currentPoint.origin,
        end: point.origin,
        color: style.active.color,
        id: `arrow-${this._currentPoint.origin.x}-${this._currentPoint.origin.y}-${point.origin.x}-${point.origin.y}`,
      };
      this._addArrow(arrow);
      // 以及添加一条新线
      const line = {
        show: true,
        start: point.origin,
        end: location,
        color: style.line.color || style.active.color,
        id: `line-${point.origin.x}-${point.origin.y}-${location.x}-${location.y}`,
      };
      this._addLine(line);
      this._currentLine = line;
      this._addSequence(point.index);
      this._setToActive(point);
      this._currentPoint = point;
    }
  }

  _onTouchEnd = () => {
    if (this._sequence.length === 0) {
      return;
    }
    const { points, lines, segMentLines } = this.state;
    if (segMentLines.length > 1) {
      segMentLines.pop();
    } else {
      lines.pop();
    }

    this.setState({
      lines,
      segMentLines,
      points,
    });

    const password = Utils.getPassword(this._sequence);
    if (this.props.onFinish) {
      this.props.onFinish(password);
    }

    if (this.props.warningDuration > 0) {
      this._timer = setTimeout(() => {
        this._reset();
      }, this.props.warningDuration);
    } else {
      this._reset();
    }
  }
}

GesturePassword.baseStyle = {
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  normal: {
    color: '#A9A9A9',
    backgroundColor: 'transparent',
  },
  active: {
    color: '#00AAEF',
  },
  warning: {
    color: 'red',
  },
  line: {
    width: 2,
  },
};
