import React from 'react';
import DocumentTitle from 'react-document-title';
import collect from 'bisheng/collect';
import '../static/home.less';

function Home(props) {
  const { utils, pageData, themeConfig } = props;
  return (
    <DocumentTitle title={themeConfig.siteTitle}>
      <div className="home">
        <p className="welcome">欢迎来到 {themeConfig.siteTitle}</p>
        <div className="markdown">
          {utils.toReactComponent(pageData.content)}
        </div>
      </div>
    </DocumentTitle>
  );
}

export default collect(async (nextProps) => {
  const { pageData } = nextProps;
  const returnedPageData = pageData instanceof Function ? pageData : (pageData.README || pageData.index);
  if (!pageData || !returnedPageData) {
    throw Error(404);
  }
  return {
    pageData: await returnedPageData(),
  };
})(Home);
