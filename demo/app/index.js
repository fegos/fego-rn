import React from 'react';
import { AppContainer, Message, Toast } from 'fego-rn';

import StackNav from './config/StackNav';
import Font from './config/font';

// 忽略warning
if (__DEV__) {
  console.ignoredYellowBox = [
    'Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window).',
    'Debugger and device times have drifted by more than 60s. Please correct this by running adb shell "date `date +%m%d%H%M%Y.%S`" on your debugger machine.',
    'Warning: isMounted(...) is deprecated',
  ];
}

export default {
  init: () => {
    Font.init();
    Message.on('event', () => {
      Toast.info('监听到事件hello', 2);
    });
    return AppContainer.setApp(<StackNav />);
  },
};
