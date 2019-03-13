const index = require('./index');
const fetch = require('./Fetch');
const socket = require('./SocketIO');
const test = require('./Test');
const message = require('./Message');

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
  'util/Message': {
    screen: message.default,
  },
};
