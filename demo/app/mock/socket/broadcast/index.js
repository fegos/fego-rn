'use strict'
module.exports = {
	serverHeartbeatEvent: {
		response: function (client) {
			let now = new Date()
			return {
				"timestamp": now.getTime(),
			}
		}
	}
}
