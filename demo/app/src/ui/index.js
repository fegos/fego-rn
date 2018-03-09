import React, { Component } from 'react';
import { TestListView } from '../../common';

export default class Page extends Component {
  static navigationOptions = {
    title: '标题',
  }

  render() {
    return (
      <TestListView
        {...this.props}
        list={[
          { title: '活动指示器 ActivityIndicator', icon: 'spinner', page: 'ui/ActivityIndicator' },
          { title: '模态框 AnimateModal', icon: 'hand-pointer-o', page: 'ui/AnimateModal' },
          { title: '徽章 Badge', icon: 'trophy', page: 'ui/Badge' },
          { title: '按钮 Button', icon: 'download', page: 'ui/Button' },
          { title: '日历 Calendar', icon: 'calendar', page: 'ui/Calendar' },
          { title: '轮播图 Carousel', icon: 'toggle-right', page: 'ui/Carousel' },
          { title: '复选框 Checkbox', icon: 'check-square-o', page: 'ui/Checkbox' },
          { title: '对话框 Dialog', icon: 'comments-o', page: 'ui/Dialog' },
          { title: '手势密码 GesturePassword', icon: 'braille', page: 'ui/GesturePassword' },
          { title: '组 Group', icon: 'group', page: 'ui/Group' },
          { title: '图标 Icon', icon: 'heart-o', page: 'ui/Icon' },
          { title: '输入框 Input', icon: 'mouse-pointer', page: 'ui/Input' },
          { title: '清单 List', icon: 'list-ul', page: 'ui/List' },
          { title: '选择器 MonthPicker', icon: 'calendar-minus-o', page: 'ui/MonthPicker' },
          { title: '选择器 Picker', icon: 'calendar-check-o', page: 'ui/Picker' },
          { title: '图表 PieChart', icon: 'pie-chart', page: 'ui/PieChart' },
          { title: '泡泡层 PopMenu', icon: 'smile-o', page: 'ui/PopMenu' },
          { title: '弹出层 Popup', icon: 'music', page: 'ui/Popup' },
          { title: '进度条 Progress', icon: 'tasks', page: 'ui/Progress' },
          { title: '单选框 Radio', icon: 'dot-circle-o', page: 'ui/Radio' },
          { title: '下拉刷新 RefreshView', icon: 'refresh', page: 'ui/RefreshView' },
          { title: '下拉刷新 RefreshView2', icon: 'refresh', page: 'ui/RefreshView/ListView' },
          { title: '分段器 Segment', icon: 'sitemap', page: 'ui/Segment' },
          { title: '滑动器 Slider', icon: 'sliders', page: 'ui/Slider' },
          { title: '开关 Switch', icon: 'toggle-on', page: 'ui/Switch' },
          { title: '标签页 Tabs', icon: 'tablet', page: 'ui/Tabs' },
          { title: '横屏切换标签页 Tabs', icon: 'tablet', page: 'ui/Tabs/RotateTabs' },
          { title: '小标签 Tag', icon: 'tag', page: 'ui/Tag' },
          { title: '轻提示 Toast', icon: 'comment-o', page: 'ui/Toast' },
          { title: '加载提示 Loading', icon: 'spinner', page: 'ui/Loading' },
          { title: 'TestArt', page: 'ui/TestArt' },
        ]}
      />
    );
  }
}
