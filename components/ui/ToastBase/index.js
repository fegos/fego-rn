import React from 'react';
import AppContainer from '../AppContainer';
import ToastContainer from './ToastContainer';

const topViewKey = 'toast';
const hide = () => {
  AppContainer.remove(topViewKey);
};
const notice = (content, opt) => {
  hide();

  function animationEnd() {
    hide();
  }
  AppContainer.add(<ToastContainer
    {...opt}
    key={topViewKey}
    content={content}
    onAnimationEnd={animationEnd}
  />);
};

export default {
  notice,
  hide,
};
