module.exports = {
  'com/init': {
    delay: 1000,
    response() {
      // 动态数据
      return {
        retcode: 200,
        // 'retcode': 5002,
        data: {
          user: {
            memberId: '@id',
            userId: '@id',
            userName: '@cname',
            system: 1,
          },
          serverTime: Date.now(),
        },
        retdesc: '服务器撒娇了',
      };
    },
  },
  'com/login': {
    retcode: 200,
  },
  'com/logout': {
    retcode: 200,
    retdesc: '系统故障',
  },
  'com/systemtime': {
    response() {
      return {
        retcode: 200,
        data: {
          systemTime: Date.now(),
        },
      };
    },
  },
  'com/verifycode': '@image("90x30", "#50B347", "#FFF", "code")',
};
