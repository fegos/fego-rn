const Home = './template/Home';
const ComponentIndex = './template/ComponentIndex';
const Component = './template/Component';

module.exports = {
  lazyLoad: true,
  pick: {
    ui(markdownData) {
      const { filename, title, subTitle } = markdownData.meta;
      if (!/^components\/ui\//.test(filename)) return false;
      return {
        filename,
        title,
        subTitle,
      };
    },
    util(markdownData) {
      const { filename, title, subTitle } = markdownData.meta;
      if (!/^components\/util\//.test(filename)) return false;
      return {
        filename,
        title,
        subTitle,
      };
    },
  },
  plugins: [
    'bisheng-plugin-description',
    'bisheng-plugin-toc',
    'bisheng-plugin-react',
  ],
  routes: [{
    path: '/',
    component: './template/layout',
    indexRoute: {
      dataPath: '/components',
      component: Home,
    },
    childRoutes: [{
      path: '/components/ui',
      component: ComponentIndex,
    }, {
      path: '/components/ui/:children',
      component: Component,
    }, {
      path: '/components/util',
      component: ComponentIndex,
    }, {
      path: '/components/util/:children',
      component: Component,
    }],
  }],
};
