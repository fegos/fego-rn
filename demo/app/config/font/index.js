import { Icon } from 'fego-rn';

export default {
  init() {
    // 初始化 Icon 组件
    Icon.setFamily({
      entypo: require('./entypo.json'),
      FontAwesome: require('./FontAwesome.json'),
    });
    Icon.defaultProps.family = 'FontAwesome';
  },
};
