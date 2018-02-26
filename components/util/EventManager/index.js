/**
 * 事件管理类
 * 新增事件ID，name#id
 */
let MUID = 1;
const { toString } = Object.prototype;
function isFunction(fn) {
  return toString.call(fn) === '[object Function]';
}
function parseEventName(name) {
  if (typeof name !== 'string') return null;
  const newName = name.split('#');
  return {
    name: newName[0],
    id: newName[1],
  };
}
export default class EventManager {
  eventCache = {}
  /**
   * 注册事件监听
   * eventName 支持ID的格式：name#id
   */
  on(eventName, handler) {
    if (typeof eventName !== 'string') return this;
    if (!isFunction(handler)) return this;
    const parseData = parseEventName(eventName);
    eventName = parseData.name;
    let cache = this.eventCache[eventName];
    if (!cache) {
      this.eventCache[eventName] = [];
      cache = this.eventCache[eventName];
    }
    // 添加标志
    handler.id = parseData.id || MUID++;
    // 插入缓存
    cache.push(handler);
    return this;
  }
  /**
   * 注销事件监听
   * eventName 支持ID的格式：name#id
   */
  off(eventName, handler) {
    // 全卸载
    if (arguments.length === 0) {
      for (const name in this.eventCache) {
        if ({}.hasOwnProperty.call(this.eventCache, name)) {
          this.eventCache[name].length = 0;
        }
      }
      return this;
    }
    // 部分卸载
    if (typeof eventName !== 'string') return this;
    // '#id'写法，卸载与ID相同的所有事件
    if (/^#.*/.test(eventName)) {
      const groupId = eventName.replace('#', '');
      for (const k in this.eventCache) {
        if ({}.hasOwnProperty.call(this.eventCache, k)) {
          this.eventCache[k] = this.eventCache[k].filter(fn => fn.id !== groupId);
        }
      }
      return this;
    }
    const parseData = parseEventName(eventName);
    const cache = this.eventCache[parseData.name || ''];
    if (!cache) return this;
    if (!parseData.id) {
      if (handler === undefined) {
        cache.length = 0;
        return this;
      }
      if (!isFunction(handler)) return this;
    }
    const id = parseData.id || handler.id;
    for (let i = 0; i < cache.length; i++) {
      if (cache[i] === handler || (id && cache[i].id === id)) {
        cache.splice(i, 1);
        i--;
      }
    }
    return this;
  }
  one(eventName, handler) {
    if (typeof eventName !== 'string') return this;
    const cache = this.eventCache[eventName];
    const me = this;
    if (!cache) return this;
    if (!isFunction(handler)) return this;
    const fn = function (...rest) {
      const ret = handler.apply(this, rest);
      me.off(eventName, fn);
      return ret;
    };
    return me.on(eventName, fn);
  }
  emit(eventName, ...rest) {
    let cache;
    const rs = {
      rets: [],
    };
    const me = this;
    // 检测参数
    if (typeof eventName !== 'string') return rs;
    cache = this.eventCache[eventName || ''];
    // 没有注册事件则不处理
    if (!cache) return rs;
    //
    // 获取事件缓存的副本，以允许事件修改缓存（卸载）
    cache = cache.slice(0);
    cache.forEach((evt) => {
      try { // 防止handler出现错误导致其余handler无法执行
        const ret = evt.apply(me, rest);
        rs.rets.push(ret);
      } catch (e) {
        console.warn(e);
      }
    });
    return rs;
  }
}
