---
title: Fetch
subTitle: 请求 
---

# Fetch

### 组件描述
组件继承自 [Axios](https://github.com/axios/axios) 开源库 ，用来进行http网络请求
### 常用方法

#### 初始化
```
Fetch.defaults.baseURL = 'http://localhost:3001/api'
Fetch.defaults.timeout = 1000`
```
#### 拦截设置
```
Fetch.interceptors.request.use(function (config) {
	if (config.method == 'post') {
		let data = config.data
		return Promise.resolve({ encrypt: '00000' }).then((data) => {
			config.data = data
			return config;
		})
	}
	else {
		return config;
	}
}, function (error) {
	return Promise.reject(error);
});

Fetch.interceptors.response.use(function (response) {
	return response.data;
}, function (error) {
	return Promise.reject(error);
});
```
#### Get请求
```
Fetch.get('/test/fetch/list?a=100').then(res => {
	this.__requestResult(true, res)
}).catch(err => {
	this.__requestResult(false, err)
});
```
#### Post请求
```
Fetch.post('/test/fetch/list', { p: 'xxx' }).then(res => {
	this.__requestResult(true, res)
}).catch(err => {
	this.__requestResult(false, err)
});
```
#### 取消请求
```
var CancelToken = Fetch.CancelToken;
var source = CancelToken.source();
Fetch.get('/test/fetch/cancel', { cancelToken: source.token }).then(res => {
	this.__requestResult(true, res)
}).catch((error) => {
	console.log(error.message);
	this.__requestResult(false, error)
	if (Fetch.isCancel(error)) {
		console.log('Request canceled', error.message);
	} else {
		// 处理错误
	}
});

function cancelRequest() {
	console.log('========')
	source.cancel('操作被用户取消。');
	this.setState({
		fetchMsg: '操作被用户取消。。',
		list: []
	})
}
//取消请求（消息参数是可选的）
//注意：Android Debug 下会立即执行
setTimeout(cancelRequest.bind(this), 3000)
```
#### 并发请求
```
function getUserName() {
	return Fetch.get('/test/fetch/username');
}

function getNickName() {
	return Fetch.get('/test/fetch/nickname');
}
let that = this
Fetch.all([getUserName(), getNickName()])
	.then(
	Fetch.spread(function (username, nickname) {
		that.setState({
			fetchMsg: '成功',
			list: [
				{ name: username.data.username },
				{ name: nickname.data.nickname }
			]
		})
	})
);
```