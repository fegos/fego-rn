---
title: EventManager
subTitle: 事件管理器 
---

# 事件管理器

### 组件描述
- 用于订阅／发布事件

### 示例

~~~js
let msg = new EventManager();
msg.on('eventName', data=>{});
msg.emit('eventName', { a: 1});
// 注销所有监听函数
msg.off()
// 注销所有eventName的监听函数
msg.off('eventName')
// 注销eventName下的监听函数fn
msg.off('eventName', fn)

// 注意：公共事件注销时，建议使用ID方式只需要自己的监听函数
// eventName#id
msg.on('ready#333', data=>{});
// 只会注销ready事件下id=333的监听函数
// 便捷写法 效果同 msg.off('eventName', fn)
msg.off('ready#333')
// 注销ID为333的所有监听函数
msg.off('#333')
~~~