import React from 'react';
import { AppContainer } from 'fego-rn';

import StackNav from './config/StackNav';
import Font from './config/font';

export default {
  init: () => {
    Font.init();
    return AppContainer.setApp(<StackNav />);
  },
};
