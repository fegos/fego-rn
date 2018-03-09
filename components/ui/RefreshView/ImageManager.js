/*
 * @author @by zramals
 */

// 图片数组
const pullingImgs = [];
const loadingImgs = [];
// 最大图片张数
// const imagePullLength = 21;
// const imageLoadLength = 24;

export default {

  pullImageView(styleType) {
    // 初始化加载所有图片
    if (pullingImgs.length > 0) {
      return pullingImgs;
    } else {
      /**
      * 由于RN不支持动态加载图片，故对每幅图都要静态加载
      */
      if (styleType === 'dark') {
        pullingImgs.push(require('./refresh_source/dark/pulling/pulling_1.png'));
        pullingImgs.push(require('./refresh_source/dark/pulling/pulling_2.png'));
        pullingImgs.push(require('./refresh_source/dark/pulling/pulling_3.png'));
        pullingImgs.push(require('./refresh_source/dark/pulling/pulling_4.png'));
        pullingImgs.push(require('./refresh_source/dark/pulling/pulling_5.png'));
        pullingImgs.push(require('./refresh_source/dark/pulling/pulling_6.png'));
        pullingImgs.push(require('./refresh_source/dark/pulling/pulling_7.png'));
        pullingImgs.push(require('./refresh_source/dark/pulling/pulling_8.png'));
        pullingImgs.push(require('./refresh_source/dark/pulling/pulling_9.png'));
        pullingImgs.push(require('./refresh_source/dark/pulling/pulling_10.png'));
        pullingImgs.push(require('./refresh_source/dark/pulling/pulling_11.png'));
        pullingImgs.push(require('./refresh_source/dark/pulling/pulling_12.png'));
        pullingImgs.push(require('./refresh_source/dark/pulling/pulling_13.png'));
        pullingImgs.push(require('./refresh_source/dark/pulling/pulling_14.png'));
        pullingImgs.push(require('./refresh_source/dark/pulling/pulling_15.png'));
        pullingImgs.push(require('./refresh_source/dark/pulling/pulling_16.png'));
        pullingImgs.push(require('./refresh_source/dark/pulling/pulling_17.png'));
        pullingImgs.push(require('./refresh_source/dark/pulling/pulling_18.png'));
        pullingImgs.push(require('./refresh_source/dark/pulling/pulling_19.png'));
        pullingImgs.push(require('./refresh_source/dark/pulling/pulling_20.png'));
        pullingImgs.push(require('./refresh_source/dark/pulling/pulling_21.png'));
      } else {
        pullingImgs.push(require('./refresh_source/light/pulling/pulling_1.png'));
        pullingImgs.push(require('./refresh_source/light/pulling/pulling_2.png'));
        pullingImgs.push(require('./refresh_source/light/pulling/pulling_3.png'));
        pullingImgs.push(require('./refresh_source/light/pulling/pulling_4.png'));
        pullingImgs.push(require('./refresh_source/light/pulling/pulling_5.png'));
        pullingImgs.push(require('./refresh_source/light/pulling/pulling_6.png'));
        pullingImgs.push(require('./refresh_source/light/pulling/pulling_7.png'));
        pullingImgs.push(require('./refresh_source/light/pulling/pulling_8.png'));
        pullingImgs.push(require('./refresh_source/light/pulling/pulling_9.png'));
        pullingImgs.push(require('./refresh_source/light/pulling/pulling_10.png'));
        pullingImgs.push(require('./refresh_source/light/pulling/pulling_11.png'));
        pullingImgs.push(require('./refresh_source/light/pulling/pulling_12.png'));
        pullingImgs.push(require('./refresh_source/light/pulling/pulling_13.png'));
        pullingImgs.push(require('./refresh_source/light/pulling/pulling_14.png'));
        pullingImgs.push(require('./refresh_source/light/pulling/pulling_15.png'));
        pullingImgs.push(require('./refresh_source/light/pulling/pulling_16.png'));
        pullingImgs.push(require('./refresh_source/light/pulling/pulling_17.png'));
        pullingImgs.push(require('./refresh_source/light/pulling/pulling_18.png'));
        pullingImgs.push(require('./refresh_source/light/pulling/pulling_19.png'));
        pullingImgs.push(require('./refresh_source/light/pulling/pulling_20.png'));
        pullingImgs.push(require('./refresh_source/light/pulling/pulling_21.png'));
      }
      return pullingImgs;
    }
  },
  loadMoreView(styleType) {
    // 初始化加载所有图片
    // 初始化加载所有图片
    if (loadingImgs.length > 0) {
      return loadingImgs;
    } else {
      /**
      * 由于RN不支持动态加载图片，故对每幅图都要静态加载
      */
      if (styleType === 'dark') {
        loadingImgs.push(require('./refresh_source/dark/loading/loading_1.png'));
        loadingImgs.push(require('./refresh_source/dark/loading/loading_2.png'));
        loadingImgs.push(require('./refresh_source/dark/loading/loading_3.png'));
        loadingImgs.push(require('./refresh_source/dark/loading/loading_4.png'));
        loadingImgs.push(require('./refresh_source/dark/loading/loading_5.png'));
        loadingImgs.push(require('./refresh_source/dark/loading/loading_6.png'));
        loadingImgs.push(require('./refresh_source/dark/loading/loading_7.png'));
        loadingImgs.push(require('./refresh_source/dark/loading/loading_8.png'));
        loadingImgs.push(require('./refresh_source/dark/loading/loading_9.png'));
        loadingImgs.push(require('./refresh_source/dark/loading/loading_10.png'));
        loadingImgs.push(require('./refresh_source/dark/loading/loading_11.png'));
        loadingImgs.push(require('./refresh_source/dark/loading/loading_12.png'));
        loadingImgs.push(require('./refresh_source/dark/loading/loading_13.png'));
        loadingImgs.push(require('./refresh_source/dark/loading/loading_14.png'));
        loadingImgs.push(require('./refresh_source/dark/loading/loading_15.png'));
        loadingImgs.push(require('./refresh_source/dark/loading/loading_16.png'));
        loadingImgs.push(require('./refresh_source/dark/loading/loading_17.png'));
        loadingImgs.push(require('./refresh_source/dark/loading/loading_18.png'));
        loadingImgs.push(require('./refresh_source/dark/loading/loading_19.png'));
        loadingImgs.push(require('./refresh_source/dark/loading/loading_20.png'));
        loadingImgs.push(require('./refresh_source/dark/loading/loading_21.png'));
        loadingImgs.push(require('./refresh_source/dark/loading/loading_22.png'));
        loadingImgs.push(require('./refresh_source/dark/loading/loading_23.png'));
        loadingImgs.push(require('./refresh_source/dark/loading/loading_24.png'));
      } else {
        loadingImgs.push(require('./refresh_source/light/loading/loading_1.png'));
        loadingImgs.push(require('./refresh_source/light/loading/loading_2.png'));
        loadingImgs.push(require('./refresh_source/light/loading/loading_3.png'));
        loadingImgs.push(require('./refresh_source/light/loading/loading_4.png'));
        loadingImgs.push(require('./refresh_source/light/loading/loading_5.png'));
        loadingImgs.push(require('./refresh_source/light/loading/loading_6.png'));
        loadingImgs.push(require('./refresh_source/light/loading/loading_7.png'));
        loadingImgs.push(require('./refresh_source/light/loading/loading_8.png'));
        loadingImgs.push(require('./refresh_source/light/loading/loading_9.png'));
        loadingImgs.push(require('./refresh_source/light/loading/loading_10.png'));
        loadingImgs.push(require('./refresh_source/light/loading/loading_11.png'));
        loadingImgs.push(require('./refresh_source/light/loading/loading_12.png'));
        loadingImgs.push(require('./refresh_source/light/loading/loading_13.png'));
        loadingImgs.push(require('./refresh_source/light/loading/loading_14.png'));
        loadingImgs.push(require('./refresh_source/light/loading/loading_15.png'));
        loadingImgs.push(require('./refresh_source/light/loading/loading_16.png'));
        loadingImgs.push(require('./refresh_source/light/loading/loading_17.png'));
        loadingImgs.push(require('./refresh_source/light/loading/loading_18.png'));
        loadingImgs.push(require('./refresh_source/light/loading/loading_19.png'));
        loadingImgs.push(require('./refresh_source/light/loading/loading_20.png'));
        loadingImgs.push(require('./refresh_source/light/loading/loading_21.png'));
        loadingImgs.push(require('./refresh_source/light/loading/loading_22.png'));
        loadingImgs.push(require('./refresh_source/light/loading/loading_23.png'));
        loadingImgs.push(require('./refresh_source/light/loading/loading_24.png'));
      }
      return loadingImgs;
    }
  },

};
