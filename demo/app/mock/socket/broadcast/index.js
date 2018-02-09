module.exports = {
  serverHeartbeatEvent: {
    response() {
      const now = new Date();
      return {
        timestamp: now.getTime(),
      };
    },
  },
};
