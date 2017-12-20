/**
 * 组件库专用全局消息类
 * 业务层使用Message
 */
import EventManager from '../EventManager'
let globalEvent = new EventManager();
export default globalEvent