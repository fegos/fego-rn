/**
 * 选择器 Picker 组件
 * @author asyxu
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import UIComponent from '../../common/UIComponent';
import AnimateModal from '../AnimateModal';
import PickerView from './PickerView';
import DatePicker from './DatePicker';

const { width } = Dimensions.get('window');

class Picker extends UIComponent {
  static defaultProps = {
    mode: 'dataPicker',
    datePickerMode: 'date',
    dateMode: 'year-month-day',
    data: [],
    defaultValue: [],
    visible: false,
    modal: true,
    maskClosable: true,
    header: true,
    title: '请选择',
    okText: '确定',
    cancelText: '取消',
    footer: false,
    footerVertical: true,
    onClose: () => { },
    onConfirm: () => { }, // valueArr, indexArr, labelArr 参数
    onChange: () => { }, // selectedIndex, selectedValue, selectedLabel 参数
  }

  static propTypes = {
    // picker模式，默认为dataPicker
    mode: PropTypes.oneOf(['dataPicker', 'datePicker']),
    // datePicker mode
    datePickerMode: PropTypes.oneOf(['date', 'time']),
    // datePicker date 显示模式
    dateMode: PropTypes.oneOf(['year-only', 'month-only', 'day-only', 'year-month', 'year-month-day', 'month-day']),
    // 非受控属性：
    defaultDateValue: PropTypes.instanceOf(Date),
    // 可选的最小日期
    minDate: PropTypes.instanceOf(Date),
    // 可选的最大日期
    maxDate: PropTypes.instanceOf(Date),
    // 'time' 模式下的时间间隔
    minuteStep: PropTypes.number,
    // dataPicker模式下传递的数据
    data: PropTypes.array,
    // 非受控属性: picker 初始值
    defaultValue: PropTypes.array,
    // 受控属性: picker 的值，作为受控属性使用，一般情况不建议使用，主要用于解决datePicker里data和selectedValue不匹配的情况
    value: PropTypes.array,
    // 受控属性: 是否可见，受控属性，需配合 onClose 使用
    visible: PropTypes.bool,
    /* modal */
    modal: PropTypes.bool, // 是否为模态
    maskClosable: PropTypes.bool, // 点击蒙层是否允许关闭
    /* header */
    header: PropTypes.bool,
    // 标题文案
    title: PropTypes.string,
    // 取消的文案
    cancelText: PropTypes.string,
    // 确定的文案
    okText: PropTypes.string,
    /* footer */
    footer: PropTypes.bool,
    // footer view 默认垂直布局还是水平布局
    footerVertical: PropTypes.bool,
    // cancelText:'取消',同上接口
    // 关闭弹框的回调函数
    onClose: PropTypes.func,
    // 确定按钮的回调函数
    onConfirm: PropTypes.func,
    // 每列数据选择变化后的回调函数
    onChange: PropTypes.func,
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      visible: props.visible,
      selectedValue: props.value === undefined ? props.defaultValue : props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps();
    if ('visible' in nextProps && nextProps.visible !== this.props.visible) {
      this.setState({
        visible: nextProps.visible,
      });
    }
    if (nextProps.value !== undefined && nextProps.value.toString() !== this.props.value.toString()) {
      this.setState({
        selectedValue: nextProps.value,
      });
    }
  }

  // 确认按钮
  _onConfirm = () => {
    // 从pickerview取出选择的值，避免某些值在date里面由于mode被截断
    this.props.onConfirm(this._pickerView.state.selectedValue, this._pickerView.state.selectedIndex, this._pickerView.state.selectedLabel);
    this.props.onClose();
  }
  // 取消按钮、关闭弹框
  _onClose = () => {
    this.props.onClose();
  }
  // 滚轮滚动导致的选中值的变化回调
  _onChange = (selectedValue, selectedIndex, selectedLabel) => {
    if (this.props.value === undefined) {
      this.setState({
        selectedValue,
      });
    }
    this.props.onChange(selectedValue, selectedIndex, selectedLabel);
  }
  _onPickerViewReady = (selectedValue, selectedIndex, selectedLabel) => {
    this.setState({
      selectedValue,
      selectedLabel,
    });
  }

  _renderPickerContents = () => {
    const { style } = this;
    const {
      cancelText, title, okText, data,
    } = this.props;
    return (
      <View style={[style.container, Platform.OS === 'android' && { paddingBottom: StatusBar.currentHeight }]}>
        {/* header */}
        {this.props.header ? this._renderHeaderView(style, style.headerView, okText, title, cancelText) : null}

        {/* middle */}
        {
          this.props.mode === 'dataPicker' ? (
            <PickerView
              ref={(pw) => { this._pickerView = pw; }}
              data={data}
              value={this.state.selectedValue}
              onChange={this._onChange}
              onReady={this._onPickerViewReady}
            />
          ) : (
              <DatePicker
                ref={(pw) => {
                  if (pw) {
                    this._pickerView = pw.refs.pw1.refs.pw2;
                  }
                }}
                {...this.props}
                mode={this.props.datePickerMode}
                initialValue={this.props.defaultDateValue}
                onChange={this._onChange}
              />
            )}

        {/* footer */}
        {this.props.footer ? this._renderFooterView(style, style.footerHorizontalView, okText, title, cancelText) : null}

      </View>
    );
  }
  _renderHeaderView = (style, containerStyle, okText, title, cancelText) => (
    <View style={containerStyle}>
      <TouchableOpacity style={[style.btn, style.cancelBtn]} onPress={this._onClose}>
        <Text style={[style.btnText, style.cancelText]} >{cancelText}</Text>
      </TouchableOpacity>
      <Text style={style.title}>{title}</Text>
      <TouchableOpacity style={[style.btn, style.okBtn]} onPress={(e) => { this._onConfirm(e); }}>
        <Text style={[style.btnText, style.okText]} >{okText}</Text>
      </TouchableOpacity>
    </View>
  )
  _renderFooterView = (style, containerStyle, okText, title, cancelText) => (this.props.footerVertical ? (
    <View style={style.footerView}>
      <TouchableOpacity style={[style.footerOKBtn]} onPress={this._onConfirm}>
        <Text style={[style.btnText, style.footerOKText]} >{okText}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[style.footerCancelBtn]} onPress={this._onClose}>
        <Text style={[style.btnText, style.footerCancelText]} >{cancelText}</Text>
      </TouchableOpacity>
    </View>
  ) :// 水平的情况直接复用header
    this._renderHeaderView(style, containerStyle, okText, title, cancelText))
  _renderViews = () => {
    if (this.props.modal) {
      return (
        <AnimateModal
          visible={this.state.visible}
          maskClosable={this.props.maskClosable}
          animationType="slide-up"
          onClose={this._onClose}
          styles={{ container: { justifyContent: 'flex-end' } }}
        >
          {this._renderPickerContents()}
        </AnimateModal>
      );
    } else {
      return (
        <View>
          {this._renderPickerContents()}
        </View>
      );
    }
  }

  render() {
    return (
      this._renderViews()
    );
  }
}

Picker.baseStyle = {
  container: {

  },
  // header Toolbar
  headerView: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: 40,
  },
  footerHorizontalView: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    height: 40,
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  cancelBtn: {
    alignItems: 'flex-start',
  },
  cancelText: {
  },
  okBtn: {
    alignItems: 'flex-end',
  },
  btnText: {
    fontSize: 16,
    color: '#108ee9',
  },
  okText: {
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  // footer Toolbar
  footerView: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
  footerOKBtn: {
    paddingVertical: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    width,
    height: 40,
  },
  footerCancelBtn: {
    paddingVertical: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    width,
    height: 40,
  },
  footerOKText: {
    color: '#108ee9',
  },
  footerCancelText: {
    color: '#108ee9',
  },
};

export default Picker;
