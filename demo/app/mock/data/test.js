'use strict';
module.exports = {
	'test/fetch/list': {
		delay: 1000,
		response: function (req, res) {
			// 动态数据
			return {
				'retcode': 200,
				'retdesc': '消息',
				'data': {
					"result": [{
						"id": "@id",
						"name": "@cname",
						"desc": "@cword(12)",
						"effectStatus|0-1": 1,
						"effectTime|+1": 1483443787061,
						"contractFactor": "@string('number',3)"
					}],
					'totalCount': 33
				}
			}
		}
	},
	'test/fetch/cancel': {
		delay: 1000 * 5,
		response: function (req, res) {
			// 动态数据
			return {
				'retcode': 200,
				'retdesc': '消息',
				'data': {
					"result": [{
						"id": "@id",
						"name": "@cname",
						"desc": "@cword(12)",
						"effectStatus|0-1": 1,
						"effectTime|+1": 1483443787061,
						"contractFactor": "@string('number',3)"
					}],
					'totalCount': 33
				}
			}
		}
	}
}