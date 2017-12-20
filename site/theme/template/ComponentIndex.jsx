import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import collect from 'bisheng/collect';

class ComponentIndex extends Component {
	render() {
		let { location, pageData, utils, themeConfig } = this.props;
		let { siteTitle } = themeConfig;
		let pathname = location.pathname;

		return (
			<DocumentTitle title={`${siteTitle}`}>
				<div>
					<h3 className='title'>欢迎来到 {siteTitle}，当前您访问的是{pathname}</h3>
					<div className='markdown'>
						{utils.toReactComponent(pageData.content)}
					</div>
				</div>
			</DocumentTitle>
		);
	}
}

export default collect(async (nextProps) => {
	let { pageData } = nextProps, 
		returnedPageData;

	returnedPageData = pageData instanceof Function ? pageData : (pageData.README || pageData.index);
	if (!pageData || !returnedPageData) {
		throw 404;
	}
	return {
		pageData: await returnedPageData(),
	};
})(ComponentIndex);