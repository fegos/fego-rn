/**
 * 长连接组件
 * @author 马腾
 */
import SocketIO from 'socket.io-client/dist/socket.io'
export default {
	create: function (...rest) {
		return SocketIO(...rest);
	}
}

