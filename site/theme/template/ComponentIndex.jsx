import React from 'react';
import DocumentTitle from 'react-document-title';
import collect from 'bisheng/collect';

function ComponentIndex(props) {
  const {
    location,
    pageData,
    utils,
    themeConfig,
  } = props;
  return (
    <DocumentTitle title={themeConfig.siteTitle}>
      <div>
        <h3 className="title">欢迎来到 {themeConfig.siteTitle}，当前您访问的是{location.pathname}</h3>
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
})(ComponentIndex);
