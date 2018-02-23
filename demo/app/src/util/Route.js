const index = require('./index');
const fetch = require('./Fetch');
const socket = require('./SocketIO');


export default {
  'util/index': {
    screen: index.default,
  },

  'util/Fetch': {
    screen: fetch.default,
  },

  'util/SocketIO': {
    screen: socket.default,
  },
};
