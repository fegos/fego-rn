/**
 * 全局消息类
 * 供业务层使用，组件库使用RNMessage
 */
import EventManager from '../EventManager'
let globalEvent = new EventManager();
export default globalEvent