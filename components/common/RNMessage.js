/**
 * 组件库专用全局消息类
 * 业务层使用 Message
 */
import EventManager from '../util/EventManager'
let globalEvent = new EventManager();
export default globalEvent