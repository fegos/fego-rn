---
title: Dialog
subTitle: 对话框
---

# Dialog对话框

## 示例

~~~js
Dialog.alert('内容')

Dialog.alert('标题', '内容')

Dialog.alert('内容', (btn)=>{})

Dialog.confirm('你很帅吗？', (btn)=>{
	if(btn.type === 'yes'){
		Dialog.alert('你很自信嘛！')
	}else{
		Dialog.alert('这就对了！')
	}
})

Dialog.confirm(<Text style={{color: '#338811'}}>这窗口点确定是没用的</Text>, (btn)=>{
	if(btn.type === 'yes'){
		return false
	}
})

Dialog.confirm('动画结束回调', (btn, aniEnd)=>{
	console.log('按钮被点击，但动画未结束')
	aniEnd(()=>{
		console.log('动画结束后才执行')
	})
})

Dialog.tip('删除', '确定删除么???', [
	{ text: '不好', onPress: () => console.log('cancel') },
	{ text: '可以', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
])
~~~

