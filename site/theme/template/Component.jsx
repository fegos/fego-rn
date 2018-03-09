import React from 'react';
import DocumentTitle from 'react-document-title';
import collect from 'bisheng/collect';
import '../static/component.less';

function Component(props) {
  const { pageData, utils, themeConfig } = props;
  return (
    <DocumentTitle title={`${pageData.meta.title} | ${themeConfig.siteTitle}`}>
      <div className="markdown">
        {utils.toReactComponent(pageData.content)}
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
})(Component);
