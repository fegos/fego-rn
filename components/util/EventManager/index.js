/**
 * 事件管理类
 * 新增事件ID，name#id
 */
let toString = Object.prototype.toString,
	MUID = 1,
	isFunction = function (fn) {
		return toString.call(fn) == "[object Function]";
	},
	parseEventName = function (name) {
		if (typeof name !== 'string') return null;
		name = name.split('#');
		return {
			name: name[0],
			id: name[1]
		}
	}
export default class EventManager {
	eventCache = {}
	/**
	 * 注册事件监听
	 * eventName 支持ID的格式：name#id
	 */
	on(eventName, handler) {
		if (typeof eventName !== "string") return this;
		if (!isFunction(handler)) return this;
		let parseData = parseEventName(eventName);
		eventName = parseData.name;
		let cache = this.eventCache[eventName];
		if (!cache) {
			cache = this.eventCache[eventName] = [];
		}
		//添加标志
		handler.id = parseData.id || MUID++;
		//插入缓存
		cache.push(handler);
		return this;
	}
	/**
	 * 注销事件监听
	 * eventName 支持ID的格式：name#id
	 */
	off(eventName, handler) {
		//全卸载
		if (arguments.length === 0) {
			for (let eventName in this.eventCache) {
				this.eventCache[eventName].length = 0;
			}
			return this;
		}
		//部分卸载
		if (typeof eventName !== "string") return this;
		// '#id'写法，卸载与ID相同的所有事件
		if (/^#.*/.test(eventName)) {
			let groupId = eventName.replace('#', '');
			for (let k in this.eventCache) {
				this.eventCache[k] = this.eventCache[k].filter(fn => fn.id !== groupId)
			}
			return this;
		}
		let parseData = parseEventName(eventName);
		let cache = this.eventCache[parseData.name || ""];
		if (!cache) return this;
		if (!parseData.id) {
			if (handler === undefined) {
				cache.length = 0;
				return this;
			}
			if (!isFunction(handler)) return this;
		}
		let id = parseData.id || handler.id;
		for (let i = 0; i < cache.length; i++) {
			if (cache[i] === handler || (id && cache[i].id === id)) {
				cache.splice(i, 1);
				i--;
			}
		}
		return this;
	}
	one(eventName, handler) {
		if (typeof eventName !== "string") return this;
		let cache = this.eventCache[eventName],
			me = this;
		if (!cache) return this;
		if (!isFunction(handler)) return this;
		let fn = function () {
			let ret = handler.apply(this, arguments);
			me.off(eventName, fn);
			return ret;
		};
		return me.on(eventName, fn);
	}
	emit(eventName, ...rest) {
		let cache,
			rs = {
				rets: []
			},
			me = this;
		//检测参数
		if (typeof eventName !== "string") return rs;
		cache = this.eventCache[eventName || ""];
		//没有注册事件则不处理
		if (!cache) return rs;
		// 
		//获取事件缓存的副本，以允许事件修改缓存（卸载）
		cache = cache.slice(0);
		cache.forEach((evt, i) => {
			try { //防止handler出现错误导致其余handler无法执行
				let ret = evt.apply(me, rest);
				rs.rets.push(ret);
			} catch (e) {
				console.warn(e)
			}
		});
		return rs;
	}
}
