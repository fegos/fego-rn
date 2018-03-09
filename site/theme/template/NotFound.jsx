import React from 'react';
import DocumentTitle from 'react-document-title';

export default function ErrorPage(props) {
  return (
    <DocumentTitle title={`Error Page | ${props.themeConfig.siteTitle}`}>
      <div>
        <h1 className="entry-title">Oops something bad happened!</h1>
      </div>
    </DocumentTitle>
  );
}
