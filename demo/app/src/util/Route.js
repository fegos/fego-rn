const index = require('./index');
const fetch = require('./Fetch');
const socket = require('./SocketIO');
const test = require('./Test');

export default {
  'util/index': {
    screen: index.default,
  },
  'util/Test': {
    screen: test.default,
  },
  'util/Fetch': {
    screen: fetch.default,
  },

  'util/SocketIO': {
    screen: socket.default,
  },
};
