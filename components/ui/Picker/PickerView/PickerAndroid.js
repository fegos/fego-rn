/**
 * 选择器 PickerView 在 Android 上的子组件
 * ios 上使用 RN 原生的 PickerIOS
 * @author asyxu
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { UIComponent } from '../../../common';

const itemHeight = 36;

export default class PickerAndroid extends UIComponent {
  static defaultProps = {
    onValueChange: () => { },
  }

  static propTypes = {
    // 数据
    data: PropTypes.arrayOf(PropTypes.object),
    // 滚轮的值变化后的回调函数
    onValueChange: PropTypes.func,
    // 选择的值的位置，作为受控属性使用
    selectedIndex: PropTypes.number,
  }


  componentDidUpdate(prevProps) {
    super.componentDidUpdate();
    if (prevProps.selectedIndex !== this.props.selectedIndex) {
      this._scrollTo(this.props.selectedIndex, true);
    }
  }

  _scrollTo(index, animated = true) {
    if (this._scrollView) {
      this._scrollView.scrollTo({ x: 0, y: index * itemHeight, animated });
    }
  }

  _onMomentumScrollBegin = (event) => {
    if (this.props.onMomentumScrollBegin) {
      this.props.onMomentumScrollBegin(event);
    }
  }

  _onMomentumScrollEnd = (event) => {
    if (this.props.onMomentumScrollEnd) {
      this.props.onMomentumScrollEnd(event);
    }
  }

  _onScrollBeginDrag = (event) => {
    if (this.props.onScrollBeginDrag) {
      this.props.onScrollBeginDrag(event);
    }
  }

  _onScrollEndDrag = (event) => {
    const offset = event.nativeEvent.contentOffset.y;
    const t = offset / itemHeight;
    const index = (offset % itemHeight) >= (itemHeight / 2) ? Math.ceil(t) : Math.floor(t);

    if (index !== this.props.selectedIndex) {
      this._onValueChange(index);
    } else {
      this._scrollTo(index, true); // 对于那种只滚了一丢丢的情况，再滚回去
    }
  }

  _onItemPress = (index) => {
    if (index !== this.props.selectedIndex) {
      this._onValueChange(index);
    }
  }

  _onValueChange(index) {
    const { onValueChange, data } = this.props;
    const cur = data[index];
    if (cur) {
      onValueChange(cur.value, index);
    }
  }

  _renderItems() {
    const { style } = this;
    const { data } = this.props;
    const len = data.length;
    const items = [];
    data.forEach((item, i) => {
      items.push((
        <View style={style.item} key={this.generateIndex(i)}>
          <Text
            onPress={() => {
              this._onItemPress(i);
            }}
            style={style.text}
          >
            {item.label}
          </Text>
        </View>
      ));
    });

    /**
     * 在收尾各填充两个空白元素
     */
    function emptyItem(i) {
      return (
        <View style={[style.item]} key={i}>
          <Text style={style.text} />
        </View>
      );
    }

    items.unshift(emptyItem(0));
    items.unshift(emptyItem(1));
    items.push(emptyItem(len + 2));
    items.push(emptyItem(len + 1 + 2));

    return items;
  }

  _onLayout = () => {
    this._scrollTo(this.props.selectedIndex, true);
  }

  generateIndex(i) {
    return `${i}+2`;
  }

  render() {
    const { style } = this;

    return (
      <View style={style.container} onLayout={this._onLayout}>
        <View style={style.innerContainer}>
          <View style={style.selectedLine} />
          <View style={style.mask} pointerEvents="none" />
          <View style={[style.mask, style.maskBottom]} pointerEvents="none" />
          <ScrollView
            ref={(c) => { this._scrollView = c; }}
            pagingEnabled
            bounces={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollBegin={this._onMomentumScrollBegin}
            onMomentumScrollEnd={this._onMomentumScrollEnd}
            onScrollBeginDrag={this._onScrollBeginDrag}
            onScrollEndDrag={this._onScrollEndDrag}
          >
            <View style={style.roll}>
              {this._renderItems()}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

PickerAndroid.baseStyle = {
  container: {
    height: (itemHeight * 5) + 20,
    paddingVertical: 10,
  },
  innerContainer: {
    flex: 1,
    position: 'relative',
    height: itemHeight * 5,
  },
  selectedLine: {
    position: 'absolute',
    top: itemHeight * 2,
    left: 0,
    right: 0,
    height: itemHeight,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  mask: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    top: 0,
    left: 0,
    right: 0,
    height: itemHeight * 2,
    zIndex: 1,
  },
  maskBottom: {
    marginTop: itemHeight * 3,
  },
  roll: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    height: itemHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#333',
    fontSize: 16,
    backgroundColor: 'transparent',
  },
};
