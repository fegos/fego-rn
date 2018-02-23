
module.exports = {
  connect: {
    responseName: 'serverConnectSuccess',
    response(client, data) {
      console.log(data);
      return {
        timestamp: new Date().getTime(),
      };
    },
  },
  serverTestEvent: {
    responseName: 'serverTestEvent',
    response(client, data) {
      console.log(data);
      return {
        test: `${data.traderId}=====${data.token}`,
      };
    },
  },
  disconnect: {
    responseName: 'serverConnectSuccess',
    response(client, data) {
      console.log(data);
      return {
        timestamp: new Date().getTime(),
      };
    },
  },
};
