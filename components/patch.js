import { Text } from 'react-native';
/**
 * 不允许字体缩放，避免系统设置字体放大后组件字体跟着变大导致样式或布局等不协调
 */
Text.defaultProps.allowFontScaling = false;