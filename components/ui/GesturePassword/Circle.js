import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});

// const borderWidth = 1

export default class Circle extends Component {
  static defaultProps = {
    isFill: false,
    backgroundColor: 'transparent',
  }

  static propTypes = {
    isFill: PropTypes.bool,
    color: PropTypes.string.isRequired,
    radius: PropTypes.number.isRequired,
    borderWidth: PropTypes.number.isRequired,
    backgroundColor: PropTypes.string,
    position: PropTypes.shape({
      left: PropTypes.number.isRequired,
      top: PropTypes.number.isRequired,
    }).isRequired,

  }

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
    this._diameter = props.radius * 2;
  }

  render() {
    const {
      isFill,
      color,
      borderWidth,
      backgroundColor,
      radius,
      position,
    } = this.props;
    return (
      <View
      // onLayout={ (e) => {
      // }}
        style={[
          styles.container,
          isFill ? { backgroundColor: color } : {
            borderColor: color,
            borderWidth,
            backgroundColor,
          },
          {
            width: this._diameter,
            height: this._diameter,
            borderRadius: radius,
            // left: this.props.position.left - borderWidth,
            // top: this.props.position.top - borderWidth,
            left: position.left,
            top: position.top,
          },
        ]}
      >
        { this.props.children }
      </View>
    );
  }
}
