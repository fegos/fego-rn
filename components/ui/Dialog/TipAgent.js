/**
 * 提示框容器
 */
import React from 'react';
import { Text, ScrollView } from 'react-native';
import { UIComponent } from '../../common';

import Dialog from './index';

export default class TipAgent extends UIComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }
  componentWillUnmount() {
    this.close = () => { };
  }
  close(fn) {
    this.setState({
      visible: false,
    }, fn);
  }
  _crtContent(style) {
    const { content, title } = this.props;
    if (typeof content === 'string') {
      return <Text style={[style.content, title ? style.contentHasTitle : null]}>{content}</Text>;
    }
    return content;
  }
  render() {
    const { style } = this;
    const {
      title, actions, onAnimationEnd, type,
    } = this.props;
    const setAniEndFn = (endFn) => {
      this.endFn = endFn;
    };
    const _onAniEnd = (visible) => {
      if (onAnimationEnd) {
        onAnimationEnd(visible);
      }
      // 动画关闭时回调
      if (this.endFn && !visible) {
        this.endFn(visible);
      }
    };
    const footer = actions.map((button) => {
      const orginPress = button.onPress || function temp() { };
      button.onPress = () => {
        const res = orginPress(button, setAniEndFn);
        // 若返回false则不关闭
        if (res !== false) {
          this.close();
          return;
        }
        // 若返回promise则resolve时才关闭
        if (res && res.then) {
          res.then(() => {
            this.close();
          });
        }
      };
      return button;
    });
    const content = this._crtContent(style);
    return (
      <Dialog
        title={title}
        type={type}
        visible={this.state.visible}
        onClose={() => this.close}
        footer={footer}
        onAnimationEnd={_onAniEnd}
      >
        <ScrollView style={style.container} >
          {content}
        </ScrollView>
      </Dialog>
    );
  }
}
TipAgent.baseStyle = {
  container: {

  },
  content: {
    fontSize: 16,
    lineHeight: 22,
    color: '#030303',
    textAlign: 'center',
  },
  contentHasTitle: {
    color: '#888',
  },
};
