module.exports = {
  'test/fetch/list': {
    delay: 1000,
    response() {
      // 动态数据
      return {
        retcode: 200,
        retdesc: '消息',
        data: {
          result: [{
            id: '@id',
            name: '@cname',
            desc: '@cword(12)',
            'effectStatus|0-1': 1,
            'effectTime|+1': 1483443787061,
            contractFactor: "@string('number',3)",
          }],
          totalCount: 33,
        },
      };
    },
  },
  'test/fetch/cancel': {
    delay: 1000 * 5,
    response() {
      // 动态数据
      return {
        retcode: 200,
        retdesc: '消息',
        data: {
          result: [{
            id: '@id',
            name: '@cname',
            desc: '@cword(12)',
            'effectStatus|0-1': 1,
            'effectTime|+1': 1483443787061,
            contractFactor: "@string('number',3)",
          }],
          totalCount: 33,
        },
      };
    },
  },
  'test/fetch/username': {
    delay: 1000,
    response() {
      // 动态数据
      return {
        retcode: 200,
        retdesc: '消息',
        data: {
          username: 'username',
        },
      };
    },
  },
  'test/fetch/nickname': {
    delay: 2000,
    response() {
      // 动态数据
      return {
        retcode: 200,
        retdesc: '消息',
        data: {
          nickname: 'nickname',
        },
      };
    },
  },
  'upload/server': {
    delay: 2000,
    response() {
      return {
        retcode: 200,
        retdesc: '上传成功',
      };
    },
  },
};
