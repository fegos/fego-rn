/**
 * 业务异常统一处理模块
 * 1.异常
 * {
 * 	type: 'err',
 * 	msg: '',
 * 	error
 * }
 * 2.业务异常
 * {
 * 	type: 'biz',
 * 	code: '200',
 * 	msg: '',
 * 	data
 * }
 */
export default {
	resoleHandler: function(rs = {}, url){
		// 兼容各项目组的风格
		let code = rs.retcode || rs.retCode;
		let desc = rs.retdesc || rs.retDesc;
		// 重要异常，强制处理
		switch(code){
			// 未授权
			case 5021:
				return;
			// 登录冲突
			case 5405:
				return;
		}
		if (!rs || code != 200) {
			return Promise.reject({
				type: 'biz',
				code: code,
				msg: rs ? `(${code})${desc}` : '接口数据异常！',
				data: rs.data || {}
			});
		}
		console.log(this, url)
		// 正常，则直接返回数据对象
		return rs.data || {};
	},
	rejectHandler: function(err = {}, url){
		console.log(this, url)
		if(err.type === 'abort'){
			return false;
		}
		return err;
	}
} 