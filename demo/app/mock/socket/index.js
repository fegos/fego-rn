'use strict'

module.exports = {
	'connect': {
		responseName: 'serverConnectSuccess',
		response: function (client, data) {
			console.log(data)
			return {
				'timestamp': new Date().getTime(),
			};
		}
	},
	'serverTestEvent': {
		responseName: 'serverTestEvent',
		response: function (client, data) {
			console.log(data)
			return {
				test: data.traderId + '=====' + data.token
			};
		}
	},
	'disconnect': {
		responseName: 'serverConnectSuccess',
		response: function (client, data) {
			console.log(data)
			return {
				'timestamp': new Date().getTime(),
			};
		}
	}
}
