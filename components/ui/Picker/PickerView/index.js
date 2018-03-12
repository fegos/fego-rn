/**
 * 选择器 PickerView 组件
 * @author asyxu
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  PickerIOS,
  Platform,
} from 'react-native';
import { UIComponent } from 'common';
import PickerAndroid from './PickerAndroid';

class PickerView extends UIComponent {
  static defaultProps = {
    data: [],
    initialValue: [],
    onChange: () => { }, // indexArr, valueArr, labelArr 参数
    onReady: () => { }, // indexArr, valueArr, labelArr 参数
  }

  static propTypes = {
    // 传递的数据
    data: PropTypes.arrayOf(PropTypes.any),
    // 非受控属性: picker 初始值
    initialValue: PropTypes.arrayOf(PropTypes.string),
    // 受控属性: picker 的值, 此時initiaValue失效
    value: PropTypes.arrayOf(PropTypes.string),
    // 每列数据选择变化后的回调函数
    onChange: PropTypes.func,
    // 准备就绪的回调函数
    onReady: PropTypes.func,
  }

  static PickerRoll = Platform.OS === 'ios' ? PickerIOS : PickerAndroid

  constructor(props) {
    super(props);
    this._handleData(props);
    this._getInitialState(props);
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps();

    if (!this.isArrayEquals(nextProps.data, this.props.data)) {
      this._handleData(nextProps);
    }

    if (nextProps.value !== undefined && !this.isArrayEquals(nextProps.value, this.props.value)) {
      const { value } = nextProps;
      const pickerData = this.cascade ? this.state.cascadeData : this.data;
      const label = [];
      const index = [];

      pickerData.forEach((data, i) => {
        data.forEach((d, j) => {
          if (d.value === value[i]) {
            label.push(d.label);
            index.push(j);
          }
        });
      });

      this.setState({
        selectedValue: value,
        selectedIndex: index,
        selectedLabel: label,
      });
    }
  }

  componentDidMount() {
    const { selectedValue, selectedIndex, selectedLabel } = this.state;
    this.props.onReady(selectedValue, selectedIndex, selectedLabel);
  }

  _handleData = (props) => {
    const multiRoll = props.data[0] instanceof Array;

    if (multiRoll) {
      this.data = props.data;
    } else {
      this.data = [props.data];
    }

    /*
    this.cols 列数据：级联时依赖于children，如果只有一列必为非级联
    this.cascade 是否级联： true 级联 false 非级联
    */
    const cols = this._getChildrenLength(this.data[0]);
    this.cascade = cols !== 1;
    this.cols = this.cascade ? cols : this.data.length;
  }

  /**
  * 获取级联数据cols
  * data 数组：级联数据
  * return 默认为1
  */
  _getChildrenLength = (data) => {
    let max = 0;
    data.forEach((d) => {
      const tmp = this._traversalObject(d);
      max = tmp > max ? tmp : max;
    });
    return max + 1;
  }

  /**
   * 递归变量对象，结合_getChildrenLength获得级联列数
  */
  _traversalObject = (obj) => {
    if ('children' in obj && obj.children.length >= 1) {
      return this._getChildrenLength(obj.children);
    } else {
      return 0;
    }
  }

  _getInitialState = () => {
    if (this.cascade) {
      this.state = this._getCascadeInitialState();
    } else {
      this.state = this._getUnCascadeInitialState();
    }
  }

  _getUnCascadeInitialState = () => {
    const { data } = this;
    const len = data.length;
    const initialValue = 'value' in this.props ? this.props.value : this.props.initialValue;
    const selectedIndex = [];
    let selectedValue = [];
    const selectedLabel = [];

    if (initialValue.length) { // 有初始值
      selectedValue = initialValue.slice();
      for (let i = 0; i < len; i++) {
        const arr = data[i];
        const l = arr.length;

        for (let j = 0; j < l; j++) {
          if (arr[j].value === selectedValue[i]) {
            selectedIndex.push(j);
            selectedLabel.push(arr[j].label);
          }
        }
      }
    } else { // 无初始值
      for (let i = 0; i < len; i++) {
        selectedIndex.push(0);
        selectedValue.push(data[i][0].value);
        selectedLabel.push(data[i][0].label);
      }
    }

    return {
      selectedValue,
      selectedIndex,
      selectedLabel,
    };
  }

  _getCascadeInitialState = () => {
    const { data } = this.props;
    const initialValue = 'value' in this.props ? this.props.value : this.props.initialValue;
    const cascadeData = [];
    const selectedIndex = [];
    const selectedValue = [];
    const selectedLabel = [];

    cascadeData[0] = data.concat();
    const { cols } = this;
    let i = 0;
    const getItemData = (colCascadeData) => {
      let item = colCascadeData[0];
      let index = 0;
      colCascadeData.forEach((d, ind) => {
        if (d.value === initialValue[i]) {
          item = d;
          index = ind;
        }
      });
      return { item, index };
    };

    for (i = 0; i < cols; i++) {
      const { item, index } = getItemData(cascadeData[i]);
      if (item) {
        if (item.children) cascadeData.push(item.children);
        selectedIndex.push(index);
        selectedValue.push(item.value);
        selectedLabel.push(item.label);
      }
    }

    return {
      selectedValue,
      selectedIndex,
      selectedLabel,
      cascadeData,
    };
  }

  isArrayEquals = (left, right) => {
    if (!left && !right) return true;
    if (!left || !right) return false;
    if (left.length !== right.length) return false;
    for (let i = 0, l = left.length; i < l; i++) {
      // Check if we have nested arrays
      if (left[i] instanceof Array && right[i] instanceof Array) {
        // recurse into the nested arrays
        if (!this.isArrayEquals(left[i], right[i])) { return false; }
      } else if (left[i] !== right[i]) {
        return false;
      }
    }
    return true;
  }
  /**
  * @param d picker 一项的数据
  * @param index picker 这一项的数据在 picker 整个数据数组中的下标
  * @param newValue 新选中的值对应的value
  * @param newIndex 新选中的值在 d 中的下边
  */
  _onChange = (d, index, newValue, newIndex) => {
    const { label } = d[newIndex];
    const { cols } = this;
    const { selectedIndex, selectedValue, selectedLabel } = this.state;
    const _selectedValue = selectedValue.concat();
    const _selectedIndex = selectedIndex.concat();
    const _selectedLabel = selectedLabel.concat();
    let _state = {};

    if (this.cascade) { // 级联
      const cascadeData = this.state.cascadeData.concat();


      cascadeData.splice(index + 1); // state 中保存的数据中的前index+1列的数据不用变，只需要级联变化之后的列数据
      if (d[newIndex].children) cascadeData.push(d[newIndex].children);
      // 存储的选中信息则是需要从变化的这一列开始重新计算
      _selectedValue.splice(index);
      _selectedIndex.splice(index);
      _selectedLabel.splice(index);
      _selectedValue.push(newValue);
      _selectedIndex.push(newIndex);
      _selectedLabel.push(label);

      for (let i = index + 1; i < cols; i++) {
        const cData = cascadeData[i][0];
        const cIndex = 0;

        if (cData) {
          _selectedValue.push(cData.value);
          _selectedIndex.push(cIndex);
          _selectedLabel.push(cData.label);

          if (cData.children) {
            cascadeData.push(cData.children);
          }
        }
      }
      _state.cascadeData = cascadeData;
    } else {
      _selectedValue.splice(index, 1, newValue);
      _selectedIndex.splice(index, 1, newIndex);
      _selectedLabel.splice(index, 1, label);
    }

    if (this.props.value === undefined) {
      _state = {
        ..._state,
        selectedValue: _selectedValue,
        selectedIndex: _selectedIndex,
        selectedLabel: _selectedLabel,
      };
    }
    /**
     * cascade 涉及到每一列数据的变化，需要 setState 触发渲染出新的数据项
     * 因此，cascade 时会对 cascadeData 进行 setState 操作
     * componentWillRecieveProps 会使用到 cascadeData
     * 所以保证 state 更新完后再进行 onChange 回调
     */
    this.setState(_state, () => {
      this.props.onChange(_selectedValue, _selectedIndex, _selectedLabel);
    });
  }

  _renderRoll = () => {
    const pickerData = this.cascade ? this.state.cascadeData : this.data;
    const PickerItem = PickerIOS.Item;

    return pickerData.map((rollData, index) =>
      // selectedValue 供 PickerIOS 使用，为官方提供的 PickerIOS 的 API
      // selectedIndex 供 PickerAndroid 使用，方便 PickerAndroid 滚动的相关计算
      (
        <PickerView.PickerRoll
          key={index}
          style={{ flex: 1, justifyContent: 'flex-start' }}
          data={rollData}
          selectedIndex={this.state.selectedIndex[index]}
          selectedValue={this.state.selectedValue[index]}
          // rollData、index是为了方便计算传入
          onValueChange={(newValue, newIndex) => {
            this._onChange(rollData, index, newValue, newIndex);
          }}
        >
          {
            Platform.OS === 'ios' && (
              rollData.map(item => (
                <PickerItem
                  key={item.value}
                  value={item.value}
                  label={item.label}
                />
              )))
          }
        </PickerView.PickerRoll>
      ));
  }

  render() {
    const { style } = this;
    return <View style={[style.container]} >{this._renderRoll()}</View>;
  }
}

PickerView.baseStyle = {
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
};

export default PickerView;
