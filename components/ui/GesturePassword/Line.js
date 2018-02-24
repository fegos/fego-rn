import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
} from 'react-native';

import * as Utils from './Utils';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});

export default class Line extends Component {
  static defaultProps = {
    lineWidth: 1,
  }

  static propTypes = {
    color: PropTypes.string.isRequired,
    lineWidth: PropTypes.number,
    start: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    end: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
  }

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
  }

  render() {
    const { color, lineWidth, start, end } = this.props;
    const transform = Utils.getLineTransform(start, end);
    return (<View style={
        [styles.container, {
          backgroundColor: color,
          width: transform.distance,
          height: lineWidth,
          left: start.x,
          top: start.y - (lineWidth / 2),
          transform: [{
              translateX: transform.translateX,
            },
            {
              translateY: transform.translateY,
            },
            {
              rotateZ: `${transform.rotateRad}rad`,
            },
          ],
        }]
      }
    />
    );
  }
}
