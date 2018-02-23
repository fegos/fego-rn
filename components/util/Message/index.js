/**
 * 全局消息类
 * 供业务层使用，组件库使用RNMessage
 */
import EventManager from '../EventManager';

const globalEvent = new EventManager();
export default globalEvent;
